import React, { useEffect, useState } from 'react';
import { store } from '../core/GameEngine.js';

export const ExtractionPanel = () => {
  const [planet, setPlanet] = useState(store.get().planet);
  const [, tick] = useState(0);

  useEffect(() => {
    const cb = (s: any) => setPlanet({ ...s.planet });
    store.on('update', cb);
    let frame: number;
    const loop = () => {
      tick((t) => t + 1);
      const p = store.get().planet;
      if (
        p.status === 'extracting' &&
        p.extraction &&
        Date.now() >= p.extraction.startedAt + p.extraction.duration
      ) {
        store.updateExtractions();
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      store.off('update', cb);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (planet.status !== 'extracting' || !planet.extraction) return null;

  const now = Date.now();
  const elapsed = now - planet.extraction.startedAt;
  const progress = Math.min(1, elapsed / planet.extraction.duration);
  const remaining = Math.max(0, Math.ceil((planet.extraction.duration - elapsed) / 1000));

  return (
    <div className="absolute top-32 left-0 right-0 flex flex-col items-center pointer-events-none animate-fadeIn">
      <div className="w-40 h-3 bg-gray-700 rounded overflow-hidden">
        <div className="bg-blue-500 h-3" style={{ width: `${progress * 100}%` }}></div>
      </div>
      <div className="text-white text-sm mt-1 animate-pulse">{remaining}s</div>
    </div>
  );
};
