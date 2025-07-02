import React from 'react';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export const CreateUnitButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      Craft
    </button>
  );
};
