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
    <div className="absolute top-0 left-0 right-0 flex justify-center gap-6 px-4 py-3 bg-black/60 text-white pointer-events-auto items-center rounded-b animate-fadeIn">
      <div className="flex items-center gap-x-2">
        <img src="/assets/ui/icon-dust.svg" className="w-8 h-8" />
        <span className="text-base">{res.dust}</span>
      </div>
      <div className="flex items-center gap-x-2">
        <img src="/assets/ui/icon-core.svg" className="w-8 h-8" />
        <span className="text-base">{res.cores}</span>
      </div>
      <div className="flex items-center gap-x-2">
        <img src="/assets/ui/icon-magmaton.svg" className="w-8 h-8" />
        <span className="text-base">{res.magmaton}</span>
      </div>
    </div>
  );
};
