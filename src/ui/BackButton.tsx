import React, { useEffect, useState } from 'react';
import { stateManager, store } from '../core/GameEngine.js';

export const BackButton = () => {
  const [screen, setScreen] = useState(store.get().currentScreen);

  useEffect(() => {
    const cb = (s: any) => setScreen(s.currentScreen);
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);

  if (screen !== 'SectorMap' && screen !== 'GalaxyMap') return null;

  return (
    <button
      className="absolute top-12 left-6 w-12 h-12 flex items-center justify-center z-50 pointer-events-auto"
      onClick={() => stateManager.goBack()}
    >
      <img src="/assets/ui/icon-back.svg" className="w-8 h-8 drop-shadow" />
    </button>
  );
};
