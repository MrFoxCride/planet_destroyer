import React from 'react';

interface Props {
  label: string;
  onClick: () => void;
  icon?: string;
  subtext?: string;
  disabled?: boolean;
  loading?: boolean;
  styleType?: 'primary' | 'secondary' | 'destructive';
}

export const ModalButton = ({ label, onClick, icon, subtext, disabled, loading, styleType = 'primary' }: Props) => {
  const base =
    styleType === 'destructive'
      ? 'bg-red-600'
      : styleType === 'secondary'
      ? 'bg-gray-500'
      : 'bg-blue-600';
  return (
    <button
      className={`${base} text-white w-full py-2 rounded disabled:opacity-50 flex flex-col items-center justify-center`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && <img src={icon} className="w-5 h-5 mb-1" />}
          <span>{label}</span>
          {subtext && <span className="text-xs leading-none">{subtext}</span>}
        </>
      )}
    </button>
  );
};
