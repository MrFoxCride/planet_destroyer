import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import { weaponSystem } from '../core/WeaponSystem.js';
import { store } from '../core/GameEngine.js';
import { WeaponCard } from './WeaponCard.tsx';
import { UnitCard } from './UnitCard.tsx';
import { CreateUnitButton } from './CreateUnitButton.tsx';
import { TimerBar } from './TimerBar.tsx';
import { units as unitData } from '../data/units.js';

const isDev = import.meta.env.DEV;

function WeaponsTab() {
  const [resources, setResources] = useState(store.get().resources);
  useEffect(() => {
    const cb = (s: any) => setResources({ ...s.resources });
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {weaponSystem.weapons.map((w) => (
        <WeaponCard
          key={w.id}
          weapon={w}
          onBuy={() => weaponSystem.selectWeapon(w.id)}
          disabled={resources[w.currency === 'core' ? 'cores' : 'dust'] < w.cost}
        />
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

  const queue = Array.isArray(state.craftQueue) ? state.craftQueue : [];
  const units = state.units;
  const dispatches = Array.isArray(state.dispatches) ? state.dispatches : [];
  const planet = state.planet;
  const canDispatch =
    planet.status === 'destroyed' && dispatches.length < 3;

  const canCraft = queue.length < 3;

  return (
    <div className="flex flex-col gap-3">
      {dispatches.length > 0 && (
        <div className="flex flex-col gap-2">
          {dispatches.map((d) => {
            const def = units.find((u) => u.id === d.unitId);
            return (
              <div key={d.id} className="bg-slate-800 p-2 rounded flex items-center gap-2">
                <img src={def?.icon || '/assets/ui/placeholder.svg'} className="w-8 h-8" />
                <div className="flex-1">
                  <div className="text-white text-sm">{d.targetId}</div>
                  <TimerBar startTime={d.startedAt} endTime={d.doneAt} />
                </div>
                {d.status === 'complete' && (
                  <button className="bg-green-600 px-2 py-1 text-white rounded" onClick={() => store.claimDispatch(d.id)}>
                    Claim
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
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
        {units.map((u, idx) => {
          const busy = dispatches.some((d) => d.unitId === u.id);
          return (
            <UnitCard
              key={idx}
              unit={u}
              onAction={canDispatch && !busy ? () => store.startDispatch(u.id, planet.id) : undefined}
              actionLabel={busy ? 'Busy' : 'Dispatch'}
              disabled={busy || !canDispatch}
            />
          );
        })}
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {unitData.map((u) => {
          const currencyKey = u.currency === 'core' ? 'cores' : 'dust';
          const afford = state.resources[currencyKey] >= u.cost;
          return (
            <div key={u.type} className="flex items-center gap-2">
              <img src={u.icon} className="w-8 h-8" />
              <span className="text-white flex-1">{u.name}</span>
              <div
                className="flex items-center gap-1"
                title={u.currency === 'core' ? 'Requires Cores' : 'Requires Dust'}
              >
                <img
                  src={
                    u.currency === 'core'
                      ? '/assets/ui/icon-core.svg'
                      : '/assets/ui/icon-dust.svg'
                  }
                  className="w-5 h-5"
                />
                <span className="text-white text-sm">{u.cost}</span>
              </div>
              <CreateUnitButton
                disabled={!canCraft || !afford}
                onClick={() =>
                  store.startUnitCraft(u.type, u.cost, u.craftTime)
                }
              />
            </div>
          );
        })}
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
          {tab === 'weapons' ? (
            <WeaponsTab />
          ) : (
            <ErrorBoundary>
              <UnitsTab />
            </ErrorBoundary>
          )}
        </div>
      </div>
    </div>
  );
};
