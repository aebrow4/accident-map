'use client';

import * as React from 'react';
import Mapbox from '../mapbox/mapbox';
import AccidentSidebar from '../components/accidentsidebar/accidentsidebar';
import { type AccidentTags } from '../constants/accidenttags';
import { type IAccidentData } from '../fixtures/accidents';

export default function MapPage() {
  const [selectedAccidentTags, setSelectedAccidentTags] = React.useState<AccidentTags[]>([]);
  const [selectedAccidentYears, setSelectedAccidentYears] = React.useState<number[]>([]);
  const [selectedAccident, setSelectedAccident] = React.useState<IAccidentData | null>(null);

  return (
    <main className="flex flex-row items-stretch justify-between m-6 h-5/6">
      <Mapbox
        selectedAccidentTags={selectedAccidentTags}
        selectedAccidentYears={selectedAccidentYears}
        setSelectedAccident={setSelectedAccident}
        selectedAccident={selectedAccident}
      />
      <AccidentSidebar
        setSelectedAccidentTypes={setSelectedAccidentTags}
        setSelectedAccidentYears={setSelectedAccidentYears}
        selectedAccident={selectedAccident}
      />
    </main>
  );
}
