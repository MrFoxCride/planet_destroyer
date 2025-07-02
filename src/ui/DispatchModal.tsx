import React, { useEffect, useState } from 'react';
import { store } from '../core/GameEngine.js';
import { UnitCard } from './UnitCard.tsx';

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

  const send = (unit: any) => {
    store.startDispatch(unit.id, planetId);
    onClose();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-[200] pointer-events-auto">
      <div className="bg-gray-800 p-4 rounded w-3/4 max-w-xs space-y-2" onClick={(e) => e.stopPropagation()}>
        <div className="text-white text-center font-bold">Select Unit</div>
        {available.length === 0 && (
          <div className="text-center text-sm text-white">No available units</div>
        )}
        {available.map((u: any) => (
          <UnitCard key={u.id} unit={u} onAction={() => send(u)} actionLabel="Send" />
        ))}
        <button className="mt-2 bg-red-600 text-white px-2 py-1 w-full rounded" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
