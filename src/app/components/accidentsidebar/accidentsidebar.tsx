import * as React from 'react';
import AccidentLocation from '../accident/accidentlocation';
import AccidentDescription from '../accident/accidentdescription';
import AccidentDate from '../accident/accidentdate';

export default function AccidentSidebar() {
  return (
      <div className='max-w-sm flex flex-col'>
        <AccidentLocation />
        <AccidentDate />
        <AccidentDescription />
      </div>
  );
}
