/* ARIKON — script.js */
(function () {
  'use strict';

  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');
  var header = document.getElementById('header');

  /* --- HAMBURGER --- */
  function openMenu() {
    nav.classList.add('nav--open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('nav--open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    nav.classList.contains('nav--open') ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (nav.classList.contains('nav--open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  /* --- HEADER SHADOW ON SCROLL --- */
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  /* --- ACTIVE NAV --- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', function () {
    var current = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 90) current = s.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* --- SMOOTH SCROLL with header offset --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var offset = header ? header.offsetHeight + 12 : 76;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* --- FORM --- */
  var form = document.getElementById('contact-form');
  var successMsg = document.getElementById('form-success');

  function val(id) { return (document.getElementById(id) || {}).value || ''; }
  function field(id) { return document.getElementById(id); }

  function showErr(id, msg) {
    var el = field(id);
    var err = document.getElementById(id + '-error');
    if (el) el.classList.add('error');
    if (err) err.textContent = msg;
  }
  function clearErr(id) {
    var el = field(id);
    var err = document.getElementById(id + '-error');
    if (el) el.classList.remove('error');
    if (err) err.textContent = '';
  }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }

  // Live blur validation
  ['fullName', 'company', 'email', 'phone'].forEach(function (id) {
    var el = field(id);
    if (!el) return;
    el.addEventListener('blur', function () {
      if (!el.dataset.touched) return;
      if (!el.value.trim()) {
        showErr(id, 'This field is required.');
      } else if (id === 'email' && !isEmail(el.value)) {
        showErr('email', 'Please enter a valid email.');
      } else {
        clearErr(id);
      }
    });
    el.addEventListener('input', function () {
      if (el.dataset.touched) clearErr(id);
    });
    el.addEventListener('blur', function () { el.dataset.touched = '1'; }, { once: true });
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {
        name: val('fullName'),
        company: val('company'),
        email: val('email'),
        phone: val('phone'),
        message: val('message')
      };

      // Mark all touched
      ['fullName', 'company', 'email', 'phone'].forEach(function (id) {
        var el = field(id);
        if (el) el.dataset.touched = '1';
      });

      var ok = true;
      if (!data.name.trim())    { showErr('fullName', 'Full name is required.'); ok = false; } else clearErr('fullName');
      if (!data.company.trim()) { showErr('company', 'Company is required.'); ok = false; } else clearErr('company');
      if (!data.email.trim())   { showErr('email', 'Email is required.'); ok = false; }
      else if (!isEmail(data.email)) { showErr('email', 'Please enter a valid email.'); ok = false; }
      else clearErr('email');
      if (!data.phone.trim())   { showErr('phone', 'Phone is required.'); ok = false; } else clearErr('phone');

      if (!ok) {
        var first = form.querySelector('.form__input.error, .form__textarea.error');
        if (first) first.focus();
        return;
      }

      // Submit to Formspree
      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending&hellip;';

      fetch('https://formspree.io/f/xgolzdag', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        if (res.ok) {
          form.hidden = true;
          successMsg.hidden = false;
        } else {
          throw new Error('Server error');
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        alert('Something went wrong. Please email us directly at arikonptyltd@gmail.com');
      });
    });
  }

})();
