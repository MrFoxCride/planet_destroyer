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
    <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-y-2 pb-4 pointer-events-auto">
      <div className="text-white text-base">Ammo: {ammo}</div>
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
