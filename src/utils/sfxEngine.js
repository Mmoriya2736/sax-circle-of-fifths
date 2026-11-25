/**
 * Self-contained Web Audio API Quiz Feedback Sound Effects (SFX).
 * 100% offline, zero external audio files, GitHub Pages safe.
 * - playCheer(): Crisp crowd applause + vocal cheer swell + celebratory jazz chime flourish (~1.0s)
 * - playBoo(): Humorous crowd "booo" vocal formant + disappointed trombone slide (~1.15s)
 */

class SfxEngine {
  constructor() {
    this.ctx = null;
    this.noiseBuffer = null;
  }

  _ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      const bufSize = Math.floor(this.ctx.sampleRate * 1.4);
      this.noiseBuffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Correct Answer: Crowd applause + warm cheer + celebratory brass/chime flourish (~1.0s)
   */
  playCheer() {
    const ctx = this._ensureContext();
    const now = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.value = 0.52;
    master.connect(ctx.destination);

    // 1. Rapid staggered crowd applause claps (20 natural claps across 0.0 -> 0.85s)
    for (let i = 0; i < 20; i++) {
      const offset = (i / 20) * 0.72 + Math.random() * 0.055;
      const t = now + offset;
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuffer;

      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1150 + Math.random() * 1250;
      bp.Q.value = 1.6 + Math.random() * 1.2;

      const env = ctx.createGain();
      // Swell applause in then fade gently
      const shape = Math.sin((i / 19) * Math.PI);
      const amp = (0.09 + shape * 0.14) * (0.7 + Math.random() * 0.5);
      env.gain.setValueAtTime(0.0001, t);
      env.gain.linearRampToValueAtTime(amp, t + 0.006);
      env.gain.exponentialRampToValueAtTime(0.0001, t + 0.055 + Math.random() * 0.03);

      src.connect(bp);
      bp.connect(env);
      env.connect(master);

      src.start(t, Math.random() * 0.25, 0.12);
    }

    // 2. Warm crowd vocal cheer swell ("Wooo!" formant bandpass on noise)
    const cheerNoise = ctx.createBufferSource();
    cheerNoise.buffer = this.noiseBuffer;

    const f1 = ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.frequency.setValueAtTime(620, now);
    f1.frequency.exponentialRampToValueAtTime(880, now + 0.35);
    f1.Q.value = 3.2;

    const f2 = ctx.createBiquadFilter();
    f2.type = 'bandpass';
    f2.frequency.setValueAtTime(1750, now);
    f2.frequency.exponentialRampToValueAtTime(2200, now + 0.35);
    f2.Q.value = 3.5;

    const cheerGain = ctx.createGain();
    cheerGain.gain.setValueAtTime(0.0001, now);
    cheerGain.gain.linearRampToValueAtTime(0.16, now + 0.14);
    cheerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.92);

    cheerNoise.connect(f1);
    cheerNoise.connect(f2);
    f1.connect(cheerGain);
    f2.connect(cheerGain);
    cheerGain.connect(master);
    cheerNoise.start(now, 0, 1.0);

    // 3. Celebratory ascending jazz major-9th brass/chime flourish (C5 E5 G5 B5 D6)
    const flourishFreqs = [523.25, 659.25, 783.99, 987.77, 1174.66];
    flourishFreqs.forEach((freq, idx) => {
      const t = now + idx * 0.052;
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc.type = 'triangle';
      osc2.type = 'sine';
      osc.frequency.value = freq;
      osc2.frequency.value = freq * 2;

      const noteGain = ctx.createGain();
      const peak = idx === flourishFreqs.length - 1 ? 0.2 : 0.14;
      const dur = idx === flourishFreqs.length - 1 ? 0.45 : 0.22;

      noteGain.gain.setValueAtTime(0.0001, t);
      noteGain.gain.linearRampToValueAtTime(peak, t + 0.015);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      const harmGain = ctx.createGain();
      harmGain.gain.value = 0.28;

      osc.connect(noteGain);
      osc2.connect(harmGain);
      harmGain.connect(noteGain);
      noteGain.connect(master);

      osc.start(t);
      osc2.start(t);
      osc.stop(t + dur + 0.04);
      osc2.stop(t + dur + 0.04);
    });
  }

  /**
   * Wrong Answer: Humorous crowd "Boooo!" + disappointed trombone slide (~1.15s)
   */
  playBoo() {
    const ctx = this._ensureContext();
    const now = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.value = 0.54;
    master.connect(ctx.destination);

    // 1. Disappointed Trombone "Wah-Wah-Waaah" descending brass groan
    const notes = [
      { start: 0.0, dur: 0.24, freqStart: 277.18, freqEnd: 268.0 }, // C#4 -> droop
      { start: 0.26, dur: 0.24, freqStart: 261.63, freqEnd: 252.0 }, // C4 -> droop
      { start: 0.52, dur: 0.62, freqStart: 246.94, freqEnd: 218.0, wobble: true }, // B3 -> sad slide down
    ];

    notes.forEach((n) => {
      const t = now + n.start;
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.freqStart, t);
      osc.frequency.exponentialRampToValueAtTime(n.freqEnd, t + n.dur);

      if (n.wobble) {
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 6.2;
        lfoGain.gain.value = 6.5;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(t);
        lfo.stop(t + n.dur + 0.05);
      }

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.Q.value = 3.2;
      lp.frequency.setValueAtTime(1050, t);
      lp.frequency.exponentialRampToValueAtTime(360, t + n.dur);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.24, t + 0.03);
      gain.gain.setValueAtTime(0.2, t + n.dur * 0.72);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + n.dur + 0.04);

      osc.connect(lp);
      lp.connect(gain);
      gain.connect(master);

      osc.start(t);
      osc.stop(t + n.dur + 0.06);
    });

    // 2. Humorous Crowd "Boooo!" vocal formant layer ("OO" vowel formants: ~320Hz & ~780Hz)
    const crowdVoices = [142, 158, 174, 196];
    const formant1 = ctx.createBiquadFilter();
    formant1.type = 'bandpass';
    formant1.frequency.value = 330;
    formant1.Q.value = 4.5;

    const formant2 = ctx.createBiquadFilter();
    formant2.type = 'bandpass';
    formant2.frequency.value = 760;
    formant2.Q.value = 5.0;

    const booGain = ctx.createGain();
    booGain.gain.setValueAtTime(0.0001, now + 0.04);
    booGain.gain.linearRampToValueAtTime(0.22, now + 0.24);
    booGain.gain.setValueAtTime(0.19, now + 0.78);
    booGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);

    formant1.connect(booGain);
    formant2.connect(booGain);
    booGain.connect(master);

    crowdVoices.forEach((baseFreq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(baseFreq, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.88, now + 1.12);
      osc.connect(formant1);
      osc.connect(formant2);
      osc.start(now + 0.04);
      osc.stop(now + 1.18);
    });

    // Soft breathy crowd air into the "OO" formants
    const crowdNoise = ctx.createBufferSource();
    crowdNoise.buffer = this.noiseBuffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.28;
    crowdNoise.connect(noiseGain);
    noiseGain.connect(formant1);
    noiseGain.connect(formant2);
    crowdNoise.start(now + 0.04, 0, 1.15);
  }
}

export const sfxEngine = new SfxEngine();
