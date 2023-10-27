'use client';

import * as React from 'react';
import Room from '@mui/icons-material/room';
import useHover from '../hooks/usehover';

export default function ExpandablePin({
  children
}: { children?: React.ReactElement }) {
  const [hovered, eventHandlers] = useHover();
  const pinColor = () => {
    if (hovered) {
      return 'primary';
    } else {
      return 'disabled';
    }
  };
  return (
        <span {...eventHandlers}>
          <Room color={pinColor()} />
          {hovered && children}
        </span>
  );
}
