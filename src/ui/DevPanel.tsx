import React from 'react';
import { isProd } from '../data/BuildFlags.js';
import { stateManager, store } from '../core/GameEngine.js';

const screens = ['MainScreen', 'GalaxyMap', 'Profile', 'Store', 'Earn', 'Friends'];

export const DevPanel = () => {
  if (isProd) return null;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-purple-600 text-white z-[400] pointer-events-auto opacity-0"
        onClick={() => setOpen(true)}
      >
        Dev
      </button>
      {open && (
        <div
          className="absolute inset-0 z-[400] bg-black/50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gray-800 text-white p-4 rounded-lg drop-shadow pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="bg-blue-500 px-2 py-1"
              onClick={() => store.addDust(100, 'dev')}
            >
              Add Dust
            </button>
            <button
              className="bg-blue-500 px-2 py-1 mt-1"
              onClick={() => store.resetPlanet()}
            >
              Reset HP
            </button>
            <button
              className="bg-blue-500 px-2 py-1 mt-1"
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
      )}
    </>
  );
};
