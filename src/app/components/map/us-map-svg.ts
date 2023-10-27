'use client';
import { create, geoPath as _geoPath } from 'd3';
import { mesh, feature, type UsAtlas } from 'topojson';
import { COUNTIES } from '../../fixtures/us-counties-albers';

export const mapGroup = create('svg:g')
  .attr('fill', 'none')
  .attr('stroke', '#000')
  .attr('stroke-linejoin', 'round')
  .attr('stroke-linecap', 'round');

const data: UsAtlas = COUNTIES;
const geoPath = _geoPath();
const countiesPath = geoPath(mesh(data, data.objects.counties, (a: any, b: any) => a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0)));
const statesPath = geoPath(mesh(data, data.objects.states, (a, b) => a !== b));
const nationPath = geoPath(feature(data, data.objects.nation));
mapGroup.append('path')
  .attr('stroke', '#aaa')
  .attr('stroke-width', '0.5')
  .attr('d', countiesPath!.toString());
mapGroup.append('path')
  .attr('stroke-width', '0.5')
  .attr('d', statesPath!.toString());
mapGroup.append('path')
  .attr('d', nationPath!.toString());
