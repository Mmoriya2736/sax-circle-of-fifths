import React from 'react';
import { Flame, Trophy, Target, Timer, Repeat } from 'lucide-react';

export default function StatsBar({
  streak,
  bestStreak,
  accuracy,
  avgTimeMs,
  sessionTotal,
  weakCount,
}) {
  const avgSec = avgTimeMs > 0 ? `${(avgTimeMs / 1000).toFixed(1)} שנ׳` : '—';
  const accText = sessionTotal > 0 ? `${Math.round(accuracy)}%` : '—';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 w-full">
      <StatCard
        icon={<Flame className="w-4 h-4 text-amber-400" />}
        label="רצף נוכחי"
        value={streak}
        highlight={streak >= 5}
      />
      <StatCard
        icon={<Trophy className="w-4 h-4 text-yellow-400" />}
        label="שיא רצף"
        value={bestStreak}
      />
      <StatCard
        icon={<Target className="w-4 h-4 text-emerald-400" />}
        label="אחוז הצלחה"
        value={accText}
        sub={sessionTotal > 0 ? `${sessionTotal} שאלות` : null}
      />
      <StatCard
        icon={<Timer className="w-4 h-4 text-sky-400" />}
        label="זמן ממוצע"
        value={avgSec}
      />
      <StatCard
        icon={<Repeat className="w-4 h-4 text-rose-400" />}
        label="בחזרה מחוזקת"
        value={weakCount}
        sub={weakCount > 0 ? '2× לאיפוס' : 'הכל שולט'}
        className="col-span-2 sm:col-span-1"
      />
    </div>
  );
}

function StatCard({ icon, label, value, sub, highlight = false, className = '' }) {
  return (
    <div
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-colors ${
        highlight
          ? 'bg-amber-500/10 border-amber-500/35'
          : 'bg-slate-900/75 border-slate-800/90'
      } ${className}`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/90 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-medium text-slate-400 truncate">
          {label}
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-slate-100 leading-tight">
            {value}
          </span>
          {sub && (
            <span className="text-[10.5px] text-slate-500 truncate">{sub}</span>
          )}
        </div>
      </div>
    </div>
  );
}
