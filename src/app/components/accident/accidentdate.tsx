import * as React from 'react';
import { DateTime } from 'luxon';

export default function AccidentDate({
  date
}: {
  date: DateTime
}) {
  return (
    <div className="text-xs">{date.toLocaleString(DateTime.DATETIME_MED)}</div>
  );
}
