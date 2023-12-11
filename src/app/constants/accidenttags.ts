/**
 * Need to think about what long term data modeling
 * for tags shoudl be. For prototyping just use this enum
 */

/**
 * By using the same casing for keys and values we eliminate bugs
 * where we thought we were passing around keys but were passing around values.
 * Or where a coercion from string to enum fails because casing was incorrect.
 *
 * And by using an enum that defines values, we guarantee that the size of the enum
 * (when calculated via Object.keys(enum).length) will be what we think it is
 * (since there won't be reverse mapping)
 */

export enum AccidentTags {
  Serious = 'serious',
  Roped = 'roped',
  Unroped = 'unroped',
  Solo = 'solo',
  ClimbingAlone = 'climbing alone',
  Bouldering = 'bouldering',
  HandholdFootholdBroke = 'handhold/foothold broke',
  Trad = 'trad',
  AidAndBigWall = 'aid and big wall',
  Pendulum = 'pendulum',
  OffRoute = 'off route',
  InadequateProtection = 'inadequate protection/pulled',
  Wildlife = 'wildlife',
  Descent = 'descent',

}

export const humanReadableAccidentTags: Record<AccidentTags, string> = {
  [AccidentTags.Serious]: 'Serious',
  [AccidentTags.Roped]: 'Roped',
  [AccidentTags.Unroped]: 'Unroped',
  [AccidentTags.Solo]: 'Solo',
  [AccidentTags.ClimbingAlone]: 'Climbing Alone',
  [AccidentTags.Bouldering]: 'Bouldering',
  [AccidentTags.HandholdFootholdBroke]: 'Handhold/foothold broke',
  [AccidentTags.Trad]: 'Trad',
  [AccidentTags.AidAndBigWall]: 'Aid/big wall',
  [AccidentTags.Pendulum]: 'Pendulum',
  [AccidentTags.OffRoute]: 'Off route',
  [AccidentTags.InadequateProtection]: 'Inadequate or pulled protection',
  [AccidentTags.Wildlife]: 'Wildlife',
  [AccidentTags.Descent]: 'Descent'
};
