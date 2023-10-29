import * as React from 'react';
import * as d3 from 'd3';
import { every } from 'lodash';
import { mapGroup } from './us-map-svg';
import AccidentData, { type IAccidentData, scaledAlbersProjection } from '@/app/fixtures/accidents';
import MapPoint from '../mappoint/mappoint';
import { type AccidentTags } from '@/app/constants/accidenttags';
import { mapPointKey } from '@/app/fixtures/accidents';

export default function Map({
  selectedAccidentTypes,
  setSelectedAccident,
  selectedAccident
}: {
  selectedAccidentTypes: AccidentTags[]
  setSelectedAccident: React.Dispatch<React.SetStateAction<IAccidentData | null>>
  selectedAccident: IAccidentData | null
}) {
  const [transform, setTransform] = React.useState<Pick<d3.ZoomTransform, 'x' | 'y' | 'k'>>({ x: 0, y: 0, k: 1 });
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
     *   <g> (mapGroup - rendered by d3. zoom handler fn attached here.)
     *     <path /> (nation path)
     *     <path /> (states path)
     *     <path /> (counties path)
     *   </g>
     *   <circle>[] (for each accident - rendered by react)
     * </svg>
     */
    const svgMapGroup = mapGroup.node();
    svg.append(() => svgMapGroup);
    function handleZoom({ transform }: { transform: d3.ZoomTransform }): void {
      // The zoom behavior has to be attached to the g within the svg or else
      // it's buggy
      const { x, y, k } = transform;
      setTransform({ x, y, k });
      d3.select(svgMapGroup).attr('transform', transform.toString());
    }
    const zoom: any = d3.zoom<SVGSVGElement, null>()
      .scaleExtent([1, 4]);
    ;
    svg.call(zoom.on('zoom', handleZoom));
  }, []);
  return (
        <div className='overflow-hidden'>
          <svg
            width={width}
            height={height}
            ref={ref}
          >
            {AccidentData.map(accidentDatum => {
              const { latlng, tags } = accidentDatum;
              const doesAccidentMatchTagsFilter = every(selectedAccidentTypes, (t) => tags.includes(t));

              if (doesAccidentMatchTagsFilter) {
                const scaledAlbersCoords = scaledAlbersProjection({
                  scale: 1300, // Need 1300 scale for 975x610 viewport.
                  x: width / 2,
                  y: height / 2,
                  lat: latlng[0],
                  lng: latlng[1]
                });
                const cx = scaledAlbersCoords[0] * transform.k + transform.x;
                const cy = scaledAlbersCoords[1] * transform.k + transform.y;
                const key = mapPointKey({
                  lat: accidentDatum.latlng[0],
                  lng: accidentDatum.latlng[1]
                });
                const keyOfSelectedMapPoint = selectedAccident != null
                  ? mapPointKey({
                    lat: selectedAccident.latlng[0],
                    lng: selectedAccident.latlng[1]
                  })
                  : '';
                return (
                  <MapPoint
                    key={key}
                    cx={cx}
                    cy={cy}
                    zoomLevel={transform.k}
                    setSelectedAccident={setSelectedAccident}
                    accidentData={accidentDatum}
                    isSelected={key === keyOfSelectedMapPoint}
                  />
                );
              } else {
                return null;
              }
            })}
          </svg>
        </div>
  );
}
