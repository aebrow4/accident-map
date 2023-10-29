import * as d3 from 'd3';
import { AccidentTags } from '../constants/accidenttags';
import { DateTime } from 'luxon';

export function scaledAlbersProjection({
  scale,
  x,
  y,
  lat,
  lng
}: {
  scale: number
  x: number
  y: number
  lat: number
  lng: number
}): [number, number] {
  const scaleFn = d3.geoAlbersUsa().scale(scale).translate([x, y]);
  const scaled = scaleFn([lng, lat]);
  return scaled ?? [0, 0];
}
// Note that the projection methods need (long, lat) not (lat, long)

// const hartfordProjected = scaledAlbersProjection([-72.748094, 41.764531]);
// const secondProjected = scaledAlbersProjection([-73.748094, 42.764531]);

/**
 * A bunch of data points in CA so we can experiment
 * with how sampling and zoom works with density
 */

export interface IAccidentData {
  id: number
  latlng: [number, number]
  tags: AccidentTags[]
  date: DateTime
  description: string
}

/**
 * Generate a lat lng within California. This is a very naive
 * implementation; the lat lngs are not evenly distributed throughout
 * the entire state but in a relatively dense area.
 *
 * N-S range: 38.3 degrees N to 42 degrees N
 * (approx Lake Tahoe to Oregon border)
 *
 * E-W range: -124 degrees W to 120 degrees W
 * (approx coast to Lake Tahoe)
 *
 * ex: 39.288924, -121.636006
 */
function randomCaliforniaLatLng(): [number, number] {
  const lat = randomNumberInRange(38.3, 42);
  const lng = -1 * randomNumberInRange(120, 124);
  return [lat, lng];
}

/**
 * An extremely mediocre random date generator.
 * Date range arbitrarily harcoded to 1970-2023
 */
function randomDate(): DateTime {
  const day = Math.floor(randomNumberInRange(1, 29));
  const month = Math.floor(randomNumberInRange(1, 13));
  const year = Math.floor(randomNumberInRange(1970, 2024));
  return DateTime.local(year, month, day);
}

/**
 * Randomly generate from 1 to n AccidentTags, where n is the
 * number of elements in the AccidentTags enum.
 */
function randomTags(): AccidentTags[] {
  const size = Object.keys(AccidentTags).length;
  const numTags = Math.floor(randomNumberInRange(1, size + 1));
  const accidentTagsArray = Object.values(AccidentTags);
  const randomAccidentTags = new Array(numTags).fill(null).map(() => {
    const idx = Math.floor(randomNumberInRange(0, accidentTagsArray.length));
    return accidentTagsArray[idx];
  });
  return Array.from(new Set(randomAccidentTags));
}

/**
 *  Return a random number between @param lower and @param upper, inclusive
 */
function randomNumberInRange(lower: number, upper: number): number {
  return Math.random() * (upper - lower) + lower;
}

const AccidentData: IAccidentData[] = new Array(100).fill(null).map((v, i) => {
  const latlng: [number, number] = randomCaliforniaLatLng();
  return {
    id: i,
    latlng,
    tags: randomTags(),
    date: randomDate(),
    description: 'foo description'
  };
});

export function mapPointKey({
  lat,
  lng
}: {
  lat: number
  lng: number
}): string {
  return `${lat}-${lng}`;
}
export default AccidentData;
