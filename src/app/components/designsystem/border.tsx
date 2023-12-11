import * as React from 'react';

/**
 * Wrap children in a border, or insert a horizontal rule between components
 */
export default function Border({
  children,
  color = 'black',
  radius = 'rounded-sm'
}: {
  children?: React.ReactNode
  color?: string
  radius?: string
}) {
  const borderWidth = children != null ? 'border' : 'border-t';
  const borderStyle = 'border-style-solid';
  const borderColor = `border-${color}`;
  const borderRadius = radius;
  return (
    <div className={`${borderWidth} ${borderStyle} ${borderColor} ${borderRadius}`}>{children}</div>
  );
}
