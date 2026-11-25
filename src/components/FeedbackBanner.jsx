import React from 'react';
import { CheckCircle2, XCircle, ArrowLeft, Music2 } from 'lucide-react';
import {
  formatSignatureHe,
  getSaxTransposition,
  noteToHebrew,
} from '../data/circleOfFifths';

export default function FeedbackBanner({
  question,
  feedback,
  saxMode,
  onNext,
}) {
  if (!feedback || !question) return null;

  const { isCorrect } = feedback;
  const target = question.targetScale;

  const sax = getSaxTransposition(target.circlePosition, target.quality);
  const showEb = saxMode === 'eb';
  const showBb = saxMode === 'bb';

  const baseNoteLtr = target.label.replace(/m$/, '');
  const qualityHe = target.quality === 'major' ? "מז'ור" : 'מינור';
  const hebrewAccidentals = target.accidentals.map(noteToHebrew).join(', ');

  return (
    <div
      className={`w-full rounded-2xl border p-4 sm:p-5 animate-fade-slide-up ${
        isCorrect
          ? 'bg-emerald-950/45 border-emerald-500/40'
          : 'bg-rose-950/45 border-rose-500/45'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}

          <div>
            {isCorrect ? (
              <div className="text-sm sm:text-base font-bold text-emerald-300">
                מדויק!{' '}
                <span dir="ltr" className="music-ltr text-emerald-100">
                  {baseNoteLtr}
                </span>{' '}
                {qualityHe}{' '}
                <span className="font-normal text-emerald-200/80">
                  ({target.hebrewFull})
                </span>
              </div>
            ) : (
              <div className="text-sm sm:text-base font-bold text-rose-200 leading-relaxed">
                טעות. התשובה הנכונה היא{' '}
                <span dir="ltr" className="music-ltr text-white font-extrabold">
                  {baseNoteLtr}
                </span>{' '}
                {qualityHe}{' '}
                <span className="font-normal text-rose-100/90">
                  ({formatSignatureHe(target)}
                  {target.accidentals.length > 0 ? `: ${hebrewAccidentals}` : ''})
                </span>
              </div>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
              {target.accidentals.length > 0 && (
                <span>
                  <strong className="text-slate-400 font-medium">סימני היתק:</strong>{' '}
                  <span dir="ltr" className="music-ltr font-mono-music text-slate-100">
                    {target.accidentals.join(', ')}
                  </span>
                </span>
              )}
              <span>
                <strong className="text-slate-400 font-medium">סולם מקביל:</strong>{' '}
                <span dir="ltr" className="music-ltr font-semibold text-slate-100">
                  {target.relativeLabel}
                </span>{' '}
                <span className="text-slate-400">({target.relativeHebrew})</span>
              </span>
            </div>

            {/* Scale notes */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium text-slate-400 ml-1">תווי הסולם:</span>
              <div dir="ltr" className="inline-flex flex-wrap items-center gap-1">
                {target.notes.map((note, idx) => (
                  <span
                    key={`${note}-${idx}`}
                    className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-xs font-mono-music font-semibold text-slate-100"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {!isCorrect && (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-100 shrink-0 cursor-pointer transition-colors"
          >
            <span>לשאלה הבאה</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Saxophone Transposition Hint */}
      {(showEb || showBb) && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
            <Music2 className="w-3.5 h-3.5" />
            <span>
              טרנספוזיציה מקונצרט{' '}
              <span dir="ltr" className="music-ltr text-amber-200">
                {target.label}
              </span>
              :
            </span>
          </div>

          {showEb && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/12 border border-amber-500/30 text-xs">
              <span className="text-amber-300/90 font-medium">
                אלט / בריטון (E♭) מנגן:
              </span>
              <span dir="ltr" className="music-ltr font-bold text-amber-100">
                {sax.eb.writtenLabel}
              </span>
              <span className="text-slate-400">({sax.eb.writtenHebrew})</span>
              <span dir="ltr" className="music-ltr text-[11px] font-mono-music text-amber-300/80">
                [{sax.eb.signature}]
              </span>
            </div>
          )}

          {showBb && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/12 border border-sky-500/30 text-xs">
              <span className="text-sky-300/90 font-medium">
                טנור / סופרן (B♭) מנגן:
              </span>
              <span dir="ltr" className="music-ltr font-bold text-sky-100">
                {sax.bb.writtenLabel}
              </span>
              <span className="text-slate-400">({sax.bb.writtenHebrew})</span>
              <span dir="ltr" className="music-ltr text-[11px] font-mono-music text-sky-300/80">
                [{sax.bb.signature}]
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
