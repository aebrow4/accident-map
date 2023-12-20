import * as React from 'react';
import { Card } from '@mui/material';
import AccidentTitle from '../accident/accidenttitle';
import AccidentLocation from '../accident/accidentlocation';
import AccidentDate from '../accident/accidentdate';
import AccidentTags from '../accident/accidenttags';
import { type IAccidentData } from '@/app/fixtures/accidents';
import Border from '@/app/components/designsystem/border';

export default function AccidentTooltip({
  accidentData
}: { accidentData: IAccidentData }) {
  return (
    <Border
      radius='rounded-lg'
    >
      <Card
        className='w-96 bg-stone-50'
      >
        <div className='p-2'>
          <AccidentTitle
            title={accidentData.title}
            fontSize='text-lg'
          />
          <div className='flex justify-between'>
            <AccidentLocation
              accidentData={accidentData}
            />
            <AccidentDate
              date={accidentData.date}
            />
          </div>
        </div>
        <div className='bg-amber-50 px-2 pt-1 pb-2'>
          <AccidentTags
              tags={accidentData.tags}
            />
        </div>
      </Card>
    </Border>
  );
}
