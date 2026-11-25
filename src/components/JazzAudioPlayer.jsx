import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  Youtube,
  Disc3,
} from 'lucide-react';
import {
  YOUTUBE_VIDEO_ID,
  ROMANTIC_SAX_TRACKS,
  jazzAudioEngine,
} from '../utils/jazzAudioEngine';

let ytApiLoadPromise = null;

function loadYouTubeIframeAPI() {
  if (typeof window === 'undefined') return Promise.reject();
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiLoadPromise) return ytApiLoadPromise;

  ytApiLoadPromise = new Promise((resolve) => {
    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevReady === 'function') prevReady();
      resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.head.appendChild(tag);
    }
  });

  return ytApiLoadPromise;
}

export default function JazzAudioPlayer({ sfxEnabled, onToggleSfx }) {
  const [sourceMode, setSourceMode] = useState('checking'); // 'checking' | 'local' | 'youtube'
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [prevVolume, setPrevVolume] = useState(0.3);
  const [ytReady, setYtReady] = useState(false);

  const audioRef = useRef(null);
  const ytContainerRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const pendingPlayRef = useRef(false);
  const duckTimerRef = useRef(null);
  const volumeRef = useRef(volume);
  const trackIndexRef = useRef(trackIndex);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  // 1. Probe whether local ./audio/track1.mp3 exists (Primary Mode) or fall back to YouTube
  useEffect(() => {
    let cancelled = false;

    async function checkLocalAudio() {
      try {
        const res = await fetch(ROMANTIC_SAX_TRACKS[0].file, { method: 'HEAD' });
        const ct = (res.headers.get('content-type') || '').toLowerCase();
        const isAudio =
          res.ok &&
          (ct.startsWith('audio/') ||
            ct.includes('octet-stream') ||
            (!ct.includes('text/html') && ct !== ''));
        if (!cancelled) {
          setSourceMode(isAudio ? 'local' : 'youtube');
        }
      } catch {
        if (!cancelled) {
          setSourceMode('youtube');
        }
      }
    }

    checkLocalAudio();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2. Initialize YouTube IFrame Player API when in fallback mode
  useEffect(() => {
    if (sourceMode !== 'youtube') return;
    let destroyed = false;

    loadYouTubeIframeAPI().then((YT) => {
      if (destroyed || !ytContainerRef.current || ytPlayerRef.current) return;

      ytPlayerRef.current = new YT.Player(ytContainerRef.current, {
        height: '120',
        width: '214',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          start: ROMANTIC_SAX_TRACKS[trackIndexRef.current].startSeconds,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            if (destroyed) return;
            event.target.setVolume(Math.round(volumeRef.current * 100));
            setYtReady(true);
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              const startSec = ROMANTIC_SAX_TRACKS[trackIndexRef.current].startSeconds;
              event.target.seekTo(startSec, true);
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            if (destroyed) return;
            if (event.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (
              event.data === YT.PlayerState.PAUSED ||
              event.data === YT.PlayerState.ENDED
            ) {
              setIsPlaying(false);
            }
          },
        },
      });
    });

    return () => {
      destroyed = true;
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        ytPlayerRef.current.destroy();
        ytPlayerRef.current = null;
      }
    };
  }, [sourceMode]);

  // 3. Apply volume changes to whichever player is active
  const applyVolume = useCallback(
    (v) => {
      const clamped = Math.max(0, Math.min(1, v));
      if (sourceMode === 'local' && audioRef.current) {
        audioRef.current.volume = clamped;
      } else if (
        sourceMode === 'youtube' &&
        ytPlayerRef.current &&
        typeof ytPlayerRef.current.setVolume === 'function'
      ) {
        ytPlayerRef.current.setVolume(Math.round(clamped * 100));
      }
    },
    [sourceMode]
  );

  useEffect(() => {
    applyVolume(volume);
  }, [volume, applyVolume]);

  // 4. Register gentle SFX ducking handler
  useEffect(() => {
    const unreg = jazzAudioEngine.registerDuckHandler((durationMs = 950) => {
      if (!isPlaying || volumeRef.current <= 0) return;
      if (duckTimerRef.current) clearTimeout(duckTimerRef.current);

      applyVolume(volumeRef.current * 0.45);
      duckTimerRef.current = setTimeout(() => {
        applyVolume(volumeRef.current);
      }, durationMs);
    });

    return () => {
      unreg();
      if (duckTimerRef.current) clearTimeout(duckTimerRef.current);
    };
  }, [isPlaying, applyVolume]);

  // Play / Pause directly inside user gesture
  const handleTogglePlay = () => {
    if (sourceMode === 'local' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = volume;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setSourceMode('youtube'));
      }
      return;
    }

    // YouTube Fallback Mode
    const player = ytPlayerRef.current;
    if (player && ytReady) {
      if (isPlaying) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.setVolume(Math.round(volume * 100));
        player.playVideo();
        setIsPlaying(true);
      }
    } else {
      pendingPlayRef.current = true;
      setIsPlaying(true);
    }
  };

  // Switch track / jump to chapter timestamp
  const handleSelectTrack = (idx) => {
    const nextIdx = ((idx % ROMANTIC_SAX_TRACKS.length) + ROMANTIC_SAX_TRACKS.length) % ROMANTIC_SAX_TRACKS.length;
    setTrackIndex(nextIdx);
    const track = ROMANTIC_SAX_TRACKS[nextIdx];

    if (sourceMode === 'local' && audioRef.current) {
      audioRef.current.src = track.file;
      audioRef.current.load();
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => setSourceMode('youtube'));
      }
      return;
    }

    // YouTube Fallback Mode: seek directly to chapter timestamp
    const player = ytPlayerRef.current;
    if (player && ytReady) {
      player.setVolume(Math.round(volume * 100));
      player.seekTo(track.startSeconds, true);
      player.playVideo();
      setIsPlaying(true);
    } else {
      pendingPlayRef.current = true;
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    handleSelectTrack(trackIndex + 1);
  };

  const handleToggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume || 0.3);
    }
  };

  const currentTrack = ROMANTIC_SAX_TRACKS[trackIndex];

  return (
    <div
      className={`w-full rounded-2xl border px-3.5 py-3 sm:px-4 sm:py-3 backdrop-blur-sm transition-all space-y-2.5 ${
        isPlaying
          ? 'bg-amber-500/[0.09] border-amber-500/40 shadow-[0_0_24px_rgba(245,158,11,0.1)]'
          : 'bg-slate-900/70 border-slate-800/85'
      }`}
    >
      {/* Hidden HTML5 Audio Element (Primary Local MP3 Mode) */}
      {sourceMode === 'local' && (
        <audio
          ref={audioRef}
          src={currentTrack.file}
          loop
          preload="auto"
          onError={() => setSourceMode('youtube')}
        />
      )}

      {/* Top row: Play/Pause + Track Info + Next + SFX Toggle + Volume */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'השהה מוזיקת רקע' : 'נגן מוזיקת רקע'}
            className={`inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_14px_rgba(245,158,11,0.45)] hover:bg-amber-400'
                : 'bg-slate-800 text-amber-300 border border-amber-500/40 hover:bg-amber-500/15'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>השהה</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>נגן</span>
              </>
            )}
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                Angelo Torres — Romantic Sax
              </span>
              {isPlaying && (
                <span className="inline-flex items-end gap-0.5 h-3" aria-hidden="true">
                  <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                  <span className="w-0.5 bg-amber-300 rounded-full animate-eq-2" />
                  <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
                </span>
              )}
              {sourceMode === 'local' && (
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <Disc3 className="w-3 h-3" />
                  MP3 מקומי
                </span>
              )}
              {sourceMode === 'youtube' && (
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  <Youtube className="w-3 h-3" />
                  YouTube אודיו
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {currentTrack.name}
            </div>
          </div>
        </div>

        {/* Right controls: Next Track + Independent SFX Toggle + Volume Slider */}
        <div className="flex flex-wrap items-center gap-2.5 mr-auto sm:mr-0">
          <button
            type="button"
            onClick={handleNextTrack}
            title="דלג לקטע הבא"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-800/85 hover:bg-slate-700/90 border border-slate-700/80 text-[11px] font-semibold text-slate-200 hover:text-amber-200 transition-colors cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5 text-amber-400" />
            <span>קטע הבא</span>
          </button>

          <button
            type="button"
            onClick={onToggleSfx}
            title="הפעל או השתק אפקטים קוליים של עידוד ובוז"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
              sfxEnabled
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/20'
                : 'bg-slate-900/90 border-slate-700/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles
              className={`w-3.5 h-3.5 ${sfxEnabled ? 'text-emerald-400' : 'text-slate-500'}`}
            />
            <span>אפקטים קוליים (עידוד/בוז)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleMute}
              aria-label={volume === 0 ? 'בטל השתקה' : 'השתק'}
              className="text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              {volume === 0 ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="עוצמת שמע"
              dir="ltr"
              className="brass-slider w-20 sm:w-24 cursor-pointer"
            />
            <span className="text-[10.5px] font-mono-music text-slate-400 w-7 text-left">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* 5 Track / Chapter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-800/60">
        {ROMANTIC_SAX_TRACKS.map((track, idx) => {
          const active = idx === trackIndex;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => handleSelectTrack(idx)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                active
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-950/65 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {track.shortName}
            </button>
          );
        })}
      </div>

      {/* Compact Minimized YouTube Player (only mounted in Fallback Mode, stays sleek & compliant with mobile gestures) */}
      {sourceMode === 'youtube' && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isPlaying ? 'max-h-36 pt-1 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3 rounded-xl bg-slate-950/80 border border-slate-800/90 p-2">
            <div className="rounded-lg overflow-hidden shrink-0 border border-slate-800">
              <div ref={ytContainerRef} />
            </div>
            <div className="text-xs text-slate-400 space-y-1 min-w-0">
              <div className="font-semibold text-slate-200 truncate">
                {currentTrack.name}
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                מנגן ישירות מ-YouTube (אוסף הסקסופון הרומנטי של Angelo Torres). ניתן להחליף קטעים למעלה או לשמור קבצי MP3 בתיקיית{' '}
                <span dir="ltr" className="music-ltr text-amber-300/90 font-mono-music">
                  public/audio/
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
