import * as React from 'react';

export default function AccidentDescription({
  description
}: { description: string }) {
  return (
    <div className="max-h-52 overflow-scroll">
      {description}
    </div>
  );
}
