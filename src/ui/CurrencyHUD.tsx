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
    <div className="absolute top-0 left-0 right-0 flex justify-around text-white text-sm pointer-events-auto">
      <span>Dust: {res.dust}</span>
      <span>Cores: {res.cores}</span>
      <span>Magmaton: {res.magmaton}</span>
    </div>
  );
};
