import * as PIXI from 'pixi.js';

export class FortuneWheel extends PIXI.Container {
  constructor(app, stateManager) {
    super();
    const label = new PIXI.Text('FortuneWheel (WIP)', { fill: 'white' });
    label.anchor.set(0.5);
    label.x = app.renderer.width / 2;
    label.y = app.renderer.height / 2;
    this.addChild(label);
  }
}
