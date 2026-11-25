/**
 * Self-contained Web Audio API Smooth Jazz Saxophone & Backing Track Synthesizer.
 * 100% offline, zero external audio URLs, warm brass/Rhodes/upright bass timbre.
 */

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export const JAZZ_TRACKS = [
  {
    id: 'midnight-ballad',
    name: 'בלדת חצות',
    subtitle: 'טנור איטי · 72 BPM',
    bpm: 72,
    bars: [
      {
        // Dm9
        bass: [38, 45],
        chord: [53, 57, 60, 64],
        melody: [
          { beat: 0.0, midi: 69, dur: 1.5, vel: 0.72 },
          { beat: 1.75, midi: 67, dur: 0.75, vel: 0.62 },
          { beat: 2.5, midi: 65, dur: 1.25, vel: 0.68 },
        ],
      },
      {
        // G13
        bass: [43, 47],
        chord: [53, 57, 59, 64],
        melody: [
          { beat: 0.0, midi: 64, dur: 1.25, vel: 0.68 },
          { beat: 1.5, midi: 62, dur: 0.75, vel: 0.6 },
          { beat: 2.25, midi: 67, dur: 1.5, vel: 0.74 },
        ],
      },
      {
        // Cmaj9
        bass: [36, 43],
        chord: [52, 55, 59, 62],
        melody: [
          { beat: 0.0, midi: 64, dur: 2.2, vel: 0.7 },
          { beat: 2.5, midi: 62, dur: 0.6, vel: 0.58 },
          { beat: 3.15, midi: 60, dur: 0.8, vel: 0.62 },
        ],
      },
      {
        // A7(b9)
        bass: [45, 40],
        chord: [52, 55, 58, 61],
        melody: [
          { beat: 0.25, midi: 61, dur: 1.2, vel: 0.64 },
          { beat: 1.75, midi: 64, dur: 0.9, vel: 0.66 },
          { beat: 2.75, midi: 67, dur: 1.1, vel: 0.7 },
        ],
      },
    ],
  },
  {
    id: 'velvet-alto',
    name: 'אלט קטיפתי',
    subtitle: 'גרוב רגוע · 82 BPM',
    bpm: 82,
    bars: [
      {
        // Fmaj9
        bass: [41, 48],
        chord: [53, 57, 60, 64],
        melody: [
          { beat: 0.0, midi: 72, dur: 1.3, vel: 0.68 },
          { beat: 1.5, midi: 69, dur: 0.8, vel: 0.6 },
          { beat: 2.5, midi: 67, dur: 1.2, vel: 0.66 },
        ],
      },
      {
        // Dm9
        bass: [38, 45],
        chord: [53, 57, 60, 64],
        melody: [
          { beat: 0.0, midi: 65, dur: 1.0, vel: 0.64 },
          { beat: 1.25, midi: 67, dur: 0.75, vel: 0.62 },
          { beat: 2.0, midi: 69, dur: 1.7, vel: 0.72 },
        ],
      },
      {
        // Gm9
        bass: [43, 46],
        chord: [53, 55, 58, 62],
        melody: [
          { beat: 0.25, midi: 70, dur: 1.2, vel: 0.66 },
          { beat: 1.75, midi: 69, dur: 0.7, vel: 0.6 },
          { beat: 2.5, midi: 65, dur: 1.3, vel: 0.64 },
        ],
      },
      {
        // C13
        bass: [36, 43],
        chord: [52, 57, 58, 62],
        melody: [
          { beat: 0.0, midi: 64, dur: 1.4, vel: 0.66 },
          { beat: 1.75, midi: 67, dur: 0.85, vel: 0.64 },
          { beat: 2.75, midi: 69, dur: 1.0, vel: 0.68 },
        ],
      },
    ],
  },
  {
    id: 'club-swing',
    name: 'סווינג לילה',
    subtitle: 'מועדון ג׳אז · 94 BPM',
    bpm: 94,
    bars: [
      {
        // Bbmaj7
        bass: [46, 41],
        chord: [53, 57, 58, 62],
        melody: [
          { beat: 0.0, midi: 70, dur: 1.1, vel: 0.68 },
          { beat: 1.33, midi: 69, dur: 0.65, vel: 0.6 },
          { beat: 2.0, midi: 65, dur: 1.5, vel: 0.66 },
        ],
      },
      {
        // G7
        bass: [43, 47],
        chord: [53, 55, 59, 62],
        melody: [
          { beat: 0.33, midi: 67, dur: 0.9, vel: 0.62 },
          { beat: 1.5, midi: 69, dur: 0.8, vel: 0.66 },
          { beat: 2.5, midi: 71, dur: 1.2, vel: 0.7 },
        ],
      },
      {
        // Cm9
        bass: [36, 43],
        chord: [51, 55, 58, 62],
        melody: [
          { beat: 0.0, midi: 72, dur: 1.3, vel: 0.7 },
          { beat: 1.66, midi: 70, dur: 0.7, vel: 0.62 },
          { beat: 2.5, midi: 67, dur: 1.2, vel: 0.65 },
        ],
      },
      {
        // F13
        bass: [41, 45],
        chord: [51, 57, 60, 62],
        melody: [
          { beat: 0.0, midi: 69, dur: 1.1, vel: 0.66 },
          { beat: 1.33, midi: 67, dur: 0.7, vel: 0.6 },
          { beat: 2.33, midi: 65, dur: 1.4, vel: 0.68 },
        ],
      },
    ],
  },
];

class JazzAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.delayNode = null;
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

      // Subtle warm room delay bus
      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.value = 0.27;
      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 1500;
      const delayFeedback = this.ctx.createGain();
      delayFeedback.gain.value = 0.28;
      const delayWet = this.ctx.createGain();
      delayWet.gain.value = 0.24;

      this.delayNode.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(this.delayNode);
      delayFilter.connect(delayWet);
      delayWet.connect(this.masterGain);

      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.04);
    }
  }

  setTrack(index) {
    this.trackIndex = ((index % JAZZ_TRACKS.length) + JAZZ_TRACKS.length) % JAZZ_TRACKS.length;
    this.barIndex = 0;
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  start() {
    this._ensureContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.nextBarTime = this.ctx.currentTime + 0.08;
    this._scheduleLoop();
    this.schedulerId = setInterval(() => this._scheduleLoop(), 180);
  }

  stop() {
    this.isPlaying = false;
    if (this.schedulerId) {
      clearInterval(this.schedulerId);
      this.schedulerId = null;
    }
    if (this.masterGain && this.ctx) {
      // Smooth quick fade out to avoid clicks
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.05);
      setTimeout(() => {
        if (!this.isPlaying && this.masterGain && this.ctx) {
          this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        }
      }, 180);
    }
  }

  _scheduleLoop() {
    if (!this.isPlaying || !this.ctx) return;
    const track = JAZZ_TRACKS[this.trackIndex];
    const beatDur = 60 / track.bpm;
    const barDur = beatDur * 4;

    while (this.nextBarTime < this.ctx.currentTime + 0.65) {
      const bar = track.bars[this.barIndex % track.bars.length];
      this._scheduleBar(bar, this.nextBarTime, beatDur);
      this.nextBarTime += barDur;
      this.barIndex = (this.barIndex + 1) % track.bars.length;
    }
  }

  _scheduleBar(bar, barStart, beatDur) {
    // 1. Upright bass on beats 1 and 3
    this._playBassNote(bar.bass[0], barStart, beatDur * 1.85);
    this._playBassNote(bar.bass[1], barStart + beatDur * 2, beatDur * 1.85);

    // 2. Soft Rhodes electric piano comping (beat 1 & gentle syncopated push on beat 2.5)
    this._playRhodesChord(bar.chord, barStart, beatDur * 2.3, 0.085);
    this._playRhodesChord(bar.chord, barStart + beatDur * 2.5, beatDur * 1.4, 0.055);

    // 3. Warm mellow saxophone melody
    bar.melody.forEach((note) => {
      // Tiny humanization for natural jazz feel
      const humanOffset = (Math.random() - 0.5) * 0.014;
      this._playSaxNote(
        note.midi,
        Math.max(this.ctx.currentTime, barStart + note.beat * beatDur + humanOffset),
        note.dur * beatDur,
        note.vel
      );
    });
  }

  _playSaxNote(midi, startTime, duration, velocity = 0.7) {
    const ctx = this.ctx;
    const freq = midiToFreq(midi);

    // Dual slightly detuned oscillators for rich reed body
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(freq * 0.996, startTime);
    osc1.frequency.exponentialRampToValueAtTime(freq, startTime + 0.045); // subtle jazz scoop
    osc2.frequency.setValueAtTime(freq * 1.002, startTime);

    // Expressive vibrato LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 5.1;
    lfoGain.gain.setValueAtTime(0.01, startTime);
    lfoGain.gain.linearRampToValueAtTime(freq * 0.0065, startTime + Math.min(0.45, duration * 0.6));
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);

    // Warm resonant brass/reed lowpass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 2.0;
    filter.frequency.setValueAtTime(480, startTime);
    filter.frequency.exponentialRampToValueAtTime(1450, startTime + 0.14);
    filter.frequency.exponentialRampToValueAtTime(760, startTime + duration);

    // Smooth breath envelope
    const gain = ctx.createGain();
    const peak = 0.16 * velocity;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + 0.085);
    gain.gain.setValueAtTime(peak * 0.85, startTime + Math.max(0.1, duration - 0.14));
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.06);

    const osc2Mix = ctx.createGain();
    osc2Mix.gain.value = 0.65;

    osc1.connect(filter);
    osc2.connect(osc2Mix);
    osc2Mix.connect(filter);
    filter.connect(gain);

    gain.connect(this.masterGain);
    gain.connect(this.delayNode);

    osc1.start(startTime);
    osc2.start(startTime);
    lfo.start(startTime);

    const stopAt = startTime + duration + 0.1;
    osc1.stop(stopAt);
    osc2.stop(stopAt);
    lfo.stop(stopAt);
  }

  _playRhodesChord(midiNotes, startTime, duration, level = 0.08) {
    const ctx = this.ctx;
    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0.0001, startTime);
    chordGain.gain.linearRampToValueAtTime(level, startTime + 0.03);
    chordGain.gain.exponentialRampToValueAtTime(level * 0.35, startTime + duration * 0.65);
    chordGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.12);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1150;

    chordGain.connect(lp);
    lp.connect(this.masterGain);
    lp.connect(this.delayNode);

    midiNotes.forEach((m) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = midiToFreq(m);
      osc.connect(chordGain);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.15);
    });
  }

  _playBassNote(midi, startTime, duration) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = midiToFreq(midi);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 340;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.22, startTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.06);
  }
}

export const jazzAudioEngine = new JazzAudioEngine();
