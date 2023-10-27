import * as React from 'react';

export default function useHover(): [boolean, { onMouseOver: () => void, onMouseLeave: () => void }] {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const eventHandlers = React.useMemo(() => ({
    onMouseOver: () => { setHovered(true); },
    // this shorthand is the same
    onMouseLeave() { setHovered(false); }
  }), []);

  return [hovered, eventHandlers];
}
