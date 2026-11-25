/**
 * Track manifest & audio ducking bridge for Angelo Torres Romantic Saxophone Player.
 * Supports:
 * 1. Primary Mode: Local MP3 files in ./audio/track1.mp3 .. track5.mp3 (HTML5 <audio>)
 * 2. Automatic Fallback Mode: YouTube IFrame Player API (video ID: ng2Ua9bk1Pg) with 5 chapter timestamps
 */

export const YOUTUBE_VIDEO_ID = 'ng2Ua9bk1Pg';

export const ROMANTIC_SAX_TRACKS = [
  {
    id: 'track-1',
    name: 'קטע 1 - I Miss You (פתיחה רומנטית)',
    shortName: '1 · I Miss You',
    file: './audio/track1.mp3',
    startSeconds: 0,
  },
  {
    id: 'track-2',
    name: 'קטע 2 - בלדת סקסופון שקטה',
    shortName: '2 · בלדת סקסופון שקטה',
    file: './audio/track2.mp3',
    startSeconds: 435,
  },
  {
    id: 'track-3',
    name: 'קטע 3 - קלאסיקה אינסטרומנטלית',
    shortName: '3 · קלאסיקה אינסטרומנטלית',
    file: './audio/track3.mp3',
    startSeconds: 1120,
  },
  {
    id: 'track-4',
    name: 'קטע 4 - סקסופון ערב רומנטי',
    shortName: '4 · סקסופון ערב רומנטי',
    file: './audio/track4.mp3',
    startSeconds: 2010,
  },
  {
    id: 'track-5',
    name: 'קטע 5 - סולו טנור רגוע',
    shortName: '5 · סולו טנור רגוע',
    file: './audio/track5.mp3',
    startSeconds: 3150,
  },
];

// Lightweight bridge so App.jsx SFX can gently duck whichever player (HTML5 or YouTube) is active
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
