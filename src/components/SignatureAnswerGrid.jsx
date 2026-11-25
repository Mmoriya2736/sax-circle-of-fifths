import React from 'react';
import { SIGNATURE_OPTIONS, isAnswerCorrect } from '../utils/quizEngine';

export default function SignatureAnswerGrid({ question, feedback, onAnswer }) {
  const renderButton = (opt, accentHoverClass, fullWidth = false) => {
    const isCorrectOpt = feedback && isAnswerCorrect(question, opt);
    const isChosenWrong =
      feedback && !feedback.isCorrect && feedback.chosenOption?.id === opt.id;
    const isChosenCorrect =
      feedback && feedback.isCorrect && feedback.chosenOption?.id === opt.id;

    let stateClasses = `bg-slate-900/90 border-slate-800 text-slate-100 ${accentHoverClass} active:scale-[0.97]`;

    if (isChosenCorrect || isCorrectOpt) {
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
        key={opt.id}
        type="button"
        disabled={Boolean(feedback)}
        onClick={() => onAnswer(opt)}
        className={`${
          fullWidth ? 'w-full py-3 px-4 flex-row gap-2.5' : 'min-h-[60px] sm:min-h-[64px] px-2 py-2 flex-col'
        } rounded-xl border font-semibold transition-all duration-150 flex items-center justify-center cursor-pointer disabled:cursor-default select-none ${stateClasses}`}
      >
        <span
          dir="ltr"
          className={`music-ltr font-mono-music font-extrabold leading-tight ${
            fullWidth ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
          }`}
        >
          {opt.badge}
        </span>
        <span className="text-[11px] font-medium text-slate-400 leading-tight">
          ({opt.hebrewLabel})
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-4 w-full">
      {/* 0 — No Sharps or Flats */}
      <div>
        {renderButton(
          SIGNATURE_OPTIONS.natural,
          'hover:border-slate-500 hover:bg-slate-800/90 hover:text-white',
          true
        )}
      </div>

      {/* Sharps Group (1# - 7#) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <h3 className="text-xs font-bold text-amber-400">דיאזים (♯)</h3>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {SIGNATURE_OPTIONS.sharps.map((opt) =>
            renderButton(
              opt,
              'hover:border-amber-500/65 hover:bg-amber-500/10 hover:text-amber-100'
            )
          )}
        </div>
      </div>

      {/* Flats Group (1b - 7b) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
          <h3 className="text-xs font-bold text-sky-400">במולים (♭)</h3>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {SIGNATURE_OPTIONS.flats.map((opt) =>
            renderButton(
              opt,
              'hover:border-sky-500/65 hover:bg-sky-500/10 hover:text-sky-100'
            )
          )}
        </div>
      </div>
    </div>
  );
}
