import React from 'react';
import { isProd } from '../data/BuildFlags.js';
import { stateManager, store } from '../core/GameEngine.js';
import { weaponSystem } from '../core/WeaponSystem.js';
import { BrushManager } from '../core/BrushManager.js';

const screens = ['MainScreen', 'GalaxyMap', 'Profile', 'Store', 'Earn', 'Friends'];

export const DevPanel = () => {
  if (isProd) return null;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-purple-600 text-white z-[400] pointer-events-auto"
        onClick={() => setOpen(true)}
      >
        <img src="/assets/ui/icon-dev.svg" className="w-full h-full" />
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
            <button className="absolute top-2 right-2" onClick={() => setOpen(false)}>✕</button>
            <button
              className="bg-blue-500 px-2 py-1"
              onClick={() => store.addDust(1000, 'dev')}
            >
              +1000 Dust
            </button>
            <button
              className="bg-blue-500 px-2 py-1 mt-1"
              onClick={() => store.resetPlanet()}
            >
              Reset Planet
            </button>
            <button
              className="bg-blue-500 px-2 py-1 mt-1"
              onClick={() => weaponSystem.addAmmo(10)}
            >
              Add ammo
            </button>
            <button
              className="bg-blue-500 px-2 py-1 mt-1"
              onClick={() => store.addMagmaton(100, 'dev')}
            >
              +100 Magmaton
            </button>
            <button
              className="bg-blue-500 px-2 py-1 mt-1"
              onClick={() => store.addCore(100, 'dev')}
            >
              +100 Core
            </button>
            <button
              className="bg-blue-500 px-2 py-1 mt-1"
              onClick={() => store.damagePlanet(store.state.planet.hp)}
            >
              Force Destroy
            </button>
            <button
              className="bg-blue-500 px-2 py-1 mt-1"
              onClick={() => store.chooseColonize()}
            >
              Force Colonize
            </button>
            <button
              className="bg-blue-500 px-2 py-1 mt-1"
              onClick={() => store.startExtraction(1000)}
            >
              Force Extract
            </button>
            <button
              className="bg-blue-500 px-2 py-1 mt-1"
              onClick={() => store.unlockAllSectors()}
            >
              Unlock all sectors
            </button>
            <div className="flex gap-1 mt-2">
              {BrushManager.brushes.map((b) => (
                <button
                  key={b}
                  className="bg-blue-500 px-2 py-1 text-sm"
                  onClick={() => BrushManager.set(b)}
                >
                  {b}
                </button>
              ))}
            </div>
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
