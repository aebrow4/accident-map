import * as d3 from 'd3';

const scaledAlbersProjection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);
// Note that the projection methods need (long, lat) not (lat, long)

const hartfordProjected = scaledAlbersProjection([-72.748094, 41.764531]);
const secondProjected = scaledAlbersProjection([-73.748094, 42.764531]);

const AccidentData = [hartfordProjected, secondProjected];
export default AccidentData;
