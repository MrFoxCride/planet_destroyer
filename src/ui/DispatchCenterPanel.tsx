import React, { useEffect, useState } from 'react';
import { store } from '../core/GameEngine.js';
import { units } from '../data/units.js';
import { CreateUnitButton } from './CreateUnitButton.tsx';
import { TimerBar } from './TimerBar.tsx';

export const DispatchCenterPanel = () => {
  const [state, setState] = useState(store.get());

  useEffect(() => {
    const cb = (s: any) => setState({ ...s });
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);

  if (state.currentScreen !== 'DispatchCenter') return null;

  const queueByType: Record<string, any> = {};
  state.craftQueue.forEach((q: any) => {
    queueByType[q.type] = q;
  });

  return (
    <div className="absolute inset-0 pt-16 pb-20 overflow-y-auto text-white pointer-events-auto animate-fadeIn">
      <div className="px-4 space-y-4">
        {units.map((u) => {
          const q = queueByType[u.type];
          const disabled =
            state.resources.dust < u.cost ||
            state.craftQueue.length >= 3 ||
            !!q;
          return (
            <div key={u.type} className="bg-slate-800 p-3 rounded space-y-2">
              <div className="flex items-center gap-2">
                <img src={u.icon} className="w-8 h-8" />
                <div className="flex-1">
                  <div className="font-bold">{u.name}</div>
                  <div className="text-sm text-yellow-300">Cost: {u.cost}</div>
                </div>
                <CreateUnitButton
                  onClick={() => store.startUnitCraft(u.type, u.cost, u.craftTime)}
                  disabled={disabled}
                />
              </div>
              {q && (
                <TimerBar
                  startTime={q.startedAt}
                  endTime={q.startedAt + q.duration}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
