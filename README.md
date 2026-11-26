# 🎷 Circle of Fifths Trainer — Saxophone Edition (Hebrew RTL)

A clean, responsive, dark-mode web application in **Hebrew (RTL)** for practicing the **Circle of Fifths**, key signatures (sharps & flats), and Major/Relative Minor scales — tailored specifically for saxophone players.

🔗 **Live App:** https://mmoriya2736.github.io/sax-circle-of-fifths/

---

## ✨ Features

### 1. Three Interactive Quiz Modes (or All Mixed)
- **Identify Scale from Key Signature:** Prompts for a Major or Minor scale given its exact number of sharps (`♯`) or flats (`♭`) (0–6), with a full clickable grid covering all 13 Major scales, 13 Minor scales, or all 26 scales (including `F♯`/`G♭` and `D♯m`/`E♭m`).
- **Reverse Mode — Identify Key Signature Count:** Names a specific Major or Minor scale and asks how many sharps or flats it contains using a 13-button signature grid (`0`, `1♯–6♯`, `1♭–6♭`).
- **Visual Circle of Fifths Mode:** Highlights a blank slice on an interactive SVG Circle of Fifths (outer Major ring or inner Relative Minor ring).
- **All Mixed (Default):** Randomly alternates across all three question styles.

### 2. Saxophone-Focused Practice Tools
- **Saxophone Transposition Helper:** Optional toggle displaying transposed written keys after each answer for **E♭ Alto / Baritone Sax** or **B♭ Tenor / Soprano Sax**.
- **Anti-Muscle-Memory Button Sorting:** Defaults to **Chromatic order** so you learn the key signatures rather than spatial button positions, with an optional toggle to sort by Circle of Fifths order.
- **Hebrew Note Subtitles Toggle:** Show or hide Hebrew note names (`דו`, `רה`, `מי`, etc.) alongside standard LTR international scale notation (`C`, `F♯`, `E♭m`).
- **Full Circle & Cheat Sheet Modal:** Quick-reference modal with both the complete labeled Circle of Fifths diagram and a full 13-Major / 13-Minor key signature table (0–6 sharps/flats).

### 3. Smart Learning, Audio & Mobile Support
- **Spaced-Repetition Bias:** Scales you miss appear more frequently until answered correctly twice in a row.
- **Zero-Backend Persistence (`localStorage`):** Tracks current streak, best streak, session accuracy, average response time, and weak keys locally in your browser.
- **Ad-Free Local MP3 Background Player:** Loops 5 romantic saxophone tracks from `public/audio/track1.mp3`–`track5.mp3` with volume control and track switching.
- **Quiz Sound Effects (Cheer / Boo):** Built-in Web Audio API cheer and boo sound effects with gentle music ducking and an independent mute toggle.
- **Mobile Home-Screen Friendly (PWA-lite):** Includes `manifest.json` and SVG favicon so it can be added to your phone's home screen.

---

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Build the static production bundle (`dist/`):

```bash
npm run build
```

---

## 📁 Background Music Files (MP3)

Place up to 5 local MP3 files in `public/audio/` for ad-free background playback:
- `public/audio/track1.mp3`
- `public/audio/track2.mp3`
- `public/audio/track3.mp3`
- `public/audio/track4.mp3`
- `public/audio/track5.mp3`

---

## 🚀 Tech Stack
- **React + Vite + Tailwind CSS**
- **Web Audio API** (self-contained SFX engine)
- **GitHub Pages** (automatic deployment via GitHub Actions)
