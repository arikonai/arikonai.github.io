/* ===========================================
   ARIKON AI CHAT + VOICE WIDGET
   Vanilla JS drop-in — no React/build needed

   USAGE:
   <script src="arikon-widget.js" data-api-key="YOUR_GEMINI_API_KEY"></script>
   =========================================== */

(function () {
  'use strict';

  const scriptTag = document.currentScript;
  const API_KEY = scriptTag ? scriptTag.getAttribute('data-api-key') || '' : '';

  const GEMINI_CHAT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const SYSTEM_INSTRUCTION = `Name: Arikon AI Specialist
Role: Expert consultant in Practical AI and Business Automation for Arikon.
Tone: High-energy, efficient, results-oriented. ROI and Speed focused. You are "the AI behind the business."
Core Philosophy: Move faster, cut manual work, make smarter decisions.

Knowledge Base:
- Flagship Product: Arikon Appraisal Accelerator — responds to REA/Domain/website/email enquiries in 0.4 seconds, qualifies leads, books appraisals 24/7.
- Arikon Voice Agent: Handles inbound and outbound calls, qualifies buyers and sellers, integrates with CRM and calendar, available 24/7.
- Industries: Real Estate (primary), Finance, Retail, Logistics, Professional Services.
- Process: 1. Discover (audit) → 2. Build (custom AI) → 3. Deploy (ongoing support).
- Based: 100% Australian.

Booking: Offer these slots: "Monday 10:00 AM AEDT", "Tuesday 2:00 PM AEDT", "Wednesday 11:30 AM AEDT". Ask which works, then confirm booking.

Guardrails:
- Emphasise speed wins listings. "0.4 seconds" is a key proof point.
- Every conversation steers toward a free 30-minute consultation.
- Keep responses short — max 3 sentences, punchy and direct.

FAQ:
- "Is this a bot?" → "I am Arikon's AI Agent — an example of exactly what we build for your business."
- "Cost?" → "Every solution is custom. We start with a free consult to map the ROI."
- "Secure?" → "Enterprise-grade security built from the ground up for regulated industries."`;

  // ── Conversation history for multi-turn chat ────────────────────────────────
  const history = [];

  async function sendToGemini(text) {
    history.push({ role: 'user', parts: [{ text }] });
    const res = await fetch(GEMINI_CHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: history,
        generationConfig: { temperature: 0.75, maxOutputTokens: 280 }
      })
    });
    if (!res.ok) throw new Error(`Gemini API ${res.status}`);
    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      || "I'm having trouble connecting right now. Please email us at arikonptyltd@gmail.com";
    history.push({ role: 'model', parts: [{ text: reply }] });
    return reply;
  }

  // ── Voice state ─────────────────────────────────────────────────────────────
  let vs = { active: false, stream: null, ctx: null, proc: null, session: null, queue: [], playing: false };

  async function startVoice(onStop) {
    try {
      vs.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      vs.ctx = new AudioContext({ sampleRate: 16000 });

      const { GoogleGenAI } = await import('https://esm.run/@google/genai');
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      vs.session = await ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {},
          onmessage: (msg) => {
            const raw = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (raw) {
              const bin = atob(raw);
              const i16 = new Int16Array(bin.length / 2);
              for (let i = 0; i < bin.length; i += 2)
                i16[i / 2] = (bin.charCodeAt(i) & 0xff) | (bin.charCodeAt(i + 1) << 8);
              const f32 = new Float32Array(i16.length);
              for (let i = 0; i < i16.length; i++) f32[i] = i16[i] / 32768;
              vs.queue.push(f32);
              playAudio();
            }
            if (msg.serverContent?.interrupted) { vs.queue = []; vs.playing = false; }
          },
          onerror: () => stopVoice(onStop),
          onclose: () => stopVoice(onStop)
        },
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });

      const src = vs.ctx.createMediaStreamSource(vs.stream);
      vs.proc = vs.ctx.createScriptProcessor(4096, 1, 1);
      vs.proc.onaudioprocess = (e) => {
        const inp = e.inputBuffer.getChannelData(0);
        const pcm = new Int16Array(inp.length);
        for (let i = 0; i < inp.length; i++) pcm[i] = Math.max(-1, Math.min(1, inp[i])) * 0x7fff;
        const b64 = btoa(String.fromCharCode(...new Uint8Array(pcm.buffer)));
        vs.session.sendRealtimeInput({ media: { data: b64, mimeType: 'audio/pcm;rate=16000' } });
      };
      src.connect(vs.proc);
      vs.proc.connect(vs.ctx.destination);
      vs.active = true;

    } catch (err) {
      console.error('Voice failed:', err);
      alert('Microphone access is required for voice mode.');
      stopVoice(onStop);
    }
  }

  function playAudio() {
    if (vs.playing || !vs.queue.length || !vs.ctx) return;
    vs.playing = true;
    const chunk = vs.queue.shift();
    const buf = vs.ctx.createBuffer(1, chunk.length, 24000);
    buf.getChannelData(0).set(chunk);
    const src = vs.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(vs.ctx.destination);
    src.onended = () => { vs.playing = false; playAudio(); };
    src.start();
  }

  function stopVoice(onStop) {
    vs.active = false; vs.queue = []; vs.playing = false;
    vs.stream?.getTracks().forEach(t => t.stop()); vs.stream = null;
    vs.proc?.disconnect(); vs.proc = null;
    vs.ctx?.close(); vs.ctx = null;
    vs.session = null;
    if (onStop) onStop();
  }

  // ── SVG icons ───────────────────────────────────────────────────────────────
  const IC = {
    bot:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><path d="M8 15v.01M16 15v.01"/></svg>`,
    x:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    send:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    mic:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0014 0M12 19v3M8 22h8"/></svg>`,
    micOff:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M18.9 10a7 7 0 01-12.77 3.67M5.1 10A7 7 0 0119 10M12 19v3M8 22h8"/><rect x="9" y="2" width="6" height="8" rx="3"/></svg>`,
    expand:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
    collapse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/></svg>`
  };

  // ── CSS ─────────────────────────────────────────────────────────────────────
  const CSS = `
  #aw-root{position:fixed;bottom:24px;right:24px;z-index:2147483647;display:flex;flex-direction:column;align-items:flex-end}
  #aw-root *{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif}

  #aw-btn{width:56px;height:56px;border-radius:50%;background:#10b981;border:none;cursor:pointer;
    display:flex;align-items:center;justify-content:center;color:#0a0a0a;flex-shrink:0;
    box-shadow:0 0 22px rgba(16,185,129,.45),0 4px 20px rgba(0,0,0,.3);
    transition:transform .18s,box-shadow .18s}
  #aw-btn svg{width:22px;height:22px}
  #aw-btn:hover{transform:scale(1.08);box-shadow:0 0 30px rgba(16,185,129,.6),0 4px 24px rgba(0,0,0,.35)}
  #aw-btn:active{transform:scale(.95)}

  #aw-panel{width:380px;height:510px;background:#0d0d0d;border:1px solid rgba(255,255,255,.1);
    border-radius:20px;overflow:hidden;display:flex;flex-direction:column;
    margin-bottom:12px;box-shadow:0 24px 60px rgba(0,0,0,.55);
    transform-origin:bottom right;animation:awPop .22s cubic-bezier(.34,1.56,.64,1)}
  #aw-panel.aw-expanded{width:min(82vw,820px);height:82vh}
  #aw-panel.aw-hidden{display:none}
  @keyframes awPop{from{opacity:0;transform:scale(.9) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}

  #aw-head{background:rgba(16,185,129,.08);border-bottom:1px solid rgba(255,255,255,.08);
    padding:13px 14px;display:flex;align-items:center;gap:10px;flex-shrink:0}
  .aw-av{width:34px;height:34px;border-radius:50%;background:#10b981;
    display:flex;align-items:center;justify-content:center;color:#0a0a0a;flex-shrink:0;
    box-shadow:0 0 12px rgba(16,185,129,.5)}
  .aw-av svg{width:18px;height:18px}
  .aw-info{flex:1;min-width:0}
  .aw-name{font-size:13px;font-weight:700;color:#fff}
  .aw-status{display:flex;align-items:center;gap:5px;margin-top:2px}
  .aw-dot{width:6px;height:6px;border-radius:50%;background:#10b981;animation:awPulse 2s infinite}
  @keyframes awPulse{0%,100%{opacity:1}50%{opacity:.35}}
  .aw-online{font-size:10px;color:#10b981;font-family:monospace;text-transform:uppercase;letter-spacing:.08em}
  .aw-acts{display:flex;gap:3px;flex-shrink:0}
  .aw-ic{width:28px;height:28px;border-radius:7px;border:none;background:transparent;cursor:pointer;
    display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.45);
    transition:background .15s,color .15s}
  .aw-ic svg{width:15px;height:15px}
  .aw-ic:hover{background:rgba(255,255,255,.1);color:#fff}
  .aw-ic.aw-voice-on{background:#10b981;color:#0a0a0a}

  #aw-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;
    scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.1) transparent}
  #aw-msgs::-webkit-scrollbar{width:3px}
  #aw-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px}

  .aw-msg{display:flex;animation:awMsg .18s ease}
  @keyframes awMsg{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  .aw-msg.u{justify-content:flex-end}
  .aw-msg.a{justify-content:flex-start}
  .aw-bub{max-width:86%;padding:9px 13px;border-radius:15px;font-size:13.5px;line-height:1.6}
  .aw-msg.u .aw-bub{background:#10b981;color:#0a0a0a;font-weight:500;border-bottom-right-radius:3px}
  .aw-msg.a .aw-bub{background:rgba(255,255,255,.08);color:rgba(255,255,255,.9);border:1px solid rgba(255,255,255,.06);border-bottom-left-radius:3px}

  .aw-loading{display:flex;gap:5px;align-items:center;padding:11px 13px;
    background:rgba(255,255,255,.08);border-radius:15px;border:1px solid rgba(255,255,255,.06)}
  .aw-loading span{width:6px;height:6px;border-radius:50%;background:#10b981;animation:awBounce 1.1s ease infinite}
  .aw-loading span:nth-child(2){animation-delay:.18s}
  .aw-loading span:nth-child(3){animation-delay:.36s}
  @keyframes awBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}

  #aw-foot{border-top:1px solid rgba(255,255,255,.08);padding:11px 13px 9px;background:rgba(255,255,255,.025);flex-shrink:0}

  #aw-voice-ui{display:none;flex-direction:column;align-items:center;gap:9px;padding:10px 0 4px}
  #aw-voice-ui.show{display:flex}
  .aw-vring{position:relative;width:62px;height:62px;display:flex;align-items:center;justify-content:center}
  .aw-vring::before{content:'';position:absolute;inset:0;border-radius:50%;background:rgba(16,185,129,.2);animation:awRing 1.4s ease infinite}
  @keyframes awRing{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.55);opacity:0}}
  .aw-vcore{width:62px;height:62px;border-radius:50%;background:#10b981;
    display:flex;align-items:center;justify-content:center;color:#0a0a0a;
    position:relative;z-index:1;box-shadow:0 0 22px rgba(16,185,129,.5)}
  .aw-vcore svg{width:28px;height:28px}
  .aw-vlabel{font-size:12px;font-weight:700;color:#10b981}
  .aw-vsub{font-size:10px;color:rgba(255,255,255,.3);font-family:monospace;text-transform:uppercase;letter-spacing:.06em}
  #aw-vswitch{font-size:11px;color:rgba(255,255,255,.35);background:none;border:none;cursor:pointer;
    text-decoration:underline;text-underline-offset:3px;transition:color .15s}
  #aw-vswitch:hover{color:rgba(255,255,255,.7)}

  #aw-row{position:relative}
  #aw-inp{width:100%;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);
    border-radius:11px;padding:11px 44px 11px 13px;font-size:13.5px;color:#fff;outline:none;
    transition:border-color .2s}
  #aw-inp::placeholder{color:rgba(255,255,255,.28)}
  #aw-inp:focus{border-color:rgba(16,185,129,.5)}
  #aw-send{position:absolute;right:7px;top:50%;transform:translateY(-50%);
    width:30px;height:30px;border-radius:8px;background:#10b981;border:none;cursor:pointer;
    display:flex;align-items:center;justify-content:center;color:#0a0a0a;
    transition:transform .15s,opacity .15s}
  #aw-send svg{width:14px;height:14px}
  #aw-send:hover{transform:translateY(-50%) scale(1.1)}
  #aw-send:disabled{opacity:.35;cursor:not-allowed;transform:translateY(-50%)}
  #aw-credit{font-size:10px;color:rgba(255,255,255,.18);text-align:center;
    margin-top:7px;font-family:monospace;text-transform:uppercase;letter-spacing:.07em}
  `;

  // ── Build & mount ────────────────────────────────────────────────────────────
  function mount() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const root = document.createElement('div');
    root.id = 'aw-root';
    root.innerHTML = `
      <div id="aw-panel" class="aw-hidden">
        <div id="aw-head">
          <div class="aw-av">${IC.bot}</div>
          <div class="aw-info">
            <div class="aw-name">Arikon AI Specialist</div>
            <div class="aw-status"><span class="aw-dot"></span><span class="aw-online">Online</span></div>
          </div>
          <div class="aw-acts">
            <button class="aw-ic" id="aw-voice" title="Voice Mode">${IC.micOff}</button>
            <button class="aw-ic" id="aw-exp" title="Expand">${IC.expand}</button>
            <button class="aw-ic" id="aw-cls">${IC.x}</button>
          </div>
        </div>
        <div id="aw-msgs"></div>
        <div id="aw-foot">
          <div id="aw-voice-ui">
            <div class="aw-vring"><div class="aw-vcore">${IC.mic}</div></div>
            <div class="aw-vlabel">Listening…</div>
            <div class="aw-vsub">Speak now to interact with Arikon AI</div>
            <button id="aw-vswitch">Switch to Text Mode</button>
          </div>
          <div id="aw-row">
            <input id="aw-inp" type="text" placeholder="Ask about AI automation…" autocomplete="off"/>
            <button id="aw-send" disabled>${IC.send}</button>
          </div>
          <div id="aw-credit">Powered by Arikon AI · 0.4s Response Engine</div>
        </div>
      </div>
      <button id="aw-btn" aria-label="Open Arikon AI chat">${IC.bot}</button>
    `;
    document.body.appendChild(root);

    // ── refs
    const panel  = root.querySelector('#aw-panel');
    const btn    = root.querySelector('#aw-btn');
    const cls    = root.querySelector('#aw-cls');
    const exp    = root.querySelector('#aw-exp');
    const voice  = root.querySelector('#aw-voice');
    const vui    = root.querySelector('#aw-voice-ui');
    const vsw    = root.querySelector('#aw-vswitch');
    const row    = root.querySelector('#aw-row');
    const inp    = root.querySelector('#aw-inp');
    const send   = root.querySelector('#aw-send');
    const msgs   = root.querySelector('#aw-msgs');

    let open = false, expanded = false, voiceOn = false, loading = false;

    // open/close helpers
    const openPanel = () => {
      open = true;
      panel.classList.remove('aw-hidden');
      panel.style.animation = 'none';
      requestAnimationFrame(() => panel.style.animation = '');
      btn.innerHTML = IC.x;
      setTimeout(() => inp.focus(), 80);
    };
    const closePanel = () => {
      open = false;
      panel.classList.add('aw-hidden');
      btn.innerHTML = IC.bot;
      if (voiceOn) deactivateVoice();
    };

    btn.addEventListener('click', () => open ? closePanel() : openPanel());
    cls.addEventListener('click', closePanel);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) closePanel(); });

    // expand
    exp.addEventListener('click', () => {
      expanded = !expanded;
      panel.classList.toggle('aw-expanded', expanded);
      exp.innerHTML = expanded ? IC.collapse : IC.expand;
    });

    // message helpers
    const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
    const addMsg = (role, text) => {
      const d = document.createElement('div');
      d.className = `aw-msg ${role === 'user' ? 'u' : 'a'}`;
      d.innerHTML = `<div class="aw-bub">${esc(text)}</div>`;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
    };
    const showLoader = () => {
      const d = document.createElement('div');
      d.className = 'aw-msg a'; d.id = 'aw-loader';
      d.innerHTML = `<div class="aw-loading"><span></span><span></span><span></span></div>`;
      msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
    };
    const hideLoader = () => { document.getElementById('aw-loader')?.remove(); };

    // greeting
    addMsg('assistant', "Hi! Thanks for visiting Arikon. I'm the Arikon AI Specialist. We help teams stop losing leads to slow response times. Are you looking to automate your Real Estate appraisal flow, or are you interested in custom AI for a different industry?");

    // send
    const doSend = async () => {
      const text = inp.value.trim();
      if (!text || loading) return;
      inp.value = ''; send.disabled = true; loading = true;
      addMsg('user', text);
      showLoader();
      try {
        const reply = await sendToGemini(text);
        hideLoader(); addMsg('assistant', reply);
      } catch {
        hideLoader(); addMsg('assistant', "Connection issue — please email arikonptyltd@gmail.com or try again.");
      }
      loading = false;
    };

    inp.addEventListener('input', () => { send.disabled = inp.value.trim().length === 0; });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); } });
    send.addEventListener('click', doSend);

    // voice
    const activateVoice = () => {
      voiceOn = true;
      voice.innerHTML = IC.mic; voice.classList.add('aw-voice-on');
      vui.classList.add('show'); row.style.display = 'none';
      startVoice(deactivateVoice);
    };
    const deactivateVoice = () => {
      voiceOn = false;
      voice.innerHTML = IC.micOff; voice.classList.remove('aw-voice-on');
      vui.classList.remove('show'); row.style.display = '';
      stopVoice(null);
    };

    voice.addEventListener('click', () => voiceOn ? deactivateVoice() : activateVoice());
    vsw.addEventListener('click', deactivateVoice);
  }

  // boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
