import React from 'react';
import { isProd } from '../data/BuildFlags.js';

export const DevPanel = () => {
  if (isProd) return null;
  return (
    <div className="fixed bottom-0 right-0 z-[400] p-2 pointer-events-auto">
      <div className="bg-gray-800 text-white p-2 rounded flex flex-col space-y-1">
        <button className="bg-blue-500 px-2 py-1">Add Dust</button>
        <button className="bg-blue-500 px-2 py-1">Skip Ads</button>
        <button className="bg-blue-500 px-2 py-1">Unlock Screens</button>
        <button className="bg-blue-500 px-2 py-1">Force Nebula</button>
      </div>
    </div>
  );
};
