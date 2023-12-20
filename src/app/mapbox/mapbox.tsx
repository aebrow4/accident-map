'use client';

import * as React from 'react';
import mapboxgl, { Marker as _Marker } from 'mapbox-gl';
import _ from 'lodash';
import 'mapbox-gl/dist/mapbox-gl.css';
import Marker from '../components/marker/marker';
import AccidentData, { type IAccidentData } from '../fixtures/accidents';
import { type AccidentTags } from '../constants/accidenttags';
import AccidentTooltip from '../components/accidenttooltip/accidenttooltip';

const accessToken = 'pk.eyJ1IjoiYWViMCIsImEiOiJjbHEyd3p6Z2MwNnB2MmlvM2Z3c2V4Z2J2In0.NaX12blpy5si7dYfGYeARw';
const mapboxStyle = 'mapbox://styles/aeb0/clq2x4dk900n801r88lav1r32/draft';
mapboxgl.accessToken = accessToken;

export default function Mapbox({
  selectedAccidentYears,
  selectedAccidentTags,
  selectedAccident,
  setSelectedAccident
}: {
  selectedAccidentYears: number[]
  selectedAccidentTags: Set<AccidentTags>
  selectedAccident: IAccidentData | null
  setSelectedAccident: React.Dispatch<React.SetStateAction<IAccidentData | null>>
}) {
  const mapContainer = React.useRef(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = React.useState(-119.575724); // Coords for Yosemite Valley
  const [lat, setLat] = React.useState(37.743324);
  const [zoom, setZoom] = React.useState(9);
  const markers: Array<{
    ref: React.MutableRefObject<mapboxgl.Marker>
    accidentDatum: IAccidentData }> = [];
  /**
   * The for loop creates mapbox marker objects and gives them an empty <p> tag
   * so that they are positioned correctly but invisible when added to the DOM outside
   * of react, using the mapbox API.
   * In React, we lookup the transform of each p tag and use that to create our own React Marker
   * component at the correct absolute position (overlayed on the map)
   */
  if (typeof document !== 'undefined') {
    for (let i = 0; i < AccidentData.length; i++) {
      const accidentDatum = AccidentData[i];
      const accidentIdAttr = document.createAttribute('accidentId');
      accidentIdAttr.value = accidentDatum.id.toString();
      const element = document.createElement('p');
      element.setAttributeNode(accidentIdAttr);
      // Think this is safe since we are iterating over a static array
      const ref = React.useRef(new _Marker(element));
      const marker = {
        ref,
        accidentDatum
      };
      markers.push(marker);
    }
  }
  React.useEffect(() => {
    if (map.current != null) return;
    const _map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: mapboxStyle,
      center: [lng, lat],
      zoom
    });
    map.current = _map;
    _map.on('load', () => {
      setLng(Number(_map.getCenter().lng.toFixed(4)));
      setLat(Number(_map.getCenter().lat.toFixed(4)));
      setZoom(Number(_map.getZoom().toFixed(2)));
    });
    _map.on('move', () => {
      setLng(Number(_map.getCenter().lng.toFixed(4)));
      setLat(Number(_map.getCenter().lat.toFixed(4)));
      setZoom(Number(_map.getZoom().toFixed(2)));
    });

    markers.forEach((marker, i) => {
      const latLng = marker.accidentDatum.latlng;
      marker
        .ref
        .current
        .setLngLat([latLng[1], latLng[0]])
        .addTo(_map);
    });
  });

  /**
   * Returns a numeric tuple of a Mapbox marker element's x,y position in the canvas.
   * If this fails for any reason return null.
   */
  function getMarkerTransform(marker: React.MutableRefObject<mapboxgl.Marker>): [number, number] | null {
    const transform = marker.current.getElement().style.transform;
    const parsed = parseTranslateString(transform);
    if (!Array.isArray(parsed)) return null;
    if (parsed.length !== 2) return null;
    if (Number.isNaN(parsed[0]) || Number.isNaN(parsed[1])) return null;
    return [parsed[0], parsed[1]];
  }

  return (
    <div className='relative w-9/12 overflow-hidden'>
      <div ref={mapContainer} className='flex h-full'>
      </div>
      {markers.filter(marker => {
        if (selectedAccidentYears.length === 0 && selectedAccidentTags.size === 0) return true;
        const accidentYear = marker.accidentDatum.date.year;
        if (selectedAccidentYears.length > 0 && !selectedAccidentYears.includes(accidentYear)) {
          return false;
        }
        const accidentHasAllTags = _.every(Array.from(selectedAccidentTags), (tag) => (
          marker.accidentDatum.tags.includes(tag)
        ));
        if (!accidentHasAllTags) {
          return false;
        }

        return true;
      }
      ).map(marker => {
        const accidentId = marker.ref.current.getElement().getAttribute('accidentId');
        const markerTransform = getMarkerTransform(marker.ref);
        if (markerTransform == null) return null;
        return (
          <Marker
            key={accidentId}
            left={markerTransform[0]}
            top={markerTransform[1]}
            accidentData={marker.accidentDatum}
            isSelected={Number(accidentId) === selectedAccident?.id}
            setSelectedAccident={setSelectedAccident}
            tooltip={<AccidentTooltip accidentData={marker.accidentDatum} />}
        />);
      })
      }
    </div>
  );
}

/**
 * FIXME make less terrible
 * Attempts to parse an html style 'transform' string into a two number tuple
 * Caller should do error checking - we can fail to return two elements, or elements may be NaN.
 *
 * eg. 'transform: translate(712px, 392px) translate(-50%, -50%) translate(0px, 0px)' -> [712, 392]
 */
function parseTranslateString(str: string) {
  const openParenAt = str.search(/\(/);
  const closeParenAt = str.search(/\)/);
  // e.g. '1096px, 490px'
  const firstTransformString = str.slice(openParenAt + 1, closeParenAt);
  const parts = firstTransformString.split(',');
  return parts.map(part => {
    const sliceTo = part.search(/p/);
    return Number(part.slice(0, sliceTo));
  });
}
