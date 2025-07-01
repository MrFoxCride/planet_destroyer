import './style.css';
import * as PIXI from 'pixi.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameStateStore } from './core/GameStateStore.js';
import { StateManager } from './core/StateManager.js';
import { DevPanel } from './ui/DevPanel.tsx';

const store = new GameStateStore();
const stateManager = new StateManager(store);

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x000000,
  antialias: true,
});

const canvasElem = document.getElementById('game-canvas');
canvasElem.replaceWith(app.view);
app.view.id = 'game-canvas';

document.body.appendChild(app.view);

const hello = new PIXI.Text('Hello World', { fill: 'white' });
hello.anchor.set(0.5);
hello.x = window.innerWidth / 2;
hello.y = window.innerHeight / 2;
app.stage.addChild(hello);

function UI() {
  return (
    <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
      <button className="m-4 px-4 py-2 bg-blue-500 text-white pointer-events-auto">UI Button</button>
      <DevPanel />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('ui-layer'));
root.render(<UI />);

stateManager.changeState('hello');

