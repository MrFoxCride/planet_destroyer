import * as PIXI from 'pixi.js';
import { GameStateStore } from './GameStateStore.js';
import { StateManager } from './StateManager.js';

export const store = new GameStateStore();

const wrapper = document.getElementById('wrapper');

export const app = new PIXI.Application({
  resizeTo: wrapper,
  backgroundColor: 0x000000,
  antialias: true,
});

export const stateManager = new StateManager(store, app);
