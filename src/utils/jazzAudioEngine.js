/**
 * Ad-free Local MP3 Track Manifest & Audio Ducking Bridge.
 * Plays exclusively from ./audio/track1.mp3 .. track5.mp3 (GitHub Pages compatible relative paths).
 */

export const ROMANTIC_SAX_TRACKS = [
  {
    id: 'track-1',
    name: 'שיר 1 - I Miss You (סקסופון רומנטי)',
    shortName: 'שיר 1 · I Miss You',
    file: './audio/track1.mp3',
  },
  {
    id: 'track-2',
    name: 'שיר 2 - בלדת סקסופון שקטה',
    shortName: 'שיר 2 · בלדה שקטה',
    file: './audio/track2.mp3',
  },
  {
    id: 'track-3',
    name: 'שיר 3 - מנגינת סקסופון קלאסית',
    shortName: 'שיר 3 · קלאסית',
    file: './audio/track3.mp3',
  },
  {
    id: 'track-4',
    name: 'שיר 4 - סולו טנור רגוע',
    shortName: 'שיר 4 · סולו טנור',
    file: './audio/track4.mp3',
  },
  {
    id: 'track-5',
    name: 'שיר 5 - סקסופון ערב רומנטי',
    shortName: 'שיר 5 · ערב רומנטי',
    file: './audio/track5.mp3',
  },
];

// Lightweight bridge so App.jsx SFX can gently duck the HTML5 audio player
class AudioDuckBridge {
  constructor() {
    this.duckHandler = null;
  }

  registerDuckHandler(fn) {
    this.duckHandler = fn;
    return () => {
      if (this.duckHandler === fn) {
        this.duckHandler = null;
      }
    };
  }

  duckBriefly(durationMs = 950) {
    if (typeof this.duckHandler === 'function') {
      this.duckHandler(durationMs);
    }
  }
}

export const jazzAudioEngine = new AudioDuckBridge();
