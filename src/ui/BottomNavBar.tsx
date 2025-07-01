import React from 'react';
import { stateManager } from '../core/GameEngine.js';

const buttons = [
  { id: 'Profile', label: 'Profile', icon: '/assets/ui/nav-profile.svg' },
  { id: 'Store', label: 'Store', icon: '/assets/ui/nav-store.svg' },
  { id: 'MainScreen', label: 'Main', icon: '/assets/ui/nav-main.svg' },
  { id: 'Earn', label: 'Earn', icon: '/assets/ui/nav-earn.svg' },
  { id: 'Friends', label: 'Friends', icon: '/assets/ui/nav-friends.svg' },
];

export const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-gray-900/80 text-white z-50 pointer-events-auto py-2">
      {buttons.map((btn) => (
        <button
          key={btn.id}
          className="flex flex-col items-center w-full" 
          onClick={() => stateManager.goTo(btn.id)}
        >
          <img src={btn.icon} className="w-6 h-6 mb-1" />
          <span className="text-xs">{btn.label}</span>
        </button>
      ))}
    </nav>
  );
};
