/**
 * Complete Key Signatures data model for all 15 Major scales and 15 Minor scales
 * covering 0-7 sharps (♯) and 0-7 flats (♭), including all enharmonic equivalents.
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

export function noteToHebrew(note) {
  const base = NOTE_TO_HEBREW[note[0]] || note[0];
  const accidental = note.slice(1);
  return `${base}${accidental}`;
}

/**
 * 15 signature slots ordered logically:
 * 0 (none), 1♯..7♯ (sharps), 1♭..7♭ (flats).
 */
export const SIGNATURE_ROWS = [
  {
    accidentalType: 'none',
    accidentalCount: 0,
    circlePosition: 0,
    circleOrder: 0,
    accidentals: [],
    major: {
      id: 'maj-C',
      label: 'C',
      hebrewShort: 'דו',
      hebrewFull: "דו מז'ור",
      chromaticRank: 0,
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    },
    minor: {
      id: 'min-Am',
      label: 'Am',
      hebrewShort: 'לה מינור',
      hebrewFull: 'לה מינור',
      chromaticRank: 11,
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    },
  },
  // 1# to 7#
  {
    accidentalType: 'sharp',
    accidentalCount: 1,
    circlePosition: 1,
    circleOrder: 1,
    accidentals: ['F♯'],
    major: {
      id: 'maj-G',
      label: 'G',
      hebrewShort: 'סול',
      hebrewFull: "סול מז'ור",
      chromaticRank: 9,
      notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F♯'],
    },
    minor: {
      id: 'min-Em',
      label: 'Em',
      hebrewShort: 'מי מינור',
      hebrewFull: 'מי מינור',
      chromaticRank: 5,
      notes: ['E', 'F♯', 'G', 'A', 'B', 'C', 'D'],
    },
  },
  {
    accidentalType: 'sharp',
    accidentalCount: 2,
    circlePosition: 2,
    circleOrder: 2,
    accidentals: ['F♯', 'C♯'],
    major: {
      id: 'maj-D',
      label: 'D',
      hebrewShort: 'רה',
      hebrewFull: "רה מז'ור",
      chromaticRank: 3,
      notes: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'],
    },
    minor: {
      id: 'min-Bm',
      label: 'Bm',
      hebrewShort: 'סי מינור',
      hebrewFull: 'סי מינור',
      chromaticRank: 14,
      notes: ['B', 'C♯', 'D', 'E', 'F♯', 'G', 'A'],
    },
  },
  {
    accidentalType: 'sharp',
    accidentalCount: 3,
    circlePosition: 3,
    circleOrder: 3,
    accidentals: ['F♯', 'C♯', 'G♯'],
    major: {
      id: 'maj-A',
      label: 'A',
      hebrewShort: 'לה',
      hebrewFull: "לה מז'ור",
      chromaticRank: 11,
      notes: ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯'],
    },
    minor: {
      id: 'min-F#m',
      label: 'F♯m',
      hebrewShort: 'פה♯ מינור',
      hebrewFull: 'פה♯ מינור',
      chromaticRank: 7,
      notes: ['F♯', 'G♯', 'A', 'B', 'C♯', 'D', 'E'],
    },
  },
  {
    accidentalType: 'sharp',
    accidentalCount: 4,
    circlePosition: 4,
    circleOrder: 4,
    accidentals: ['F♯', 'C♯', 'G♯', 'D♯'],
    major: {
      id: 'maj-E',
      label: 'E',
      hebrewShort: 'מי',
      hebrewFull: "מי מז'ור",
      chromaticRank: 5,
      notes: ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯'],
    },
    minor: {
      id: 'min-C#m',
      label: 'C♯m',
      hebrewShort: 'דו♯ מינור',
      hebrewFull: 'דו♯ מינור',
      chromaticRank: 1,
      notes: ['C♯', 'D♯', 'E', 'F♯', 'G♯', 'A', 'B'],
    },
  },
  {
    accidentalType: 'sharp',
    accidentalCount: 5,
    circlePosition: 5,
    circleOrder: 5,
    accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯'],
    major: {
      id: 'maj-B',
      label: 'B',
      hebrewShort: 'סי',
      hebrewFull: "סי מז'ור",
      chromaticRank: 13,
      notes: ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯'],
    },
    minor: {
      id: 'min-G#m',
      label: 'G♯m',
      hebrewShort: 'סול♯ מינור',
      hebrewFull: 'סול♯ מינור',
      chromaticRank: 9,
      notes: ['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E', 'F♯'],
    },
  },
  {
    accidentalType: 'sharp',
    accidentalCount: 6,
    circlePosition: 6,
    circleOrder: 6,
    accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯'],
    major: {
      id: 'maj-F#',
      label: 'F♯',
      hebrewShort: 'פה♯',
      hebrewFull: "פה♯ מז'ור",
      chromaticRank: 7,
      notes: ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯'],
    },
    minor: {
      id: 'min-D#m',
      label: 'D♯m',
      hebrewShort: 'רה♯ מינור',
      hebrewFull: 'רה♯ מינור',
      chromaticRank: 3,
      notes: ['D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B', 'C♯'],
    },
  },
  {
    accidentalType: 'sharp',
    accidentalCount: 7,
    circlePosition: 7,
    circleOrder: 7,
    accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯', 'B♯'],
    major: {
      id: 'maj-C#',
      label: 'C♯',
      hebrewShort: 'דו♯',
      hebrewFull: "דו♯ מז'ור",
      chromaticRank: 1,
      notes: ['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯'],
    },
    minor: {
      id: 'min-A#m',
      label: 'A♯m',
      hebrewShort: 'לה♯ מינור',
      hebrewFull: 'לה♯ מינור',
      chromaticRank: 12,
      notes: ['A♯', 'B♯', 'C♯', 'D♯', 'E♯', 'F♯', 'G♯'],
    },
  },
  // 1b to 7b
  {
    accidentalType: 'flat',
    accidentalCount: 1,
    circlePosition: 11,
    circleOrder: 14,
    accidentals: ['B♭'],
    major: {
      id: 'maj-F',
      label: 'F',
      hebrewShort: 'פה',
      hebrewFull: "פה מז'ור",
      chromaticRank: 6,
      notes: ['F', 'G', 'A', 'B♭', 'C', 'D', 'E'],
    },
    minor: {
      id: 'min-Dm',
      label: 'Dm',
      hebrewShort: 'רה מינור',
      hebrewFull: 'רה מינור',
      chromaticRank: 2,
      notes: ['D', 'E', 'F', 'G', 'A', 'B♭', 'C'],
    },
  },
  {
    accidentalType: 'flat',
    accidentalCount: 2,
    circlePosition: 10,
    circleOrder: 13,
    accidentals: ['B♭', 'E♭'],
    major: {
      id: 'maj-Bb',
      label: 'B♭',
      hebrewShort: 'סי♭',
      hebrewFull: "סי♭ מז'ור",
      chromaticRank: 12,
      notes: ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A'],
    },
    minor: {
      id: 'min-Gm',
      label: 'Gm',
      hebrewShort: 'סול מינור',
      hebrewFull: 'סול מינור',
      chromaticRank: 8,
      notes: ['G', 'A', 'B♭', 'C', 'D', 'E♭', 'F'],
    },
  },
  {
    accidentalType: 'flat',
    accidentalCount: 3,
    circlePosition: 9,
    circleOrder: 12,
    accidentals: ['B♭', 'E♭', 'A♭'],
    major: {
      id: 'maj-Eb',
      label: 'E♭',
      hebrewShort: 'מי♭',
      hebrewFull: "מי♭ מז'ור",
      chromaticRank: 4,
      notes: ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D'],
    },
    minor: {
      id: 'min-Cm',
      label: 'Cm',
      hebrewShort: 'דו מינור',
      hebrewFull: 'דו מינור',
      chromaticRank: 0,
      notes: ['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭'],
    },
  },
  {
    accidentalType: 'flat',
    accidentalCount: 4,
    circlePosition: 8,
    circleOrder: 11,
    accidentals: ['B♭', 'E♭', 'A♭', 'D♭'],
    major: {
      id: 'maj-Ab',
      label: 'A♭',
      hebrewShort: 'לה♭',
      hebrewFull: "לה♭ מז'ור",
      chromaticRank: 10,
      notes: ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G'],
    },
    minor: {
      id: 'min-Fm',
      label: 'Fm',
      hebrewShort: 'פה מינור',
      hebrewFull: 'פה מינור',
      chromaticRank: 6,
      notes: ['F', 'G', 'A♭', 'B♭', 'C', 'D♭', 'E♭'],
    },
  },
  {
    accidentalType: 'flat',
    accidentalCount: 5,
    circlePosition: 7,
    circleOrder: 10,
    accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭'],
    major: {
      id: 'maj-Db',
      label: 'D♭',
      hebrewShort: 'רה♭',
      hebrewFull: "רה♭ מז'ור",
      chromaticRank: 2,
      notes: ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C'],
    },
    minor: {
      id: 'min-Bbm',
      label: 'B♭m',
      hebrewShort: 'סי♭ מינור',
      hebrewFull: 'סי♭ מינור',
      chromaticRank: 13,
      notes: ['B♭', 'C', 'D♭', 'E♭', 'F', 'G♭', 'A♭'],
    },
  },
  {
    accidentalType: 'flat',
    accidentalCount: 6,
    circlePosition: 6,
    circleOrder: 9,
    accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'],
    major: {
      id: 'maj-Gb',
      label: 'G♭',
      hebrewShort: 'סול♭',
      hebrewFull: "סול♭ מז'ור",
      chromaticRank: 8,
      notes: ['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F'],
    },
    minor: {
      id: 'min-Ebm',
      label: 'E♭m',
      hebrewShort: 'מי♭ מינור',
      hebrewFull: 'מי♭ מינור',
      chromaticRank: 4,
      notes: ['E♭', 'F', 'G♭', 'A♭', 'B♭', 'C♭', 'D♭'],
    },
  },
  {
    accidentalType: 'flat',
    accidentalCount: 7,
    circlePosition: 5,
    circleOrder: 8,
    accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭'],
    major: {
      id: 'maj-Cb',
      label: 'C♭',
      hebrewShort: 'דו♭',
      hebrewFull: "דו♭ מז'ור",
      chromaticRank: 14,
      notes: ['C♭', 'D♭', 'E♭', 'F♭', 'G♭', 'A♭', 'B♭'],
    },
    minor: {
      id: 'min-Abm',
      label: 'A♭m',
      hebrewShort: 'לה♭ מינור',
      hebrewFull: 'לה♭ מינור',
      chromaticRank: 10,
      notes: ['A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F♭', 'G♭'],
    },
  },
];

export const MAJOR_SCALES = SIGNATURE_ROWS.map((row) => ({
  ...row.major,
  quality: 'major',
  accidentalType: row.accidentalType,
  accidentalCount: row.accidentalCount,
  accidentals: row.accidentals,
  circlePosition: row.circlePosition,
  circleOrder: row.circleOrder,
  relativeLabel: row.minor.label,
  relativeHebrew: row.minor.hebrewFull,
}));

export const MINOR_SCALES = SIGNATURE_ROWS.map((row) => ({
  ...row.minor,
  quality: 'minor',
  accidentalType: row.accidentalType,
  accidentalCount: row.accidentalCount,
  accidentals: row.accidentals,
  circlePosition: row.circlePosition,
  circleOrder: row.circleOrder,
  relativeLabel: row.major.label,
  relativeHebrew: row.major.hebrewFull,
}));

export const ALL_SCALES = [...MAJOR_SCALES, ...MINOR_SCALES];

/**
 * Preferred practical key per circle position (0..11) for clean saxophone transposition readouts.
 */
const PRACTICAL_BY_POS = {
  0: { major: 'C', minor: 'Am', sig: '0♯/♭', heMaj: "דו מז'ור", heMin: 'לה מינור' },
  1: { major: 'G', minor: 'Em', sig: '1♯', heMaj: "סול מז'ור", heMin: 'מי מינור' },
  2: { major: 'D', minor: 'Bm', sig: '2♯', heMaj: "רה מז'ור", heMin: 'סי מינור' },
  3: { major: 'A', minor: 'F♯m', sig: '3♯', heMaj: "לה מז'ור", heMin: 'פה♯ מינור' },
  4: { major: 'E', minor: 'C♯m', sig: '4♯', heMaj: "מי מז'ור", heMin: 'דו♯ מינור' },
  5: { major: 'B', minor: 'G♯m', sig: '5♯', heMaj: "סי מז'ור", heMin: 'סול♯ מינור' },
  6: { major: 'F♯ / G♭', minor: 'D♯m / E♭m', sig: '6♯/6♭', heMaj: 'פה♯ / סול♭', heMin: 'רה♯ / מי♭ מינור' },
  7: { major: 'D♭', minor: 'B♭m', sig: '5♭', heMaj: "רה♭ מז'ור", heMin: 'סי♭ מינור' },
  8: { major: 'A♭', minor: 'Fm', sig: '4♭', heMaj: "לה♭ מז'ור", heMin: 'פה מינור' },
  9: { major: 'E♭', minor: 'Cm', sig: '3♭', heMaj: "מי♭ מז'ור", heMin: 'דו מינור' },
  10: { major: 'B♭', minor: 'Gm', sig: '2♭', heMaj: "סי♭ מז'ור", heMin: 'סול מינור' },
  11: { major: 'F', minor: 'Dm', sig: '1♭', heMaj: "פה מז'ור", heMin: 'רה מינור' },
};

export function getSaxTransposition(circlePosition, quality) {
  const ebPos = (circlePosition + 3) % 12;
  const bbPos = (circlePosition + 2) % 12;
  const eb = PRACTICAL_BY_POS[ebPos];
  const bb = PRACTICAL_BY_POS[bbPos];
  const isMajor = quality === 'major';

  return {
    eb: {
      writtenLabel: isMajor ? eb.major : eb.minor,
      writtenHebrew: isMajor ? eb.heMaj : eb.heMin,
      signature: eb.sig,
    },
    bb: {
      writtenLabel: isMajor ? bb.major : bb.minor,
      writtenHebrew: isMajor ? bb.heMaj : bb.heMin,
      signature: bb.sig,
    },
  };
}

export function formatSignatureBadge(scale) {
  if (scale.accidentalCount === 0) return '0';
  return `${scale.accidentalCount}${scale.accidentalType === 'sharp' ? '♯' : '♭'}`;
}

export function formatSignatureHe(scale) {
  if (scale.accidentalCount === 0) return 'ללא דיאזים או במולים (0)';
  if (scale.accidentalType === 'sharp') {
    return scale.accidentalCount === 1
      ? 'דיאז אחד (♯)'
      : `${scale.accidentalCount} דיאזים (♯)`;
  }
  return scale.accidentalCount === 1
    ? 'במול אחד (♭)'
    : `${scale.accidentalCount} במולים (♭)`;
}

export function sortScales(scales, order = 'chromatic') {
  const copy = [...scales];
  if (order === 'fifths') {
    return copy.sort((a, b) => a.circleOrder - b.circleOrder);
  }
  return copy.sort((a, b) => a.chromaticRank - b.chromaticRank);
}
