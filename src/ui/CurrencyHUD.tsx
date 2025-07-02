import React, { useEffect, useState } from 'react';
import { store, stateManager } from '../core/GameEngine.js';

export const CurrencyHUD = () => {
  const [res, setRes] = useState(store.get().resources);
  const [screen, setScreen] = useState(store.get().currentScreen);

  useEffect(() => {
    const cb = (s: any) => setRes({ ...s.resources });
    const screenCb = (s: any) => setScreen(s.currentScreen);
    store.on('update', cb);
    return () => {
      store.off('update', cb);
    };
  }, []);

  if (screen !== 'MainScreen') return null;

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-2 py-3 bg-slate-800/70 border-b border-slate-700 pointer-events-auto animate-fadeIn">
      <button onClick={() => stateManager.goTo('Profile')} className="p-1">
        <img src="/assets/ui/nav-profile.svg" className="w-7 h-7" />
      </button>
      <div className="flex gap-4 items-center flex-1 justify-center" onClick={() => stateManager.goTo('Store')}>
        <div className="flex items-center gap-x-2">
          <img src="/assets/ui/icon-dust.svg" className="w-6 h-6" />
          <span className="text-base text-yellow-300 font-medium">{res.dust}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <img src="/assets/ui/icon-core.svg" className="w-6 h-6" />
          <span className="text-base text-blue-300 font-medium">{res.cores}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <img src="/assets/ui/icon-magmaton.svg" className="w-6 h-6" />
          <span className="text-base text-violet-300 font-medium">{res.magmaton}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <img src="/assets/ui/icon-usdt.svg" className="w-6 h-6" />
          <span className="text-base text-green-300 font-medium">{res.usdt}</span>
        </div>
      </div>
    </div>
  );
};
