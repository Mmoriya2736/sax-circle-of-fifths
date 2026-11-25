import React from 'react';
import {
  Eye,
  EyeOff,
  Music,
  ArrowUpDown,
  Compass,
  SlidersHorizontal,
  Languages,
} from 'lucide-react';

function SegmentedControl({ label, icon, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
        {icon}
        <span>{label}</span>
      </div>
      <div className="inline-flex flex-wrap p-1 rounded-full bg-slate-950/90 border border-slate-800/90 gap-0.5">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ControlBar({
  scope,
  onScopeChange,
  promptStyle,
  onPromptStyleChange,
  sortOrder,
  onSortOrderChange,
  saxMode,
  onSaxModeChange,
  showHebrewNotes,
  onToggleHebrewNotes,
  isPeekMode,
  onTogglePeek,
}) {
  return (
    <div className="w-full rounded-2xl bg-slate-900/70 border border-slate-800/90 p-3.5 sm:p-4 backdrop-blur-sm space-y-3.5">
      <div className="flex flex-wrap items-end justify-between gap-3.5">
        <div className="flex flex-wrap items-end gap-3.5">
          <SegmentedControl
            label="מצב תרגול"
            icon={<Compass className="w-3.5 h-3.5 text-amber-400" />}
            value={scope}
            onChange={onScopeChange}
            options={[
              { value: 'major', label: "מז'ור בלבד (חיצוני)" },
              { value: 'minor', label: 'מינור בלבד (פנימי)' },
              { value: 'mixed', label: 'משולב (הכל)' },
            ]}
          />

          <SegmentedControl
            label="סוג שאלות"
            icon={<SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />}
            value={promptStyle}
            onChange={onPromptStyleChange}
            options={[
              { value: 'text', label: 'שאלות טקסט' },
              { value: 'visual', label: 'זיהוי על המעגל' },
              { value: 'both', label: 'מעורב' },
            ]}
          />

          <SegmentedControl
            label="סדר כפתורים"
            icon={<ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />}
            value={sortOrder}
            onChange={onSortOrderChange}
            options={[
              { value: 'chromatic', label: 'סדר כרומטי' },
              { value: 'fifths', label: 'סדר מעגל הקווינטות' },
            ]}
          />
        </div>

        {/* Action buttons: Hebrew note subtitles + Peek / Reference */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggleHebrewNotes}
            title="הצג או הסתר שמות תווים בעברית על כפתורי התשובות"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              showHebrewNotes
                ? 'bg-slate-800 border-amber-500/45 text-amber-200'
                : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span>שמות בעברית</span>
          </button>

          <button
            type="button"
            onClick={onTogglePeek}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              isPeekMode
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.25)]'
                : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-amber-500/60 hover:text-amber-200'
            }`}
          >
            {isPeekMode ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>סגור מעגל מלא</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-amber-400" />
                <span>הצג מעגל מלא</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Subtle Saxophone Transposition Row */}
      <div className="pt-3 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400/90">
            <Music className="w-3.5 h-3.5" />
            <span>תצוגת טרנספוזיציה לסקסופון:</span>
          </div>
          <div className="inline-flex flex-wrap p-1 rounded-full bg-slate-950/85 border border-slate-800/90 gap-0.5">
            {[
              { value: 'concert', label: 'רגיל / קונצרט' },
              { value: 'eb', label: 'סקסופון אלט/בריטון E♭' },
              { value: 'bb', label: 'סקסופון טנור/סופרן B♭' },
            ].map((opt) => {
              const active = saxMode === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSaxModeChange(opt.value)}
                  className={`px-3 py-1 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-amber-500/25 text-amber-200 border border-amber-500/50'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
