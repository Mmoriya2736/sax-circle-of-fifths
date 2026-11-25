import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  Disc3,
} from 'lucide-react';
import { ROMANTIC_SAX_TRACKS, jazzAudioEngine } from '../utils/jazzAudioEngine';

export default function JazzAudioPlayer({ sfxEnabled, onToggleSfx }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [prevVolume, setPrevVolume] = useState(0.3);
  const [loadError, setLoadError] = useState(false);

  const audioRef = useRef(null);
  const duckTimerRef = useRef(null);
  const volumeRef = useRef(volume);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const applyVolume = useCallback((v) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, v));
    }
  }, []);

  useEffect(() => {
    applyVolume(volume);
  }, [volume, applyVolume]);

  // Register gentle SFX ducking handler
  useEffect(() => {
    const unreg = jazzAudioEngine.registerDuckHandler((durationMs = 950) => {
      if (!isPlayingRef.current || volumeRef.current <= 0) return;
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
  }, [applyVolume]);

  const playTrackAtIndex = useCallback(
    (idx, shouldPlay = true) => {
      const nextIdx =
        ((idx % ROMANTIC_SAX_TRACKS.length) + ROMANTIC_SAX_TRACKS.length) %
        ROMANTIC_SAX_TRACKS.length;
      setTrackIndex(nextIdx);
      setLoadError(false);

      const audio = audioRef.current;
      if (!audio) return;

      audio.src = ROMANTIC_SAX_TRACKS[nextIdx].file;
      audio.load();
      audio.volume = volumeRef.current;

      if (shouldPlay) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
            setLoadError(true);
          });
      }
    },
    []
  );

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setLoadError(false);
      audio.volume = volume;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          setLoadError(true);
        });
    }
  };

  const handleSelectTrack = (idx) => {
    playTrackAtIndex(idx, isPlaying || true);
  };

  const handleNextTrack = () => {
    playTrackAtIndex(trackIndex + 1, isPlaying);
  };

  // Continuous loop: when a track finishes, automatically play the next track
  const handleTrackEnded = () => {
    playTrackAtIndex(trackIndex + 1, true);
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
      {/* Pure Ad-Free HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.file}
        preload="metadata"
        onEnded={handleTrackEnded}
        onError={() => {
          setIsPlaying(false);
          setLoadError(true);
        }}
      />

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
                מוזיקת רקע (סקסופון רומנטי)
              </span>
              {isPlaying && (
                <span className="inline-flex items-end gap-0.5 h-3" aria-hidden="true">
                  <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                  <span className="w-0.5 bg-amber-300 rounded-full animate-eq-2" />
                  <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25">
                <Disc3 className="w-3 h-3" />
                MP3 ללא פרסומות
              </span>
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {loadError
                ? `קובץ השמע ${currentTrack.file} לא נמצא בתיקיית public/audio/`
                : currentTrack.name}
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

      {/* 5 Local MP3 Track Pills */}
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
    </div>
  );
}
