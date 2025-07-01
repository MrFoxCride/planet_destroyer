import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { app, stateManager } from './core/GameEngine.js';
import { DevPanel } from './ui/DevPanel.tsx';
import { BottomNavBar } from './ui/BottomNavBar.tsx';

const canvasElem = document.getElementById('game-canvas');
canvasElem.replaceWith(app.view);
app.view.id = 'game-canvas';

document.body.appendChild(app.view);


function UI() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
      <DevPanel />
      <BottomNavBar />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('ui-layer'));
root.render(<UI />);

stateManager.goTo('MainScreen');

