import * as PIXI from 'pixi.js';

export class Earn extends PIXI.Container {
  constructor(app, manager) {
    super();
    this.screenId = 'Earn';
    const label = new PIXI.Text('Earn Screen', { fill: 'white' });
    label.anchor.set(0.5);
    label.x = app.renderer.width / 2;
    label.y = app.renderer.height / 2;
    this.addChild(label);

    const backBtn = new PIXI.Text('Вернуться', { fill: 'yellow', fontSize: 14 });
    backBtn.interactive = true;
    backBtn.buttonMode = true;
    backBtn.anchor.set(0.5);
    backBtn.x = app.renderer.width / 2;
    backBtn.y = app.renderer.height - 60;
    backBtn.on('pointertap', () => manager.goBack());
    this.addChild(backBtn);
  }
}
