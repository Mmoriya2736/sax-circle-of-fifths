import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { jazzAudioEngine, JAZZ_TRACKS } from '../utils/jazzAudioEngine';

export default function JazzAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.25);
  const [prevVolume, setPrevVolume] = useState(0.25);

  useEffect(() => {
    jazzAudioEngine.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    return () => {
      jazzAudioEngine.stop();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      jazzAudioEngine.stop();
      setIsPlaying(false);
    } else {
      jazzAudioEngine.setVolume(volume);
      jazzAudioEngine.start();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    const next = (trackIndex + 1) % JAZZ_TRACKS.length;
    setTrackIndex(next);
    jazzAudioEngine.setTrack(next);
  };

  const handleToggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume || 0.25);
    }
  };

  const currentTrack = JAZZ_TRACKS[trackIndex];

  return (
    <div
      className={`w-full rounded-2xl border px-3.5 py-2.5 sm:px-4 sm:py-3 backdrop-blur-sm transition-all flex flex-wrap items-center justify-between gap-3 ${
        isPlaying
          ? 'bg-amber-500/[0.08] border-amber-500/35 shadow-[0_0_24px_rgba(245,158,11,0.08)]'
          : 'bg-slate-900/65 border-slate-800/85'
      }`}
    >
      {/* Left side (RTL right): Play/Pause + Label & Track info */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'השהה מוזיקת רקע' : 'נגן מוזיקת רקע'}
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
            isPlaying
              ? 'bg-amber-500 text-slate-950 shadow-[0_0_14px_rgba(245,158,11,0.45)] hover:bg-amber-400'
              : 'bg-slate-800 text-amber-400 border border-amber-500/35 hover:bg-amber-500/15'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current mr-0.5" />
          )}
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-100 truncate">
              מוזיקת רקע (סקסופון ג&apos;אז)
            </span>
            {isPlaying && (
              <span className="inline-flex items-end gap-0.5 h-3" aria-hidden="true">
                <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                <span className="w-0.5 bg-amber-300 rounded-full animate-eq-2" />
                <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {currentTrack.name} · {currentTrack.subtitle}
          </div>
        </div>
      </div>

      {/* Track Switcher + Volume Slider */}
      <div className="flex items-center gap-3 mr-auto sm:mr-0">
        <button
          type="button"
          onClick={handleNextTrack}
          title="החלף קטע ג'אז"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/80 text-[11px] font-semibold text-slate-200 hover:text-amber-200 transition-colors cursor-pointer"
        >
          <SkipForward className="w-3.5 h-3.5 text-amber-400" />
          <span>קטע הבא</span>
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
            max="0.8"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="עוצמת שמע"
            dir="ltr"
            className="brass-slider w-20 sm:w-24 cursor-pointer"
          />
          <span className="text-[10.5px] font-mono-music text-slate-400 w-7 text-left">
            {Math.round((volume / 0.8) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
