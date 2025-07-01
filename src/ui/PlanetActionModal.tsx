import React, { useEffect, useState } from 'react';
import { store } from '../core/GameEngine.js';
import { ModalButton } from './ModalButton.tsx';

export const PlanetActionModal = () => {
  const [planet, setPlanet] = useState(store.get().planet);

  useEffect(() => {
    const cb = (s: any) => setPlanet({ ...s.planet });
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);

  if (planet.choiceMade || planet.destroyed || planet.colony) return null;
  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[200] pointer-events-auto">
      <div className="bg-gray-800 text-white p-4 rounded w-3/4 max-w-xs space-y-3" onClick={(e) => e.stopPropagation()}>
        <p className="text-center text-lg">Choose your action</p>
        <ModalButton label="Destroy" styleType="destructive" onClick={() => store.chooseDestroy()} />
        <ModalButton label="Colonize" onClick={() => store.chooseColonize()} />
      </div>
    </div>
  );
};

