'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
// The d3 library uses the client-side document keyword, which causes errors
// in next's node environment. So need to import dynamically
const _Map = dynamic(async() => await import('../components/map/map'), { ssr: false });

export default function MapPage() {
  return (
        <div>
            <_Map />
        </div>
  );
}
