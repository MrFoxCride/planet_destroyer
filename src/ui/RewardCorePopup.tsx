import React from 'react';
import { ModalButton } from './ModalButton.tsx';

interface Props {
  amount: number;
  planetName?: string;
  onClose: () => void;
}

export const RewardCorePopup = ({ amount, planetName, onClose }: Props) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200] pointer-events-auto">
      <div
        className="bg-gray-800 text-white p-4 rounded text-center w-3/4 max-w-xs space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg font-bold">
          {planetName
            ? `Planet ${planetName} — Core extraction completed`
            : 'Core Acquired'}
        </div>
        <div className="flex items-center justify-center space-x-2">
          <img src="/assets/ui/icon-core.svg" className="w-6 h-6" />
          <span className="text-2xl">+{amount}</span>
        </div>
        <ModalButton label="Receive" onClick={onClose} />
      </div>
    </div>
  );
};
