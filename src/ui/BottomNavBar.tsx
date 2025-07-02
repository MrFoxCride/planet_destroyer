import React, { useEffect, useState } from 'react';
import { stateManager, store } from '../core/GameEngine.js';

const buttons = [
  { id: 'Earn', label: 'Earn', icon: '/assets/ui/nav-earn.svg' },
  { id: 'Store', label: 'Store', icon: '/assets/ui/nav-store.svg' },
  { id: 'MainScreen', label: 'Main', icon: '/assets/ui/nav-main.svg' },
  { id: 'Arsenal', label: 'Arsenal', icon: '/assets/ui/nav-store.svg' },
  { id: 'Friends', label: 'Friends', icon: '/assets/ui/nav-friends.svg' },
];

export const BottomNavBar = () => {
  const [active, setActive] = useState(store.get().currentScreen);

  useEffect(() => {
    const cb = (s: any) => setActive(s.currentScreen);
    store.on('update', cb);
    return () => store.off('update', cb);
  }, []);

  return (
    <nav className="navbar absolute bottom-0 left-0 right-0 bg-slate-800/70 border-t border-slate-700 text-white z-50 pointer-events-auto h-14 animate-fadeIn">
      {buttons.map((btn) => {
        const isActive = btn.id === active;
        return (
          <button
            key={btn.id}
            className={`nav-button flex flex-col items-center transition-transform py-1 ${isActive ? 'bg-indigo-700 font-bold scale-105' : ''}`}
            onClick={() => stateManager.goTo(btn.id)}
          >
            <img
              src={btn.icon}
              className={`${isActive ? 'w-10 h-10' : 'w-8 h-8'} mb-1 transition-transform`}
            />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis text-[10px] mobile414:text-xs">{btn.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
