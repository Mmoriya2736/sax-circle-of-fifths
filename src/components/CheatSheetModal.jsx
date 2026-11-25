import React, { useState, useEffect } from 'react';
import { X, BookOpen, CircleDot, Table2 } from 'lucide-react';
import CircleOfFifthsSVG from './CircleOfFifthsSVG';
import {
  SIGNATURE_ROWS,
  noteToHebrew,
  getSaxTransposition,
} from '../data/circleOfFifths';

export default function CheatSheetModal({ isOpen, onClose, saxMode }) {
  const [activeTab, setActiveTab] = useState('circle'); // 'circle' | 'table'

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const naturalRows = SIGNATURE_ROWS.filter((r) => r.accidentalType === 'none');
  const sharpRows = SIGNATURE_ROWS.filter((r) => r.accidentalType === 'sharp');
  const flatRows = SIGNATURE_ROWS.filter((r) => r.accidentalType === 'flat');
  const showSaxCol = saxMode === 'eb' || saxMode === 'bb';

  const renderTable = (title, accentClass, rows) => (
    <div className="space-y-2">
      <h3 className={`text-xs font-bold tracking-wide ${accentClass}`}>{title}</h3>
      <div className="overflow-x-auto rounded-xl border border-slate-800/90 bg-slate-950/65">
        <table className="w-full text-right text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] text-slate-400 bg-slate-900/70">
              <th className="py-2 px-3 font-semibold">סימני היתק</th>
              <th className="py-2 px-3 font-semibold">מז&apos;ור</th>
              <th className="py-2 px-3 font-semibold">מינור מקביל</th>
              <th className="py-2 px-3 font-semibold">התווים המוסטים</th>
              {showSaxCol && (
                <th className="py-2 px-3 font-semibold text-amber-300">
                  {saxMode === 'eb' ? 'אלט/בריטון (E♭)' : 'טנור/סופרן (B♭)'}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rows.map((row) => {
              const badge =
                row.accidentalCount === 0
                  ? '0'
                  : `${row.accidentalCount}${row.accidentalType === 'sharp' ? '♯' : '♭'}`;
              const saxMaj = showSaxCol
                ? getSaxTransposition(row.circlePosition, 'major')[saxMode]
                : null;

              return (
                <tr
                  key={`${row.accidentalType}-${row.accidentalCount}`}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-2 px-3">
                    <span
                      dir="ltr"
                      className={`music-ltr font-mono-music font-bold px-2 py-0.5 rounded-md text-xs ${
                        row.accidentalType === 'sharp'
                          ? 'bg-amber-500/15 text-amber-300'
                          : row.accidentalType === 'flat'
                          ? 'bg-sky-500/15 text-sky-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {badge}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span dir="ltr" className="music-ltr font-bold text-slate-100">
                      {row.major.label}
                    </span>{' '}
                    <span className="text-[11px] text-slate-400">
                      ({row.major.hebrewShort})
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span dir="ltr" className="music-ltr font-bold text-sky-200">
                      {row.minor.label}
                    </span>{' '}
                    <span className="text-[11px] text-slate-400">
                      ({row.minor.hebrewShort})
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    {row.accidentals.length === 0 ? (
                      <span className="text-slate-500">ללא</span>
                    ) : (
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span
                          dir="ltr"
                          className="music-ltr font-mono-music text-slate-200 text-xs"
                        >
                          {row.accidentals.join(', ')}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          ({row.accidentals.map(noteToHebrew).join(', ')})
                        </span>
                      </div>
                    )}
                  </td>
                  {showSaxCol && saxMaj && (
                    <td className="py-2 px-3">
                      <span
                        dir="ltr"
                        className="music-ltr font-mono-music font-semibold text-amber-200 text-xs"
                      >
                        {saxMaj.writtenLabel} ({saxMaj.signature})
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fade-slide-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="הצג מעגל מלא וטבלת סולמות לעזרה"
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-amber-500/35 shadow-[0_24px_60px_rgba(0,0,0,0.75)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-800 bg-slate-900/95">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/35 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-50">
                מעגל הקווינטות המלא וטבלת סולמות לעזרה
              </h2>
              <p className="text-xs text-slate-400">
                עיון מהיר בכל 15 סולמות המז&apos;ור והמינור המקבילים
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="סגור"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="px-5 pt-3 pb-2 bg-slate-900/90 border-b border-slate-800/70 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('circle')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'circle'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5" />
            <span>מעגל מלא</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('table')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'table'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Table2 className="w-3.5 h-3.5" />
            <span>טבלת סולמות</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {activeTab === 'circle' ? (
            <div className="flex flex-col items-center py-2 space-y-4">
              <CircleOfFifthsSVG isReference maxWidthClass="max-w-[410px]" />
              <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  טבעת חיצונית: סולמות מז&apos;ור
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  טבעת פנימית: סולמות מינור מקבילים
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {renderTable('ללא דיאזים או במולים (0)', 'text-slate-300', naturalRows)}
              {renderTable('סולמות עם דיאזים (1♯ עד 7♯)', 'text-amber-400', sharpRows)}
              {renderTable('סולמות עם במולים (1♭ עד 7♭)', 'text-sky-400', flatRows)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
