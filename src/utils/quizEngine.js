import {
  MAJOR_KEYS,
  MINOR_KEYS,
  ALL_KEYS,
  CIRCLE_POSITIONS,
  formatSpellingSignatureHe,
  noteToHebrew,
} from '../data/circleOfFifths';

const STORAGE_KEY = 'brass_and_fifths_he_state_v1';

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
  if (scope === 'major') return MAJOR_KEYS;
  if (scope === 'minor') return MINOR_KEYS;
  return ALL_KEYS;
}

/**
 * Weighted random key selection using lightweight spaced-repetition bias.
 * Missed keys appear more frequently until answered correctly twice in a row.
 */
function pickWeightedKey(pool, weakKeys, lastKeyId) {
  const candidates = pool.length > 1 ? pool.filter((k) => k.id !== lastKeyId) : pool;

  const weights = candidates.map((k) => {
    const weak = weakKeys[k.id];
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
 * Generate a Hebrew quiz question based on scope ('major' | 'minor' | 'mixed')
 * and promptStyle ('visual' | 'text' | 'both').
 */
export function generateQuestion({ scope, promptStyle, weakKeys, lastKeyId }) {
  const pool = getPoolForScope(scope);
  const targetKey = pickWeightedKey(pool, weakKeys, lastKeyId);
  const isWeakReview = Boolean(weakKeys[targetKey.id]);

  const mode =
    promptStyle === 'both'
      ? Math.random() < 0.5
        ? 'visual'
        : 'text'
      : promptStyle;

  const spellingIndex =
    targetKey.spellings.length > 1 ? (Math.random() < 0.68 ? 0 : 1) : 0;
  const activeSpelling = targetKey.spellings[spellingIndex];

  if (mode === 'visual') {
    const isMajor = targetKey.quality === 'major';
    return {
      id: `${targetKey.id}-${Date.now()}`,
      mode: 'visual',
      clueType: 'visual',
      targetKey,
      activeSpelling,
      isWeakReview,
      badge: isMajor ? 'טבעת חיצונית — מז\'ור' : 'טבעת פנימית — מינור מקביל',
      promptParts: {
        prefix: isMajor
          ? 'זהה את הסולם המז\'ורי (הטבעת החיצונית) המסומן במעגל'
          : 'זהה את הסולם המינורי (הטבעת הפנימית) המסומן במעגל',
        ltrToken: null,
        suffix: null,
      },
      promptSub:
        targetKey.spellings.length > 1
          ? 'מיקום אנהרמוני — בחירת הכפתור המשותף תיחשב נכונה'
          : 'בחר את הסולם המתאים מלוח הכפתורים',
      highlightPosition: targetKey.position,
      highlightRing: targetKey.quality,
    };
  }

  // Text clue variants
  const clueTypes = ['signature', 'signature', 'relative'];
  if (activeSpelling.accidentalCount >= 1) {
    clueTypes.push('accidentals');
  }
  const chosenType = clueTypes[Math.floor(Math.random() * clueTypes.length)];

  if (chosenType === 'relative') {
    const oppositePos = CIRCLE_POSITIONS[targetKey.position];
    const oppositeKey =
      targetKey.quality === 'major' ? oppositePos.minor : oppositePos.major;
    const oppositeSpelling = oppositeKey.spellings[spellingIndex] || oppositeKey.spellings[0];
    const oppBaseNote = oppositeSpelling.short.replace(/m$/, '');
    const oppQualityHe = targetKey.quality === 'major' ? 'מינור' : 'מז\'ור';

    return {
      id: `${targetKey.id}-${Date.now()}`,
      mode: 'text',
      clueType: 'relative',
      targetKey,
      activeSpelling,
      isWeakReview,
      badge: targetKey.quality === 'major' ? 'מז\'ור מקביל' : 'מינור מקביל',
      promptParts: {
        prefix:
          targetKey.quality === 'major'
            ? 'מהו הסולם המז\'ורי המקביל ל-'
            : 'מהו הסולם המינורי המקביל ל-',
        ltrToken: oppBaseNote,
        suffix: ` ${oppQualityHe}?`,
      },
      promptSub: `חולק את אותה חתימת מפתח (${formatSpellingSignatureHe(activeSpelling)})`,
      highlightPosition: null,
      highlightRing: null,
    };
  }

  if (chosenType === 'accidentals') {
    const qualityAdj = targetKey.quality === 'major' ? 'מז\'ורי' : 'מינורי';
    return {
      id: `${targetKey.id}-${Date.now()}`,
      mode: 'text',
      clueType: 'accidentals',
      targetKey,
      activeSpelling,
      isWeakReview,
      badge: `סימני היתק — ${targetKey.quality === 'major' ? 'מז\'ור' : 'מינור'}`,
      promptParts: {
        prefix: `איזה סולם ${qualityAdj} מכיל את סימני ההיתק:`,
        ltrToken: activeSpelling.accidentals.join('  '),
        suffix: '?',
      },
      promptSub: `בעברית: ${activeSpelling.accidentals.map(noteToHebrew).join(', ')}`,
      highlightPosition: null,
      highlightRing: null,
    };
  }

  // Key signature count clue
  const qualityAdj = targetKey.quality === 'major' ? 'מז\'ורי' : 'מינורי';
  const sigHe = formatSpellingSignatureHe(activeSpelling);
  const promptText =
    activeSpelling.accidentalCount === 0
      ? `איזה סולם ${qualityAdj} הוא ${sigHe}?`
      : `איזה סולם ${qualityAdj} מכיל ${sigHe}?`;

  return {
    id: `${targetKey.id}-${Date.now()}`,
    mode: 'text',
    clueType: 'signature',
    targetKey,
    activeSpelling,
    isWeakReview,
    badge: `חתימת מפתח — ${targetKey.quality === 'major' ? 'מז\'ור' : 'מינור'}`,
    promptParts: {
      prefix: promptText,
      ltrToken: null,
      suffix: null,
    },
    promptSub: `בחר את הסולם ה${qualityAdj} המתאים מהרשימה`,
    highlightPosition: null,
    highlightRing: null,
  };
}
