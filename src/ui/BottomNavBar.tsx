import React from 'react';
import { stateManager } from '../core/GameEngine.js';

const buttons = [
  { id: 'Profile', label: 'Profile' },
  { id: 'Store', label: 'Store' },
  { id: 'MainScreen', label: 'Main' },
  { id: 'Earn', label: 'Earn' },
  { id: 'Friends', label: 'Friends' },
];

export const BottomNavBar = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-around bg-gray-800 text-white z-50 pointer-events-auto">
      {buttons.map((btn) => (
        <button
          key={btn.id}
          className="flex-1 py-2"
          onClick={() => stateManager.goTo(btn.id)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};
