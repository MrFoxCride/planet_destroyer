import React, { useEffect, useState } from 'react';
import { weaponSystem } from '../core/WeaponSystem.js';
import { store } from '../core/GameEngine.js';

export const WeaponPanel = () => {
  const [ammo, setAmmo] = useState(weaponSystem.weapon.ammo);
  const [planet, setPlanet] = useState(store.get().planet);

  useEffect(() => {
    const upd = () => setAmmo(weaponSystem.weapon.ammo);
    const planetCb = (s: any) => setPlanet({ ...s.planet });
    store.on('update', planetCb);
    store.on('update', upd);
    return () => {
      store.off('update', planetCb);
      store.off('update', upd);
    };
  }, []);

  return (
    <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-y-4 pb-6 pointer-events-auto animate-fadeIn">
      <div className="flex items-center gap-x-2 bg-slate-800/70 border border-slate-700 rounded px-4 py-2">
        <img src="/assets/ui/icon-ammo.svg" className="w-6 h-6" />
        <span className="text-lg text-white">{ammo}</span>
      </div>
      {planet.coreExtractable && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded w-32 h-12"
          onClick={() => {
            store.addCore(1, 'dispatch');
            store.resetPlanet();
          }}
        >
          Send Unit
        </button>
      )}
    </div>
  );
};
