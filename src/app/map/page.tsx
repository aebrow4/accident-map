'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import AccidentSidebar from '../components/accidentsidebar/accidentsidebar';
// The d3 library uses the client-side document keyword, which causes errors
// in next's node environment. So need to import dynamically
const Map = dynamic(async() => await import('../components/map/map'), { ssr: false });

export default function MapPage() {
  return (
        <main className="flex min-h-screen flex-row items-stretch justify-between py-24">
          <Map />
          <AccidentSidebar />
        </main>
  );
}
