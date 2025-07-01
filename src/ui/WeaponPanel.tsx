import React, { useEffect, useState } from 'react';
import { weaponSystem } from '../core/WeaponSystem.js';
import { store } from '../core/GameEngine.js';

export const WeaponPanel = () => {
  const [ammo, setAmmo] = useState(weaponSystem.weapon.ammo);
  const [planet, setPlanet] = useState(store.get().planet);
  const [screen, setScreen] = useState(store.get().currentScreen);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const upd = () => setAmmo(weaponSystem.weapon.ammo);
    const planetCb = (s: any) => setPlanet({ ...s.planet });
    const scr = (s: any) => setScreen(s.currentScreen);
    store.on('update', planetCb);
    store.on('update', upd);
    store.on('update', scr);
    return () => {
      store.off('update', planetCb);
      store.off('update', upd);
      store.off('update', scr);
    };
  }, []);

  if (screen !== 'MainScreen' || planet.colony || !planet.choiceMade) return null;

  return (
    <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-y-4 pb-6 pointer-events-auto animate-fadeIn">
      <div className="relative">
        <button
          className="flex items-center gap-x-2 bg-slate-800/70 border border-slate-700 rounded px-4 py-2"
          onClick={() => setOpen(!open)}
        >
          <img src="/assets/ui/weapon_placeholder.svg" className="w-6 h-6" />
          <span className="text-lg text-white">{ammo}</span>
        </button>
        {open && (
          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800/90 border border-slate-700 rounded shadow-lg">
            {weaponSystem.weapons.map((w) => (
              <button
                key={w.id}
                className="flex items-center gap-x-2 px-3 py-1 text-white w-full text-left hover:bg-slate-700"
                onClick={() => {
                  weaponSystem.selectWeapon(w.id);
                  setOpen(false);
                }}
              >
                <img src="/assets/ui/weapon_placeholder.svg" className="w-5 h-5" />
                <span className="text-sm">{w.ammo}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {planet.status === 'destroyed' && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded w-32 h-12"
          onClick={() => {
            store.startExtraction();
          }}
        >
          Send Unit
        </button>
      )}
    </div>
  );
};
