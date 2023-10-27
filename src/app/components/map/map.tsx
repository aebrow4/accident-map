import * as React from 'react';
import * as d3 from 'd3';
import { mapGroup } from './us-map-svg';

export default function Map() {
  const ref = React.useRef(null);
  const width = 975;
  const height = 610;
  React.useEffect(() => {
    console.log('use effect');
    const svg = d3
      .select(ref.current)
      .selectAll('svg')
    /**
           * The data we are binding is arbitrary; it's used so d3 can keep track
           * of the svg elements that have data bound and those that do not
           * so that they are duplicated if useEffect runs multiple times (i.e.) in
           * react strict mode.
           * For more: https://stackoverflow.com/questions/68099807/update-dom-ref-using-d3-and-react
           */
      .data([1])
      .join('svg')
      .attr('viewbox', `0, 0, ${width}, ${height}`);
    /**
         * Structure of our SVG:
         * <svg>
         *   <g> (containerGroup)
         *     <g> (mapGroup)
         *       <path /> (nation path)
         *       <path /> (states path)
         *       <path /> (counties path)
         *     </g>
         *     <g> (overlayGroup)
         *       <circle /> (the overlays)
         *       ...
         *     </g
         *   </g>
         * </svg>
         */
    const containerGroup = svg.append('svg:g');
    containerGroup.append(() => mapGroup.node());

    // very rarely does this get called. Is something blocking the evnet loop?
    function zoomed({ transform }: { transform: () => any }): void {
      console.log('zoom');
      containerGroup.attr('transform', transform);
    }
    const zoom: any = d3.zoom<SVGSVGElement, unknown>();
    svg.call(zoom.on('zoom', zoomed));
  }, []);
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <svg width={width} height={height} ref={ref}></svg>
        </main>
  );
}
