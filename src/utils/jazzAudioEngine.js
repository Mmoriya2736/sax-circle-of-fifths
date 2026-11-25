/**
 * Real Studio-Sampled Tenor Saxophone (FluidR3_GM GM #66) + Ibiza/Chillout/Nu-Jazz Engine.
 *
 * - Loads authentic multi-sampled Tenor Saxophone MP3s from CORS-enabled FluidR3_GM CDNs
 *   (with automatic fallback to a warm formant-filtered Web Audio synth if completely offline).
 * - Adds human tenor sax expression directly onto the real audio samples:
 *   • Upward pitch-bend scoops (-120 -> 0 cents over 65-90ms)
 *   • Natural phrasing with breathing rests and velocity dynamics
 *   • Delayed vibrato (~5.2 Hz) blooming 350ms after note onset
 *   • Lush stereo hall convolver reverb + warm ping-pong echo
 */

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// 10 anchor notes spanning concert A2 (45) to E5 (76) — max ±1 semitone pitch shift
const TENOR_SAMPLE_ANCHORS = [
  { midi: 48, file: 'C3' },
  { midi: 51, file: 'Eb3' },
  { midi: 54, file: 'Gb3' },
  { midi: 57, file: 'A3' },
  { midi: 60, file: 'C4' },
  { midi: 63, file: 'Eb4' },
  { midi: 66, file: 'Gb4' },
  { midi: 69, file: 'A4' },
  { midi: 72, file: 'C5' },
  { midi: 75, file: 'Eb5' },
];

const SOUNDFONT_CDNS = [
  'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/tenor_sax-mp3',
  'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/tenor_sax-mp3',
];

export const JAZZ_TRACKS = [
  {
    id: 'romantic-ibiza-sunset',
    name: 'שקיעה רומנטית באיביזה',
    subtitle: 'Romantic Ibiza Sunset · 114 BPM',
    bpm: 114,
    style: 'sunset',
    bars: [
      {
        // Am9 — soaring romantic tenor sax phrasing with natural breath rests
        pad: [57, 60, 64, 67, 71],
        bass: [
          { beat: 0.0, midi: 45, dur: 1.5 },
          { beat: 2.0, midi: 45, dur: 1.2 },
          { beat: 3.5, midi: 43, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 60, dur: 0.9, vel: 0.85, scoop: true },
          { beat: 1.0, midi: 64, dur: 0.85, vel: 0.92, scoop: true },
          { beat: 2.0, midi: 67, dur: 1.5, vel: 1.0, scoop: true },
          // Breath space on beat 3.5..4.0
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
          { beat: 0.25, midi: 69, dur: 1.35, vel: 0.96, scoop: true },
          { beat: 1.75, midi: 67, dur: 0.65, vel: 0.84 },
          { beat: 2.5, midi: 64, dur: 1.15, vel: 0.88 },
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
          { beat: 0.0, midi: 64, dur: 0.85, vel: 0.88, scoop: true },
          { beat: 1.0, midi: 67, dur: 0.85, vel: 0.94, scoop: true },
          { beat: 2.0, midi: 71, dur: 1.55, vel: 1.0, scoop: true },
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
          { beat: 0.25, midi: 69, dur: 1.1, vel: 0.92, scoop: true },
          { beat: 1.5, midi: 67, dur: 0.85, vel: 0.86 },
          { beat: 2.5, midi: 64, dur: 1.0, vel: 0.82 },
          // Natural breathing pause before loop
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
        // Fmaj9 — warm, breathy lower-mid tenor register (D3–C5)
        pad: [53, 57, 60, 64, 67],
        bass: [
          { beat: 0.0, midi: 41, dur: 2.2 },
          { beat: 2.5, midi: 48, dur: 1.4 },
        ],
        melody: [
          { beat: 0.25, midi: 57, dur: 1.35, vel: 0.82, scoop: true },
          { beat: 1.75, midi: 60, dur: 1.65, vel: 0.94, scoop: true },
          // Breath space
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
          { beat: 0.0, midi: 64, dur: 1.45, vel: 0.96, scoop: true },
          { beat: 1.75, midi: 62, dur: 0.75, vel: 0.84 },
          { beat: 2.6, midi: 60, dur: 1.05, vel: 0.86 },
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
          { beat: 0.25, midi: 58, dur: 1.15, vel: 0.86, scoop: true },
          { beat: 1.5, midi: 62, dur: 1.75, vel: 0.98, scoop: true },
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
          { beat: 0.0, midi: 60, dur: 1.3, vel: 0.9, scoop: true },
          { beat: 1.5, midi: 58, dur: 0.85, vel: 0.82 },
          { beat: 2.5, midi: 57, dur: 1.1, vel: 0.8 },
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
        // Dm9 — catchy uplifting Ibiza beach-club tenor hook with breathing room
        pad: [53, 57, 60, 64],
        bass: [
          { beat: 0.0, midi: 38, dur: 0.45 },
          { beat: 0.75, midi: 45, dur: 0.35 },
          { beat: 1.5, midi: 38, dur: 0.45 },
          { beat: 2.5, midi: 45, dur: 0.45 },
          { beat: 3.25, midi: 48, dur: 0.45 },
        ],
        melody: [
          { beat: 0.0, midi: 62, dur: 0.45, vel: 0.9, scoop: true },
          { beat: 0.5, midi: 65, dur: 0.4, vel: 0.92 },
          { beat: 1.0, midi: 69, dur: 0.85, vel: 0.98, scoop: true },
          { beat: 2.25, midi: 67, dur: 0.45, vel: 0.86 },
          { beat: 2.75, midi: 65, dur: 0.75, vel: 0.9 },
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
          { beat: 0.0, midi: 64, dur: 0.45, vel: 0.88, scoop: true },
          { beat: 0.5, midi: 67, dur: 0.4, vel: 0.92 },
          { beat: 1.0, midi: 71, dur: 0.9, vel: 1.0, scoop: true },
          { beat: 2.25, midi: 69, dur: 0.95, vel: 0.92 },
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
          { beat: 0.0, midi: 67, dur: 0.5, vel: 0.92, scoop: true },
          { beat: 0.75, midi: 72, dur: 0.9, vel: 1.0, scoop: true },
          { beat: 2.0, midi: 71, dur: 0.5, vel: 0.88 },
          { beat: 2.75, midi: 67, dur: 0.8, vel: 0.9 },
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
          { beat: 0.0, midi: 64, dur: 0.85, vel: 0.94, scoop: true },
          { beat: 1.25, midi: 67, dur: 0.65, vel: 0.9 },
          { beat: 2.25, midi: 64, dur: 1.1, vel: 0.88, scoop: true },
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
        // Dm7 funky tenor riff
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
          { beat: 0.0, midi: 57, dur: 0.45, vel: 0.9, scoop: true },
          { beat: 0.5, midi: 60, dur: 0.35, vel: 0.86 },
          { beat: 1.0, midi: 62, dur: 0.5, vel: 0.94, scoop: true },
          { beat: 1.75, midi: 65, dur: 0.85, vel: 1.0, scoop: true },
          { beat: 3.0, midi: 62, dur: 0.55, vel: 0.86 },
        ],
      },
      {
        // G9 funky answer with breathing space
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
          { beat: 1.0, midi: 62, dur: 0.4, vel: 0.84 },
          { beat: 1.5, midi: 60, dur: 0.45, vel: 0.86 },
          { beat: 2.25, midi: 62, dur: 0.95, vel: 0.96, scoop: true },
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
        // Fmaj7 walking bass + soulful tenor solo
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
          { beat: 0.0, midi: 60, dur: 0.65, vel: 0.9, scoop: true },
          { beat: 0.66, midi: 64, dur: 0.4, vel: 0.84 },
          { beat: 1.0, midi: 65, dur: 0.7, vel: 0.94, scoop: true },
          { beat: 2.0, midi: 69, dur: 1.1, vel: 0.98, scoop: true },
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
          { beat: 0.33, midi: 66, dur: 0.65, vel: 0.92, scoop: true },
          { beat: 1.0, midi: 69, dur: 0.55, vel: 0.88 },
          { beat: 1.66, midi: 67, dur: 0.45, vel: 0.84 },
          { beat: 2.33, midi: 62, dur: 1.1, vel: 0.94, scoop: true },
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
          { beat: 0.0, midi: 62, dur: 0.65, vel: 0.9, scoop: true },
          { beat: 0.66, midi: 65, dur: 0.45, vel: 0.86 },
          { beat: 1.33, midi: 67, dur: 0.95, vel: 0.96, scoop: true },
          { beat: 2.66, midi: 65, dur: 0.75, vel: 0.86 },
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
          { beat: 0.0, midi: 64, dur: 0.7, vel: 0.92, scoop: true },
          { beat: 1.0, midi: 67, dur: 0.65, vel: 0.94 },
          { beat: 2.0, midi: 64, dur: 1.1, vel: 0.9, scoop: true },
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

    // Sampled Tenor Saxophone state
    this.sampleBuffers = new Map(); // midi -> AudioBuffer
    this.sampleStatus = 'idle'; // 'idle' | 'loading' | 'ready' | 'fallback'
    this.statusListeners = new Set();
    this.loadPromise = null;

    this.isPlaying = false;
    this.trackIndex = 0;
    this.volume = 0.25;
    this.barIndex = 0;
    this.nextBarTime = 0;
    this.schedulerId = null;
  }

  onStatusChange(cb) {
    this.statusListeners.add(cb);
    cb(this.sampleStatus);
    return () => this.statusListeners.delete(cb);
  }

  _setSampleStatus(status) {
    this.sampleStatus = status;
    this.statusListeners.forEach((cb) => cb(status));
  }

  _createReverbImpulse(ctx, seconds = 2.3, decay = 2.5) {
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

      // Dedicated Warm Tenor Saxophone Bus (gentle low-pass warmth + mid presence)
      this.saxBus = this.ctx.createGain();
      this.saxBus.gain.value = 1.35;

      const saxWarmLP = this.ctx.createBiquadFilter();
      saxWarmLP.type = 'lowpass';
      saxWarmLP.frequency.value = 5200;

      const saxPresenceEQ = this.ctx.createBiquadFilter();
      saxPresenceEQ.type = 'peaking';
      saxPresenceEQ.frequency.value = 1100;
      saxPresenceEQ.Q.value = 1.0;
      saxPresenceEQ.gain.value = 3.2;

      this.saxBus.connect(saxWarmLP);
      saxWarmLP.connect(saxPresenceEQ);
      saxPresenceEQ.connect(this.masterGain);

      // Lush Stereo Hall Reverb
      this.reverbIn = this.ctx.createGain();
      this.reverbIn.gain.value = 0.42;

      const convolver = this.ctx.createConvolver();
      convolver.buffer = this._createReverbImpulse(this.ctx, 2.3, 2.4);

      const reverbLP = this.ctx.createBiquadFilter();
      reverbLP.type = 'lowpass';
      reverbLP.frequency.value = 2800;

      this.reverbIn.connect(convolver);
      convolver.connect(reverbLP);
      reverbLP.connect(this.masterGain);

      // Subtle Stereo Ping-Pong Delay
      this.pingPongIn = this.ctx.createGain();
      this.pingPongIn.gain.value = 0.22;

      const delayL = this.ctx.createDelay(1.0);
      const delayR = this.ctx.createDelay(1.0);
      delayL.delayTime.value = 0.26;
      delayR.delayTime.value = 0.26;

      const fbFilter = this.ctx.createBiquadFilter();
      fbFilter.type = 'lowpass';
      fbFilter.frequency.value = 2100;

      const fbGain = this.ctx.createGain();
      fbGain.gain.value = 0.28;

      const wetGain = this.ctx.createGain();
      wetGain.gain.value = 0.6;

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

      saxPresenceEQ.connect(this.reverbIn);
      saxPresenceEQ.connect(this.pingPongIn);

      this.masterGain.connect(this.ctx.destination);

      // Noise buffer for drums & fallback breath
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

  /**
   * Fetch and decode real FluidR3_GM Tenor Saxophone MP3 samples from CDN.
   * Gracefully falls back to offline synth if network is unavailable.
   */
  async _loadTenorSamples() {
    if (this.sampleBuffers.size > 0) {
      this._setSampleStatus('ready');
      return;
    }
    if (this.loadPromise) return this.loadPromise;

    this._setSampleStatus('loading');

    this.loadPromise = (async () => {
      const fetchOne = async (anchor) => {
        for (const base of SOUNDFONT_CDNS) {
          try {
            const resp = await fetch(`${base}/${anchor.file}.mp3`, { mode: 'cors' });
            if (!resp.ok) continue;
            const arrayBuf = await resp.arrayBuffer();
            const audioBuf = await this.ctx.decodeAudioData(arrayBuf.slice(0));
            this.sampleBuffers.set(anchor.midi, audioBuf);
            return true;
          } catch {
            // Try next CDN
          }
        }
        return false;
      };

      await Promise.all(TENOR_SAMPLE_ANCHORS.map(fetchOne));

      if (this.sampleBuffers.size >= 4) {
        this._setSampleStatus('ready');
      } else {
        this._setSampleStatus('fallback');
      }
    })();

    return this.loadPromise;
  }

  _findNearestSample(targetMidi) {
    let bestMidi = null;
    let bestDist = Infinity;
    for (const midi of this.sampleBuffers.keys()) {
      const dist = Math.abs(midi - targetMidi);
      if (dist < bestDist) {
        bestDist = dist;
        bestMidi = midi;
      }
    }
    if (bestMidi === null) return null;
    return {
      buffer: this.sampleBuffers.get(bestMidi),
      semitoneOffset: targetMidi - bestMidi,
    };
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

  async start() {
    this._ensureContext();
    if (this.isPlaying) return;

    // Kick off real Tenor Saxophone sample loading immediately (non-blocking if cached)
    if (this.sampleBuffers.size === 0) {
      await this._loadTenorSamples();
    }

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

    // 1. Supportive rhythm section
    this._scheduleDrums(style, barStart, beatDur);

    // 2. Warm Rhodes / Sidechained Sunset Pad
    if (isPadStyle && bar.pad) {
      this._playWarmPad(bar.pad, barStart, beatDur, style);
    } else if (bar.chords) {
      bar.chords.forEach((c) => {
        this._playRhodesChord(c.notes, barStart + c.beat * beatDur, c.dur * beatDur);
      });
    }

    // 3. Supportive bassline
    bar.bass.forEach((b) => {
      this._playBassNote(b.midi, barStart + b.beat * beatDur, b.dur * beatDur, style);
    });

    // 4. Real Sampled Tenor Saxophone Lead (or seamless offline fallback)
    bar.melody.forEach((n) => {
      const jitter = (Math.random() - 0.5) * 0.008;
      const startTime = Math.max(this.ctx.currentTime, barStart + n.beat * beatDur + jitter);
      const duration = n.dur * beatDur;
      const velocity = n.vel || 0.9;
      const scoop = Boolean(n.scoop);

      if (this.sampleBuffers.size > 0) {
        this._playSampledTenorSax(n.midi, startTime, duration, velocity, scoop, style);
      } else {
        this._playFallbackSynthSax(n.midi, startTime, duration, velocity, scoop, style);
      }
    });
  }

  /**
   * Plays a real studio-sampled FluidR3_GM Tenor Saxophone note with:
   * - Upward pitch-bend scoop (-120 -> 0 cents over 65-90ms)
   * - Delayed human vibrato (~5.2 Hz starting 350ms after onset)
   * - Natural breath attack & dynamic swell on long notes
   */
  _playSampledTenorSax(midi, startTime, duration, velocity, scoop, style) {
    const nearest = this._findNearestSample(midi);
    if (!nearest) return;

    const ctx = this.ctx;
    const isRomantic = style === 'sunset' || style === 'lounge';

    const src = ctx.createBufferSource();
    src.buffer = nearest.buffer;

    // Base detune in cents to match exact pitch
    const baseDetune = nearest.semitoneOffset * 100;

    // Expressive upward scoop (-120 -> 0 cents) on emotional/accented notes
    if (scoop) {
      const scoopCents = isRomantic ? -120 : -95;
      const glideTime = isRomantic ? 0.088 : 0.062;
      src.detune.setValueAtTime(baseDetune + scoopCents, startTime);
      src.detune.linearRampToValueAtTime(baseDetune, startTime + glideTime);
    } else {
      src.detune.setValueAtTime(baseDetune, startTime);
    }

    // Gentle delayed vibrato (~5.2 Hz) kicking in 350ms after note onset
    let lfo = null;
    if (duration > 0.42) {
      lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 5.2;

      const vibDelay = 0.35;
      lfoGain.gain.setValueAtTime(0, startTime);
      lfoGain.gain.setValueAtTime(0, startTime + vibDelay);
      lfoGain.gain.linearRampToValueAtTime(
        isRomantic ? 22 : 16,
        startTime + Math.min(duration, vibDelay + 0.32)
      );

      lfo.connect(lfoGain);
      lfoGain.connect(src.detune);
      lfo.start(startTime);
      lfo.stop(startTime + duration + 0.2);
    }

    // Dynamic breath & swell envelope
    const gain = ctx.createGain();
    const peak = 0.68 * velocity;
    const attack = isRomantic ? 0.055 : 0.025;
    const release = isRomantic ? 0.18 : 0.11;

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak * 0.88, startTime + attack);
    // Expressive swell on sustained notes
    if (duration > 0.5) {
      gain.gain.linearRampToValueAtTime(peak, startTime + duration * 0.55);
    }
    gain.gain.setValueAtTime(peak * 0.9, startTime + Math.max(attack + 0.02, duration - 0.06));
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + release);

    src.connect(gain);
    gain.connect(this.saxBus);

    src.start(startTime);
    src.stop(startTime + duration + release + 0.05);
  }

  /**
   * Seamless offline fallback synth if the user has no internet connection and samples aren't cached.
   */
  _playFallbackSynthSax(midi, startTime, duration, velocity, scoop, style) {
    const ctx = this.ctx;
    const freq = midiToFreq(midi);
    const isRomantic = style === 'sunset' || style === 'lounge';

    const oscReed = ctx.createOscillator();
    const oscBody = ctx.createOscillator();
    oscReed.type = 'sawtooth';
    oscBody.type = 'triangle';

    const scoopRatio = scoop ? 0.935 : 0.994;
    const glideTime = scoop ? 0.08 : 0.02;

    oscReed.frequency.setValueAtTime(freq * scoopRatio, startTime);
    oscReed.frequency.exponentialRampToValueAtTime(freq, startTime + glideTime);
    oscBody.frequency.setValueAtTime(freq * scoopRatio * 1.002, startTime);
    oscBody.frequency.exponentialRampToValueAtTime(freq * 1.001, startTime + glideTime);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 2.2;
    filter.frequency.setValueAtTime(520, startTime);
    filter.frequency.exponentialRampToValueAtTime(isRomantic ? 2100 : 2400, startTime + 0.11);
    filter.frequency.exponentialRampToValueAtTime(980, startTime + Math.max(0.16, duration));

    const gain = ctx.createGain();
    const peak = 0.28 * velocity;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + 0.05);
    gain.gain.setValueAtTime(peak * 0.85, startTime + Math.max(0.07, duration - 0.08));
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.1);

    const bodyMix = ctx.createGain();
    bodyMix.gain.value = 0.78;

    oscReed.connect(filter);
    oscBody.connect(bodyMix);
    bodyMix.connect(filter);
    filter.connect(gain);
    gain.connect(this.saxBus);

    oscReed.start(startTime);
    oscBody.start(startTime);
    oscReed.stop(startTime + duration + 0.14);
    oscBody.stop(startTime + duration + 0.14);
  }

  _scheduleDrums(style, barStart, beatDur) {
    if (style === 'sunset') {
      for (let b = 0; b < 4; b++) {
        this._playHouseKick(barStart + b * beatDur, 0.16, 130);
        this._playCymbal(barStart + (b + 0.5) * beatDur, 0.04, 0.075, 7600);
      }
      this._playHouseClap(barStart + 1 * beatDur, 0.06);
      this._playHouseClap(barStart + 3 * beatDur, 0.06);
    } else if (style === 'lounge') {
      this._playHouseKick(barStart, 0.12, 110);
      this._playHouseKick(barStart + 2.5 * beatDur, 0.095, 105);
      for (let i = 0; i < 8; i++) {
        this._playCymbal(barStart + i * 0.5 * beatDur, i % 2 === 0 ? 0.028 : 0.015, 0.055, 7200);
      }
    } else if (style === 'ibiza') {
      for (let b = 0; b < 4; b++) {
        this._playHouseKick(barStart + b * beatDur, 0.21, 155);
        this._playCymbal(barStart + (b + 0.5) * beatDur, 0.06, 0.095, 7800);
      }
      this._playHouseClap(barStart + 1 * beatDur, 0.095);
      this._playHouseClap(barStart + 3 * beatDur, 0.095);
    } else if (style === 'funk') {
      for (let i = 0; i < 16; i++) {
        const accent = i % 4 === 0 ? 0.05 : i % 2 === 0 ? 0.028 : 0.014;
        this._playCymbal(barStart + i * 0.25 * beatDur, accent, 0.032, 8600);
      }
      [0, 0.75, 2.25].forEach((b) => this._playHouseKick(barStart + b * beatDur, 0.19, 145));
      [1, 3].forEach((b) => this._playHouseClap(barStart + b * beatDur, 0.09));
    } else {
      [0, 1, 1.66, 2, 3, 3.66].forEach((b) => {
        const accent = b === 1 || b === 3 ? 0.07 : 0.045;
        this._playCymbal(barStart + b * beatDur, accent, 0.085, 7500);
      });
      this._playHouseKick(barStart, 0.1, 115);
    }
  }

  _playWarmPad(midiNotes, barStart, beatDur, style) {
    const ctx = this.ctx;
    const barDur = beatDur * 4;
    const padGain = ctx.createGain();
    const baseLevel = style === 'lounge' ? 0.048 : 0.052;

    if (style === 'lounge') {
      padGain.gain.setValueAtTime(0.0001, barStart);
      padGain.gain.linearRampToValueAtTime(baseLevel, barStart + 0.35);
      padGain.gain.setValueAtTime(baseLevel * 0.85, barStart + barDur - 0.3);
      padGain.gain.linearRampToValueAtTime(0.0001, barStart + barDur + 0.15);
    } else {
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
    lp.frequency.value = style === 'ibiza' ? 1200 : 1020;

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

  _playRhodesChord(midiNotes, startTime, duration) {
    const ctx = this.ctx;
    const chordGain = ctx.createGain();
    const level = 0.052;
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
    filter.frequency.setValueAtTime(isSynthBass ? 460 : 300, startTime);
    filter.frequency.exponentialRampToValueAtTime(155, startTime + duration);

    const gain = ctx.createGain();
    const peak = style === 'lounge' ? 0.16 : 0.18;
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
