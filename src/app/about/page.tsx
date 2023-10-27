'use client';

import * as React from 'react';
import AccidentCard from '../components/accidentcard';
import ExpandablePin from '../components/expandablepin';

export default function AboutPage() {
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
            <ExpandablePin>
                <AccidentCard />
            </ExpandablePin>
          </div>
        </main>
  );
}
