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
    <Border>
      <Card
        className='max-w-sm'
      >
        <div className="bg-slate-300">
          <AccidentTitle
          title={accidentData.title}
        />
          <Border />
          <AccidentLocation
            accidentData={accidentData}
          />
          <AccidentDate
            date={accidentData.date}
          />
          <Border />
          <AccidentTags
            tags={accidentData.tags}
          />
        </div>
      </Card>
    </Border>
  );
}
