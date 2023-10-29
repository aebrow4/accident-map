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
  Rappeling = 'rappeling',
  Fatal = 'fatal',
  Inexperience = 'inexperience',
}

export const humanReadableAccidentTags: Record<AccidentTags, string> = {
  [AccidentTags.Rappeling]: 'Rappeling',
  [AccidentTags.Fatal]: 'Fatal',
  [AccidentTags.Inexperience]: 'Inexperience'
};
