import * as PIXI from 'pixi.js';
import { GameStateStore } from './GameStateStore.js';
import { StateManager } from './StateManager.js';

export const store = new GameStateStore();

export const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x000000,
  antialias: true,
});

export const stateManager = new StateManager(store, app);
