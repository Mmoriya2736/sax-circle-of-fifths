import React from 'react';
import { BookOpen, Music2, ArrowRight } from 'lucide-react';
import {
  CIRCLE_POSITIONS,
  formatSpellingSignatureHe,
  getSaxTransposition,
  noteToHebrew,
} from '../data/circleOfFifths';

export default function PeekStudyPanel({ selectedKey, onExitPeek }) {
  const activeKey = selectedKey || {
    ...CIRCLE_POSITIONS[0].major,
    position: 0,
    quality: 'major',
  };

  const posData = CIRCLE_POSITIONS[activeKey.position];
  const relativeObj =
    activeKey.quality === 'major' ? posData.minor : posData.major;

  const sax = getSaxTransposition(activeKey.position, activeKey.quality);

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-amber-500/35 p-5 sm:p-6 space-y-5 animate-fade-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>מצב עיון — מעגל הקווינטות המלא</span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-50 flex flex-wrap items-baseline gap-2">
            <span dir="ltr" className="music-ltr">
              {activeKey.label}
            </span>
            <span className="text-base sm:text-lg font-medium text-slate-400">
              ({activeKey.hebrewSubtitle})
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            לחץ על כל פלח במעגל כדי לראות את חתימת המפתח, תווי הסולם והטרנספוזיציה לסקסופון.
          </p>
        </div>

        <button
          type="button"
          onClick={onExitPeek}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shrink-0 cursor-pointer transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>חזרה לתרגול</span>
        </button>
      </div>

      {/* Spellings (handles enharmonic pairs cleanly) */}
      <div className="space-y-3">
        {activeKey.spellings.map((sp) => (
          <div
            key={sp.name}
            className="rounded-xl bg-slate-950/75 border border-slate-800 p-4 space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-base font-bold text-slate-100">
                <span dir="ltr" className="music-ltr">
                  {sp.short}
                </span>{' '}
                <span className="text-sm font-medium text-slate-400">
                  ({sp.hebrewNoteName})
                </span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-300">
                {formatSpellingSignatureHe(sp)}
              </span>
            </div>

            {sp.accidentals.length > 0 && (
              <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>סימני היתק:</span>
                <span dir="ltr" className="music-ltr font-mono-music text-slate-100 font-medium">
                  {sp.accidentals.join(' · ')}
                </span>
                <span className="text-slate-500">
                  ({sp.accidentals.map(noteToHebrew).join(', ')})
                </span>
              </div>
            )}

            <div dir="ltr" className="flex flex-wrap items-center gap-1.5 pt-1 justify-end">
              {sp.notes.map((note, idx) => (
                <span
                  key={`${sp.name}-${note}-${idx}`}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono-music font-semibold text-slate-100"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-950/60 border border-slate-800/90 p-3.5">
          <div className="text-[11px] font-semibold text-slate-400">
            {activeKey.quality === 'major' ? 'סולם מינורי מקביל' : "סולם מז'ורי מקביל"}
          </div>
          <div className="mt-1 text-base font-bold text-slate-100 flex items-baseline gap-2">
            <span dir="ltr" className="music-ltr">
              {relativeObj.label}
            </span>
            <span className="text-xs font-normal text-slate-400">
              ({relativeObj.hebrewSubtitle})
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-amber-500/8 border border-amber-500/25 p-3.5 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
            <Music2 className="w-3.5 h-3.5" />
            <span>טרנספוזיציה לסקסופון (מקונצרט)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">אלט / בריטון (E♭):</span>
            <span dir="ltr" className="music-ltr font-bold text-amber-200 font-mono-music">
              {sax.eb.writtenLabel} ({sax.eb.signature})
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">טנור / סופרן (B♭):</span>
            <span dir="ltr" className="music-ltr font-bold text-sky-200 font-mono-music">
              {sax.bb.writtenLabel} ({sax.bb.signature})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
