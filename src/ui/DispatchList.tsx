import React, { useEffect, useState } from 'react';
import { store } from '../core/GameEngine.js';
import { TimerBar } from './TimerBar.tsx';

const getPlanetName = (id: string, state: any) => {
  for (const s of state.sectors) {
    const p = s.entities.find((e: any) => e.id === id);
    if (p) return p.name;
  }
  return id;
};

export const DispatchList = () => {
  const [state, setState] = useState(store.get());

  useEffect(() => {
    const cb = (s: any) => setState({ ...s });
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);

  const list = Array.isArray(state.dispatches) ? state.dispatches : [];
  if (list.length === 0) return null;

  return (
    <div className="absolute top-20 left-0 right-0 px-2 space-y-2 pointer-events-auto">
      {list.map((d: any) => {
        const unit = state.units.find((u: any) => u.id === d.unitId);
        const planetName = getPlanetName(d.targetId, state);
        return (
          <div key={d.id} className="bg-slate-800 p-2 rounded flex items-center gap-2">
            <img src={unit?.icon || '/assets/ui/placeholder.svg'} className="w-6 h-6" />
            <div className="flex-1">
              <div className="text-white text-xs">{planetName}</div>
              <TimerBar startTime={d.startedAt} endTime={d.doneAt} color="#f59e0b" />
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
  );
};
