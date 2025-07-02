import React from 'react';
import { ModalButton } from './ModalButton.tsx';
import { units } from '../data/units.js';

interface Props {
  unitType: string;
  onClose: () => void;
}

export const UnitReadyPopup = ({ unitType, onClose }: Props) => {
  const unit = units.find((u) => u.type === unitType);
  if (!unit) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200] pointer-events-auto">
      <div className="bg-gray-800 text-white p-4 rounded text-center w-3/4 max-w-xs" onClick={(e) => e.stopPropagation()}>
        <div className="text-lg font-bold mb-2">Unit Ready</div>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <img src={unit.icon} className="w-6 h-6" />
          <span className="text-xl">{unit.name}</span>
        </div>
        <ModalButton label="Collect" onClick={onClose} />
      </div>
    </div>
  );
};
