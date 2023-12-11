import * as React from 'react';

export default function AccidentDescription({
  description
}: { description: string }) {
  return (
    <div className="overflow-scroll, whitespace-pre-wrap">
      {description}
    </div>
  );
}
