import * as React from 'react';
import * as d3 from 'd3';
import { mapGroup } from './us-map-svg';
import AccidentData from '@/app/fixtures/accidents';
import MapPoint from '../mappoint/mappoint';

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
     *   <circle>[] (for each accident - rendered by react)
     *   <g> (mapGroup - this and everything beneath rendered by d3)
     *     <path /> (nation path)
     *     <path /> (states path)
     *     <path /> (counties path)
     *   </g>
     * </svg>
     */
    svg.append(() => mapGroup.node());
    function zoomed({ transform }: { transform: () => any }): void {
      svg.attr('transform', transform);
    }
    const zoom: any = d3.zoom<SVGSVGElement, unknown>();
    svg.call(zoom.on('zoom', zoomed));
  }, []);
  return (
        <div className='overflow-hidden'>
          <svg
            width={width}
            height={height}
            ref={ref}
          >
            {AccidentData.map(coords => {
              if (coords !== null) {
                const cx = coords[0];
                const cy = coords[1];
                return <MapPoint key={`${cx}-${cy}`} cx={cx} cy={cy} />;
              } else {
                return null;
              }
            })}
          </svg>
        </div>
  );
}
