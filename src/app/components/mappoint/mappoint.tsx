import * as React from 'react';
import AccidentTooltip from '../accidenttooltip/accidenttooltip';
import useHover from '@/app/hooks/usehover';
import { type IAccidentData } from '@/app/fixtures/accidents';
import { Popover } from '@mui/material';

export default function MapPoint({
  cx,
  cy,
  zoomLevel,
  setSelectedAccident,
  isSelected,
  accidentData
}: {
  cx: number
  cy: number
  zoomLevel: number
  setSelectedAccident: React.Dispatch<React.SetStateAction<IAccidentData | null>>
  isSelected: boolean
  accidentData: IAccidentData
}) {
  const [hovered, eventHandlers] = useHover();

  const onClick = () => {
    setSelectedAccident(accidentData);
  };

  return (
    <>
      <circle
        {...eventHandlers}
        className={`hover:fill-cyan-700 ${isSelected ? 'fill-red-700' : ''}`}
        cx={cx}
        cy={cy}
        r={circleRadiusFromZoomLevel({ zoomLevel })}
        onClick={onClick}
      />
      {hovered &&
        <foreignObject
          width='300'
          height='400'
          x={cx + 5}
          y={cy + 5}
        >
          {/* <Popover
            open={hovered}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
          > */}

          <AccidentTooltip
            accidentData={accidentData}
          />
          {/* </Popover> */}
        </foreignObject>
      }
    </>
  );
}

function circleRadiusFromZoomLevel({
  zoomLevel
}: { zoomLevel: number }): number {
  let r = 3;
  if (zoomLevel > 4) {
    r = 6;
  } else if (zoomLevel > 3) {
    r = 5;
  } else if (zoomLevel > 2) {
    r = 4;
  }
  return r;
}
