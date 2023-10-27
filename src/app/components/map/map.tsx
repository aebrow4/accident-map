import * as React from 'react';
import * as d3 from 'd3';
import { mapGroup } from './us-map-svg';
import AccidentData from '@/app/fixtures/accidents';

export default function Map() {
  const ref = React.useRef(null);
  const width = 975;
  const height = 610;
  React.useEffect(() => {
    const svg = d3
      .select(ref.current)
      .join('svg')
      .attr('viewbox', `0, 0, ${width}, ${height}`);
    /**
     * Structure of our SVG:
     * <svg>
     *   <circle>[] (for each accident)
     *   <g> (mapGroup)
     *     <path /> (nation path)
     *     <path /> (states path)
     *     <path /> (counties path)
     *   </g>
     * </svg>
     */
    svg.append(() => mapGroup.node());
    svg
      .selectAll('circle')
      .data(AccidentData)
      .join('circle')
      .attr('cx', d => d !== null ? d[0] : 0)
      .attr('cy', d => d !== null ? d[1] : 0)
      .attr('r', 2.5);

    function zoomed({ transform }: { transform: () => any }): void {
      svg.attr('transform', transform);
    }
    const zoom: any = d3.zoom<SVGSVGElement, unknown>();
    svg.call(zoom.on('zoom', zoomed));
  }, []);
  return (
        <div className='overflow-hidden'>
          <svg width={width} height={height} ref={ref}></svg>
        </div>
  );
}
