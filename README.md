# Pump.co — Azure Billing Export Guide

Interactive step-by-step guide for prospects to export Azure billing data for a Pump savings estimate.

## Features

- ✅ Interactive checklist — check off each setup step
- 📦 4 CSV file trackers — mark each download complete
- 📊 Live progress bar across all steps
- 📋 One-click copy of a forwardable email template
- 🔗 Direct mailto / tel links to David Frankle

## Deploy to Vercel (2 minutes)

### Option A — Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**

That's it. No environment variables needed.

## Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Customize

| What | Where |
|------|-------|
| Contact info (email / phone) | `pages/index.js` → `contactGrid` section |
| Setup steps | `pages/index.js` → `SETUP_STEPS` array |
| CSV files | `pages/index.js` → `CSV_FILES` array |
| Colors / theme | `styles/globals.css` → `:root` variables |
| Email template | `pages/index.js` → `copyEmail` function |

## Tech stack

- Next.js 14 (Pages Router)
- Zero dependencies beyond React + Next
- CSS-in-JS via inline style objects
- Google Fonts (Syne + DM Sans)
