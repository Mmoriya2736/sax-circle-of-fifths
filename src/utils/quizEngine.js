import {
  MAJOR_SCALES,
  MINOR_SCALES,
  ALL_SCALES,
  formatSignatureHe,
} from '../data/circleOfFifths';

const STORAGE_KEY = 'sax_key_signatures_he_v2';

export const SIGNATURE_OPTIONS = {
  natural: {
    id: 'none-0',
    accidentalType: 'none',
    accidentalCount: 0,
    badge: '0',
    hebrewLabel: 'ללא סימני היתק',
  },
  sharps: [1, 2, 3, 4, 5, 6].map((n) => ({
    id: `sharp-${n}`,
    accidentalType: 'sharp',
    accidentalCount: n,
    badge: `${n}♯`,
    hebrewLabel: n === 1 ? 'דיאז אחד' : `${n} דיאזים`,
  })),
  flats: [1, 2, 3, 4, 5, 6].map((n) => ({
    id: `flat-${n}`,
    accidentalType: 'flat',
    accidentalCount: n,
    badge: `${n}♭`,
    hebrewLabel: n === 1 ? 'במול אחד' : `${n} במולים`,
  })),
};

const VALID_SCALE_IDS = new Set(ALL_SCALES.map((s) => s.id));

export function loadPersistedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { bestStreak: 0, weakKeys: {} };
    }
    const parsed = JSON.parse(raw);
    const rawWeak = parsed.weakKeys && typeof parsed.weakKeys === 'object' ? parsed.weakKeys : {};
    const weakKeys = Object.fromEntries(
      Object.entries(rawWeak).filter(([id]) => VALID_SCALE_IDS.has(id))
    );
    return {
      bestStreak: Number(parsed.bestStreak) || 0,
      weakKeys,
    };
  } catch {
    return { bestStreak: 0, weakKeys: {} };
  }
}

export function savePersistedData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota or private browsing errors
  }
}

export function getPoolForScope(scope) {
  if (scope === 'major') return MAJOR_SCALES;
  if (scope === 'minor') return MINOR_SCALES;
  return ALL_SCALES;
}

/**
 * Weighted random scale selection using lightweight spaced-repetition bias.
 * Missed scales appear more frequently until answered correctly twice in a row.
 */
function pickWeightedScale(pool, weakKeys, lastScaleId) {
  const candidates = pool.length > 1 ? pool.filter((s) => s.id !== lastScaleId) : pool;

  const weights = candidates.map((s) => {
    const weak = weakKeys[s.id];
    if (!weak) return 1;
    return Math.min(4.5 + (weak.misses || 1) * 0.6, 7.5);
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let r = Math.random() * totalWeight;

  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}

/**
 * Check if chosenOption is correct for the active question:
 * - 'count': matches accidentalType & accidentalCount (0..7 sharps/flats)
 * - 'visual': matches circlePosition & quality (either enharmonic button counts)
 * - 'scale': exact scale id match
 */
export function isAnswerCorrect(question, chosenOption) {
  if (!question || !chosenOption) return false;
  if (question.mode === 'count') {
    return (
      chosenOption.accidentalType === question.targetScale.accidentalType &&
      chosenOption.accidentalCount === question.targetScale.accidentalCount
    );
  }
  if (question.mode === 'visual') {
    return (
      chosenOption.circlePosition === question.targetScale.circlePosition &&
      chosenOption.quality === question.targetScale.quality
    );
  }
  return chosenOption.id === question.targetScale.id;
}

/**
 * Generate a question based on scope ('major' | 'minor' | 'mixed')
 * and promptStyle ('scale' | 'count' | 'visual' | 'all').
 */
export function generateQuestion({ scope, promptStyle = 'all', weakKeys, lastScaleId }) {
  const pool = getPoolForScope(scope);
  const targetScale = pickWeightedScale(pool, weakKeys, lastScaleId);
  const isWeakReview = Boolean(weakKeys[targetScale.id]);

  const modes = ['scale', 'count', 'visual'];
  const mode =
    promptStyle === 'all'
      ? modes[Math.floor(Math.random() * modes.length)]
      : promptStyle;

  return {
    id: `${targetScale.id}-${mode}-${Date.now()}`,
    mode,
    targetScale,
    isWeakReview,
    signaturePhrase: formatSignatureHe(targetScale),
    isZero: targetScale.accidentalCount === 0,
  };
}
