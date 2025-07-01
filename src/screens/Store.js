import * as PIXI from 'pixi.js';

export class Store extends PIXI.Container {
  constructor(app, manager) {
    super();
    this.screenId = 'Store';
    const label = new PIXI.Text('Store Screen', { fill: 'white' });
    label.anchor.set(0.5);
    label.x = app.renderer.width / 2;
    label.y = app.renderer.height / 2;
    this.addChild(label);

  }
}
