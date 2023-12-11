import * as React from 'react';
import { type IAccidentData } from '@/app/fixtures/accidents';
import { displayableStateOrProvince } from '@/app/constants/locations';

export default function AccidentLocation({
  accidentData
}: {
  accidentData: IAccidentData
}) {
  const stateOrProvince = displayableStateOrProvince(accidentData.location.stateOrProvince);
  const locationString = `${accidentData.location.area.toString()}, ${stateOrProvince}`;
  return (
    <div className="flex justify-between">
      <div className="text-sm">{locationString}</div>
    </div>
  );
}
