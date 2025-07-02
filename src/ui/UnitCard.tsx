import React from 'react';

export const UnitCard = ({ unit, onAction, actionLabel = 'Craft', disabled }) => {
  return (
    <div className="bg-slate-800 p-3 rounded flex items-center gap-2">
      <img src={unit.icon || '/assets/ui/placeholder.svg'} className="w-8 h-8" />
      <div className="flex-1">
        <div className="font-bold text-white">{unit.name}</div>
        {unit.cost && (
          <div className="text-sm text-yellow-300">Cost: {unit.cost}</div>
        )}
      </div>
      {onAction && (
        <button
          className="bg-green-600 text-white px-2 py-1 rounded disabled:opacity-50"
          disabled={disabled}
          onClick={() => onAction(unit)}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
