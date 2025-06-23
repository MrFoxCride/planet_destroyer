// Main entry point: создаёт Pixi-приложение и запускает FSM

import './style.css';
import * as PIXI from 'pixi.js';
import { StateManager } from './stateManager.js';

async function main() {
  // Инициализируем PixiJS с автоподгонкой под окно
  const app = await PIXI.Application.init({
    resizeTo: window,
    backgroundColor: 0x000000,
    antialias: true,
  });

  // Добавляем канвас в HTML
  document.getElementById('game-container').appendChild(app.canvas);

  // FSM — переключение экранов
  const stateManager = new StateManager(app);
  stateManager.changeState('planetField'); // стартовый экран
}

main();
