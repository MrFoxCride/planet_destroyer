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
    <div className="absolute top-0 left-0 right-0 flex justify-between px-4 py-2 bg-black/60 text-white text-lg pointer-events-auto">
      <div className="flex items-center gap-x-1">
        <img src="/assets/ui/icon-dust.svg" className="w-6 h-6" />
        <span>{res.dust}</span>
      </div>
      <div className="flex items-center gap-x-1">
        <img src="/assets/ui/icon-core.svg" className="w-6 h-6" />
        <span>{res.cores}</span>
      </div>
      <div className="flex items-center gap-x-1">
        <img src="/assets/ui/icon-magmaton.svg" className="w-6 h-6" />
        <span>{res.magmaton}</span>
      </div>
    </div>
  );
};
