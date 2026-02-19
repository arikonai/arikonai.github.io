# ARIKON — Website

AI Automation for Modern Business · [arikonptyltd@gmail.com](mailto:arikonptyltd@gmail.com)

---

## Folder Structure

```
arikon/
├── index.html          # Main single-page website
├── styles.css          # All styles (mobile-first, responsive)
├── script.js           # Hamburger menu, form validation, mailto
├── assets/
│   └── logo.png        # ARIKON logo
└── README.md
```

---

## GitHub Pages Deployment

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**
3. Name it `arikon-website` (or your preferred name)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload Files

**Option A — GitHub Web UI (easiest):**
1. On your new repo page, click **Add file → Upload files**
2. Drag and drop all files and the `assets/` folder
3. Click **Commit changes**

**Option B — Git CLI:**
```bash
cd /path/to/arikon
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/arikon-website.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings**
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Set branch to **main**, folder to **/ (root)**
5. Click **Save**

### Step 4 — Access Your Site

After 1–2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/arikon-website/
```

---

## Custom Domain (Optional)

1. In **Settings → Pages**, enter your custom domain (e.g. `arikon.com.au`)
2. Create a CNAME file in your repo root with the domain name
3. Update your DNS provider with a CNAME record pointing to `YOUR_USERNAME.github.io`

---

## Form Behavior

Since GitHub Pages is static (no server), the "Book a Call" form uses **mailto:** to:
- Validate all required fields in the browser
- Open the user's default email client with a pre-filled message to `arikonptyltd@gmail.com`
- Show a confirmation message after submission

**Note:** If the mailto link doesn't open automatically, users can email directly at arikonptyltd@gmail.com.

---

## Responsiveness Checklist

### Mobile (320px–480px)
- [ ] Header shows hamburger menu, not nav links
- [ ] Hamburger opens a full-width slide-down nav
- [ ] All buttons are at least 44px tap target
- [ ] Hero headline wraps cleanly, no overflow
- [ ] Trust row wraps gracefully
- [ ] Solution cards stack in a single column
- [ ] Steps stack vertically with connector rotated
- [ ] Industry cards: 1-column below 480px, 2-column at 480px+
- [ ] Contact form is full-width, inputs 48px tall
- [ ] No horizontal scroll at any point

### Tablet (768px–1024px)
- [ ] Navigation is visible in header (not hamburger)
- [ ] "Book a Call" button appears in header
- [ ] Solution cards: 2-column grid
- [ ] Steps display horizontally with arrow connectors
- [ ] Industry cards: 2–3 column grid
- [ ] About section: side-by-side layout
- [ ] Contact section: two-column (intro + form)
- [ ] Footer: brand left, nav right

### Desktop (1280px+)
- [ ] Solution cards: 4-column grid
- [ ] Industry cards: 5-column grid
- [ ] Hero headline spans full intended width
- [ ] Max container width (1200px) maintained with padding
- [ ] Large whitespace sections breathe as intended
- [ ] About visual float cards animate correctly
- [ ] Hover states on all interactive elements work

### Cross-Browser
- [ ] Chrome / Edge
- [ ] Safari (including iOS Safari)
- [ ] Firefox
- [ ] Lighthouse Performance score > 90

---

## Updating Content

- **Logo:** Replace `assets/logo.png` (keep the filename)
- **Contact email:** Search for `arikonptyltd@gmail.com` in `index.html` and `script.js`
- **Sections:** All sections in `index.html` with corresponding IDs
- **Colors:** CSS variables at the top of `styles.css` under `:root`
