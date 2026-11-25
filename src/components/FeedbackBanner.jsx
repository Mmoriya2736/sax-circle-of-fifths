import React from 'react';
import { CheckCircle2, XCircle, ArrowLeft, Music2 } from 'lucide-react';
import {
  formatSpellingSignatureHe,
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
  const target = question.targetKey;
  const activeSpelling = question.activeSpelling || target.spellings[0];
  const altSpelling =
    target.spellings.length > 1
      ? target.spellings.find((s) => s.name !== activeSpelling.name)
      : null;

  const sax = getSaxTransposition(target.position, target.quality);
  const showEb = saxMode === 'eb';
  const showBb = saxMode === 'bb';

  const baseNoteLtr = activeSpelling.short.replace(/m$/, '');
  const qualityHe = target.quality === 'major' ? "מז'ור" : 'מינור';
  const hebrewAccidentalsList = activeSpelling.accidentals
    .map(noteToHebrew)
    .join(', ');

  return (
    <div
      className={`w-full rounded-2xl border p-4 animate-fade-slide-up ${
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
            <div className="flex flex-wrap items-center gap-2">
              {isCorrect ? (
                <span className="text-sm font-bold text-emerald-300">
                  מדויק!{' '}
                  <span dir="ltr" className="music-ltr text-emerald-100">
                    {baseNoteLtr}
                  </span>{' '}
                  {qualityHe} ({activeSpelling.hebrewNoteName})
                </span>
              ) : (
                <span className="text-sm font-bold text-rose-200 leading-relaxed">
                  התשובה הנכונה היא{' '}
                  <span dir="ltr" className="music-ltr text-white font-extrabold">
                    {baseNoteLtr}
                  </span>{' '}
                  {qualityHe}{' '}
                  <span className="font-normal text-rose-100/90">
                    ({formatSpellingSignatureHe(activeSpelling)}
                    {activeSpelling.accidentals.length > 0
                      ? `: ${hebrewAccidentalsList}`
                      : ''}
                    )
                  </span>
                </span>
              )}

              {altSpelling && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700">
                  אנהרמוני:{' '}
                  <span dir="ltr" className="music-ltr font-semibold">
                    {altSpelling.short}
                  </span>{' '}
                  ({formatSpellingSignatureHe(altSpelling)})
                </span>
              )}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
              <span>
                <strong className="text-slate-400 font-medium">חתימת מפתח:</strong>{' '}
                <span className="text-amber-300 font-medium">
                  {formatSpellingSignatureHe(activeSpelling)}
                </span>
              </span>
              {activeSpelling.accidentals.length > 0 && (
                <span>
                  <strong className="text-slate-400 font-medium">סימני היתק:</strong>{' '}
                  <span dir="ltr" className="music-ltr font-mono-music text-slate-100">
                    {activeSpelling.accidentals.join(', ')}
                  </span>
                </span>
              )}
              <span>
                <strong className="text-slate-400 font-medium">סולם מקביל:</strong>{' '}
                <span dir="ltr" className="music-ltr font-semibold text-slate-100">
                  {target.relativeLabel}
                </span>{' '}
                <span className="text-slate-400">({target.relativeHebrewSubtitle})</span>
              </span>
            </div>

            {/* Scale notes in LTR order */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium text-slate-400 ml-1">תווי הסולם:</span>
              <div dir="ltr" className="inline-flex flex-wrap items-center gap-1">
                {activeSpelling.notes.map((note, idx) => (
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
                {activeSpelling.short}
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
