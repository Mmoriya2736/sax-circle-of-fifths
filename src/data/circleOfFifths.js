/**
 * Complete Circle of Fifths music theory data model with Hebrew terminology.
 * 12 positions (0 = 12 o'clock / C Major & A Minor, clockwise by fifths).
 * Includes full enharmonic mappings for 5-7 sharps and 5-7 flats.
 */

const NOTE_TO_HEBREW = {
  C: 'דו',
  D: 'רה',
  E: 'מי',
  F: 'פה',
  G: 'סול',
  A: 'לה',
  B: 'סי',
};

/**
 * Convert an international note (e.g. "F♯", "B♭", "C") to Hebrew note name (e.g. "פה♯", "סי♭", "דו").
 */
export function noteToHebrew(note) {
  const base = NOTE_TO_HEBREW[note[0]] || note[0];
  const accidental = note.slice(1);
  return `${base}${accidental}`;
}

export const CIRCLE_POSITIONS = [
  {
    position: 0,
    major: {
      id: 'major-0',
      label: 'C',
      hebrewSubtitle: 'דו מז\'ור',
      hebrewShort: 'דו',
      primaryName: 'C מז\'ור',
      chromaticIndex: 0,
      spellings: [
        {
          name: 'C מז\'ור',
          hebrewNoteName: 'דו מז\'ור',
          short: 'C',
          accidentalType: 'none',
          accidentalCount: 0,
          accidentals: [],
          notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        },
      ],
    },
    minor: {
      id: 'minor-0',
      label: 'Am',
      hebrewSubtitle: 'לה מינור',
      hebrewShort: 'לה מינור',
      primaryName: 'A מינור',
      chromaticIndex: 9,
      spellings: [
        {
          name: 'A מינור',
          hebrewNoteName: 'לה מינור',
          short: 'Am',
          accidentalType: 'none',
          accidentalCount: 0,
          accidentals: [],
          notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        },
      ],
    },
  },
  {
    position: 1,
    major: {
      id: 'major-1',
      label: 'G',
      hebrewSubtitle: 'סול מז\'ור',
      hebrewShort: 'סול',
      primaryName: 'G מז\'ור',
      chromaticIndex: 7,
      spellings: [
        {
          name: 'G מז\'ור',
          hebrewNoteName: 'סול מז\'ור',
          short: 'G',
          accidentalType: 'sharp',
          accidentalCount: 1,
          accidentals: ['F♯'],
          notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F♯'],
        },
      ],
    },
    minor: {
      id: 'minor-1',
      label: 'Em',
      hebrewSubtitle: 'מי מינור',
      hebrewShort: 'מי מינור',
      primaryName: 'E מינור',
      chromaticIndex: 4,
      spellings: [
        {
          name: 'E מינור',
          hebrewNoteName: 'מי מינור',
          short: 'Em',
          accidentalType: 'sharp',
          accidentalCount: 1,
          accidentals: ['F♯'],
          notes: ['E', 'F♯', 'G', 'A', 'B', 'C', 'D'],
        },
      ],
    },
  },
  {
    position: 2,
    major: {
      id: 'major-2',
      label: 'D',
      hebrewSubtitle: 'רה מז\'ור',
      hebrewShort: 'רה',
      primaryName: 'D מז\'ור',
      chromaticIndex: 2,
      spellings: [
        {
          name: 'D מז\'ור',
          hebrewNoteName: 'רה מז\'ור',
          short: 'D',
          accidentalType: 'sharp',
          accidentalCount: 2,
          accidentals: ['F♯', 'C♯'],
          notes: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'],
        },
      ],
    },
    minor: {
      id: 'minor-2',
      label: 'Bm',
      hebrewSubtitle: 'סי מינור',
      hebrewShort: 'סי מינור',
      primaryName: 'B מינור',
      chromaticIndex: 11,
      spellings: [
        {
          name: 'B מינור',
          hebrewNoteName: 'סי מינור',
          short: 'Bm',
          accidentalType: 'sharp',
          accidentalCount: 2,
          accidentals: ['F♯', 'C♯'],
          notes: ['B', 'C♯', 'D', 'E', 'F♯', 'G', 'A'],
        },
      ],
    },
  },
  {
    position: 3,
    major: {
      id: 'major-3',
      label: 'A',
      hebrewSubtitle: 'לה מז\'ור',
      hebrewShort: 'לה',
      primaryName: 'A מז\'ור',
      chromaticIndex: 9,
      spellings: [
        {
          name: 'A מז\'ור',
          hebrewNoteName: 'לה מז\'ור',
          short: 'A',
          accidentalType: 'sharp',
          accidentalCount: 3,
          accidentals: ['F♯', 'C♯', 'G♯'],
          notes: ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯'],
        },
      ],
    },
    minor: {
      id: 'minor-3',
      label: 'F♯m',
      hebrewSubtitle: 'פה♯ מינור',
      hebrewShort: 'פה♯ מינור',
      primaryName: 'F♯ מינור',
      chromaticIndex: 6,
      spellings: [
        {
          name: 'F♯ מינור',
          hebrewNoteName: 'פה♯ מינור',
          short: 'F♯m',
          accidentalType: 'sharp',
          accidentalCount: 3,
          accidentals: ['F♯', 'C♯', 'G♯'],
          notes: ['F♯', 'G♯', 'A', 'B', 'C♯', 'D', 'E'],
        },
      ],
    },
  },
  {
    position: 4,
    major: {
      id: 'major-4',
      label: 'E',
      hebrewSubtitle: 'מי מז\'ור',
      hebrewShort: 'מי',
      primaryName: 'E מז\'ור',
      chromaticIndex: 4,
      spellings: [
        {
          name: 'E מז\'ור',
          hebrewNoteName: 'מי מז\'ור',
          short: 'E',
          accidentalType: 'sharp',
          accidentalCount: 4,
          accidentals: ['F♯', 'C♯', 'G♯', 'D♯'],
          notes: ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯'],
        },
      ],
    },
    minor: {
      id: 'minor-4',
      label: 'C♯m',
      hebrewSubtitle: 'דו♯ מינור',
      hebrewShort: 'דו♯ מינור',
      primaryName: 'C♯ מינור',
      chromaticIndex: 1,
      spellings: [
        {
          name: 'C♯ מינור',
          hebrewNoteName: 'דו♯ מינור',
          short: 'C♯m',
          accidentalType: 'sharp',
          accidentalCount: 4,
          accidentals: ['F♯', 'C♯', 'G♯', 'D♯'],
          notes: ['C♯', 'D♯', 'E', 'F♯', 'G♯', 'A', 'B'],
        },
      ],
    },
  },
  {
    position: 5,
    major: {
      id: 'major-5',
      label: 'B / C♭',
      hebrewSubtitle: 'סי / דו♭',
      hebrewShort: 'סי / דו♭',
      primaryName: 'B / C♭ מז\'ור',
      chromaticIndex: 11,
      spellings: [
        {
          name: 'B מז\'ור',
          hebrewNoteName: 'סי מז\'ור',
          short: 'B',
          accidentalType: 'sharp',
          accidentalCount: 5,
          accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯'],
          notes: ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯'],
        },
        {
          name: 'C♭ מז\'ור',
          hebrewNoteName: 'דו♭ מז\'ור',
          short: 'C♭',
          accidentalType: 'flat',
          accidentalCount: 7,
          accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭'],
          notes: ['C♭', 'D♭', 'E♭', 'F♭', 'G♭', 'A♭', 'B♭'],
        },
      ],
    },
    minor: {
      id: 'minor-5',
      label: 'G♯m / A♭m',
      hebrewSubtitle: 'סול♯ / לה♭ מינור',
      hebrewShort: 'סול♯ / לה♭',
      primaryName: 'G♯ / A♭ מינור',
      chromaticIndex: 8,
      spellings: [
        {
          name: 'G♯ מינור',
          hebrewNoteName: 'סול♯ מינור',
          short: 'G♯m',
          accidentalType: 'sharp',
          accidentalCount: 5,
          accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯'],
          notes: ['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E', 'F♯'],
        },
        {
          name: 'A♭ מינור',
          hebrewNoteName: 'לה♭ מינור',
          short: 'A♭m',
          accidentalType: 'flat',
          accidentalCount: 7,
          accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭'],
          notes: ['A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F♭', 'G♭'],
        },
      ],
    },
  },
  {
    position: 6,
    major: {
      id: 'major-6',
      label: 'F♯ / G♭',
      hebrewSubtitle: 'פה♯ / סול♭',
      hebrewShort: 'פה♯ / סול♭',
      primaryName: 'F♯ / G♭ מז\'ור',
      chromaticIndex: 6,
      spellings: [
        {
          name: 'F♯ מז\'ור',
          hebrewNoteName: 'פה♯ מז\'ור',
          short: 'F♯',
          accidentalType: 'sharp',
          accidentalCount: 6,
          accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯'],
          notes: ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯'],
        },
        {
          name: 'G♭ מז\'ור',
          hebrewNoteName: 'סול♭ מז\'ור',
          short: 'G♭',
          accidentalType: 'flat',
          accidentalCount: 6,
          accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'],
          notes: ['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F'],
        },
      ],
    },
    minor: {
      id: 'minor-6',
      label: 'D♯m / E♭m',
      hebrewSubtitle: 'רה♯ / מי♭ מינור',
      hebrewShort: 'רה♯ / מי♭',
      primaryName: 'D♯ / E♭ מינור',
      chromaticIndex: 3,
      spellings: [
        {
          name: 'D♯ מינור',
          hebrewNoteName: 'רה♯ מינור',
          short: 'D♯m',
          accidentalType: 'sharp',
          accidentalCount: 6,
          accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯'],
          notes: ['D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B', 'C♯'],
        },
        {
          name: 'E♭ מינור',
          hebrewNoteName: 'מי♭ מינור',
          short: 'E♭m',
          accidentalType: 'flat',
          accidentalCount: 6,
          accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'],
          notes: ['E♭', 'F', 'G♭', 'A♭', 'B♭', 'C♭', 'D♭'],
        },
      ],
    },
  },
  {
    position: 7,
    major: {
      id: 'major-7',
      label: 'D♭ / C♯',
      hebrewSubtitle: 'רה♭ / דו♯',
      hebrewShort: 'רה♭ / דו♯',
      primaryName: 'D♭ / C♯ מז\'ור',
      chromaticIndex: 1,
      spellings: [
        {
          name: 'D♭ מז\'ור',
          hebrewNoteName: 'רה♭ מז\'ור',
          short: 'D♭',
          accidentalType: 'flat',
          accidentalCount: 5,
          accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭'],
          notes: ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C'],
        },
        {
          name: 'C♯ מז\'ור',
          hebrewNoteName: 'דו♯ מז\'ור',
          short: 'C♯',
          accidentalType: 'sharp',
          accidentalCount: 7,
          accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯', 'B♯'],
          notes: ['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯'],
        },
      ],
    },
    minor: {
      id: 'minor-7',
      label: 'B♭m / A♯m',
      hebrewSubtitle: 'סי♭ / לה♯ מינור',
      hebrewShort: 'סי♭ / לה♯',
      primaryName: 'B♭ / A♯ מינור',
      chromaticIndex: 10,
      spellings: [
        {
          name: 'B♭ מינור',
          hebrewNoteName: 'סי♭ מינור',
          short: 'B♭m',
          accidentalType: 'flat',
          accidentalCount: 5,
          accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭'],
          notes: ['B♭', 'C', 'D♭', 'E♭', 'F', 'G♭', 'A♭'],
        },
        {
          name: 'A♯ מינור',
          hebrewNoteName: 'לה♯ מינור',
          short: 'A♯m',
          accidentalType: 'sharp',
          accidentalCount: 7,
          accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯', 'B♯'],
          notes: ['A♯', 'B♯', 'C♯', 'D♯', 'E♯', 'F♯', 'G♯'],
        },
      ],
    },
  },
  {
    position: 8,
    major: {
      id: 'major-8',
      label: 'A♭',
      hebrewSubtitle: 'לה♭ מז\'ור',
      hebrewShort: 'לה♭',
      primaryName: 'A♭ מז\'ור',
      chromaticIndex: 8,
      spellings: [
        {
          name: 'A♭ מז\'ור',
          hebrewNoteName: 'לה♭ מז\'ור',
          short: 'A♭',
          accidentalType: 'flat',
          accidentalCount: 4,
          accidentals: ['B♭', 'E♭', 'A♭', 'D♭'],
          notes: ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G'],
        },
      ],
    },
    minor: {
      id: 'minor-8',
      label: 'Fm',
      hebrewSubtitle: 'פה מינור',
      hebrewShort: 'פה מינור',
      primaryName: 'F מינור',
      chromaticIndex: 5,
      spellings: [
        {
          name: 'F מינור',
          hebrewNoteName: 'פה מינור',
          short: 'Fm',
          accidentalType: 'flat',
          accidentalCount: 4,
          accidentals: ['B♭', 'E♭', 'A♭', 'D♭'],
          notes: ['F', 'G', 'A♭', 'B♭', 'C', 'D♭', 'E♭'],
        },
      ],
    },
  },
  {
    position: 9,
    major: {
      id: 'major-9',
      label: 'E♭',
      hebrewSubtitle: 'מי♭ מז\'ור',
      hebrewShort: 'מי♭',
      primaryName: 'E♭ מז\'ור',
      chromaticIndex: 3,
      spellings: [
        {
          name: 'E♭ מז\'ור',
          hebrewNoteName: 'מי♭ מז\'ור',
          short: 'E♭',
          accidentalType: 'flat',
          accidentalCount: 3,
          accidentals: ['B♭', 'E♭', 'A♭'],
          notes: ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D'],
        },
      ],
    },
    minor: {
      id: 'minor-9',
      label: 'Cm',
      hebrewSubtitle: 'דו מינור',
      hebrewShort: 'דו מינור',
      primaryName: 'C מינור',
      chromaticIndex: 0,
      spellings: [
        {
          name: 'C מינור',
          hebrewNoteName: 'דו מינור',
          short: 'Cm',
          accidentalType: 'flat',
          accidentalCount: 3,
          accidentals: ['B♭', 'E♭', 'A♭'],
          notes: ['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭'],
        },
      ],
    },
  },
  {
    position: 10,
    major: {
      id: 'major-10',
      label: 'B♭',
      hebrewSubtitle: 'סי♭ מז\'ור',
      hebrewShort: 'סי♭',
      primaryName: 'B♭ מז\'ור',
      chromaticIndex: 10,
      spellings: [
        {
          name: 'B♭ מז\'ור',
          hebrewNoteName: 'סי♭ מז\'ור',
          short: 'B♭',
          accidentalType: 'flat',
          accidentalCount: 2,
          accidentals: ['B♭', 'E♭'],
          notes: ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A'],
        },
      ],
    },
    minor: {
      id: 'minor-10',
      label: 'Gm',
      hebrewSubtitle: 'סול מינור',
      hebrewShort: 'סול מינור',
      primaryName: 'G מינור',
      chromaticIndex: 7,
      spellings: [
        {
          name: 'G מינור',
          hebrewNoteName: 'סול מינור',
          short: 'Gm',
          accidentalType: 'flat',
          accidentalCount: 2,
          accidentals: ['B♭', 'E♭'],
          notes: ['G', 'A', 'B♭', 'C', 'D', 'E♭', 'F'],
        },
      ],
    },
  },
  {
    position: 11,
    major: {
      id: 'major-11',
      label: 'F',
      hebrewSubtitle: 'פה מז\'ור',
      hebrewShort: 'פה',
      primaryName: 'F מז\'ור',
      chromaticIndex: 5,
      spellings: [
        {
          name: 'F מז\'ור',
          hebrewNoteName: 'פה מז\'ור',
          short: 'F',
          accidentalType: 'flat',
          accidentalCount: 1,
          accidentals: ['B♭'],
          notes: ['F', 'G', 'A', 'B♭', 'C', 'D', 'E'],
        },
      ],
    },
    minor: {
      id: 'minor-11',
      label: 'Dm',
      hebrewSubtitle: 'רה מינור',
      hebrewShort: 'רה מינור',
      primaryName: 'D מינור',
      chromaticIndex: 2,
      spellings: [
        {
          name: 'D מינור',
          hebrewNoteName: 'רה מינור',
          short: 'Dm',
          accidentalType: 'flat',
          accidentalCount: 1,
          accidentals: ['B♭'],
          notes: ['D', 'E', 'F', 'G', 'A', 'B♭', 'C'],
        },
      ],
    },
  },
];

export const MAJOR_KEYS = CIRCLE_POSITIONS.map((p) => ({
  ...p.major,
  position: p.position,
  quality: 'major',
  relativeId: p.minor.id,
  relativeLabel: p.minor.label,
  relativePrimaryName: p.minor.primaryName,
  relativeHebrewSubtitle: p.minor.hebrewSubtitle,
}));

export const MINOR_KEYS = CIRCLE_POSITIONS.map((p) => ({
  ...p.minor,
  position: p.position,
  quality: 'minor',
  relativeId: p.major.id,
  relativeLabel: p.major.label,
  relativePrimaryName: p.major.primaryName,
  relativeHebrewSubtitle: p.major.hebrewSubtitle,
}));

export const ALL_KEYS = [...MAJOR_KEYS, ...MINOR_KEYS];

export const KEY_BY_ID = Object.fromEntries(ALL_KEYS.map((k) => [k.id, k]));

/**
 * Compact LTR badge for SVG outer rim and pills (e.g., "0♯/♭", "3♯", "4♭", "5♯ / 7♭")
 */
export function formatSignatureSummary(keyObj) {
  if (keyObj.spellings.length === 1) {
    const s = keyObj.spellings[0];
    if (s.accidentalCount === 0) return '0♯/♭';
    return `${s.accidentalCount}${s.accidentalType === 'sharp' ? '♯' : '♭'}`;
  }
  return keyObj.spellings
    .map((s) => `${s.accidentalCount}${s.accidentalType === 'sharp' ? '♯' : '♭'}`)
    .join(' / ');
}

/**
 * Natural Hebrew description of a key signature.
 */
export function formatSpellingSignatureHe(spelling) {
  if (spelling.accidentalCount === 0) return 'ללא דיאזים או במולים';
  if (spelling.accidentalType === 'sharp') {
    return spelling.accidentalCount === 1
      ? 'דיאז אחד (♯)'
      : `${spelling.accidentalCount} דיאזים (♯)`;
  }
  return spelling.accidentalCount === 1
    ? 'במול אחד (♭)'
    : `${spelling.accidentalCount} במולים (♭)`;
}

/**
 * Saxophone transposition helper.
 * Concert pitch -> Written pitch for saxophones:
 * - Eb Sax (Alto / Baritone): +3 positions clockwise on Circle of Fifths
 * - Bb Sax (Tenor / Soprano): +2 positions clockwise on Circle of Fifths
 */
export function getSaxTransposition(position, quality) {
  const ebPos = (position + 3) % 12;
  const bbPos = (position + 2) % 12;
  const ebKey = CIRCLE_POSITIONS[ebPos][quality];
  const bbKey = CIRCLE_POSITIONS[bbPos][quality];

  return {
    eb: {
      instrument: 'סקסופון אלט / בריטון (E♭)',
      writtenLabel: ebKey.label,
      writtenHebrew: ebKey.hebrewSubtitle,
      signature: formatSignatureSummary(ebKey),
    },
    bb: {
      instrument: 'סקסופון טנור / סופרן (B♭)',
      writtenLabel: bbKey.label,
      writtenHebrew: bbKey.hebrewSubtitle,
      signature: formatSignatureSummary(bbKey),
    },
  };
}

/**
 * Sort keys Chromatically (C, C#/Db, D...) or by Circle of Fifths (C, G, D...).
 */
export function sortKeys(keys, order = 'chromatic') {
  const copy = [...keys];
  if (order === 'fifths') {
    return copy.sort((a, b) => a.position - b.position);
  }
  return copy.sort((a, b) => a.chromaticIndex - b.chromaticIndex);
}
