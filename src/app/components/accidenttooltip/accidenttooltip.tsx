import * as React from 'react';
import { Card } from '@mui/material';
import AccidentLocation from '../accident/accidentlocation';
import AccidentDate from '../accident/accidentdate';
import AccidentTags from '../accident/accidenttags';
import { type IAccidentData } from '@/app/fixtures/accidents';

export default function AccidentTooltip({
  accidentData
}: { accidentData: IAccidentData }) {
  return (
        <Card
          className='max-w-sm'
        >
            <div className="bg-slate-300">
              <AccidentLocation />
              <AccidentDate
                date={accidentData.date}
              />
              <AccidentTags />
            </div>
        </Card>
  );
}
