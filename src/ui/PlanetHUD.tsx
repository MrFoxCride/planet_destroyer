import React, { useEffect, useState } from 'react';
import { store } from '../core/GameEngine.js';

export const PlanetHUD = () => {
  const [planet, setPlanet] = useState(store.get().planet);
  const [screen, setScreen] = useState(store.get().currentScreen);

  useEffect(() => {
    const cb = (s: any) => setPlanet({ ...s.planet });
    const screenCb = (s: any) => setScreen(s.currentScreen);
    store.on('update', cb);
    store.on('update', screenCb);
    return () => {
      store.off('update', cb);
      store.off('update', screenCb);
    };
  }, []);

  if (screen !== 'MainScreen') return null;

  const hpRatio = planet.hp / planet.maxHp;
  const dustRatio = Math.min(1, (planet.storedDust || 0) / 10000);

  return (
    <div className="absolute top-14 left-0 right-0 flex flex-col items-center pointer-events-none animate-fadeIn">
      <div className="flex items-center gap-x-2">
        {planet.colony && (
          <img src="/assets/ui/icon-colony.svg" className="w-5 h-5" />
        )}
        <span className="text-white text-lg font-semibold">{planet.name}</span>
      </div>
      {!planet.colony && (
        <div className="w-40 h-3 bg-gray-700 rounded overflow-hidden mt-1">
          <div className="bg-red-500 h-3" style={{ width: `${hpRatio * 100}%` }}></div>
        </div>
      )}
      {planet.colony && (
        <div className="w-40 h-3 bg-gray-700 rounded overflow-hidden mt-1">
          <div className="bg-yellow-500 h-3" style={{ width: `${dustRatio * 100}%` }}></div>
        </div>
      )}
    </div>
  );
};
