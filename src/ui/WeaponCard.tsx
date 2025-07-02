import React from 'react';

export const WeaponCard = ({ weapon, onBuy, disabled }) => {
  return (
    <div className="bg-slate-800 p-3 rounded flex items-center gap-2">
      <img src="/assets/ui/weapon_placeholder.svg" className="w-8 h-8" />
      <div className="flex-1">
        <div className="font-bold text-white">{weapon.name}</div>
        <div className="text-sm text-gray-300">Damage: {weapon.damage}</div>
      </div>
      <div
        className="flex items-center gap-1"
        title={weapon.currency === 'core' ? 'Requires Cores' : 'Requires Dust'}
      >
        <img
          src={
            weapon.currency === 'core'
              ? '/assets/ui/icon-core.svg'
              : '/assets/ui/icon-dust.svg'
          }
          className="w-5 h-5"
        />
        <span className="text-white text-sm">{weapon.cost}</span>
      </div>
      {onBuy && (
        <button
          className="bg-indigo-600 text-white px-2 py-1 rounded disabled:opacity-50"
          onClick={() => onBuy(weapon.id)}
          disabled={disabled}
        >
          Buy
        </button>
      )}
    </div>
  );
};
