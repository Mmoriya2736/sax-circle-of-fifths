import {
  MAJOR_SCALES,
  MINOR_SCALES,
  ALL_SCALES,
  formatSignatureHe,
} from '../data/circleOfFifths';

const STORAGE_KEY = 'sax_key_signatures_he_v2';

export function loadPersistedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { bestStreak: 0, weakKeys: {} };
    }
    const parsed = JSON.parse(raw);
    return {
      bestStreak: Number(parsed.bestStreak) || 0,
      weakKeys: parsed.weakKeys && typeof parsed.weakKeys === 'object' ? parsed.weakKeys : {},
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
 * Check if chosenScale is correct for a given question.
 * - Text questions specify exact sharp vs flat count -> exact scale id match.
 * - Visual Circle questions highlight a circle position -> any enharmonic equivalent at that position & quality is correct!
 */
export function isAnswerCorrect(question, chosenScale) {
  if (!question || !chosenScale) return false;
  if (question.mode === 'visual') {
    return (
      chosenScale.circlePosition === question.targetScale.circlePosition &&
      chosenScale.quality === question.targetScale.quality
    );
  }
  return chosenScale.id === question.targetScale.id;
}

/**
 * Generate a question based on scope ('major' | 'minor' | 'mixed')
 * and promptStyle ('text' | 'visual' | 'both').
 */
export function generateQuestion({ scope, promptStyle = 'both', weakKeys, lastScaleId }) {
  const pool = getPoolForScope(scope);
  const targetScale = pickWeightedScale(pool, weakKeys, lastScaleId);
  const isWeakReview = Boolean(weakKeys[targetScale.id]);

  const mode =
    promptStyle === 'both'
      ? Math.random() < 0.5
        ? 'visual'
        : 'text'
      : promptStyle;

  return {
    id: `${targetScale.id}-${Date.now()}`,
    mode,
    targetScale,
    isWeakReview,
    signaturePhrase: formatSignatureHe(targetScale),
    isZero: targetScale.accidentalCount === 0,
  };
}
