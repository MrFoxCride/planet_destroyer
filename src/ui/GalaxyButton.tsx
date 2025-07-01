import React, { useEffect, useState } from 'react';
import { stateManager, store } from '../core/GameEngine.js';

export const GalaxyButton = () => {
  const [screen, setScreen] = useState(store.get().currentScreen);
  useEffect(() => {
    const cb = (s: any) => setScreen(s.currentScreen);
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);
  if (screen !== 'MainScreen') return null;
  return (
    <button
      className="absolute bottom-24 right-4 w-11 h-11 z-50 pointer-events-auto"
      onClick={() => stateManager.goTo('GalaxyMap')}
    >
      <img src="/assets/ui/icon-galaxy.svg" className="w-full h-full" />
    </button>
  );
};
