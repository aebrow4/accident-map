import * as React from 'react';
import AccidentLocation from '../accident/accidentlocation';
import AccidentDescription from '../accident/accidentdescription';
import AccidentDate from '../accident/accidentdate';
import AccidentFilters from '../accidentfilters/accidentfilters';
import { type AccidentTags } from '@/app/constants/accidenttags';
import { type IAccidentData } from '@/app/fixtures/accidents';

export default function AccidentSidebar({
  setSelectedAccidentTypes,
  setSelectedAccidentYears,
  selectedAccident
}: {
  setSelectedAccidentTypes: React.Dispatch<React.SetStateAction<AccidentTags[]>>
  setSelectedAccidentYears: React.Dispatch<React.SetStateAction<number[]>>
  selectedAccident: IAccidentData | null
}) {
  return (
    <div className='flex flex-col w-96'>
      <AccidentFilters
          setSelectedAccidentTypes={setSelectedAccidentTypes}
          setSelectedAccidentYears={setSelectedAccidentYears}
        />
      {selectedAccident != null && (
      <>
        <AccidentLocation />
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
