import * as React from 'react';
import { DateTime } from 'luxon';

export default function AccidentDate({
  date
}: {
  date: DateTime
}) {
  return (
    <div className="text-sm">{date.toLocaleString(DateTime.DATE_MED)}</div>
  );
}
