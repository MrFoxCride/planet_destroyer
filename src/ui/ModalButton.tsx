import React from 'react';

interface Props {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  styleType?: 'primary' | 'secondary' | 'destructive';
}

export const ModalButton = ({ label, onClick, disabled, styleType = 'primary' }: Props) => {
  const base =
    styleType === 'destructive'
      ? 'bg-red-600'
      : styleType === 'secondary'
      ? 'bg-gray-500'
      : 'bg-blue-600';
  return (
    <button
      className={`${base} text-white w-full py-2 rounded disabled:opacity-50`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
