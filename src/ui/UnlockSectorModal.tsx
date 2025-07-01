import React from 'react';
import { store } from '../core/GameEngine.js';
import { ModalButton } from './ModalButton.tsx';

interface Props {
  sectorId: string;
  onClose: () => void;
  onUnlock: () => void;
}

export const UnlockSectorModal = ({ sectorId, onClose, onUnlock }: Props) => {
  const sector = store.get().sectors.find((s) => s.id === sectorId);
  if (!sector) return null;
  const resources = store.get().resources;
  const canAfford = resources.dust >= sector.cost;
  return (
    <div
      className="absolute inset-0 z-[300] bg-black/60 flex items-center justify-center pointer-events-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 text-white p-4 rounded w-3/4 max-w-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg mb-2 text-center">Unlock {sector.id}</div>
        <div className="flex items-center justify-center mb-3 gap-2">
          <img src="/assets/ui/icon-dust.svg" className="w-6 h-6" />
          <span className={canAfford ? '' : 'text-red-400'}>{sector.cost}</span>
        </div>
        <p className="text-sm text-center mb-3">Are you sure you want to unlock this sector?</p>
        <div className="space-y-2">
          <ModalButton
            label="Unlock"
            onClick={() => canAfford && onUnlock()}
            disabled={!canAfford}
          />
          <ModalButton label="Cancel" onClick={onClose} styleType="secondary" />
        </div>
      </div>
    </div>
  );
};
