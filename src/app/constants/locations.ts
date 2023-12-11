/**
 * Locations are composed of two parts: a state or province, and an 'area'
 * where area may be a mountain range + peak, just a mountain range, or a wilderness
 * area such as a national park, refuge, or canyon. Occasionally it may be something else,
 * like the REI headquarters in Seattle.
 */

import { unreachable } from '../utils/errors';

export class Location {
  constructor(
    public stateOrProvince: USState | CAProvince,
    public area: Area
  ) {}
}

export enum USState {
  California = 'CA'
}

export enum CAProvince {
  BritishColumbia = 'BC'
}

export function displayableStateOrProvince(stateOrProvince: USState | CAProvince): string {
  switch (stateOrProvince) {
    case USState.California:
      return 'California';
    case CAProvince.BritishColumbia:
      return 'British Columbia';
  }
  return unreachable(stateOrProvince);
}

export class Area {
  constructor(
    public aacLocation?: AACLocation,
    public nationalPark?: USNationalPark,
    public mountain?: Mountain,
    public mountainRange?: MountainRange
  ) {
    // TODO add validations
  }

  toString(): string {
    if (this.aacLocation != null) {
      return this.aacLocation;
    } else if (this.mountainRange != null && this.mountain == null) {
      return this.mountainRange;
    } else if (this.mountainRange == null && this.mountain != null) {
      return this.mountain;
    } else if (this.mountainRange != null && this.mountain != null) {
      return `${this.mountainRange}, ${this.mountain}`;
    } else {
      // Shouldn't be possible but not expressed in type system
      throw new Error('Area.toString() called on invalid area. An area must have an AACLocation or either or both of a mountain/mountain range');
    }
  }
}

export enum MountainRange {
  RockyMountains = 'Rocky Mountains'
}
export enum Mountain {
  MountJoffee = 'Mount Joffre'
}
/**
 * These are locations from the AAC report that are not a mountain, such as 'Yosemite Valley',
 * or 'Boulder Canyon'
 */
export enum AACLocation {
  YosemiteValley = 'Yosemite Valley'
}

/**
 * National Parks aren't always included in the AAC report, but we should include them in our data
 * when we can infer them (i.e. if the location is Yosemite Valley, include Yosemite National Park)
 */
export enum USNationalPark {
  Yosemite = 'Yosemite National Park'
}
