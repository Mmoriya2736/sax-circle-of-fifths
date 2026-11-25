import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
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

  const handleSelectTrack = (idx) => {
    setTrackIndex(idx);
    jazzAudioEngine.setTrack(idx);
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
      className={`w-full rounded-2xl border px-3.5 py-3 sm:px-4 sm:py-3 backdrop-blur-sm transition-all space-y-2.5 ${
        isPlaying
          ? 'bg-amber-500/[0.08] border-amber-500/35 shadow-[0_0_24px_rgba(245,158,11,0.08)]'
          : 'bg-slate-900/70 border-slate-800/85'
      }`}
    >
      {/* Top row: Play/Pause + Title + Volume */}
      <div className="flex flex-wrap items-center justify-between gap-3">
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
                מוזיקת רקע (סקסופון טנור ג&apos;אז)
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
              {currentTrack.name} ·{' '}
              <span dir="ltr" className="music-ltr">
                {currentTrack.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 mr-auto sm:mr-0">
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

      {/* Direct Track Selector Pills (4 upbeat tenor grooves) */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-800/60">
        {JAZZ_TRACKS.map((track, idx) => {
          const active = idx === trackIndex;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => handleSelectTrack(idx)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                active
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50'
                  : 'bg-slate-950/65 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {track.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
