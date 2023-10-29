import * as React from 'react';
import AccidentTooltip from '../accidenttooltip/accidenttooltip';

export default function MapPoint({
  cx,
  cy,
  r = 2.5
}: {
  cx: number
  cy: number
  r?: number
}) {
  const [selected, setSelected] = React.useState(false);

  const onClick = () => {
    setSelected(!selected);
  };

  return (
    <>
      <circle
        className={`hover:fill-cyan-700 ${selected ? 'fill-cyan-700' : ''}`}
        cx={cx}
        cy={cy}
        onClick={onClick}
        r={r}
      />
      {selected &&
        <foreignObject
          width='400'
          height='400'
          x={cx - 500}
          y={cy}
        >
          <AccidentTooltip />
        </foreignObject>
      }
    </>
  );
}
