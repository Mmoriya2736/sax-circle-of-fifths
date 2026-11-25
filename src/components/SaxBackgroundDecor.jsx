import React from 'react';

/**
 * Crisp brass saxophone icon badge for the main header title.
 */
export function SaxBadgeIcon({ className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Mouthpiece & curved neck */}
      <path
        d="M17 11c4.5 0 8.5 1.8 11 5.2 2.2 3 3.2 6.8 3.2 11.8v16.5c0 4.5 2.4 7.5 6.2 7.5 3.8 0 6.6-2.8 6.6-6.8v-7.2"
        stroke="currentColor"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Mouthpiece tip */}
      <path
        d="M12 11.5h5.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Flared saxophone bell */}
      <path
        d="M38.5 38.5c2.2-2.6 5.2-4 8.8-4.5 3.4-.5 5.7.6 6.2 2.4.5 1.8-1.4 3.8-4.8 4.8-3.2.9-6.6.4-10.2-2.7Z"
        fill="currentColor"
      />
      {/* Key cups along body */}
      <circle cx="31.2" cy="28" r="2.1" fill="#090c14" />
      <circle cx="31.2" cy="34.5" r="2.1" fill="#090c14" />
      <circle cx="31.2" cy="41" r="2.1" fill="#090c14" />
    </svg>
  );
}

/**
 * Detailed vector brass saxophone illustration for subtle background watermarks.
 */
function DetailedSaxSVG({ className = '' }) {
  return (
    <svg
      viewBox="0 0 260 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="saxBrassGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="48%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>

      {/* Neck & mouthpiece */}
      <path
        d="M34 38 L60 44 C78 48 92 60 98 80 L108 116"
        stroke="url(#saxBrassGold)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M24 34 L38 39"
        stroke="url(#saxBrassGold)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Octave key loop */}
      <path
        d="M72 48 C82 38 98 44 98 60"
        stroke="url(#saxBrassGold)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Main conical body tube & U-bow */}
      <path
        d="M108 116 L136 254 C143 288 164 306 186 302 C208 298 218 274 212 242 L198 176"
        stroke="url(#saxBrassGold)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner highlight contour */}
      <path
        d="M111 122 L138 252 C144 282 162 298 182 294 C200 290 209 270 204 242 L192 184"
        stroke="#fef3c7"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* Flared brass bell */}
      <path
        d="M168 186 C176 158 196 140 226 134 C240 131 250 138 248 150 C246 164 230 176 206 184 C192 189 178 190 168 186 Z"
        fill="url(#saxBrassGold)"
        stroke="#fde68a"
        strokeWidth="3"
      />
      <ellipse
        cx="214"
        cy="152"
        rx="28"
        ry="11"
        transform="rotate(-16 214 152)"
        fill="#090c14"
        opacity="0.55"
      />

      {/* Bell-to-body brace */}
      <path
        d="M132 222 L198 206"
        stroke="url(#saxBrassGold)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Key cups & rods */}
      {[
        { cx: 112, cy: 144, r: 7 },
        { cx: 117, cy: 166, r: 7.5 },
        { cx: 122, cy: 189, r: 8 },
        { cx: 127, cy: 213, r: 8.5 },
        { cx: 132, cy: 237, r: 9 },
        { cx: 146, cy: 268, r: 9.5 },
      ].map((k, idx) => (
        <g key={idx}>
          <circle
            cx={k.cx}
            cy={k.cy}
            r={k.r}
            fill="#090c14"
            stroke="url(#saxBrassGold)"
            strokeWidth="2.6"
          />
          <circle cx={k.cx} cy={k.cy} r={k.r * 0.42} fill="#fde68a" opacity="0.65" />
        </g>
      ))}
    </svg>
  );
}

const FLOATING_NOTES = [
  { symbol: '♪', top: '12%', left: '6%', size: 'text-3xl', delay: '0s', anim: 'animate-float-a', opacity: 'opacity-[0.11]' },
  { symbol: '𝄞', top: '24%', right: '5%', size: 'text-5xl', delay: '1.4s', anim: 'animate-float-b', opacity: 'opacity-[0.09]' },
  { symbol: '♫', top: '56%', left: '4%', size: 'text-4xl', delay: '0.7s', anim: 'animate-float-b', opacity: 'opacity-[0.10]' },
  { symbol: '♯', top: '42%', right: '7%', size: 'text-3xl', delay: '2.2s', anim: 'animate-float-a', opacity: 'opacity-[0.11]' },
  { symbol: '♭', top: '76%', right: '8%', size: 'text-4xl', delay: '1.1s', anim: 'animate-float-a', opacity: 'opacity-[0.10]' },
  { symbol: '♪', top: '84%', left: '9%', size: 'text-2xl', delay: '2.8s', anim: 'animate-float-b', opacity: 'opacity-[0.11]' },
];

/**
 * Non-distracting decorative background layer with golden saxophone watermarks
 * and gently floating musical notes (pointer-events: none, hidden on tiny mobile edges).
 */
export default function SaxBackgroundDecor() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Left-bottom corner golden saxophone watermark (desktop & tablet) */}
      <DetailedSaxSVG className="hidden md:block fixed -bottom-10 -left-10 w-64 lg:w-80 opacity-[0.11] -rotate-12" />

      {/* Right-top corner subtle mirrored saxophone watermark (large desktop) */}
      <DetailedSaxSVG className="hidden xl:block fixed top-16 -right-14 w-64 opacity-[0.08] scale-x-[-1] rotate-12" />

      {/* Gently drifting golden musical notes */}
      {FLOATING_NOTES.map((item, idx) => (
        <span
          key={idx}
          dir="ltr"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            animationDelay: item.delay,
          }}
          className={`hidden sm:block fixed font-serif text-amber-400 ${item.size} ${item.opacity} ${item.anim}`}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}
