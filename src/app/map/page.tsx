'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import AccidentSidebar from '../components/accidentsidebar/accidentsidebar';
import { type AccidentTags } from '../constants/accidenttags';
import { type IAccidentData } from '../fixtures/accidents';
// The d3 library uses the client-side document keyword, which causes errors
// in next's node environment. So need to import dynamically
const Map = dynamic(async() => await import('../components/map/map'), { ssr: false });

export default function MapPage() {
  const [selectedAccidentTags, setSelectedAccidentTags] = React.useState<AccidentTags[]>([]);
  const [selectedAccidentYears, setSelectedAccidentYears] = React.useState<number[]>([]);
  const [selectedAccident, setSelectedAccident] = React.useState<IAccidentData | null>(null);

  return (
    <main className="flex min-h-screen flex-row items-stretch justify-between mx-6 py-24">
      <Map
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
