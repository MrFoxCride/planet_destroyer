import * as PIXI from 'pixi.js';
import { GameStateStore } from './GameStateStore.js';
import { StateManager } from './StateManager.js';
import { DispatchSystem } from './DispatchSystem.js';
import { NebulaSystem } from './NebulaSystem.js';

export const store = new GameStateStore();

const wrapper = document.getElementById('wrapper');

export const app = new PIXI.Application({
  resizeTo: wrapper,
  backgroundColor: 0x000000,
  antialias: true,
});

export const stateManager = new StateManager(store, app);
export const dispatchSystem = new DispatchSystem(store);
export const nebulaSystem = new NebulaSystem(store);
