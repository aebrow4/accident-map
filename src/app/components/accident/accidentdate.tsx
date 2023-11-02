import * as React from 'react';
import { type DateTime } from 'luxon';

export default function AccidentDate({
  date
}: {
  date: DateTime
}) {
  return (
    <div className="text-xs">{date.toISODate()}</div>
  );
}
