import React, { useEffect, useState } from 'react';
import { stateManager, store } from '../core/GameEngine.js';

const isDev = import.meta.env.DEV;

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
    <nav
      className="navbar absolute bottom-0 left-0 right-0 text-white z-50 pointer-events-auto animate-fadeIn"
      style={{
        height: 'calc(72px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
      }}
    >
      {buttons.map((btn) => {
        const isActive = btn.id === active;
        const isMain = btn.id === 'MainScreen';
        return (
          <button
            key={btn.id}
            className="nav-button"
            onClick={() => stateManager.goTo(btn.id)}
          >
            <div
              className={`${
                isMain ? 'nav-bg-main' : 'nav-bg'
              } ${isActive && !isMain ? 'nav-active' : ''} ${isDev ? 'debug-outline' : ''}`}
            >
              <img
                src={btn.icon}
                className={isMain ? 'w-10 h-10' : 'w-8 h-8'}
              />
            </div>
            {!isMain && (
              <span className="text-[12px] leading-none">{btn.label}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
