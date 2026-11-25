import React from 'react';
import { MAJOR_SCALES, MINOR_SCALES, sortScales } from '../data/circleOfFifths';

export default function AnswerGrid({
  scope,
  sortOrder,
  showHebrewNotes,
  question,
  feedback,
  onAnswer,
}) {
  const majorOptions = sortScales(MAJOR_SCALES, sortOrder);
  const minorOptions = sortScales(MINOR_SCALES, sortOrder);

  const renderSection = (title, accentClass, badgeClass, scales) => (
    <div className="space-y-3">
      {scope === 'mixed' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${badgeClass}`} />
            <h3 className={`text-sm font-bold ${accentClass}`}>{title}</h3>
          </div>
          <span className="text-[11px] text-slate-500">
            {sortOrder === 'chromatic' ? 'סדר כרומטי' : 'סדר מעגל הקווינטות'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
        {scales.map((scale) => {
          const isCorrectScale = feedback && question?.targetScale?.id === scale.id;
          const isChosenWrong =
            feedback && !feedback.isCorrect && feedback.chosenScale?.id === scale.id;
          const isChosenCorrect =
            feedback && feedback.isCorrect && feedback.chosenScale?.id === scale.id;

          let stateClasses =
            'bg-slate-900/90 border-slate-800 text-slate-100 hover:border-amber-500/60 hover:bg-slate-800/90 hover:text-amber-100 active:scale-[0.97]';

          if (isChosenCorrect || isCorrectScale) {
            stateClasses =
              'bg-emerald-600/25 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]';
          } else if (isChosenWrong) {
            stateClasses =
              'bg-rose-600/25 border-rose-400 text-rose-100 animate-shake shadow-[0_0_18px_rgba(244,63,94,0.28)]';
          } else if (feedback) {
            stateClasses = 'bg-slate-900/40 border-slate-800/60 text-slate-500';
          }

          return (
            <button
              key={scale.id}
              type="button"
              disabled={Boolean(feedback)}
              onClick={() => onAnswer(scale)}
              title={`${scale.label} (${scale.hebrewFull})`}
              className={`min-h-[60px] sm:min-h-[64px] px-2.5 py-2 rounded-xl border font-semibold transition-all duration-150 flex flex-col items-center justify-center cursor-pointer disabled:cursor-default select-none ${stateClasses}`}
            >
              <span
                dir="ltr"
                className="music-ltr text-base sm:text-lg font-bold tracking-tight leading-tight"
              >
                {scale.label}
              </span>
              {showHebrewNotes && (
                <span className="text-[11px] font-medium text-slate-400 mt-0.5 leading-tight">
                  {scale.hebrewShort}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 w-full">
      {(scope === 'major' || scope === 'mixed') &&
        renderSection("סולמות מז'ור", 'text-amber-400', 'bg-amber-400', majorOptions)}
      {(scope === 'minor' || scope === 'mixed') &&
        renderSection('סולמות מינור', 'text-sky-400', 'bg-sky-400', minorOptions)}
    </div>
  );
}
