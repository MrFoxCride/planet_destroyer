import React, { useEffect, useState } from 'react';
import { store, stateManager } from '../core/GameEngine.js';
import { units as unitData } from '../data/units.js';

interface Props {
  planetId: string;
  onClose: () => void;
}

export const DispatchModal = ({ planetId, onClose }: Props) => {
  const [state, setState] = useState(store.get());

  useEffect(() => {
    const cb = (s: any) => setState({ ...s });
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);

  const available = state.units.filter((u: any) => !u.busy);
  const groups = available.reduce((acc: any, u: any) => {
    acc[u.type] = acc[u.type] || [];
    acc[u.type].push(u);
    return acc;
  }, {});

  const send = (type: string) => {
    const unit = groups[type]?.[0];
    if (!unit) return;
    store.startDispatch(unit.id, planetId);
    onClose();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-[200] pointer-events-auto">
      <div className="absolute left-4 w-12 h-12 flex items-center justify-center z-60 pointer-events-auto" style={{ top: 'calc(var(--hud-height) + 20px)' }} onClick={onClose}>
        <img src="/assets/ui/icon-back.svg" className="w-8 h-8 drop-shadow" />
      </div>
      <div className="bg-gray-800 p-4 rounded w-3/4 max-w-xs space-y-2" onClick={(e) => e.stopPropagation()}>
        <div className="text-white text-center font-bold">Select Unit</div>
        {Object.keys(groups).length === 0 && (
          <>
            <div className="text-center text-sm text-white">No available units</div>
            <button
              className="mt-2 bg-green-600 text-white px-2 py-1 w-full rounded"
              onClick={() => {
                store.setArsenalTab('units');
                stateManager.goTo('Arsenal');
                onClose();
              }}
            >
              Buy
            </button>
          </>
        )}
        {Object.keys(groups).map((type) => {
          const def = unitData.find((d) => d.type === type);
          const count = groups[type].length;
          return (
            <button
              key={type}
              className="bg-slate-800 p-2 rounded flex items-center gap-2 w-full text-left"
              onClick={() => send(type)}
            >
              <img src={def?.icon || '/assets/ui/placeholder.svg'} className="w-8 h-8" />
              <span className="flex-1 text-white">{def?.name || type}</span>
              <span className="text-white text-sm">x{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
