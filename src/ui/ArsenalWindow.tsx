import React, { useEffect, useState } from 'react';
import { weaponSystem } from '../core/WeaponSystem.js';
import { store } from '../core/GameEngine.js';
import { WeaponCard } from './WeaponCard.tsx';
import { UnitCard } from './UnitCard.tsx';
import { CreateUnitButton } from './CreateUnitButton.tsx';
import { TimerBar } from './TimerBar.tsx';
import { units as unitData } from '../data/units.js';

const isDev = import.meta.env.DEV;

function WeaponsTab() {
  return (
    <div className="flex flex-col gap-2">
      {weaponSystem.weapons.map((w) => (
        <WeaponCard key={w.id} weapon={w} onSelect={() => weaponSystem.selectWeapon(w.id)} />
      ))}
    </div>
  );
}

function UnitsTab() {
  const [state, setState] = useState(store.get());

  useEffect(() => {
    const cb = (s: any) => setState({ ...s });
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);

  const queue = state.craftQueue;
  const units = state.units;

  const canCraft = queue.length < 3;

  return (
    <div className="flex flex-col gap-3">
      {queue.length > 0 && (
        <div className="flex flex-col gap-2">
          {queue.map((q) => {
            const def = unitData.find((u) => u.type === q.type);
            return (
              <div key={q.id} className="bg-slate-800 p-2 rounded flex items-center gap-2">
                <img src={def?.icon || '/assets/ui/placeholder.svg'} className="w-8 h-8" />
                <div className="flex-1">
                  <div className="text-white text-sm font-bold">{def?.name}</div>
                  {!q.done && (
                    <TimerBar startTime={q.startedAt} endTime={q.startedAt + q.duration} />
                  )}
                </div>
                {q.done && (
                  <button
                    className="bg-green-600 px-2 py-1 rounded text-white"
                    onClick={() => store.claimCraft(q.id)}
                  >
                    Collect
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {units.map((u, idx) => (
          <UnitCard key={idx} unit={u} />
        ))}
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {unitData.map((u) => (
          <div key={u.type} className="flex items-center gap-2">
            <img src={u.icon} className="w-8 h-8" />
            <span className="text-white flex-1">{u.name}</span>
            <CreateUnitButton
              disabled={!canCraft || state.resources.dust < u.cost}
              onClick={() => store.startUnitCraft(u.type, u.cost, u.craftTime)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const ArsenalWindow = () => {
  const [screen, setScreen] = useState(store.get().currentScreen);
  const [tab, setTab] = useState<'weapons' | 'units'>('weapons');

  useEffect(() => {
    const cb = (s: any) => setScreen(s.currentScreen);
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);

  if (screen !== 'Arsenal') return null;

  return (
    <div
      id="arsenal-window"
      className={`${isDev ? 'debug-outline' : ''} absolute left-0 right-0 mx-auto pointer-events-auto`}
      style={{ top: 'var(--hud-height)', bottom: 'var(--navbar-height)', maxWidth: '414px' }}
    >
      <div className="flex flex-col h-full bg-slate-900/90 backdrop-blur p-4">
        <div className="flex justify-around sticky top-0 mb-4 bg-slate-900/90" style={{ paddingTop: 0 }}>
          <button
            className={`flex-1 py-2 ${tab === 'weapons' ? 'border-b-2 border-indigo-400 font-bold' : ''}`}
            onClick={() => setTab('weapons')}
          >
            Weapons
          </button>
          <button
            className={`flex-1 py-2 ${tab === 'units' ? 'border-b-2 border-indigo-400 font-bold' : ''}`}
            onClick={() => setTab('units')}
          >
            Units
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {tab === 'weapons' ? <WeaponsTab /> : <UnitsTab />}
        </div>
      </div>
    </div>
  );
};
