import * as PIXI from 'pixi.js';

export class ArsenalLab extends PIXI.Container {
  constructor(app) {
    super();
    this.screenId = 'Arsenal';
    this.app = app;

    // The actual content of the Arsenal screen is rendered via React
    // (`ArsenalWindow` component). This Pixi container remains empty
    // to provide a background layer for the canvas scene.
  }
}
