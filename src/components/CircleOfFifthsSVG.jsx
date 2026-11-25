import React from 'react';
import { CIRCLE_POSITIONS, formatSignatureSummary } from '../data/circleOfFifths';

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
  question,
  feedback,
  isPeekMode,
  selectedPeekKey,
  onSelectPeekKey,
  scope,
}) {
  const isRevealed = Boolean(feedback);
  const correctKeyId = question?.targetKey?.id;
  const chosenKeyId = feedback?.chosenKey?.id;

  const getWedgeStyle = (keyObj, ring) => {
    const isMajor = ring === 'major';
    const isTarget =
      !isPeekMode &&
      question?.mode === 'visual' &&
      question.highlightPosition === keyObj.position &&
      question.highlightRing === ring;

    const isCorrectReveal = !isPeekMode && isRevealed && correctKeyId === keyObj.id;
    const isWrongReveal =
      !isPeekMode && isRevealed && !feedback.isCorrect && chosenKeyId === keyObj.id;
    const isPeekSelected = isPeekMode && selectedPeekKey?.id === keyObj.id;

    const isInactiveRing =
      !isPeekMode &&
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
        fill: '#d97706',
        stroke: '#fcd34d',
        strokeWidth: 2.2,
        textFill: '#0f172a',
        showLabel: false,
        showQuestionMark: true,
        isPulsing: true,
      };
    }

    if (isPeekMode) {
      if (isPeekSelected) {
        return {
          fill: '#b45309',
          stroke: '#fbbf24',
          strokeWidth: 2,
          textFill: '#fef3c7',
          showLabel: true,
          isPulsing: false,
        };
      }
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
    <div className="relative flex flex-col items-center justify-center w-full max-w-[430px] mx-auto select-none">
      <svg
        viewBox="0 0 440 440"
        className="w-full h-auto drop-shadow-[0_14px_32px_rgba(0,0,0,0.55)]"
        role="img"
        aria-label="תרשים מעגל הקווינטות האינטראקטיבי"
      >
        <defs>
          <radialGradient id="hubGradient" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </radialGradient>
          <linearGradient id="brassRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#b45309" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Subtle outer brass bezel */}
        <circle
          cx={CX}
          cy={CY}
          r={191}
          fill="none"
          stroke="url(#brassRing)"
          strokeWidth="1.2"
          opacity="0.45"
        />

        {/* 12 o'clock anchor tick (C / Am reference) */}
        <polygon
          points={`${CX - 5},23 ${CX + 5},23 ${CX},31`}
          fill="#f59e0b"
          opacity={isPeekMode ? 0.9 : 0.75}
        />

        {/* Directional sharp/flat subtle Hebrew indicators */}
        {!isPeekMode && (
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

        {/* Render 12 positions */}
        {CIRCLE_POSITIONS.map((item) => {
          const centerAngle = -90 + item.position * 30;
          const startAngle = centerAngle - 15;
          const endAngle = centerAngle + 15;

          const majorPath = createWedgePath(
            CX,
            CY,
            OUTER_R_MIN,
            OUTER_R_MAX,
            startAngle,
            endAngle
          );
          const minorPath = createWedgePath(
            CX,
            CY,
            INNER_R_MIN,
            INNER_R_MAX,
            startAngle,
            endAngle
          );

          const majorTextPos = polarToCartesian(
            CX,
            CY,
            (OUTER_R_MIN + OUTER_R_MAX) / 2,
            centerAngle
          );
          const minorTextPos = polarToCartesian(
            CX,
            CY,
            (INNER_R_MIN + INNER_R_MAX) / 2,
            centerAngle
          );
          const sigPos = polarToCartesian(CX, CY, SIG_R, centerAngle);

          const majorKeyObj = {
            ...item.major,
            position: item.position,
            quality: 'major',
          };
          const minorKeyObj = {
            ...item.minor,
            position: item.position,
            quality: 'minor',
          };

          const majorStyle = getWedgeStyle(majorKeyObj, 'major');
          const minorStyle = getWedgeStyle(minorKeyObj, 'minor');
          const isEnharmonic = item.major.spellings.length > 1;

          return (
            <g key={item.position}>
              {/* Outer Ring — Major Wedge */}
              <g
                className={
                  isPeekMode
                    ? 'cursor-pointer transition-opacity hover:opacity-90'
                    : ''
                }
                onClick={() => isPeekMode && onSelectPeekKey?.(majorKeyObj)}
              >
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
                    {item.major.label}
                  </text>
                )}
                {majorStyle.showQuestionMark && (
                  <text
                    x={majorTextPos.x}
                    y={majorTextPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={majorStyle.textFill}
                    className="text-[18px] font-bold pointer-events-none"
                  >
                    ?
                  </text>
                )}
              </g>

              {/* Inner Ring — Minor Wedge */}
              <g
                className={
                  isPeekMode
                    ? 'cursor-pointer transition-opacity hover:opacity-90'
                    : ''
                }
                onClick={() => isPeekMode && onSelectPeekKey?.(minorKeyObj)}
              >
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
                    {item.minor.label}
                  </text>
                )}
                {minorStyle.showQuestionMark && (
                  <text
                    x={minorTextPos.x}
                    y={minorTextPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={minorStyle.textFill}
                    className="text-[16px] font-bold pointer-events-none"
                  >
                    ?
                  </text>
                )}
              </g>

              {/* Outer Key Signature Labels */}
              {(isPeekMode ||
                (isRevealed && question?.targetKey?.position === item.position)) && (
                <text
                  x={sigPos.x}
                  y={sigPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  direction="ltr"
                  unicodeBidi="isolate"
                  className={`font-mono-music pointer-events-none ${
                    isRevealed && question?.targetKey?.position === item.position
                      ? 'fill-emerald-300 text-[10.5px] font-bold'
                      : 'fill-amber-300/75 text-[9.5px] font-medium'
                  }`}
                >
                  {formatSignatureSummary(item.major)}
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
          fill="url(#hubGradient)"
          stroke="url(#brassRing)"
          strokeWidth="1.6"
        />

        {isPeekMode ? (
          <g className="pointer-events-none">
            <text
              x={CX}
              y={CY - 14}
              textAnchor="middle"
              className="fill-amber-400 text-[10.5px] font-semibold"
            >
              מצב עיון
            </text>
            <text
              x={CX}
              y={CY + 7}
              textAnchor="middle"
              direction="ltr"
              unicodeBidi="isolate"
              className="fill-slate-100 text-[15px] font-bold"
            >
              {selectedPeekKey ? selectedPeekKey.label : 'לחץ על סולם'}
            </text>
            <text
              x={CX}
              y={CY + 26}
              textAnchor="middle"
              direction="ltr"
              unicodeBidi="isolate"
              className="fill-slate-400 text-[10px] font-mono-music"
            >
              {selectedPeekKey
                ? formatSignatureSummary(selectedPeekKey)
                : 'חיצוני: מז\'ור · פנימי: מינור'}
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
              {question.targetKey.label}
            </text>
            <text
              x={CX}
              y={CY + 26}
              textAnchor="middle"
              direction="ltr"
              unicodeBidi="isolate"
              className="fill-slate-300 text-[10px] font-mono-music"
            >
              {formatSignatureSummary(question.targetKey)}
            </text>
          </g>
        ) : (
          <g className="pointer-events-none">
            <text
              x={CX}
              y={CY - 15}
              textAnchor="middle"
              className="fill-amber-400/85 text-[10px] font-semibold"
            >
              {question?.highlightRing === 'major'
                ? 'טבעת חיצונית'
                : question?.highlightRing === 'minor'
                ? 'טבעת פנימית'
                : 'מעגל הקווינטות'}
            </text>
            <text
              x={CX}
              y={CY + 7}
              textAnchor="middle"
              className="fill-slate-100 text-[15px] font-bold"
            >
              {question?.targetKey?.quality === 'major' ? 'מז\'ור' : 'מינור'}
            </text>
            <text
              x={CX}
              y={CY + 26}
              textAnchor="middle"
              className="fill-slate-400 text-[9.5px]"
            >
              שעה 12 = C / Am
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
