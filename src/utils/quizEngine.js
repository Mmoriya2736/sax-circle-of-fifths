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
 * Generate a key-signature-only Hebrew text question.
 */
export function generateQuestion({ scope, weakKeys, lastScaleId }) {
  const pool = getPoolForScope(scope);
  const targetScale = pickWeightedScale(pool, weakKeys, lastScaleId);
  const isWeakReview = Boolean(weakKeys[targetScale.id]);

  return {
    id: `${targetScale.id}-${Date.now()}`,
    targetScale,
    isWeakReview,
    signaturePhrase: formatSignatureHe(targetScale),
    isZero: targetScale.accidentalCount === 0,
  };
}
