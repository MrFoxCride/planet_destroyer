import React, { useEffect, useState } from 'react';
import { store } from '../core/GameEngine.js';

export const CurrencyHUD = () => {
  const [res, setRes] = useState(store.get().resources);

  useEffect(() => {
    const cb = (s: any) => setRes({ ...s.resources });
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center gap-6 px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-b pointer-events-auto items-center animate-fadeIn">
      <div className="flex items-center gap-x-2">
        <img src="/assets/ui/icon-dust.svg" className="w-8 h-8" />
        <span className="text-lg text-white">{res.dust}</span>
      </div>
      <div className="flex items-center gap-x-2">
        <img src="/assets/ui/icon-core.svg" className="w-8 h-8" />
        <span className="text-lg text-white">{res.cores}</span>
      </div>
      <div className="flex items-center gap-x-2">
        <img src="/assets/ui/icon-magmaton.svg" className="w-8 h-8" />
        <span className="text-lg text-white">{res.magmaton}</span>
      </div>
    </div>
  );
};
