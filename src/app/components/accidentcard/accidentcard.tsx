import * as React from 'react';
import { Card } from '@mui/material';
import AccidentLocation from '../accident/accidentlocation';
import AccidentDate from '../accident/accidentdate';
import AccidentDescription from '../accident/accidentdescription';

export default function AccidentCard() {
  return (
        <Card sx={{ width: '400px' }}>
            <div className="bg-slate-300">
              <AccidentLocation />
              <AccidentDate />
            </div>
            <AccidentDescription />
        </Card>
  );
}
