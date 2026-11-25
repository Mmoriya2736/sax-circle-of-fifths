/**
 * Self-contained Web Audio API Upbeat Tenor Saxophone & Rhythm Section Synthesizer.
 * 100% offline, zero external audio URLs.
 * Features: Expressive Tenor Saxophone (reed harmonics + pitch scoop + vibrato),
 * Rhodes electric piano comping, walking/funk bassline, and synthesized hi-hat/ride/kick/rim.
 */

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export const JAZZ_TRACKS = [
  {
    id: 'tenor-funk',
    name: "פאנק-ג'אז קצבי",
    subtitle: 'Tenor Funk · 108 BPM',
    bpm: 108,
    style: 'funk',
    bars: [
      {
        // Dm7 funky riff
        bass: [
          { beat: 0, midi: 38, dur: 0.45 },
          { beat: 0.75, midi: 38, dur: 0.35 },
          { beat: 1.5, midi: 45, dur: 0.45 },
          { beat: 2.25, midi: 48, dur: 0.45 },
          { beat: 3.0, midi: 50, dur: 0.5 },
          { beat: 3.5, midi: 48, dur: 0.4 },
        ],
        chords: [
          { beat: 0.5, notes: [53, 57, 60, 64], dur: 0.35 },
          { beat: 1.75, notes: [53, 57, 60, 64], dur: 0.45 },
          { beat: 3.25, notes: [53, 57, 60, 64], dur: 0.35 },
        ],
        melody: [
          { beat: 0.0, midi: 62, dur: 0.45, vel: 0.85, scoop: true },
          { beat: 0.5, midi: 65, dur: 0.35, vel: 0.78 },
          { beat: 1.0, midi: 67, dur: 0.45, vel: 0.88, scoop: true },
          { beat: 1.75, midi: 69, dur: 0.65, vel: 0.92, scoop: true },
          { beat: 2.75, midi: 67, dur: 0.35, vel: 0.75 },
          { beat: 3.25, midi: 65, dur: 0.55, vel: 0.82 },
        ],
      },
      {
        // G9 funky answer
        bass: [
          { beat: 0, midi: 43, dur: 0.45 },
          { beat: 0.75, midi: 43, dur: 0.35 },
          { beat: 1.5, midi: 47, dur: 0.45 },
          { beat: 2.25, midi: 50, dur: 0.45 },
          { beat: 3.0, midi: 53, dur: 0.45 },
          { beat: 3.5, midi: 50, dur: 0.4 },
        ],
        chords: [
          { beat: 0.5, notes: [53, 57, 59, 64], dur: 0.35 },
          { beat: 2.0, notes: [53, 57, 59, 64], dur: 0.45 },
          { beat: 3.5, notes: [53, 57, 59, 64], dur: 0.35 },
        ],
        melody: [
          { beat: 0.0, midi: 64, dur: 0.65, vel: 0.85, scoop: true },
          { beat: 1.0, midi: 62, dur: 0.4, vel: 0.76 },
          { beat: 1.5, midi: 60, dur: 0.4, vel: 0.78 },
          { beat: 2.25, midi: 62, dur: 0.5, vel: 0.86, scoop: true },
          { beat: 3.0, midi: 67, dur: 0.75, vel: 0.9, scoop: true },
        ],
      },
    ],
  },
  {
    id: 'bebop-swing',
    name: 'סווינג מהיר',
    subtitle: 'Bebop Swing · 124 BPM',
    bpm: 124,
    style: 'swing',
    bars: [
      {
        // Fmaj7 walking bass
        bass: [
          { beat: 0, midi: 41, dur: 0.85 },
          { beat: 1, midi: 45, dur: 0.85 },
          { beat: 2, midi: 48, dur: 0.85 },
          { beat: 3, midi: 50, dur: 0.85 },
        ],
        chords: [
          { beat: 0.0, notes: [53, 57, 60, 64], dur: 0.6 },
          { beat: 2.66, notes: [53, 57, 60, 64], dur: 0.5 },
        ],
        melody: [
          { beat: 0.0, midi: 65, dur: 0.6, vel: 0.84, scoop: true },
          { beat: 0.66, midi: 69, dur: 0.4, vel: 0.78 },
          { beat: 1.0, midi: 72, dur: 0.6, vel: 0.88 },
          { beat: 1.66, midi: 70, dur: 0.4, vel: 0.76 },
          { beat: 2.0, midi: 69, dur: 0.85, vel: 0.86, scoop: true },
          { beat: 3.0, midi: 67, dur: 0.65, vel: 0.8 },
        ],
      },
      {
        // D7 -> Gm7
        bass: [
          { beat: 0, midi: 50, dur: 0.85 },
          { beat: 1, midi: 48, dur: 0.85 },
          { beat: 2, midi: 46, dur: 0.85 },
          { beat: 3, midi: 45, dur: 0.85 },
        ],
        chords: [
          { beat: 0.66, notes: [54, 57, 60, 63], dur: 0.55 },
          { beat: 2.66, notes: [53, 55, 58, 62], dur: 0.55 },
        ],
        melody: [
          { beat: 0.0, midi: 66, dur: 0.6, vel: 0.85, scoop: true },
          { beat: 0.66, midi: 69, dur: 0.4, vel: 0.8 },
          { beat: 1.0, midi: 67, dur: 0.6, vel: 0.84 },
          { beat: 1.66, midi: 65, dur: 0.4, vel: 0.78 },
          { beat: 2.0, midi: 62, dur: 0.9, vel: 0.85, scoop: true },
          { beat: 3.33, midi: 65, dur: 0.5, vel: 0.82 },
        ],
      },
      {
        // Gm7
        bass: [
          { beat: 0, midi: 43, dur: 0.85 },
          { beat: 1, midi: 46, dur: 0.85 },
          { beat: 2, midi: 50, dur: 0.85 },
          { beat: 3, midi: 49, dur: 0.85 },
        ],
        chords: [
          { beat: 0.0, notes: [53, 55, 58, 62], dur: 0.55 },
          { beat: 2.66, notes: [53, 55, 58, 62], dur: 0.5 },
        ],
        melody: [
          { beat: 0.0, midi: 67, dur: 0.65, vel: 0.86, scoop: true },
          { beat: 0.66, midi: 70, dur: 0.4, vel: 0.8 },
          { beat: 1.0, midi: 69, dur: 0.6, vel: 0.84 },
          { beat: 1.66, midi: 67, dur: 0.4, vel: 0.76 },
          { beat: 2.0, midi: 65, dur: 0.8, vel: 0.86 },
          { beat: 3.0, midi: 62, dur: 0.7, vel: 0.78 },
        ],
      },
      {
        // C7 turnaround
        bass: [
          { beat: 0, midi: 48, dur: 0.85 },
          { beat: 1, midi: 46, dur: 0.85 },
          { beat: 2, midi: 45, dur: 0.85 },
          { beat: 3, midi: 43, dur: 0.85 },
        ],
        chords: [
          { beat: 0.66, notes: [52, 57, 58, 62], dur: 0.55 },
          { beat: 2.66, notes: [52, 56, 58, 61], dur: 0.5 },
        ],
        melody: [
          { beat: 0.0, midi: 64, dur: 0.6, vel: 0.85, scoop: true },
          { beat: 0.66, midi: 67, dur: 0.4, vel: 0.8 },
          { beat: 1.0, midi: 70, dur: 0.6, vel: 0.88 },
          { beat: 1.66, midi: 69, dur: 0.4, vel: 0.8 },
          { beat: 2.0, midi: 67, dur: 0.7, vel: 0.84 },
          { beat: 3.0, midi: 64, dur: 0.75, vel: 0.82 },
        ],
      },
    ],
  },
  {
    id: 'bossa-tenor',
    name: 'בוסה נובה',
    subtitle: 'Bossa Tenor · 112 BPM',
    bpm: 112,
    style: 'bossa',
    bars: [
      {
        // Cmaj9 bossa bass
        bass: [
          { beat: 0, midi: 36, dur: 1.2 },
          { beat: 1.5, midi: 43, dur: 0.45 },
          { beat: 2.0, midi: 43, dur: 1.2 },
          { beat: 3.5, midi: 36, dur: 0.45 },
        ],
        chords: [
          { beat: 0.0, notes: [52, 55, 59, 62], dur: 0.7 },
          { beat: 1.5, notes: [52, 55, 59, 62], dur: 0.55 },
          { beat: 3.0, notes: [52, 55, 59, 62], dur: 0.6 },
        ],
        melody: [
          { beat: 0.5, midi: 64, dur: 0.9, vel: 0.82, scoop: true },
          { beat: 1.5, midi: 67, dur: 0.85, vel: 0.86 },
          { beat: 2.5, midi: 64, dur: 0.5, vel: 0.76 },
          { beat: 3.0, midi: 62, dur: 0.85, vel: 0.82 },
        ],
      },
      {
        // A7(b13)
        bass: [
          { beat: 0, midi: 45, dur: 1.2 },
          { beat: 1.5, midi: 40, dur: 0.45 },
          { beat: 2.0, midi: 40, dur: 1.2 },
          { beat: 3.5, midi: 45, dur: 0.45 },
        ],
        chords: [
          { beat: 0.5, notes: [55, 57, 61, 65], dur: 0.7 },
          { beat: 2.0, notes: [55, 57, 61, 65], dur: 0.6 },
          { beat: 3.5, notes: [55, 57, 61, 65], dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 61, dur: 0.9, vel: 0.8, scoop: true },
          { beat: 1.5, midi: 64, dur: 0.85, vel: 0.84 },
          { beat: 2.5, midi: 67, dur: 0.85, vel: 0.88, scoop: true },
          { beat: 3.5, midi: 65, dur: 0.45, vel: 0.78 },
        ],
      },
      {
        // Dm9
        bass: [
          { beat: 0, midi: 38, dur: 1.2 },
          { beat: 1.5, midi: 45, dur: 0.45 },
          { beat: 2.0, midi: 45, dur: 1.2 },
          { beat: 3.5, midi: 38, dur: 0.45 },
        ],
        chords: [
          { beat: 0.0, notes: [53, 57, 60, 64], dur: 0.7 },
          { beat: 1.5, notes: [53, 57, 60, 64], dur: 0.55 },
          { beat: 3.0, notes: [53, 57, 60, 64], dur: 0.6 },
        ],
        melody: [
          { beat: 0.5, midi: 65, dur: 0.9, vel: 0.84, scoop: true },
          { beat: 1.5, midi: 69, dur: 0.85, vel: 0.88 },
          { beat: 2.5, midi: 67, dur: 0.5, vel: 0.78 },
          { beat: 3.0, midi: 65, dur: 0.85, vel: 0.82 },
        ],
      },
      {
        // G13
        bass: [
          { beat: 0, midi: 43, dur: 1.2 },
          { beat: 1.5, midi: 38, dur: 0.45 },
          { beat: 2.0, midi: 38, dur: 1.2 },
          { beat: 3.5, midi: 43, dur: 0.45 },
        ],
        chords: [
          { beat: 0.5, notes: [53, 57, 59, 64], dur: 0.7 },
          { beat: 2.0, notes: [53, 57, 59, 64], dur: 0.6 },
          { beat: 3.5, notes: [53, 57, 59, 64], dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 64, dur: 0.85, vel: 0.84, scoop: true },
          { beat: 1.5, midi: 62, dur: 0.85, vel: 0.82 },
          { beat: 2.5, midi: 60, dur: 1.1, vel: 0.84 },
        ],
      },
    ],
  },
  {
    id: 'soul-groove',
    name: "סול-ג'אז",
    subtitle: 'Soul Groove · 98 BPM',
    bpm: 98,
    style: 'soul',
    bars: [
      {
        // Bbmaj7 -> G7
        bass: [
          { beat: 0, midi: 46, dur: 0.65 },
          { beat: 0.75, midi: 46, dur: 0.45 },
          { beat: 1.5, midi: 43, dur: 0.45 },
          { beat: 2.0, midi: 43, dur: 0.65 },
          { beat: 3.0, midi: 41, dur: 0.45 },
          { beat: 3.5, midi: 43, dur: 0.45 },
        ],
        chords: [
          { beat: 0.0, notes: [53, 57, 58, 62], dur: 0.8 },
          { beat: 2.0, notes: [53, 55, 59, 62], dur: 0.8 },
          { beat: 3.5, notes: [53, 55, 59, 62], dur: 0.4 },
        ],
        melody: [
          { beat: 0.0, midi: 62, dur: 0.5, vel: 0.84, scoop: true },
          { beat: 0.5, midi: 65, dur: 0.45, vel: 0.82 },
          { beat: 1.0, midi: 67, dur: 0.75, vel: 0.9, scoop: true },
          { beat: 2.25, midi: 65, dur: 0.45, vel: 0.8 },
          { beat: 2.75, midi: 62, dur: 0.85, vel: 0.86, scoop: true },
        ],
      },
      {
        // Cm9 -> F13
        bass: [
          { beat: 0, midi: 36, dur: 0.65 },
          { beat: 0.75, midi: 43, dur: 0.45 },
          { beat: 1.5, midi: 41, dur: 0.45 },
          { beat: 2.0, midi: 41, dur: 0.65 },
          { beat: 3.0, midi: 43, dur: 0.45 },
          { beat: 3.5, midi: 45, dur: 0.45 },
        ],
        chords: [
          { beat: 0.0, notes: [51, 55, 58, 62], dur: 0.8 },
          { beat: 2.0, notes: [51, 57, 60, 62], dur: 0.8 },
          { beat: 3.5, notes: [51, 57, 60, 62], dur: 0.4 },
        ],
        melody: [
          { beat: 0.0, midi: 63, dur: 0.55, vel: 0.86, scoop: true },
          { beat: 0.75, midi: 65, dur: 0.5, vel: 0.84 },
          { beat: 1.5, midi: 67, dur: 0.65, vel: 0.9, scoop: true },
          { beat: 2.5, midi: 65, dur: 0.55, vel: 0.82 },
          { beat: 3.25, midi: 62, dur: 0.65, vel: 0.84 },
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

      // Subtle warm jazz club room delay
      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.value = 0.22;
      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 1800;
      const delayFeedback = this.ctx.createGain();
      delayFeedback.gain.value = 0.22;
      const delayWet = this.ctx.createGain();
      delayWet.gain.value = 0.2;

      this.delayNode.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(this.delayNode);
      delayFilter.connect(delayWet);
      delayWet.connect(this.masterGain);

      this.masterGain.connect(this.ctx.destination);

      // Pre-build noise buffer for crisp hi-hat / ride cymbal / rimshot
      const bufSize = this.ctx.sampleRate * 0.4;
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
    // 1. Drums / Percussion Groove
    this._scheduleDrums(style, barStart, beatDur);

    // 2. Bassline
    bar.bass.forEach((b) => {
      this._playBassNote(b.midi, barStart + b.beat * beatDur, b.dur * beatDur, style);
    });

    // 3. Rhodes Electric Piano Comping
    bar.chords.forEach((c) => {
      this._playRhodesChord(c.notes, barStart + c.beat * beatDur, c.dur * beatDur);
    });

    // 4. Expressive Tenor Saxophone Lead
    bar.melody.forEach((n) => {
      const jitter = (Math.random() - 0.5) * 0.008;
      this._playTenorSaxNote(
        n.midi,
        Math.max(this.ctx.currentTime, barStart + n.beat * beatDur + jitter),
        n.dur * beatDur,
        n.vel || 0.82,
        Boolean(n.scoop)
      );
    });
  }

  _scheduleDrums(style, barStart, beatDur) {
    if (style === 'swing') {
      // Classic Jazz Ride Cymbal ("ding, ding-a-ding") + hi-hat chick on 2 & 4
      [0, 1, 1.66, 2, 3, 3.66].forEach((b) => {
        const accent = b === 1 || b === 3 ? 0.1 : 0.065;
        this._playCymbal(barStart + b * beatDur, accent, 0.09, 7600);
      });
      this._playCymbal(barStart + 1 * beatDur, 0.08, 0.045, 9200);
      this._playCymbal(barStart + 3 * beatDur, 0.08, 0.045, 9200);
      this._playKick(barStart, 0.14);
    } else if (style === 'funk') {
      // Crisp 16th-note funky hi-hat + punchy kick & snare/rim
      for (let i = 0; i < 16; i++) {
        const accent = i % 4 === 0 ? 0.075 : i % 2 === 0 ? 0.045 : 0.025;
        this._playCymbal(barStart + (i * 0.25) * beatDur, accent, 0.035, 8800);
      }
      [0, 0.75, 2.25].forEach((b) => this._playKick(barStart + b * beatDur, 0.24));
      [1, 3].forEach((b) => this._playRimshot(barStart + b * beatDur, 0.13));
    } else if (style === 'bossa') {
      // Bossa shaker 8ths + clave rimshot + soft heartbeat kick
      for (let i = 0; i < 8; i++) {
        this._playCymbal(barStart + (i * 0.5) * beatDur, i % 2 === 0 ? 0.05 : 0.032, 0.04, 8200);
      }
      [0, 1.5, 2.0, 3.5].forEach((b) => this._playKick(barStart + b * beatDur, 0.17));
      [0, 1.5, 3.0].forEach((b) => this._playRimshot(barStart + b * beatDur, 0.11));
    } else {
      // Soul Groove: tight 8th hats + pocket kick + crisp backbeat
      for (let i = 0; i < 8; i++) {
        this._playCymbal(barStart + (i * 0.5) * beatDur, i % 2 === 0 ? 0.065 : 0.038, 0.045, 8400);
      }
      [0, 1.5, 2.5].forEach((b) => this._playKick(barStart + b * beatDur, 0.22));
      [1, 3].forEach((b) => this._playRimshot(barStart + b * beatDur, 0.12));
    }
  }

  _playTenorSaxNote(midi, startTime, duration, velocity = 0.85, scoop = false) {
    const ctx = this.ctx;
    const freq = midiToFreq(midi);

    // Rich tenor reed blend: sawtooth (harmonics) + triangle (body) + subtle warm sub
    const oscReed = ctx.createOscillator();
    const oscBody = ctx.createOscillator();
    oscReed.type = 'sawtooth';
    oscBody.type = 'triangle';

    // Expressive tenor saxophone pitch scoop into accented notes
    const startFreq = scoop ? freq * 0.94 : freq * 0.992;
    const glideTime = scoop ? 0.06 : 0.025;

    oscReed.frequency.setValueAtTime(startFreq, startTime);
    oscReed.frequency.exponentialRampToValueAtTime(freq, startTime + glideTime);
    oscBody.frequency.setValueAtTime(startFreq * 1.002, startTime);
    oscBody.frequency.exponentialRampToValueAtTime(freq * 1.001, startTime + glideTime);

    // Expressive sax vibrato on sustained notes
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 5.4;
    lfoGain.gain.setValueAtTime(0.01, startTime);
    lfoGain.gain.linearRampToValueAtTime(
      duration > 0.32 ? freq * 0.0075 : freq * 0.002,
      startTime + Math.min(0.28, duration * 0.6)
    );
    lfo.connect(lfoGain);
    lfoGain.connect(oscReed.frequency);
    lfoGain.connect(oscBody.frequency);

    // Warm tenor formant filter (punchy brass brightness on attack, warm woody sustain)
    const lpFilter = ctx.createBiquadFilter();
    lpFilter.type = 'lowpass';
    lpFilter.Q.value = 2.6;
    lpFilter.frequency.setValueAtTime(580, startTime);
    lpFilter.frequency.exponentialRampToValueAtTime(1950 + velocity * 450, startTime + 0.075);
    lpFilter.frequency.exponentialRampToValueAtTime(980, startTime + Math.max(0.12, duration));

    // Punchy reed breath envelope
    const gain = ctx.createGain();
    const peak = 0.21 * velocity;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + 0.038);
    gain.gain.setValueAtTime(peak * 0.84, startTime + Math.max(0.06, duration - 0.08));
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.05);

    const bodyMix = ctx.createGain();
    bodyMix.gain.value = 0.72;

    oscReed.connect(lpFilter);
    oscBody.connect(bodyMix);
    bodyMix.connect(lpFilter);
    lpFilter.connect(gain);

    gain.connect(this.masterGain);
    gain.connect(this.delayNode);

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
    lp.connect(this.delayNode);

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
    const osc = ctx.createOscillator();
    osc.type = style === 'funk' || style === 'soul' ? 'sawtooth' : 'triangle';
    osc.frequency.value = midiToFreq(midi);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = style === 'funk' ? 3.2 : 1.0;
    filter.frequency.setValueAtTime(style === 'funk' ? 620 : 380, startTime);
    filter.frequency.exponentialRampToValueAtTime(220, startTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.26, startTime + 0.016);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.03);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
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

  _playKick(startTime, level) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(115, startTime);
    osc.frequency.exponentialRampToValueAtTime(42, startTime + 0.09);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(level, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.13);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.15);
  }

  _playRimshot(startTime, level) {
    if (!this.noiseBuffer) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1900;
    bp.Q.value = 2.4;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(level, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.045);

    src.connect(bp);
    bp.connect(gain);
    gain.connect(this.masterGain);

    src.start(startTime);
    src.stop(startTime + 0.06);
  }
}

export const jazzAudioEngine = new JazzAudioEngine();
