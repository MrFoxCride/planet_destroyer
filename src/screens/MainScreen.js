import * as PIXI from 'pixi.js';
import { store } from '../core/GameEngine.js';

export class MainScreen extends PIXI.Container {
  constructor(app) {
    super();
    this.screenId = 'MainScreen';

    const { width, height } = app.renderer;

    this.planetContainer = new PIXI.Container();
    this.planetContainer.x = width / 2;
    this.planetContainer.y = height * 0.4;
    this.addChild(this.planetContainer);

    this.planetGraphic = new PIXI.Graphics();
    this.planetContainer.addChild(this.planetGraphic);

    this.hpBg = new PIXI.Graphics();
    this.hpBg.beginFill(0x333333);
    this.hpBg.drawRect(-80, -90, 160, 10);
    this.hpBg.endFill();
    this.planetContainer.addChild(this.hpBg);

    this.hpBar = new PIXI.Graphics();
    this.planetContainer.addChild(this.hpBar);

    this.nameLabel = new PIXI.Text('', { fill: 'white', fontSize: 14 });
    this.nameLabel.anchor.set(0.5);
    this.nameLabel.y = -110;
    this.planetContainer.addChild(this.nameLabel);

    this.updateView(store.get());
    this.listener = (state) => this.updateView(state);
    store.on('update', this.listener);
  }

  updateView(state) {
    const p = state.planet;
    this.planetGraphic.clear();
    this.planetGraphic.beginFill(p.destroyed ? 0x555555 : 0x8888ff);
    this.planetGraphic.drawCircle(0, 0, 70);
    this.planetGraphic.endFill();

    const ratio = p.hp / p.maxHp;
    this.hpBar.clear();
    this.hpBar.beginFill(0xff4444);
    this.hpBar.drawRect(-80, -90, 160 * ratio, 10);
    this.hpBar.endFill();

    this.nameLabel.text = p.name;
  }

  destroy(opts) {
    store.off('update', this.listener);
    super.destroy(opts);
  }
}
