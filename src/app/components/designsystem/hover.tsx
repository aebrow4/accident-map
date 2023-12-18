import * as React from 'react';

// this works for displaying/not displaying on hover, but the positioning
// of the hovered component is off probably because we are already using absolute positioning
export default function Hover({
  hoverChildren,
  children
}: {
  hoverChildren: () => React.ReactNode
  children: () => React.ReactNode
}) {
  return (
    <div className='hover'>
      <div className='hovered'>{hoverChildren()}</div>
      {children()}
    </div>
  );
}
