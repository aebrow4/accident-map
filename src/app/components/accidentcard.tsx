import * as React from 'react';
import { Card } from '@mui/material';

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

function AccidentLocation() {
  return (
        <div className="flex justify-between">
            <div className="text-sm">Calaveras County, CA</div>
            <div className="text-sm">Sands of Time, Calaveras Dome</div>
        </div>
  );
}

function AccidentDate() {
  return (
        <div className="text-xs">January 20, 2017</div>
  );
}

function AccidentDescription() {
  return (
        <div className="max-h-52 overflow-scroll">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
  );
}
