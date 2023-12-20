import * as React from 'react';

export default function AccidentTitle({
  title,
  fontSize = 'text-base'
}: {
  title: string
  fontSize: string
}) {
  return (
    <div className={`text-center ${fontSize} pb-2`}>{title}</div>
  );
}
