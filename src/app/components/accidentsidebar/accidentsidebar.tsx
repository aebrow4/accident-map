import * as React from 'react';
import AccidentLocation from '../accident/accidentlocation';
import AccidentDescription from '../accident/accidentdescription';
import AccidentDate from '../accident/accidentdate';
import AccidentFilters from '../accidentfilers/accidentfilters';
import { type AccidentTags } from '@/app/constants/accidenttags';
import { type IAccidentData } from '@/app/fixtures/accidents';

export default function AccidentSidebar({
  setSelectedAccidentTypes,
  selectedAccident
}: {
  setSelectedAccidentTypes: React.Dispatch<React.SetStateAction<AccidentTags[]>>
  selectedAccident: IAccidentData | null
}) {
  return (
      <div className='max-w-sm flex flex-col'>
        <AccidentFilters
          setSelectedAccidentTypes={setSelectedAccidentTypes}
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
