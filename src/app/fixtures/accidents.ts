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
  tags: [AccidentTags.Serious, AccidentTags.Roped, AccidentTags.Trad, AccidentTags.AidAndBigWall, AccidentTags.Pendulum, AccidentTags.OffRoute, AccidentTags.InadequateProtection],
  date: DateTime.fromISO('1989-06-19T13:00:00', { zone: 'America/Los_Angeles' }),
  title: 'Protection Failed, Fall on Rock',
  description:
  `At 0845 on June 20, 1989, Kent Kroeker (31) came to my residence saying that his climbing partner, Joe Kristy (43) had fallen on El Capitan and had broken his hip. I escorted him to the SAR Cache where he met with Shift Supervisor Mike Mayer.
  Kroeker said that Kristy had taken a leader fall on the 30th pitch on June 19 at 1300. They completed the route with Kristy jummarring. They spent the night on the top. Kroeker said he left Kristy the following morning to go for help.
  Mayer ordered helicopter 51 for evacuation. A helitack crew was dropped on El Cap, then went to El Cap meadow to pick up Park Medic Kerry Maxwell and Bob Howard. When we arrived, Kristy was sitting up by a tree. He was evacuated by litter into the helicopter and transferred to the clinic. X-rays at the clinic showed that Kristy had a broken femur at the trochanter. (Source: Greg Jackson, Ranger, Yosemite National Park)\n
  Analysis\n
  At the clinic, Kristy told me that he was starting on the 30th pitch, climbing to his left. He said he was standing with his left foot in an etrier, that was attached to a fixed Copperhead. He was standing there for about ten seconds when he was saying to himself, “I’m off route.” At that time, the Copperhead blew, Kristy fell and started penduluming to his right. The next piece of protection was described by Kristy as a 3/4" (1.9 cm) sling in a one-meter loop around a rock about two meters down and to the right. That sling blew, and he continued penduluming to his right, to another sling. That second sling was described as an 11/16" (1.7 cm) runner which was two meters to the right of the previous sling. It also broke. About one meter to the right of the second sling was a bolt by a dihedral. The bolt held, and Kristy continued his pendulum into the dihedral, where he impacted about ten meters below the bolt. Kristy estimated he fell 20 meters total.
  He said he then climbed up to the bolt, and pulled his haul bag up. He said that he was going to continue the pitch, then started, but could not continue because of the pain. Kroeker, who was on belay, then took the lead. The two were able to make it to the top by Kristy jummarring up, arriving at the top around 2130. (Source: Greg Jackson, Ranger, Yosemite National Park)
  `
}, {
  id: 2,
  latlng: [37.748487, -119.598108],
  location: new Location(
    USState.California,
    new Area(AACLocation.YosemiteValley, USNationalPark.Yosemite)
  ),
  tags: [AccidentTags.Serious, AccidentTags.Roped, AccidentTags.Trad, AccidentTags.Wildlife],
  date: DateTime.fromISO('1989-10-01T12:00:00', { zone: 'America/Los_Angeles' }),
  title: 'Multiple Bee Stings',
  description: `
  Early in October, I was on the second belay ledge of a three pitch climb called “The Caverns” in Yosemite Valley’s Five Open Books area. My friend, Robin Supplee, was following up, cleaning the protection. About a third of the way up the pitch, I felt a sharp pain at my right calf. I looked down to find a bee there, as well as about ten more surrounding my right foot. I moved to the left side of the ledge to try to avoid them, but I only made my situation worse. By moving my right foot, I uncovered the crack in the ledge which was the entrance to their nest.
  Very quickly I realized that I was the trespasser on this ledge, and the rightful inahbitants were giving me their eviction notice. Within seconds multiple swarms flew out of the nest and attacked my legs, stomach, chest, arms, neck and head. My rucksack fortunately saved my back from their venomous torture. I alternated swatting the pests with my left and right hands so as not to let go of my rope and my partner. For a minute or two, I wondered how could this be happening? Why me? And would the bees ever return to their nest?
  I knew I had to get down before these bees injected me with too much venom. I knew I wasn’t allergic, but even so, how much could a person take and still survive? I had no idea, nor was I about to wait and find out while tied to a cliff 100 meters above the ground. I was cursing vehemently, and I am sure everyone in the vicinity heard me quite clearly. My pulse rate was moving off the charts, and my body was throbbing so hard I felt as though I might explode soon. My skin itched terribly where I had been stung, and the temperature of my skin was rising fast.
  I yelled at Robin to stop climbing at the next piece of protection that she could anchor into. When she anchored in, I told her to put me on belay so that she could lower me. I set up a top-rope anchor around a bay leaf tree growing from the ledge and told her to lower me. When I was about ten or eleven meters below the ledge, the bees ceased to follow me. I cleaned the protection I had placed on my way up as Robin continued to lower me to a ledge below her. At the ledge I anchored in, and then lowered Robin to the ledge. I set up two rappels, sending Robin down first each time.
  At the base of the cliff I downed a liter of water, while Robin packed the climbing gear into our two rucksaks.
  At the medical center I was given injections of epinepherin and was also put on IV with benedryl. The doctor even put me on oxygen just to be safe.
  The doctor told me that due to the late winter last year, the bee population was ten times greater than its usual size. The medical center personnel had seen a number of people this fall with severe bee stings, but by far I was one of the worst cases with at least 200 stings. (Source: James Gordon)
  (Editor’s Note: The bee population in general is up in those areas of the West which have been experiencing drought. This is one of many reports on climbers encountering bees. We are thankful to Mr. Gordon for his contribution, and commend him for being persevering under such extreme stress.)`
}, {
  id: 3,
  latlng: [40.0139, -105.30787],
  location: new Location(
    USState.Colorado,
    new Area(AACLocation.BoulderCanyon)
  ),
  tags: [AccidentTags.Serious, AccidentTags.Descent, AccidentTags.Unroped, AccidentTags.Solo, AccidentTags.ClimbingAlone, AccidentTags.Bouldering, AccidentTags.HandholdFootholdBroke],
  date: DateTime.fromISO('1989-06-24T12:00:00', { zone: 'America/Denver' }),
  title: 'No Rope, Climbing Alone, Unable to Downclimb, Jumped',
  description: `
  On June 24, 1989, Stephen Gilmore (30), David McConnell (27) and Annette Hailey (31) were out to climb Cozyhangon “The Dome.” While getting ready and waiting for another party, Steve strolled off alone. Finding an interesting face, he decided to warm up by bouldering. After climbing about five or six meters up, a hold pulled off and he realized he was further off the ground than he had intended. Unable to downclimb and unwilling to go any further, he finally had to jump. Steve sustained a very severely bruised heel, strained right knee, and minor laceration to his left leg and several minor abrasions. He was able to walk out without assistance and treat his own injuries while David and Annette finished the climb. X-rays later showed Steve had broken nothing but he still was unable to climb for several months. (Source: David McConnell)
  `
}];

export default HardcodedAccidents;
