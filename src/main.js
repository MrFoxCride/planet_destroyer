// Main entry point: создаёт Pixi-приложение и запускает FSM
import './style.css';
import * as PIXI from 'pixi.js';
import { StateManager } from './stateManager.js';

// Инициализируем PixiJS с автоподгонкой под окно
const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x000000,
  antialias: true,
});

// Добавляем канвас в HTML
document.getElementById('game-container').appendChild(app.view);

// FSM — переключение экранов
const stateManager = new StateManager(app);
stateManager.changeState('planetField'); // стартовый экран
