import * as PIXI from 'pixi.js';
import { store } from '../core/GameEngine.js';
import { weaponSystem } from '../core/WeaponSystem.js';

export class MainScreen extends PIXI.Container {
  constructor(app) {
    super();
    this.screenId = 'MainScreen';

    const { width, height } = app.renderer;
    this.radius = Math.max(width * 0.28, 114);

    this.planetContainer = new PIXI.Container();
    this.planetContainer.x = width / 2;
    this.planetContainer.y = height / 2;
    this.planetContainer.alpha = 0;
    this.planetContainer.scale.set(0.8);
    PIXI.Ticker.shared.add(this.animateIn, this);
    this.addChild(this.planetContainer);

    this.glow = new PIXI.Graphics();
    this.glow.beginFill(0x6666ff, 0.4);
    this.glow.drawCircle(0, 0, this.radius * 1.5);
    this.glow.endFill();
    this.glow.filters = [new PIXI.filters.BlurFilter(12)];
    this.planetContainer.addChild(this.glow);

    this.planetGraphic = new PIXI.Graphics();
    this.planetContainer.addChild(this.planetGraphic);

    this.hpBg = new PIXI.Graphics();
    this.hpBg.beginFill(0x222222, 0.8);
    this.hpBg.lineStyle(2, 0xffffff);
    this.hpBg.drawRoundedRect(-this.radius, -this.radius - 24, this.radius * 2, 16, 8);
    this.hpBg.endFill();
    this.planetContainer.addChild(this.hpBg);

    this.hpBar = new PIXI.Graphics();
    this.planetContainer.addChild(this.hpBar);

    this.hpText = new PIXI.Text('', { fill: 'white', fontSize: 16 });
    this.hpText.anchor.set(0.5);
    this.hpText.y = -this.radius - 16;
    this.planetContainer.addChild(this.hpText);

    this.nameLabel = new PIXI.Text('', { fill: 'white', fontSize: 20 });
    this.nameLabel.anchor.set(0.5);
    this.nameLabel.y = -this.radius - 40;
    this.planetContainer.addChild(this.nameLabel);

    this.planetContainer.eventMode = 'static';
    this.planetContainer.cursor = 'pointer';
    this.planetContainer.on('pointertap', () => {
      weaponSystem.fire();
      this.bump();
    });

    this.updateView(store.get());
    this.listener = (state) => this.updateView(state);
    store.on('update', this.listener);
  }

  updateView(state) {
    const p = state.planet;
    this.planetGraphic.clear();
    this.planetGraphic.beginFill(p.destroyed ? 0x555555 : 0x8888ff);
    this.planetGraphic.drawCircle(0, 0, this.radius);
    this.planetGraphic.endFill();
    this.glow.clear();
    this.glow.beginFill(p.destroyed ? 0x444444 : 0x6666ff, 0.4);
    this.glow.drawCircle(0, 0, this.radius * 1.5);
    this.glow.endFill();

    const ratio = p.hp / p.maxHp;
    this.hpBar.clear();
    this.hpBar.beginFill(0xff4444);
    this.hpBar.drawRoundedRect(-this.radius, -this.radius - 24, this.radius * 2 * ratio, 16, 8);
    this.hpBar.endFill();
    this.hpText.text = `${p.hp}/${p.maxHp}`;

    this.nameLabel.text = p.name;
  }

  destroy(opts) {
    store.off('update', this.listener);
    super.destroy(opts);
  }

  animateIn(delta) {
    const s = this.planetContainer.scale.x + 0.05 * delta;
    if (s >= 1) {
      this.planetContainer.scale.set(1);
      this.planetContainer.alpha = 1;
      PIXI.Ticker.shared.remove(this.animateIn, this);
    } else {
      this.planetContainer.scale.set(s);
      this.planetContainer.alpha = s;
    }
  }

  bump() {
    this.planetContainer.scale.set(1.1);
    PIXI.Ticker.shared.add(this.restoreScale, this);
  }

  restoreScale(delta) {
    const s = this.planetContainer.scale.x - 0.1 * delta;
    if (s <= 1) {
      this.planetContainer.scale.set(1);
      PIXI.Ticker.shared.remove(this.restoreScale, this);
    } else {
      this.planetContainer.scale.set(s);
    }
  }
}
