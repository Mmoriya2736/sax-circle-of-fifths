import React from 'react';

const WHEEL_POSITIONS = [
  { pos: 0, major: 'C', minor: 'Am', sig: '0' },
  { pos: 1, major: 'G', minor: 'Em', sig: '1♯' },
  { pos: 2, major: 'D', minor: 'Bm', sig: '2♯' },
  { pos: 3, major: 'A', minor: 'F♯m', sig: '3♯' },
  { pos: 4, major: 'E', minor: 'C♯m', sig: '4♯' },
  { pos: 5, major: 'B', minor: 'G♯m', sig: '5♯' },
  { pos: 6, major: 'F♯ / G♭', minor: 'D♯m / E♭m', sig: '6♯/6♭' },
  { pos: 7, major: 'D♭', minor: 'B♭m', sig: '5♭' },
  { pos: 8, major: 'A♭', minor: 'Fm', sig: '4♭' },
  { pos: 9, major: 'E♭', minor: 'Cm', sig: '3♭' },
  { pos: 10, major: 'B♭', minor: 'Gm', sig: '2♭' },
  { pos: 11, major: 'F', minor: 'Dm', sig: '1♭' },
];

const CX = 220;
const CY = 220;
const OUTER_R_MAX = 186;
const OUTER_R_MIN = 124;
const INNER_R_MAX = 122;
const INNER_R_MIN = 66;
const SIG_R = 201;

function polarToCartesian(cx, cy, radius, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function createWedgePath(cx, cy, rInner, rOuter, startAngle, endAngle) {
  const outerStart = polarToCartesian(cx, cy, rOuter, startAngle);
  const outerEnd = polarToCartesian(cx, cy, rOuter, endAngle);
  const innerEnd = polarToCartesian(cx, cy, rInner, endAngle);
  const innerStart = polarToCartesian(cx, cy, rInner, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
    `L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

export default function CircleOfFifthsSVG({
  question = null,
  feedback = null,
  isReference = false,
  scope = 'mixed',
  maxWidthClass = 'max-w-[390px]',
}) {
  const isRevealed = Boolean(feedback);
  const targetPos = question?.targetScale?.circlePosition;
  const targetRing = question?.targetScale?.quality;
  const chosenPos = feedback?.chosenScale?.circlePosition;
  const chosenRing = feedback?.chosenScale?.quality;

  const getWedgeStyle = (pos, ring) => {
    const isMajor = ring === 'major';
    const isTarget =
      !isReference &&
      question?.mode === 'visual' &&
      targetPos === pos &&
      targetRing === ring;

    const isCorrectReveal =
      !isReference && isRevealed && targetPos === pos && targetRing === ring;
    const isWrongReveal =
      !isReference &&
      isRevealed &&
      !feedback.isCorrect &&
      chosenPos === pos &&
      chosenRing === ring;

    const isInactiveRing =
      !isReference &&
      ((scope === 'major' && !isMajor) || (scope === 'minor' && isMajor));

    if (isCorrectReveal) {
      return {
        fill: '#059669',
        stroke: '#34d399',
        strokeWidth: 2,
        textFill: '#ffffff',
        showLabel: true,
        isPulsing: false,
      };
    }

    if (isWrongReveal) {
      return {
        fill: '#be123c',
        stroke: '#fb7185',
        strokeWidth: 2,
        textFill: '#ffffff',
        showLabel: true,
        isPulsing: false,
      };
    }

    if (isTarget) {
      return {
        fill: isMajor ? '#d97706' : '#0284c7',
        stroke: isMajor ? '#fcd34d' : '#7dd3fc',
        strokeWidth: 2.3,
        textFill: '#0f172a',
        showLabel: false,
        showQuestionMark: true,
        isPulsing: true,
      };
    }

    if (isReference) {
      return {
        fill: isMajor ? '#172033' : '#101726',
        stroke: '#2b364d',
        strokeWidth: 1.2,
        textFill: isMajor ? '#f8fafc' : '#cbd5e1',
        showLabel: true,
        isPulsing: false,
      };
    }

    return {
      fill: isInactiveRing ? '#0b101b' : isMajor ? '#131b2b' : '#0e1422',
      stroke: isInactiveRing ? '#162033' : '#243047',
      strokeWidth: 1.1,
      textFill: '#64748b',
      showLabel: false,
      isPulsing: false,
    };
  };

  return (
    <div className={`relative flex flex-col items-center justify-center w-full ${maxWidthClass} mx-auto select-none`}>
      <svg
        viewBox="0 0 440 440"
        className="w-full h-auto drop-shadow-[0_14px_32px_rgba(0,0,0,0.55)]"
        role="img"
        aria-label="תרשים מעגל הקווינטות האינטראקטיבי"
      >
        <defs>
          <radialGradient id="hubGradV2" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </radialGradient>
          <linearGradient id="brassRingV2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#b45309" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <circle
          cx={CX}
          cy={CY}
          r={191}
          fill="none"
          stroke="url(#brassRingV2)"
          strokeWidth="1.2"
          opacity="0.45"
        />

        {/* 12 o'clock anchor tick */}
        <polygon
          points={`${CX - 5},23 ${CX + 5},23 ${CX},31`}
          fill="#f59e0b"
          opacity="0.85"
        />

        {!isReference && (
          <>
            <text
              x={CX + 106}
              y={34}
              textAnchor="middle"
              className="fill-amber-400/65 text-[11px] font-semibold"
            >
              דיאזים ♯ ↻
            </text>
            <text
              x={CX - 106}
              y={34}
              textAnchor="middle"
              className="fill-sky-400/65 text-[11px] font-semibold"
            >
              ↺ במולים ♭
            </text>
          </>
        )}

        {WHEEL_POSITIONS.map((item) => {
          const centerAngle = -90 + item.pos * 30;
          const startAngle = centerAngle - 15;
          const endAngle = centerAngle + 15;

          const majorPath = createWedgePath(CX, CY, OUTER_R_MIN, OUTER_R_MAX, startAngle, endAngle);
          const minorPath = createWedgePath(CX, CY, INNER_R_MIN, INNER_R_MAX, startAngle, endAngle);

          const majorTextPos = polarToCartesian(CX, CY, (OUTER_R_MIN + OUTER_R_MAX) / 2, centerAngle);
          const minorTextPos = polarToCartesian(CX, CY, (INNER_R_MIN + INNER_R_MAX) / 2, centerAngle);
          const sigPos = polarToCartesian(CX, CY, SIG_R, centerAngle);

          const majorStyle = getWedgeStyle(item.pos, 'major');
          const minorStyle = getWedgeStyle(item.pos, 'minor');
          const isEnharmonic = item.major.includes('/');

          return (
            <g key={item.pos}>
              {/* Outer Ring — Major */}
              <path
                d={majorPath}
                fill={majorStyle.fill}
                stroke={majorStyle.stroke}
                strokeWidth={majorStyle.strokeWidth}
                className={
                  majorStyle.isPulsing
                    ? 'animate-pulse-brass transition-colors duration-200'
                    : 'transition-colors duration-200'
                }
              />
              {majorStyle.showLabel && (
                <text
                  x={majorTextPos.x}
                  y={majorTextPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  direction="ltr"
                  unicodeBidi="isolate"
                  fill={majorStyle.textFill}
                  className={`font-semibold pointer-events-none ${
                    isEnharmonic ? 'text-[10.5px]' : 'text-[14.5px]'
                  }`}
                >
                  {item.major}
                </text>
              )}
              {majorStyle.showQuestionMark && (
                <text
                  x={majorTextPos.x}
                  y={majorTextPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={majorStyle.textFill}
                  className="text-[19px] font-extrabold pointer-events-none"
                >
                  ?
                </text>
              )}

              {/* Inner Ring — Minor */}
              <path
                d={minorPath}
                fill={minorStyle.fill}
                stroke={minorStyle.stroke}
                strokeWidth={minorStyle.strokeWidth}
                className={
                  minorStyle.isPulsing
                    ? 'animate-pulse-brass transition-colors duration-200'
                    : 'transition-colors duration-200'
                }
              />
              {minorStyle.showLabel && (
                <text
                  x={minorTextPos.x}
                  y={minorTextPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  direction="ltr"
                  unicodeBidi="isolate"
                  fill={minorStyle.textFill}
                  className={`font-medium pointer-events-none ${
                    isEnharmonic ? 'text-[8.2px]' : 'text-[11.5px]'
                  }`}
                >
                  {item.minor}
                </text>
              )}
              {minorStyle.showQuestionMark && (
                <text
                  x={minorTextPos.x}
                  y={minorTextPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={minorStyle.textFill}
                  className="text-[16px] font-extrabold pointer-events-none"
                >
                  ?
                </text>
              )}

              {/* Outer Key Signature Labels */}
              {(isReference || (isRevealed && targetPos === item.pos)) && (
                <text
                  x={sigPos.x}
                  y={sigPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  direction="ltr"
                  unicodeBidi="isolate"
                  className={`font-mono-music pointer-events-none ${
                    isRevealed && targetPos === item.pos
                      ? 'fill-emerald-300 text-[10.5px] font-bold'
                      : 'fill-amber-300/80 text-[9.5px] font-medium'
                  }`}
                >
                  {item.sig}
                </text>
              )}
            </g>
          );
        })}

        {/* Center Medallion */}
        <circle
          cx={CX}
          cy={CY}
          r={63}
          fill="url(#hubGradV2)"
          stroke="url(#brassRingV2)"
          strokeWidth="1.6"
        />

        {isReference ? (
          <g className="pointer-events-none">
            <text x={CX} y={CY - 12} textAnchor="middle" className="fill-amber-400 text-[11px] font-bold">
              מעגל הקווינטות
            </text>
            <text x={CX} y={CY + 7} textAnchor="middle" className="fill-slate-100 text-[11px] font-semibold">
              חיצוני: מז&apos;ור
            </text>
            <text x={CX} y={CY + 24} textAnchor="middle" className="fill-sky-300 text-[11px] font-semibold">
              פנימי: מינור
            </text>
          </g>
        ) : isRevealed ? (
          <g className="pointer-events-none">
            <text
              x={CX}
              y={CY - 15}
              textAnchor="middle"
              className={`text-[11px] font-bold ${
                feedback.isCorrect ? 'fill-emerald-400' : 'fill-rose-400'
              }`}
            >
              {feedback.isCorrect ? 'מדויק!' : 'התשובה'}
            </text>
            <text
              x={CX}
              y={CY + 7}
              textAnchor="middle"
              direction="ltr"
              unicodeBidi="isolate"
              className="fill-white text-[17px] font-bold"
            >
              {question.targetScale.label}
            </text>
            <text
              x={CX}
              y={CY + 26}
              textAnchor="middle"
              direction="ltr"
              unicodeBidi="isolate"
              className="fill-slate-300 text-[10.5px] font-mono-music"
            >
              {WHEEL_POSITIONS[targetPos]?.sig}
            </text>
          </g>
        ) : (
          <g className="pointer-events-none">
            <text
              x={CX}
              y={CY - 15}
              textAnchor="middle"
              className={`text-[10.5px] font-semibold ${
                targetRing === 'major' ? 'fill-amber-400' : 'fill-sky-400'
              }`}
            >
              {question?.mode === 'visual'
                ? targetRing === 'major'
                  ? 'טבעת חיצונית'
                  : 'טבעת פנימית'
                : 'מעגל הקווינטות'}
            </text>
            <text x={CX} y={CY + 7} textAnchor="middle" className="fill-slate-100 text-[15px] font-bold">
              {targetRing === 'major' ? "מז'ור" : 'מינור'}
            </text>
            <text x={CX} y={CY + 26} textAnchor="middle" className="fill-slate-400 text-[9.5px]">
              שעה 12 = C / Am
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
