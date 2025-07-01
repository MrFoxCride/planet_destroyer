import * as PIXI from 'pixi.js';

export class Profile extends PIXI.Container {
  constructor(app, manager) {
    super();
    this.screenId = 'Profile';
    const label = new PIXI.Text('Profile Screen', { fill: 'white' });
    label.anchor.set(0.5);
    label.x = app.renderer.width / 2;
    label.y = app.renderer.height / 2;
    this.addChild(label);

  }
}
