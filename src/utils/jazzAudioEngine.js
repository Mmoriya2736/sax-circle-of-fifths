/**
 * Self-contained Web Audio API Ibiza Deep House & Nu-Jazz Saxophone Engine.
 * 100% offline, zero external audio URLs, CORS-free for GitHub Pages.
 * Features:
 * - Expressive Saxophone Lead (reed harmonics, breath transient, pitch scoop, vibrato)
 * - Stereo Ping-Pong Delay bus for Ibiza beach-club space
 * - Four-on-the-floor electronic house kick, 909-style layered claps, off-beat hats
 * - Sidechain-pumping synth pads / Rhodes chords & deep sub-basslines
 */

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export const JAZZ_TRACKS = [
  {
    id: 'ibiza-sunset',
    name: 'איביזה סאנסט',
    subtitle: 'Ibiza Sunset House · 122 BPM',
    bpm: 122,
    style: 'ibiza',
    bars: [
      {
        // Am9 uplifting Ibiza progression
        pad: [57, 60, 64, 67, 71],
        bass: [
          { beat: 0.0, midi: 45, dur: 0.45 },
          { beat: 0.75, midi: 45, dur: 0.35 },
          { beat: 1.5, midi: 52, dur: 0.45 },
          { beat: 2.25, midi: 45, dur: 0.35 },
          { beat: 3.0, midi: 48, dur: 0.45 },
          { beat: 3.5, midi: 47, dur: 0.4 },
        ],
        melody: [
          { beat: 0.0, midi: 69, dur: 0.65, vel: 0.88, scoop: true },
          { beat: 0.75, midi: 72, dur: 0.65, vel: 0.92, scoop: true },
          { beat: 1.5, midi: 76, dur: 0.9, vel: 0.95, scoop: true },
          { beat: 2.5, midi: 74, dur: 0.45, vel: 0.82 },
          { beat: 3.0, midi: 72, dur: 0.75, vel: 0.86 },
        ],
      },
      {
        // Fmaj9
        pad: [53, 57, 60, 64, 67],
        bass: [
          { beat: 0.0, midi: 41, dur: 0.45 },
          { beat: 0.75, midi: 41, dur: 0.35 },
          { beat: 1.5, midi: 48, dur: 0.45 },
          { beat: 2.25, midi: 41, dur: 0.35 },
          { beat: 3.0, midi: 45, dur: 0.45 },
          { beat: 3.5, midi: 43, dur: 0.4 },
        ],
        melody: [
          { beat: 0.0, midi: 69, dur: 0.9, vel: 0.88, scoop: true },
          { beat: 1.0, midi: 67, dur: 0.45, vel: 0.8 },
          { beat: 1.5, midi: 69, dur: 0.65, vel: 0.86 },
          { beat: 2.25, midi: 72, dur: 0.85, vel: 0.92, scoop: true },
          { beat: 3.25, midi: 69, dur: 0.6, vel: 0.82 },
        ],
      },
      {
        // Cmaj9
        pad: [52, 55, 59, 62, 67],
        bass: [
          { beat: 0.0, midi: 36, dur: 0.45 },
          { beat: 0.75, midi: 36, dur: 0.35 },
          { beat: 1.5, midi: 43, dur: 0.45 },
          { beat: 2.25, midi: 48, dur: 0.4 },
          { beat: 3.0, midi: 43, dur: 0.45 },
          { beat: 3.5, midi: 40, dur: 0.4 },
        ],
        melody: [
          { beat: 0.0, midi: 72, dur: 0.65, vel: 0.9, scoop: true },
          { beat: 0.75, midi: 74, dur: 0.65, vel: 0.92, scoop: true },
          { beat: 1.5, midi: 76, dur: 0.85, vel: 0.96, scoop: true },
          { beat: 2.5, midi: 79, dur: 0.65, vel: 0.94, scoop: true },
          { beat: 3.25, midi: 76, dur: 0.65, vel: 0.84 },
        ],
      },
      {
        // G6/9
        pad: [55, 59, 62, 64, 69],
        bass: [
          { beat: 0.0, midi: 43, dur: 0.45 },
          { beat: 0.75, midi: 43, dur: 0.35 },
          { beat: 1.5, midi: 47, dur: 0.45 },
          { beat: 2.25, midi: 50, dur: 0.4 },
          { beat: 3.0, midi: 47, dur: 0.45 },
          { beat: 3.5, midi: 43, dur: 0.4 },
        ],
        melody: [
          { beat: 0.0, midi: 74, dur: 0.85, vel: 0.88, scoop: true },
          { beat: 1.0, midi: 72, dur: 0.45, vel: 0.82 },
          { beat: 1.5, midi: 71, dur: 0.7, vel: 0.86 },
          { beat: 2.5, midi: 69, dur: 0.5, vel: 0.82 },
          { beat: 3.0, midi: 67, dur: 0.85, vel: 0.86 },
        ],
      },
    ],
  },
  {
    id: 'tropical-beach',
    name: 'מסיבת חוף',
    subtitle: 'Tropical Sax Groove · 120 BPM',
    bpm: 120,
    style: 'tropical',
    bars: [
      {
        // Dm9 sunny tropical house
        pad: [53, 57, 60, 64],
        bass: [
          { beat: 0.0, midi: 38, dur: 0.5 },
          { beat: 0.75, midi: 45, dur: 0.4 },
          { beat: 1.5, midi: 38, dur: 0.45 },
          { beat: 2.5, midi: 45, dur: 0.45 },
          { beat: 3.25, midi: 48, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 69, dur: 0.32, vel: 0.86 },
          { beat: 0.5, midi: 72, dur: 0.32, vel: 0.88 },
          { beat: 1.0, midi: 74, dur: 0.45, vel: 0.92, scoop: true },
          { beat: 1.75, midi: 72, dur: 0.32, vel: 0.82 },
          { beat: 2.25, midi: 69, dur: 0.35, vel: 0.84 },
          { beat: 2.75, midi: 67, dur: 0.45, vel: 0.86 },
          { beat: 3.5, midi: 69, dur: 0.4, vel: 0.88, scoop: true },
        ],
      },
      {
        // G13
        pad: [53, 57, 59, 64],
        bass: [
          { beat: 0.0, midi: 43, dur: 0.5 },
          { beat: 0.75, midi: 47, dur: 0.4 },
          { beat: 1.5, midi: 43, dur: 0.45 },
          { beat: 2.5, midi: 50, dur: 0.45 },
          { beat: 3.25, midi: 47, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 67, dur: 0.35, vel: 0.84 },
          { beat: 0.5, midi: 71, dur: 0.35, vel: 0.88 },
          { beat: 1.0, midi: 74, dur: 0.55, vel: 0.92, scoop: true },
          { beat: 1.75, midi: 76, dur: 0.5, vel: 0.94, scoop: true },
          { beat: 2.5, midi: 74, dur: 0.4, vel: 0.84 },
          { beat: 3.0, midi: 71, dur: 0.65, vel: 0.86 },
        ],
      },
      {
        // Cmaj9
        pad: [52, 55, 59, 62],
        bass: [
          { beat: 0.0, midi: 36, dur: 0.5 },
          { beat: 0.75, midi: 43, dur: 0.4 },
          { beat: 1.5, midi: 36, dur: 0.45 },
          { beat: 2.5, midi: 43, dur: 0.45 },
          { beat: 3.25, midi: 47, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 72, dur: 0.35, vel: 0.88 },
          { beat: 0.5, midi: 76, dur: 0.45, vel: 0.92, scoop: true },
          { beat: 1.25, midi: 74, dur: 0.35, vel: 0.84 },
          { beat: 1.75, midi: 72, dur: 0.45, vel: 0.86 },
          { beat: 2.5, midi: 69, dur: 0.4, vel: 0.82 },
          { beat: 3.0, midi: 67, dur: 0.65, vel: 0.85 },
        ],
      },
      {
        // Am9
        pad: [55, 57, 60, 64],
        bass: [
          { beat: 0.0, midi: 45, dur: 0.5 },
          { beat: 0.75, midi: 48, dur: 0.4 },
          { beat: 1.5, midi: 45, dur: 0.45 },
          { beat: 2.5, midi: 43, dur: 0.45 },
          { beat: 3.25, midi: 40, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 69, dur: 0.5, vel: 0.88, scoop: true },
          { beat: 0.75, midi: 72, dur: 0.45, vel: 0.9 },
          { beat: 1.5, midi: 69, dur: 0.4, vel: 0.84 },
          { beat: 2.25, midi: 67, dur: 0.45, vel: 0.82 },
          { beat: 3.0, midi: 64, dur: 0.75, vel: 0.86 },
        ],
      },
    ],
  },
  {
    id: 'deep-club-sax',
    name: 'דיפ האוס לילה',
    subtitle: 'Deep Club Sax · 124 BPM',
    bpm: 124,
    style: 'deep',
    bars: [
      {
        // Gm9 nocturnal driving club bass
        pad: [53, 55, 58, 62, 65],
        bass: [
          { beat: 0.0, midi: 43, dur: 0.4 },
          { beat: 0.5, midi: 43, dur: 0.3 },
          { beat: 1.25, midi: 46, dur: 0.4 },
          { beat: 2.0, midi: 43, dur: 0.4 },
          { beat: 2.75, midi: 41, dur: 0.35 },
          { beat: 3.5, midi: 43, dur: 0.4 },
        ],
        melody: [
          { beat: 0.5, midi: 62, dur: 0.95, vel: 0.86, scoop: true },
          { beat: 1.75, midi: 65, dur: 0.65, vel: 0.9, scoop: true },
          { beat: 2.5, midi: 67, dur: 1.15, vel: 0.92, scoop: true },
        ],
      },
      {
        // Ebmaj9
        pad: [51, 55, 58, 62, 65],
        bass: [
          { beat: 0.0, midi: 39, dur: 0.4 },
          { beat: 0.5, midi: 39, dur: 0.3 },
          { beat: 1.25, midi: 43, dur: 0.4 },
          { beat: 2.0, midi: 39, dur: 0.4 },
          { beat: 2.75, midi: 46, dur: 0.35 },
          { beat: 3.5, midi: 43, dur: 0.4 },
        ],
        melody: [
          { beat: 0.25, midi: 65, dur: 0.85, vel: 0.86, scoop: true },
          { beat: 1.5, midi: 62, dur: 0.7, vel: 0.82 },
          { beat: 2.5, midi: 58, dur: 1.15, vel: 0.88, scoop: true },
        ],
      },
      {
        // Cm9
        pad: [51, 55, 58, 62],
        bass: [
          { beat: 0.0, midi: 36, dur: 0.4 },
          { beat: 0.5, midi: 36, dur: 0.3 },
          { beat: 1.25, midi: 43, dur: 0.4 },
          { beat: 2.0, midi: 36, dur: 0.4 },
          { beat: 2.75, midi: 39, dur: 0.35 },
          { beat: 3.5, midi: 43, dur: 0.4 },
        ],
        melody: [
          { beat: 0.0, midi: 60, dur: 0.7, vel: 0.84, scoop: true },
          { beat: 1.0, midi: 62, dur: 0.6, vel: 0.86 },
          { beat: 1.75, midi: 63, dur: 0.8, vel: 0.92, scoop: true },
          { beat: 2.75, midi: 65, dur: 0.9, vel: 0.9, scoop: true },
        ],
      },
      {
        // D7sus4 -> D7
        pad: [54, 57, 60, 64],
        bass: [
          { beat: 0.0, midi: 38, dur: 0.4 },
          { beat: 0.5, midi: 38, dur: 0.3 },
          { beat: 1.25, midi: 45, dur: 0.4 },
          { beat: 2.0, midi: 38, dur: 0.4 },
          { beat: 2.75, midi: 42, dur: 0.35 },
          { beat: 3.5, midi: 45, dur: 0.4 },
        ],
        melody: [
          { beat: 0.25, midi: 67, dur: 0.8, vel: 0.9, scoop: true },
          { beat: 1.25, midi: 66, dur: 0.7, vel: 0.86 },
          { beat: 2.25, midi: 62, dur: 1.2, vel: 0.88, scoop: true },
        ],
      },
    ],
  },
  {
    id: 'nujazz-funk',
    name: "פאנקי ג'אז",
    subtitle: 'Nu-Jazz Funk · 108 BPM',
    bpm: 108,
    style: 'funk',
    bars: [
      {
        // Dm7 funky riff
        chords: [
          { beat: 0.5, notes: [53, 57, 60, 64], dur: 0.35 },
          { beat: 1.75, notes: [53, 57, 60, 64], dur: 0.45 },
          { beat: 3.25, notes: [53, 57, 60, 64], dur: 0.35 },
        ],
        bass: [
          { beat: 0, midi: 38, dur: 0.42 },
          { beat: 0.75, midi: 38, dur: 0.32 },
          { beat: 1.5, midi: 45, dur: 0.42 },
          { beat: 2.25, midi: 48, dur: 0.42 },
          { beat: 3.0, midi: 50, dur: 0.45 },
          { beat: 3.5, midi: 48, dur: 0.38 },
        ],
        melody: [
          { beat: 0.0, midi: 62, dur: 0.45, vel: 0.88, scoop: true },
          { beat: 0.5, midi: 65, dur: 0.35, vel: 0.82 },
          { beat: 1.0, midi: 67, dur: 0.45, vel: 0.9, scoop: true },
          { beat: 1.75, midi: 69, dur: 0.65, vel: 0.94, scoop: true },
          { beat: 2.75, midi: 67, dur: 0.35, vel: 0.8 },
          { beat: 3.25, midi: 65, dur: 0.55, vel: 0.86 },
        ],
      },
      {
        // G9 funky answer
        chords: [
          { beat: 0.5, notes: [53, 57, 59, 64], dur: 0.35 },
          { beat: 2.0, notes: [53, 57, 59, 64], dur: 0.45 },
          { beat: 3.5, notes: [53, 57, 59, 64], dur: 0.35 },
        ],
        bass: [
          { beat: 0, midi: 43, dur: 0.42 },
          { beat: 0.75, midi: 43, dur: 0.32 },
          { beat: 1.5, midi: 47, dur: 0.42 },
          { beat: 2.25, midi: 50, dur: 0.42 },
          { beat: 3.0, midi: 53, dur: 0.45 },
          { beat: 3.5, midi: 50, dur: 0.38 },
        ],
        melody: [
          { beat: 0.0, midi: 64, dur: 0.65, vel: 0.88, scoop: true },
          { beat: 1.0, midi: 62, dur: 0.4, vel: 0.8 },
          { beat: 1.5, midi: 60, dur: 0.4, vel: 0.82 },
          { beat: 2.25, midi: 62, dur: 0.5, vel: 0.88, scoop: true },
          { beat: 3.0, midi: 67, dur: 0.75, vel: 0.92, scoop: true },
        ],
      },
    ],
  },
  {
    id: 'upbeat-swing',
    name: "סווינג ג'אז קצבי",
    subtitle: 'Upbeat Jazz Swing · 118 BPM',
    bpm: 118,
    style: 'swing',
    bars: [
      {
        // Fmaj7 walking bass
        chords: [
          { beat: 0.0, notes: [53, 57, 60, 64], dur: 0.6 },
          { beat: 2.66, notes: [53, 57, 60, 64], dur: 0.5 },
        ],
        bass: [
          { beat: 0, midi: 41, dur: 0.85 },
          { beat: 1, midi: 45, dur: 0.85 },
          { beat: 2, midi: 48, dur: 0.85 },
          { beat: 3, midi: 50, dur: 0.85 },
        ],
        melody: [
          { beat: 0.0, midi: 65, dur: 0.6, vel: 0.86, scoop: true },
          { beat: 0.66, midi: 69, dur: 0.4, vel: 0.8 },
          { beat: 1.0, midi: 72, dur: 0.6, vel: 0.9 },
          { beat: 1.66, midi: 70, dur: 0.4, vel: 0.78 },
          { beat: 2.0, midi: 69, dur: 0.85, vel: 0.88, scoop: true },
          { beat: 3.0, midi: 67, dur: 0.65, vel: 0.82 },
        ],
      },
      {
        // D7 -> Gm7
        chords: [
          { beat: 0.66, notes: [54, 57, 60, 63], dur: 0.55 },
          { beat: 2.66, notes: [53, 55, 58, 62], dur: 0.55 },
        ],
        bass: [
          { beat: 0, midi: 50, dur: 0.85 },
          { beat: 1, midi: 48, dur: 0.85 },
          { beat: 2, midi: 46, dur: 0.85 },
          { beat: 3, midi: 45, dur: 0.85 },
        ],
        melody: [
          { beat: 0.0, midi: 66, dur: 0.6, vel: 0.86, scoop: true },
          { beat: 0.66, midi: 69, dur: 0.4, vel: 0.82 },
          { beat: 1.0, midi: 67, dur: 0.6, vel: 0.86 },
          { beat: 1.66, midi: 65, dur: 0.4, vel: 0.8 },
          { beat: 2.0, midi: 62, dur: 0.9, vel: 0.88, scoop: true },
          { beat: 3.33, midi: 65, dur: 0.5, vel: 0.84 },
        ],
      },
      {
        // Gm7
        chords: [
          { beat: 0.0, notes: [53, 55, 58, 62], dur: 0.55 },
          { beat: 2.66, notes: [53, 55, 58, 62], dur: 0.5 },
        ],
        bass: [
          { beat: 0, midi: 43, dur: 0.85 },
          { beat: 1, midi: 46, dur: 0.85 },
          { beat: 2, midi: 50, dur: 0.85 },
          { beat: 3, midi: 49, dur: 0.85 },
        ],
        melody: [
          { beat: 0.0, midi: 67, dur: 0.65, vel: 0.88, scoop: true },
          { beat: 0.66, midi: 70, dur: 0.4, vel: 0.82 },
          { beat: 1.0, midi: 69, dur: 0.6, vel: 0.86 },
          { beat: 1.66, midi: 67, dur: 0.4, vel: 0.78 },
          { beat: 2.0, midi: 65, dur: 0.8, vel: 0.88 },
          { beat: 3.0, midi: 62, dur: 0.7, vel: 0.8 },
        ],
      },
      {
        // C7 turnaround
        chords: [
          { beat: 0.66, notes: [52, 57, 58, 62], dur: 0.55 },
          { beat: 2.66, notes: [52, 56, 58, 61], dur: 0.5 },
        ],
        bass: [
          { beat: 0, midi: 48, dur: 0.85 },
          { beat: 1, midi: 46, dur: 0.85 },
          { beat: 2, midi: 45, dur: 0.85 },
          { beat: 3, midi: 43, dur: 0.85 },
        ],
        melody: [
          { beat: 0.0, midi: 64, dur: 0.6, vel: 0.86, scoop: true },
          { beat: 0.66, midi: 67, dur: 0.4, vel: 0.82 },
          { beat: 1.0, midi: 70, dur: 0.6, vel: 0.9 },
          { beat: 1.66, midi: 69, dur: 0.4, vel: 0.82 },
          { beat: 2.0, midi: 67, dur: 0.7, vel: 0.86 },
          { beat: 3.0, midi: 64, dur: 0.75, vel: 0.84 },
        ],
      },
    ],
  },
];

class JazzAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.pingPongIn = null;
    this.noiseBuffer = null;
    this.isPlaying = false;
    this.trackIndex = 0;
    this.volume = 0.25;
    this.barIndex = 0;
    this.nextBarTime = 0;
    this.schedulerId = null;
  }

  _ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;

      // Stereo Ping-Pong Delay bus (lush Ibiza beach-club echo)
      this.pingPongIn = this.ctx.createGain();
      this.pingPongIn.gain.value = 0.28;

      const delayL = this.ctx.createDelay(1.0);
      const delayR = this.ctx.createDelay(1.0);
      delayL.delayTime.value = 0.246;
      delayR.delayTime.value = 0.246;

      const fbFilter = this.ctx.createBiquadFilter();
      fbFilter.type = 'lowpass';
      fbFilter.frequency.value = 2100;

      const fbGain = this.ctx.createGain();
      fbGain.gain.value = 0.34;

      const wetGain = this.ctx.createGain();
      wetGain.gain.value = 0.72;

      if (typeof this.ctx.createStereoPanner === 'function') {
        const panL = this.ctx.createStereoPanner();
        const panR = this.ctx.createStereoPanner();
        panL.pan.value = -0.65;
        panR.pan.value = 0.65;

        this.pingPongIn.connect(delayL);
        delayL.connect(panL);
        panL.connect(wetGain);

        delayL.connect(delayR);
        delayR.connect(panR);
        panR.connect(wetGain);

        delayR.connect(fbFilter);
        fbFilter.connect(fbGain);
        fbGain.connect(delayL);
      } else {
        this.pingPongIn.connect(delayL);
        delayL.connect(fbFilter);
        fbFilter.connect(fbGain);
        fbGain.connect(delayL);
        fbFilter.connect(wetGain);
      }

      wetGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Noise buffer for hi-hats, claps, breath attack
      const bufSize = Math.floor(this.ctx.sampleRate * 0.5);
      this.noiseBuffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.03);
    }
  }

  setTrack(index) {
    this.trackIndex = ((index % JAZZ_TRACKS.length) + JAZZ_TRACKS.length) % JAZZ_TRACKS.length;
    this.barIndex = 0;
    if (this.isPlaying) {
      this.stop();
      setTimeout(() => this.start(), 60);
    }
  }

  start() {
    this._ensureContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.volume, now);
    this.nextBarTime = now + 0.06;
    this._scheduleLoop();
    this.schedulerId = setInterval(() => this._scheduleLoop(), 140);
  }

  stop() {
    this.isPlaying = false;
    if (this.schedulerId) {
      clearInterval(this.schedulerId);
      this.schedulerId = null;
    }
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.04);
    }
  }

  _scheduleLoop() {
    if (!this.isPlaying || !this.ctx) return;
    const track = JAZZ_TRACKS[this.trackIndex];
    const beatDur = 60 / track.bpm;
    const barDur = beatDur * 4;

    while (this.nextBarTime < this.ctx.currentTime + 0.55) {
      const bar = track.bars[this.barIndex % track.bars.length];
      this._scheduleBar(bar, track.style, this.nextBarTime, beatDur);
      this.nextBarTime += barDur;
      this.barIndex = (this.barIndex + 1) % track.bars.length;
    }
  }

  _scheduleBar(bar, style, barStart, beatDur) {
    const isHouse = style === 'ibiza' || style === 'tropical' || style === 'deep';

    // 1. Drums & House Beat
    this._scheduleDrums(style, barStart, beatDur);

    // 2. Sidechained Synth Pad / Sunny Rhodes Chords
    if (isHouse && bar.pad) {
      this._playSidechainedHousePad(bar.pad, barStart, beatDur, style);
    } else if (bar.chords) {
      bar.chords.forEach((c) => {
        this._playRhodesChord(c.notes, barStart + c.beat * beatDur, c.dur * beatDur);
      });
    }

    // 3. Groovy Sub-Bass / Walking Bass
    bar.bass.forEach((b) => {
      this._playBassNote(b.midi, barStart + b.beat * beatDur, b.dur * beatDur, style);
    });

    // 4. Expressive Saxophone Lead
    bar.melody.forEach((n) => {
      const jitter = (Math.random() - 0.5) * 0.006;
      this._playSaxLead(
        n.midi,
        Math.max(this.ctx.currentTime, barStart + n.beat * beatDur + jitter),
        n.dur * beatDur,
        n.vel || 0.86,
        Boolean(n.scoop),
        style
      );
    });
  }

  _scheduleDrums(style, barStart, beatDur) {
    if (style === 'ibiza' || style === 'tropical' || style === 'deep') {
      // Four-on-the-floor electronic house kick (beats 1, 2, 3, 4)
      for (let b = 0; b < 4; b++) {
        this._playHouseKick(barStart + b * beatDur, style === 'deep' ? 0.34 : 0.3);
      }
      // Crisp off-beat open house hi-hats (beats 0.5, 1.5, 2.5, 3.5)
      for (let b = 0; b < 4; b++) {
        this._playCymbal(barStart + (b + 0.5) * beatDur, 0.095, 0.11, 7800);
        // Subtle 16th ghost hat for forward motion
        this._playCymbal(barStart + (b + 0.25) * beatDur, 0.025, 0.03, 9500);
      }
      // Layered 909-style electronic clap on beats 2 & 4
      this._playHouseClap(barStart + 1 * beatDur, 0.15);
      this._playHouseClap(barStart + 3 * beatDur, 0.15);
    } else if (style === 'funk') {
      // Syncopated Nu-Jazz Funk groove
      for (let i = 0; i < 16; i++) {
        const accent = i % 4 === 0 ? 0.075 : i % 2 === 0 ? 0.045 : 0.024;
        this._playCymbal(barStart + i * 0.25 * beatDur, accent, 0.035, 8800);
      }
      [0, 0.75, 2.25].forEach((b) => this._playHouseKick(barStart + b * beatDur, 0.26));
      [1, 3].forEach((b) => this._playHouseClap(barStart + b * beatDur, 0.13));
    } else {
      // Classic Upbeat Jazz Swing Ride ("ding, ding-a-ding") + hi-hat on 2 & 4
      [0, 1, 1.66, 2, 3, 3.66].forEach((b) => {
        const accent = b === 1 || b === 3 ? 0.1 : 0.065;
        this._playCymbal(barStart + b * beatDur, accent, 0.09, 7500);
      });
      this._playCymbal(barStart + 1 * beatDur, 0.08, 0.045, 9200);
      this._playCymbal(barStart + 3 * beatDur, 0.08, 0.045, 9200);
      this._playHouseKick(barStart, 0.14);
    }
  }

  _playSidechainedHousePad(midiNotes, barStart, beatDur, style) {
    const ctx = this.ctx;
    const barDur = beatDur * 4;
    const padGain = ctx.createGain();
    const baseLevel = style === 'deep' ? 0.068 : 0.078;

    // Authentic 4-on-the-floor sidechain pumping envelope
    padGain.gain.setValueAtTime(baseLevel * 0.18, barStart);
    for (let b = 0; b < 4; b++) {
      const t = barStart + b * beatDur;
      padGain.gain.setValueAtTime(baseLevel * 0.16, t);
      padGain.gain.linearRampToValueAtTime(baseLevel, t + beatDur * 0.45);
      padGain.gain.linearRampToValueAtTime(baseLevel * 0.82, t + beatDur * 0.92);
    }
    padGain.gain.linearRampToValueAtTime(0.0001, barStart + barDur + 0.05);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = style === 'deep' ? 980 : 1450;

    padGain.connect(lp);
    lp.connect(this.masterGain);
    lp.connect(this.pingPongIn);

    midiNotes.forEach((m) => {
      const osc = ctx.createOscillator();
      osc.type = style === 'tropical' ? 'triangle' : 'sine';
      osc.frequency.value = midiToFreq(m);
      osc.connect(padGain);
      osc.start(barStart);
      osc.stop(barStart + barDur + 0.08);
    });
  }

  _playSaxLead(midi, startTime, duration, velocity, scoop, style) {
    const ctx = this.ctx;
    const freq = midiToFreq(midi);

    const oscReed = ctx.createOscillator();
    const oscBody = ctx.createOscillator();
    oscReed.type = 'sawtooth';
    oscBody.type = 'triangle';

    // Expressive pitch-bend scoop into melodic hooks
    const startFreq = scoop ? freq * 0.935 : freq * 0.992;
    const glideTime = scoop ? 0.062 : 0.022;

    oscReed.frequency.setValueAtTime(startFreq, startTime);
    oscReed.frequency.exponentialRampToValueAtTime(freq, startTime + glideTime);
    oscBody.frequency.setValueAtTime(startFreq * 1.002, startTime);
    oscBody.frequency.exponentialRampToValueAtTime(freq * 1.001, startTime + glideTime);

    // Expressive vibrato LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 5.5;
    lfoGain.gain.setValueAtTime(0.01, startTime);
    lfoGain.gain.linearRampToValueAtTime(
      duration > 0.3 ? freq * 0.008 : freq * 0.002,
      startTime + Math.min(0.24, duration * 0.55)
    );
    lfo.connect(lfoGain);
    lfoGain.connect(oscReed.frequency);
    lfoGain.connect(oscBody.frequency);

    // Warm breathy brass formant filter sweep
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = style === 'ibiza' || style === 'tropical' ? 2.8 : 2.3;
    const brightPeak = style === 'ibiza' || style === 'tropical' ? 2400 : 1950;
    filter.frequency.setValueAtTime(620, startTime);
    filter.frequency.exponentialRampToValueAtTime(brightPeak, startTime + 0.07);
    filter.frequency.exponentialRampToValueAtTime(1050, startTime + Math.max(0.12, duration));

    const gain = ctx.createGain();
    const peak = 0.2 * velocity;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + 0.032);
    gain.gain.setValueAtTime(peak * 0.85, startTime + Math.max(0.05, duration - 0.07));
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.05);

    const bodyMix = ctx.createGain();
    bodyMix.gain.value = 0.7;

    oscReed.connect(filter);
    oscBody.connect(bodyMix);
    bodyMix.connect(filter);
    filter.connect(gain);

    gain.connect(this.masterGain);
    gain.connect(this.pingPongIn);

    // Soft breathy reed attack burst
    if (this.noiseBuffer) {
      const breathSrc = ctx.createBufferSource();
      breathSrc.buffer = this.noiseBuffer;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 2500;
      bp.Q.value = 1.6;
      const bGain = ctx.createGain();
      bGain.gain.setValueAtTime(0.025 * velocity, startTime);
      bGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.045);
      breathSrc.connect(bp);
      bp.connect(bGain);
      bGain.connect(this.masterGain);
      breathSrc.start(startTime);
      breathSrc.stop(startTime + 0.055);
    }

    oscReed.start(startTime);
    oscBody.start(startTime);
    lfo.start(startTime);

    const stopAt = startTime + duration + 0.09;
    oscReed.stop(stopAt);
    oscBody.stop(stopAt);
    lfo.stop(stopAt);
  }

  _playRhodesChord(midiNotes, startTime, duration) {
    const ctx = this.ctx;
    const chordGain = ctx.createGain();
    const level = 0.075;
    chordGain.gain.setValueAtTime(0.0001, startTime);
    chordGain.gain.linearRampToValueAtTime(level, startTime + 0.018);
    chordGain.gain.exponentialRampToValueAtTime(level * 0.35, startTime + duration * 0.65);
    chordGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.08);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1350;

    chordGain.connect(lp);
    lp.connect(this.masterGain);
    lp.connect(this.pingPongIn);

    midiNotes.forEach((m) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = midiToFreq(m);
      osc.connect(chordGain);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.12);
    });
  }

  _playBassNote(midi, startTime, duration, style) {
    const ctx = this.ctx;
    const isSynthBass = style === 'ibiza' || style === 'tropical' || style === 'deep' || style === 'funk';
    const osc = ctx.createOscillator();
    osc.type = isSynthBass ? 'sawtooth' : 'triangle';
    osc.frequency.value = midiToFreq(midi);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = style === 'deep' || style === 'funk' ? 3.5 : 1.4;
    filter.frequency.setValueAtTime(isSynthBass ? 580 : 380, startTime);
    filter.frequency.exponentialRampToValueAtTime(170, startTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.27, startTime + 0.014);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.03);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  _playHouseKick(startTime, level) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, startTime);
    osc.frequency.exponentialRampToValueAtTime(48, startTime + 0.048);
    osc.frequency.exponentialRampToValueAtTime(36, startTime + 0.14);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(level, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.16);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.18);
  }

  _playHouseClap(startTime, level) {
    if (!this.noiseBuffer) return;
    const ctx = this.ctx;
    // Layered 3-burst electronic clap
    [0, 0.011, 0.022].forEach((offset, idx) => {
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuffer;

      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1400;
      bp.Q.value = 1.4;

      const gain = ctx.createGain();
      const burstLevel = idx === 2 ? level : level * 0.65;
      const decay = idx === 2 ? 0.095 : 0.025;
      gain.gain.setValueAtTime(burstLevel, startTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + offset + decay);

      src.connect(bp);
      bp.connect(gain);
      gain.connect(this.masterGain);

      src.start(startTime + offset);
      src.stop(startTime + offset + decay + 0.02);
    });
  }

  _playCymbal(startTime, level, duration, cutoff) {
    if (!this.noiseBuffer) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = cutoff;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(level, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    src.connect(hp);
    hp.connect(gain);
    gain.connect(this.masterGain);

    src.start(startTime);
    src.stop(startTime + duration + 0.02);
  }
}

export const jazzAudioEngine = new JazzAudioEngine();
