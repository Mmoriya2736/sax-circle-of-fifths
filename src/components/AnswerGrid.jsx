import React from 'react';
import { MAJOR_KEYS, MINOR_KEYS, sortKeys } from '../data/circleOfFifths';

export default function AnswerGrid({
  scope,
  sortOrder,
  showHebrewNotes,
  question,
  feedback,
  disabled,
  onAnswer,
}) {
  const majorOptions = sortKeys(MAJOR_KEYS, sortOrder);
  const minorOptions = sortKeys(MINOR_KEYS, sortOrder);

  const renderSection = (title, accentClass, keys) => (
    <div className="space-y-2.5">
      {scope === 'mixed' && (
        <div className="flex items-center justify-between">
          <h3 className={`text-xs font-bold ${accentClass}`}>{title}</h3>
          <span className="text-[11px] text-slate-500">
            {sortOrder === 'chromatic' ? 'סדר כרומטי' : 'סדר מעגל הקווינטות'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
        {keys.map((keyObj) => {
          const isCorrectKey = feedback && question?.targetKey?.id === keyObj.id;
          const isChosenWrong =
            feedback && !feedback.isCorrect && feedback.chosenKey?.id === keyObj.id;
          const isChosenCorrect =
            feedback && feedback.isCorrect && feedback.chosenKey?.id === keyObj.id;

          let stateClasses =
            'bg-slate-900/90 border-slate-800 text-slate-100 hover:border-amber-500/60 hover:bg-slate-800/90 hover:text-amber-100 active:scale-[0.98]';

          if (isChosenCorrect || isCorrectKey) {
            stateClasses =
              'bg-emerald-600/25 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]';
          } else if (isChosenWrong) {
            stateClasses =
              'bg-rose-600/25 border-rose-400 text-rose-100 animate-shake shadow-[0_0_18px_rgba(244,63,94,0.28)]';
          } else if (feedback) {
            stateClasses = 'bg-slate-900/40 border-slate-800/60 text-slate-500';
          }

          const isEnharmonic = keyObj.spellings.length > 1;

          return (
            <button
              key={keyObj.id}
              type="button"
              disabled={disabled || Boolean(feedback)}
              onClick={() => onAnswer(keyObj)}
              title={`${keyObj.label} (${keyObj.hebrewSubtitle})`}
              className={`min-h-[58px] sm:min-h-[62px] px-2.5 py-2 rounded-xl border font-semibold transition-all duration-150 flex flex-col items-center justify-center cursor-pointer disabled:cursor-default select-none ${stateClasses}`}
            >
              <span
                dir="ltr"
                className={`music-ltr tracking-tight leading-tight ${
                  isEnharmonic ? 'text-sm sm:text-[15px]' : 'text-base sm:text-lg'
                }`}
              >
                {keyObj.label}
              </span>
              {showHebrewNotes ? (
                <span className="text-[10.5px] font-medium text-slate-400 mt-0.5 leading-tight">
                  {keyObj.hebrewShort}
                </span>
              ) : (
                scope !== 'mixed' && (
                  <span className="text-[10px] font-medium text-slate-500 mt-0.5">
                    {keyObj.quality === 'major' ? "מז'ור" : 'מינור'}
                  </span>
                )
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-5 w-full">
      {(scope === 'major' || scope === 'mixed') &&
        renderSection("סולמות מז'ור (טבעת חיצונית)", 'text-amber-400', majorOptions)}
      {(scope === 'minor' || scope === 'mixed') &&
        renderSection('סולמות מינור (טבעת פנימית)', 'text-sky-400', minorOptions)}
    </div>
  );
}
