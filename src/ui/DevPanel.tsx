import React from 'react';
import { isProd } from '../data/BuildFlags.js';
import { stateManager, store } from '../core/GameEngine.js';

const screens = ['MainScreen', 'GalaxyMap', 'Profile', 'Store', 'Earn', 'Friends'];

export const DevPanel = () => {
  if (isProd) return null;
  return (
    <div className="fixed bottom-0 right-0 z-[400] p-2 pointer-events-auto">
      <div className="bg-gray-800 text-white p-2 rounded flex flex-col space-y-1">
        <button
          className="bg-blue-500 px-2 py-1"
          onClick={() => store.addDust(100, 'dev')}
        >
          Add Dust
        </button>
        <button
          className="bg-blue-500 px-2 py-1"
          onClick={() => store.resetPlanet()}
        >
          Reset HP
        </button>
        <button
          className="bg-blue-500 px-2 py-1"
          onClick={() => {
            store.addCore(1, 'dev');
            store.resetPlanet();
          }}
        >
          Instant Dispatch
        </button>
        <div className="flex flex-wrap space-x-1 mt-2">
          {screens.map((s) => (
            <button
              key={s}
              className="bg-purple-600 px-2 py-1 mt-1"
              onClick={() => stateManager.goTo(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
