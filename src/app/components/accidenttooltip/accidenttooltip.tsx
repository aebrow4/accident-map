import * as React from 'react';
import { Card } from '@mui/material';
import AccidentLocation from '../accident/accidentlocation';
import AccidentDate from '../accident/accidentdate';
import AccidentDescription from '../accident/accidentdescription';

export default function AccidentTooltip() {
  return (
        <Card
          className='max-w-sm'
        >
            <div className="bg-slate-300">
              <AccidentLocation />
              <AccidentDate />
            </div>
            <AccidentDescription />
        </Card>
  );
}
