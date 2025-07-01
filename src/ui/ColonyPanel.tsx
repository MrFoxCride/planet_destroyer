import React, { useEffect, useState } from 'react';
import { colonySystem, store } from '../core/GameEngine.js';

export const ColonyPanel = () => {
  const [planet, setPlanet] = useState(store.get().planet);
  const [screen, setScreen] = useState(store.get().currentScreen);
  useEffect(() => {
    const cb = (s: any) => {
      setPlanet({ ...s.planet });
      setScreen(s.currentScreen);
    };
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);
  if (screen !== 'MainScreen' || !planet.colony) return null;
  const stored = Math.floor(planet.storedDust || 0);
  return (
    <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-y-2 pointer-events-auto animate-fadeIn">
      <div className="flex items-center gap-x-1 text-white">
        <img src="/assets/ui/icon-dust.svg" className="w-5 h-5" />
        <span>{stored}</span>
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded min-w-[88px] min-h-[44px]"
        onClick={() => colonySystem.collect(planet.id)}
      >
        Collect
      </button>
    </div>
  );
};

