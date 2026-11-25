/**
 * Self-contained Web Audio API Expressive Saxophone & Ibiza/Chillout/Nu-Jazz Engine.
 * 100% offline, zero external audio URLs, CORS-free for GitHub Pages.
 *
 * Mix Priority:
 * - Prominent, singing Saxophone lead with mid-presence warmth, pitch-bend scoops,
 *   swelling vibrato, breathy filter dynamics, algorithmic stereo hall reverb, and ping-pong echo.
 * - Supportive, warm backing grooves (dreamy chillout Rhodes, heartbeat house kick, soft bass).
 */

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export const JAZZ_TRACKS = [
  {
    id: 'romantic-ibiza-sunset',
    name: 'שקיעה רומנטית באיביזה',
    subtitle: 'Romantic Ibiza Sunset · 114 BPM',
    bpm: 114,
    style: 'sunset',
    bars: [
      {
        // Am9 — soaring, emotional Jubel-inspired sunset melody
        pad: [57, 60, 64, 67, 71],
        bass: [
          { beat: 0.0, midi: 45, dur: 1.5 },
          { beat: 2.0, midi: 45, dur: 1.2 },
          { beat: 3.5, midi: 43, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 69, dur: 0.9, vel: 0.92, scoop: true },
          { beat: 1.0, midi: 72, dur: 0.85, vel: 0.96, scoop: true },
          { beat: 2.0, midi: 76, dur: 1.35, vel: 1.0, scoop: true },
          { beat: 3.5, midi: 74, dur: 0.45, vel: 0.86 },
        ],
      },
      {
        // Fmaj9
        pad: [53, 57, 60, 64, 67],
        bass: [
          { beat: 0.0, midi: 41, dur: 1.5 },
          { beat: 2.0, midi: 41, dur: 1.2 },
          { beat: 3.5, midi: 40, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 72, dur: 1.2, vel: 0.95, scoop: true },
          { beat: 1.5, midi: 69, dur: 0.85, vel: 0.9 },
          { beat: 2.5, midi: 67, dur: 0.65, vel: 0.86 },
          { beat: 3.25, midi: 69, dur: 0.7, vel: 0.92, scoop: true },
        ],
      },
      {
        // Cmaj9
        pad: [52, 55, 59, 62, 67],
        bass: [
          { beat: 0.0, midi: 36, dur: 1.5 },
          { beat: 2.0, midi: 43, dur: 1.2 },
          { beat: 3.5, midi: 40, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 72, dur: 0.9, vel: 0.94, scoop: true },
          { beat: 1.0, midi: 74, dur: 0.85, vel: 0.96, scoop: true },
          { beat: 2.0, midi: 76, dur: 0.9, vel: 0.98, scoop: true },
          { beat: 3.0, midi: 79, dur: 0.95, vel: 1.0, scoop: true },
        ],
      },
      {
        // G6/9
        pad: [55, 59, 62, 64, 69],
        bass: [
          { beat: 0.0, midi: 43, dur: 1.5 },
          { beat: 2.0, midi: 43, dur: 1.2 },
          { beat: 3.5, midi: 47, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 76, dur: 1.15, vel: 0.94, scoop: true },
          { beat: 1.25, midi: 74, dur: 0.95, vel: 0.9 },
          { beat: 2.5, midi: 72, dur: 0.65, vel: 0.88 },
          { beat: 3.25, midi: 71, dur: 0.7, vel: 0.9 },
        ],
      },
    ],
  },
  {
    id: 'chuppah-by-the-sea',
    name: 'חופה על הים',
    subtitle: 'Romantic Chillout Lounge · 100 BPM',
    bpm: 100,
    style: 'lounge',
    bars: [
      {
        // Fmaj9 — intimate, lyrical tenor sax by the ocean
        pad: [53, 57, 60, 64, 67],
        bass: [
          { beat: 0.0, midi: 41, dur: 2.2 },
          { beat: 2.5, midi: 48, dur: 1.4 },
        ],
        melody: [
          { beat: 0.0, midi: 65, dur: 1.35, vel: 0.94, scoop: true },
          { beat: 1.5, midi: 69, dur: 1.1, vel: 0.96, scoop: true },
          { beat: 2.75, midi: 72, dur: 1.15, vel: 0.98, scoop: true },
        ],
      },
      {
        // Dm9
        pad: [53, 57, 60, 64],
        bass: [
          { beat: 0.0, midi: 38, dur: 2.2 },
          { beat: 2.5, midi: 45, dur: 1.4 },
        ],
        melody: [
          { beat: 0.0, midi: 69, dur: 1.6, vel: 0.95, scoop: true },
          { beat: 2.0, midi: 67, dur: 0.85, vel: 0.88 },
          { beat: 3.0, midi: 65, dur: 0.95, vel: 0.9 },
        ],
      },
      {
        // Bbmaj9
        pad: [50, 53, 57, 60, 62],
        bass: [
          { beat: 0.0, midi: 46, dur: 2.2 },
          { beat: 2.5, midi: 41, dur: 1.4 },
        ],
        melody: [
          { beat: 0.0, midi: 62, dur: 1.15, vel: 0.92, scoop: true },
          { beat: 1.25, midi: 65, dur: 1.1, vel: 0.95, scoop: true },
          { beat: 2.5, midi: 69, dur: 1.4, vel: 0.98, scoop: true },
        ],
      },
      {
        // C13sus4 -> C9
        pad: [52, 55, 58, 62, 65],
        bass: [
          { beat: 0.0, midi: 36, dur: 2.2 },
          { beat: 2.5, midi: 43, dur: 1.4 },
        ],
        melody: [
          { beat: 0.0, midi: 67, dur: 1.5, vel: 0.94, scoop: true },
          { beat: 1.75, midi: 65, dur: 0.9, vel: 0.88 },
          { beat: 2.75, midi: 64, dur: 1.15, vel: 0.9, scoop: true },
        ],
      },
    ],
  },
  {
    id: 'ibiza-beach-club',
    name: 'גרוב איביזה קצבי',
    subtitle: 'Ibiza Beach Club Sax · 122 BPM',
    bpm: 122,
    style: 'ibiza',
    bars: [
      {
        // Dm9 uplifting sunny beach-club hook
        pad: [53, 57, 60, 64],
        bass: [
          { beat: 0.0, midi: 38, dur: 0.45 },
          { beat: 0.75, midi: 45, dur: 0.35 },
          { beat: 1.5, midi: 38, dur: 0.45 },
          { beat: 2.5, midi: 45, dur: 0.45 },
          { beat: 3.25, midi: 48, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 69, dur: 0.45, vel: 0.92, scoop: true },
          { beat: 0.5, midi: 72, dur: 0.4, vel: 0.94 },
          { beat: 1.0, midi: 74, dur: 0.65, vel: 0.98, scoop: true },
          { beat: 1.75, midi: 72, dur: 0.35, vel: 0.86 },
          { beat: 2.25, midi: 69, dur: 0.45, vel: 0.9 },
          { beat: 2.75, midi: 67, dur: 0.55, vel: 0.9 },
          { beat: 3.5, midi: 69, dur: 0.45, vel: 0.94, scoop: true },
        ],
      },
      {
        // G13
        pad: [53, 57, 59, 64],
        bass: [
          { beat: 0.0, midi: 43, dur: 0.45 },
          { beat: 0.75, midi: 47, dur: 0.35 },
          { beat: 1.5, midi: 43, dur: 0.45 },
          { beat: 2.5, midi: 50, dur: 0.45 },
          { beat: 3.25, midi: 47, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 67, dur: 0.45, vel: 0.9, scoop: true },
          { beat: 0.5, midi: 71, dur: 0.4, vel: 0.92 },
          { beat: 1.0, midi: 74, dur: 0.65, vel: 0.98, scoop: true },
          { beat: 1.75, midi: 76, dur: 0.65, vel: 1.0, scoop: true },
          { beat: 2.5, midi: 74, dur: 0.45, vel: 0.88 },
          { beat: 3.0, midi: 71, dur: 0.8, vel: 0.92 },
        ],
      },
      {
        // Cmaj9
        pad: [52, 55, 59, 62],
        bass: [
          { beat: 0.0, midi: 36, dur: 0.45 },
          { beat: 0.75, midi: 43, dur: 0.35 },
          { beat: 1.5, midi: 36, dur: 0.45 },
          { beat: 2.5, midi: 43, dur: 0.45 },
          { beat: 3.25, midi: 47, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 72, dur: 0.45, vel: 0.94, scoop: true },
          { beat: 0.5, midi: 76, dur: 0.6, vel: 0.98, scoop: true },
          { beat: 1.25, midi: 74, dur: 0.4, vel: 0.88 },
          { beat: 1.75, midi: 72, dur: 0.55, vel: 0.92 },
          { beat: 2.5, midi: 69, dur: 0.45, vel: 0.88 },
          { beat: 3.0, midi: 67, dur: 0.8, vel: 0.9 },
        ],
      },
      {
        // Am9
        pad: [55, 57, 60, 64],
        bass: [
          { beat: 0.0, midi: 45, dur: 0.45 },
          { beat: 0.75, midi: 48, dur: 0.35 },
          { beat: 1.5, midi: 45, dur: 0.45 },
          { beat: 2.5, midi: 43, dur: 0.45 },
          { beat: 3.25, midi: 40, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 69, dur: 0.6, vel: 0.94, scoop: true },
          { beat: 0.75, midi: 72, dur: 0.55, vel: 0.96, scoop: true },
          { beat: 1.5, midi: 69, dur: 0.45, vel: 0.9 },
          { beat: 2.25, midi: 67, dur: 0.55, vel: 0.88 },
          { beat: 3.0, midi: 64, dur: 0.85, vel: 0.92 },
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
          { beat: 0.0, midi: 62, dur: 0.45, vel: 0.92, scoop: true },
          { beat: 0.5, midi: 65, dur: 0.35, vel: 0.88 },
          { beat: 1.0, midi: 67, dur: 0.45, vel: 0.95, scoop: true },
          { beat: 1.75, midi: 69, dur: 0.7, vel: 1.0, scoop: true },
          { beat: 2.75, midi: 67, dur: 0.35, vel: 0.86 },
          { beat: 3.25, midi: 65, dur: 0.6, vel: 0.92 },
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
          { beat: 0.0, midi: 64, dur: 0.65, vel: 0.92, scoop: true },
          { beat: 1.0, midi: 62, dur: 0.4, vel: 0.86 },
          { beat: 1.5, midi: 60, dur: 0.4, vel: 0.88 },
          { beat: 2.25, midi: 62, dur: 0.55, vel: 0.94, scoop: true },
          { beat: 3.0, midi: 67, dur: 0.8, vel: 0.98, scoop: true },
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
          { beat: 0.0, midi: 65, dur: 0.65, vel: 0.92, scoop: true },
          { beat: 0.66, midi: 69, dur: 0.4, vel: 0.86 },
          { beat: 1.0, midi: 72, dur: 0.65, vel: 0.96 },
          { beat: 1.66, midi: 70, dur: 0.4, vel: 0.84 },
          { beat: 2.0, midi: 69, dur: 0.9, vel: 0.94, scoop: true },
          { beat: 3.0, midi: 67, dur: 0.7, vel: 0.88 },
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
          { beat: 0.0, midi: 66, dur: 0.65, vel: 0.92, scoop: true },
          { beat: 0.66, midi: 69, dur: 0.4, vel: 0.88 },
          { beat: 1.0, midi: 67, dur: 0.65, vel: 0.92 },
          { beat: 1.66, midi: 65, dur: 0.4, vel: 0.86 },
          { beat: 2.0, midi: 62, dur: 0.95, vel: 0.94, scoop: true },
          { beat: 3.33, midi: 65, dur: 0.55, vel: 0.9 },
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
          { beat: 0.0, midi: 67, dur: 0.7, vel: 0.94, scoop: true },
          { beat: 0.66, midi: 70, dur: 0.4, vel: 0.88 },
          { beat: 1.0, midi: 69, dur: 0.65, vel: 0.92 },
          { beat: 1.66, midi: 67, dur: 0.4, vel: 0.84 },
          { beat: 2.0, midi: 65, dur: 0.85, vel: 0.94 },
          { beat: 3.0, midi: 62, dur: 0.75, vel: 0.86 },
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
          { beat: 0.0, midi: 64, dur: 0.65, vel: 0.92, scoop: true },
          { beat: 0.66, midi: 67, dur: 0.4, vel: 0.88 },
          { beat: 1.0, midi: 70, dur: 0.65, vel: 0.96 },
          { beat: 1.66, midi: 69, dur: 0.4, vel: 0.88 },
          { beat: 2.0, midi: 67, dur: 0.75, vel: 0.92 },
          { beat: 3.0, midi: 64, dur: 0.8, vel: 0.9 },
        ],
      },
    ],
  },
];

class JazzAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.saxBus = null;
    this.reverbIn = null;
    this.pingPongIn = null;
    this.noiseBuffer = null;
    this.isPlaying = false;
    this.trackIndex = 0;
    this.volume = 0.25;
    this.barIndex = 0;
    this.nextBarTime = 0;
    this.schedulerId = null;
  }

  _createReverbImpulse(ctx, seconds = 2.1, decay = 2.6) {
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * seconds);
    const impulse = ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const channelData = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const env = Math.pow(1 - i / length, decay);
        channelData[i] = (Math.random() * 2 - 1) * env;
      }
    }
    return impulse;
  }

  _ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;

      // Dedicated front-and-center Saxophone Presence Bus (+4.5dB warm brass mid boost)
      this.saxBus = this.ctx.createGain();
      this.saxBus.gain.value = 1.25;

      const saxPresenceEQ = this.ctx.createBiquadFilter();
      saxPresenceEQ.type = 'peaking';
      saxPresenceEQ.frequency.value = 1150;
      saxPresenceEQ.Q.value = 1.1;
      saxPresenceEQ.gain.value = 4.5;

      this.saxBus.connect(saxPresenceEQ);
      saxPresenceEQ.connect(this.masterGain);

      // Lush Algorithmic Stereo Hall Reverb (sunset / beach lounge space)
      this.reverbIn = this.ctx.createGain();
      this.reverbIn.gain.value = 0.38;

      const convolver = this.ctx.createConvolver();
      convolver.buffer = this._createReverbImpulse(this.ctx, 2.2, 2.5);

      const reverbLP = this.ctx.createBiquadFilter();
      reverbLP.type = 'lowpass';
      reverbLP.frequency.value = 2600;

      this.reverbIn.connect(convolver);
      convolver.connect(reverbLP);
      reverbLP.connect(this.masterGain);

      // Stereo Ping-Pong Delay Bus
      this.pingPongIn = this.ctx.createGain();
      this.pingPongIn.gain.value = 0.24;

      const delayL = this.ctx.createDelay(1.0);
      const delayR = this.ctx.createDelay(1.0);
      delayL.delayTime.value = 0.26;
      delayR.delayTime.value = 0.26;

      const fbFilter = this.ctx.createBiquadFilter();
      fbFilter.type = 'lowpass';
      fbFilter.frequency.value = 2000;

      const fbGain = this.ctx.createGain();
      fbGain.gain.value = 0.3;

      const wetGain = this.ctx.createGain();
      wetGain.gain.value = 0.65;

      if (typeof this.ctx.createStereoPanner === 'function') {
        const panL = this.ctx.createStereoPanner();
        const panR = this.ctx.createStereoPanner();
        panL.pan.value = -0.6;
        panR.pan.value = 0.6;

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

      // Route Sax Bus into lush reverb & subtle ping-pong echo
      saxPresenceEQ.connect(this.reverbIn);
      saxPresenceEQ.connect(this.pingPongIn);

      this.masterGain.connect(this.ctx.destination);

      // Noise buffer for breath attack, soft shakers, hi-hats, claps
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
    const isPadStyle = style === 'sunset' || style === 'lounge' || style === 'ibiza';

    // 1. Subtle, supportive rhythm section
    this._scheduleDrums(style, barStart, beatDur);

    // 2. Dreamy Rhodes / Sidechained Sunset Pad
    if (isPadStyle && bar.pad) {
      this._playWarmPad(bar.pad, barStart, beatDur, style);
    } else if (bar.chords) {
      bar.chords.forEach((c) => {
        this._playRhodesChord(c.notes, barStart + c.beat * beatDur, c.dur * beatDur);
      });
    }

    // 3. Warm supportive bassline
    bar.bass.forEach((b) => {
      this._playBassNote(b.midi, barStart + b.beat * beatDur, b.dur * beatDur, style);
    });

    // 4. Front-and-center Expressive Saxophone Solo
    bar.melody.forEach((n) => {
      const jitter = (Math.random() - 0.5) * 0.006;
      this._playSaxSolo(
        n.midi,
        Math.max(this.ctx.currentTime, barStart + n.beat * beatDur + jitter),
        n.dur * beatDur,
        n.vel || 0.92,
        Boolean(n.scoop),
        style
      );
    });
  }

  _scheduleDrums(style, barStart, beatDur) {
    if (style === 'sunset') {
      // Soft heartbeat chill-house kick + breezy shaker
      for (let b = 0; b < 4; b++) {
        this._playHouseKick(barStart + b * beatDur, 0.17, 130);
        this._playCymbal(barStart + (b + 0.5) * beatDur, 0.045, 0.075, 7600);
      }
      this._playHouseClap(barStart + 1 * beatDur, 0.065);
      this._playHouseClap(barStart + 3 * beatDur, 0.065);
    } else if (style === 'lounge') {
      // Intimate unhurried lounge pulse: gentle kick on 1 & 2.5 + soft ocean shaker
      this._playHouseKick(barStart, 0.13, 110);
      this._playHouseKick(barStart + 2.5 * beatDur, 0.1, 105);
      for (let i = 0; i < 8; i++) {
        this._playCymbal(barStart + i * 0.5 * beatDur, i % 2 === 0 ? 0.032 : 0.018, 0.055, 7200);
      }
    } else if (style === 'ibiza') {
      // Uplifting Ibiza beach-club 4-on-the-floor beat (kept cleanly under the sax)
      for (let b = 0; b < 4; b++) {
        this._playHouseKick(barStart + b * beatDur, 0.22, 155);
        this._playCymbal(barStart + (b + 0.5) * beatDur, 0.065, 0.095, 7800);
      }
      this._playHouseClap(barStart + 1 * beatDur, 0.1);
      this._playHouseClap(barStart + 3 * beatDur, 0.1);
    } else if (style === 'funk') {
      for (let i = 0; i < 16; i++) {
        const accent = i % 4 === 0 ? 0.055 : i % 2 === 0 ? 0.032 : 0.016;
        this._playCymbal(barStart + i * 0.25 * beatDur, accent, 0.032, 8600);
      }
      [0, 0.75, 2.25].forEach((b) => this._playHouseKick(barStart + b * beatDur, 0.2, 145));
      [1, 3].forEach((b) => this._playHouseClap(barStart + b * beatDur, 0.095));
    } else {
      // Upbeat Jazz Swing Ride
      [0, 1, 1.66, 2, 3, 3.66].forEach((b) => {
        const accent = b === 1 || b === 3 ? 0.075 : 0.048;
        this._playCymbal(barStart + b * beatDur, accent, 0.085, 7500);
      });
      this._playHouseKick(barStart, 0.11, 115);
    }
  }

  _playWarmPad(midiNotes, barStart, beatDur, style) {
    const ctx = this.ctx;
    const barDur = beatDur * 4;
    const padGain = ctx.createGain();
    const baseLevel = style === 'lounge' ? 0.05 : 0.055;

    if (style === 'lounge') {
      // Smooth, dreamy unhurried swell
      padGain.gain.setValueAtTime(0.0001, barStart);
      padGain.gain.linearRampToValueAtTime(baseLevel, barStart + 0.35);
      padGain.gain.setValueAtTime(baseLevel * 0.85, barStart + barDur - 0.3);
      padGain.gain.linearRampToValueAtTime(0.0001, barStart + barDur + 0.15);
    } else {
      // Gentle sidechain breathing synced to kick
      padGain.gain.setValueAtTime(baseLevel * 0.28, barStart);
      for (let b = 0; b < 4; b++) {
        const t = barStart + b * beatDur;
        padGain.gain.setValueAtTime(baseLevel * 0.26, t);
        padGain.gain.linearRampToValueAtTime(baseLevel, t + beatDur * 0.45);
        padGain.gain.linearRampToValueAtTime(baseLevel * 0.82, t + beatDur * 0.92);
      }
      padGain.gain.linearRampToValueAtTime(0.0001, barStart + barDur + 0.08);
    }

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = style === 'ibiza' ? 1250 : 1050;

    padGain.connect(lp);
    lp.connect(this.masterGain);
    lp.connect(this.reverbIn);

    midiNotes.forEach((m) => {
      const osc = ctx.createOscillator();
      osc.type = style === 'ibiza' ? 'triangle' : 'sine';
      osc.frequency.value = midiToFreq(m);
      osc.connect(padGain);
      osc.start(barStart);
      osc.stop(barStart + barDur + 0.18);
    });
  }

  _playSaxSolo(midi, startTime, duration, velocity, scoop, style) {
    const ctx = this.ctx;
    const freq = midiToFreq(midi);
    const isRomantic = style === 'sunset' || style === 'lounge';

    // Dual warm oscillators: rich reed sawtooth + velvety triangle body
    const oscReed = ctx.createOscillator();
    const oscBody = ctx.createOscillator();
    oscReed.type = 'sawtooth';
    oscBody.type = 'triangle';

    // Smooth, lyrical pitch-bend scoop into notes
    const scoopRatio = scoop ? (isRomantic ? 0.938 : 0.945) : 0.994;
    const glideTime = scoop ? (isRomantic ? 0.088 : 0.055) : 0.02;

    oscReed.frequency.setValueAtTime(freq * scoopRatio, startTime);
    oscReed.frequency.exponentialRampToValueAtTime(freq, startTime + glideTime);
    oscBody.frequency.setValueAtTime(freq * scoopRatio * 1.0018, startTime);
    oscBody.frequency.exponentialRampToValueAtTime(freq * 1.0012, startTime + glideTime);

    // Human vibrato that stays straight at attack and swells gently on sustained notes
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = isRomantic ? 5.1 : 5.5;
    lfoGain.gain.setValueAtTime(0.001, startTime);
    lfoGain.gain.setValueAtTime(0.001, startTime + Math.min(0.14, duration * 0.25));
    lfoGain.gain.linearRampToValueAtTime(
      duration > 0.35 ? freq * (isRomantic ? 0.0095 : 0.0075) : freq * 0.002,
      startTime + Math.min(0.45, duration * 0.65)
    );
    lfo.connect(lfoGain);
    lfoGain.connect(oscReed.frequency);
    lfoGain.connect(oscBody.frequency);

    // Warm breathy brass lowpass filter envelope
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = isRomantic ? 2.1 : 2.6;
    const peakCutoff = isRomantic ? 2250 : 2550;
    filter.frequency.setValueAtTime(520, startTime);
    filter.frequency.exponentialRampToValueAtTime(peakCutoff, startTime + (isRomantic ? 0.13 : 0.07));
    filter.frequency.exponentialRampToValueAtTime(1020, startTime + Math.max(0.16, duration));

    // Prominent, singing breath envelope (front-and-center in the mix!)
    const gain = ctx.createGain();
    const peak = 0.31 * velocity;
    const attack = isRomantic ? 0.068 : 0.032;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + attack);
    gain.gain.setValueAtTime(peak * 0.88, startTime + Math.max(attack + 0.02, duration - 0.09));
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.09);

    const bodyMix = ctx.createGain();
    bodyMix.gain.value = 0.78;

    oscReed.connect(filter);
    oscBody.connect(bodyMix);
    bodyMix.connect(filter);
    filter.connect(gain);

    // Send directly to our warm Saxophone Presence Bus (which feeds master + lush reverb + echo)
    gain.connect(this.saxBus);

    // Soft breathy reed air transient at note onset
    if (this.noiseBuffer) {
      const breathSrc = ctx.createBufferSource();
      breathSrc.buffer = this.noiseBuffer;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 2300;
      bp.Q.value = 1.4;
      const bGain = ctx.createGain();
      bGain.gain.setValueAtTime(0.028 * velocity, startTime);
      bGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.065);
      breathSrc.connect(bp);
      bp.connect(bGain);
      bGain.connect(this.saxBus);
      breathSrc.start(startTime);
      breathSrc.stop(startTime + 0.075);
    }

    oscReed.start(startTime);
    oscBody.start(startTime);
    lfo.start(startTime);

    const stopAt = startTime + duration + 0.14;
    oscReed.stop(stopAt);
    oscBody.stop(stopAt);
    lfo.stop(stopAt);
  }

  _playRhodesChord(midiNotes, startTime, duration) {
    const ctx = this.ctx;
    const chordGain = ctx.createGain();
    const level = 0.055;
    chordGain.gain.setValueAtTime(0.0001, startTime);
    chordGain.gain.linearRampToValueAtTime(level, startTime + 0.018);
    chordGain.gain.exponentialRampToValueAtTime(level * 0.35, startTime + duration * 0.65);
    chordGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.08);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1200;

    chordGain.connect(lp);
    lp.connect(this.masterGain);
    lp.connect(this.reverbIn);

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
    const isSynthBass = style === 'ibiza' || style === 'funk';
    const osc = ctx.createOscillator();
    osc.type = isSynthBass ? 'sawtooth' : 'triangle';
    osc.frequency.value = midiToFreq(midi);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = style === 'funk' ? 3.0 : 1.1;
    filter.frequency.setValueAtTime(isSynthBass ? 480 : 320, startTime);
    filter.frequency.exponentialRampToValueAtTime(160, startTime + duration);

    const gain = ctx.createGain();
    const peak = style === 'lounge' ? 0.17 : 0.19;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.06);
  }

  _playHouseKick(startTime, level, startHz = 145) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startHz, startTime);
    osc.frequency.exponentialRampToValueAtTime(46, startTime + 0.05);
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
    [0, 0.011, 0.022].forEach((offset, idx) => {
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuffer;

      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1400;
      bp.Q.value = 1.4;

      const gain = ctx.createGain();
      const burstLevel = idx === 2 ? level : level * 0.6;
      const decay = idx === 2 ? 0.09 : 0.024;
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
