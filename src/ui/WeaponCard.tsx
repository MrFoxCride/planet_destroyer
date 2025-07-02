import React from 'react';

export const WeaponCard = ({ weapon, onSelect }) => {
  return (
    <div className="bg-slate-800 p-3 rounded flex items-center gap-2">
      <img src="/assets/ui/weapon_placeholder.svg" className="w-8 h-8" />
      <div className="flex-1">
        <div className="font-bold text-white">{weapon.name}</div>
        <div className="text-sm text-gray-300">Damage: {weapon.damage}</div>
      </div>
      {onSelect && (
        <button
          className="bg-indigo-600 text-white px-2 py-1 rounded"
          onClick={() => onSelect(weapon.id)}
        >
          Select
        </button>
      )}
    </div>
  );
};
