import * as d3 from 'd3';
import { AccidentTags } from '../constants/accidenttags';
import { DateTime } from 'luxon';
import { Area, Location, USState, USNationalPark, AACLocation } from '../constants/locations';

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
  location: Location
  tags: AccidentTags[]
  date: DateTime
  title: string
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
    title: 'foo title',
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

const HardcodedAccidents: IAccidentData[] = [{
  id: 1,
  latlng: [37.729625, -119.636400],
  location: new Location(
    USState.California,
    new Area(AACLocation.YosemiteValley, USNationalPark.Yosemite)
  ),
  tags: [],
  date: DateTime.fromISO('1990-06-19T13:00:00', { zone: 'America/Los_Angeles' }),
  title: 'PROTECTION FAILED, FALL ON ROCK',
  description: `California, Yosemite Valley

  At 0845 on June 20, 1989, Kent Kroeker (31) came to my residence saying that his climbing partner, Joe Kristy (43) had fallen on El Capitan and had broken his hip. I escorted him to the SAR Cache where he met with Shift Supervisor Mike Mayer.
  
  Kroeker said that Kristy had taken a leader fall on the 30th pitch on June 19 at 1300. They completed the route with Kristy jummarring. They spent the night on the top. Kroeker said he left Kristy the following morning to go for help.
  
  Mayer ordered helicopter 51 for evacuation. A helitack crew was dropped on El Cap, then went to El Cap meadow to pick up Park Medic Kerry Maxwell and Bob Howard. When we arrived, Kristy was sitting up by a tree. He was evacuated by litter into the helicopter and transferred to the clinic. X-rays at the clinic showed that Kristy had a broken femur at the trochanter. (Source: Greg Jackson, Ranger, Yosemite National Park)
  
  Analysis
  
  At the clinic, Kristy told me that he was starting on the 30th pitch, climbing to his left. He said he was standing with his left foot in an etrier, that was attached to a fixed Copperhead. He was standing there for about ten seconds when he was saying to himself, “I’m off route.” At that time, the Copperhead blew, Kristy fell and started penduluming to his right. The next piece of protection was described by Kristy as a 3/4" (1.9 cm) sling in a one-meter loop around a rock about two meters down and to the right. That sling blew, and he continued penduluming to his right, to another sling. That second sling was described as an 11/16" (1.7 cm) runner which was two meters to the right of the previous sling. It also broke. About one meter to the right of the second sling was a bolt by a dihedral. The bolt held, and Kristy continued his pendulum into the dihedral, where he impacted about ten meters below the bolt. Kristy estimated he fell 20 meters total.
  
  He said he then climbed up to the bolt, and pulled his haul bag up. He said that he was going to continue the pitch, then started, but could not continue because of the pain. Kroeker, who was on belay, then took the lead. The two were able to make it to the top by Kristy jummarring up, arriving at the top around 2130. (Source: Greg Jackson, Ranger, Yosemite National Park)
  `
}];

export default HardcodedAccidents;
