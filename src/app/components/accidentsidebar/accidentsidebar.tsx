import * as React from 'react';
import AccidentLocation from '../accident/accidentlocation';
import AccidentDescription from '../accident/accidentdescription';
import AccidentDate from '../accident/accidentdate';
import AccidentFilters from '../accidentfilters/accidentfilters';
import { type AccidentTags } from '@/app/constants/accidenttags';
import { type IAccidentData } from '@/app/fixtures/accidents';
import AccidentTitle from '../accident/accidenttitle';

export default function AccidentSidebar({
  selectedAccidentTypes,
  setSelectedAccidentTypes,
  setSelectedAccidentYears,
  selectedAccident
}: {
  selectedAccidentTypes: Set<AccidentTags>
  setSelectedAccidentTypes: React.Dispatch<React.SetStateAction<Set<AccidentTags>>>
  setSelectedAccidentYears: React.Dispatch<React.SetStateAction<number[]>>
  selectedAccident: IAccidentData | null
}) {
  return (
    <div className='flex flex-col w-96 justify-between'>
      <AccidentFilters
          setSelectedAccidentTypes={setSelectedAccidentTypes}
          setSelectedAccidentYears={setSelectedAccidentYears}
          selectedAccidentTypes={selectedAccidentTypes}
        />
      {selectedAccident != null && (
      <>
        <AccidentTitle
          title={selectedAccident.title}
        />
        <AccidentLocation
          accidentData={selectedAccident}
        />
        <AccidentDate
              date={selectedAccident.date}
            />
        <AccidentDescription
              description={selectedAccident.description}
            />
      </>
      )}
    </div>
  );
}
