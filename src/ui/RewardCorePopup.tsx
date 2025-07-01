import React from 'react';

interface Props {
  amount: number;
  onClose: () => void;
}

export const RewardCorePopup = ({ amount, onClose }: Props) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200] pointer-events-auto">
      <div className="bg-gray-800 text-white p-4 rounded text-center w-3/4 max-w-xs">
        <div className="text-lg mb-2">Core Acquired</div>
        <div className="text-2xl mb-4">+{amount}</div>
        <button
          className="bg-blue-600 w-full py-2 rounded"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};
