import * as PIXI from 'pixi.js';
import { store } from '../core/GameEngine.js';

export class GalaxyMap extends PIXI.Container {
  constructor(app, manager) {
    super();
    this.screenId = 'GalaxyMap';
    this.app = app;
    this.manager = manager;

    this.mapLayer = new PIXI.Container();
    this.addChild(this.mapLayer);

    this.createBackButton();
    this.renderMap(store.get());
    this.updateCb = (s) => this.renderMap(s);
    store.on('update', this.updateCb);
  }

  createBackButton() {
    const { width, height } = this.app.renderer;
    const btn = new PIXI.Text('Back', { fill: 'yellow', fontSize: 14 });
    btn.anchor.set(0.5);
    btn.x = width / 2;
    btn.y = height - 30;
    btn.eventMode = 'static';
    btn.cursor = 'pointer';
    btn.on('pointertap', () => this.manager.goBack());
    this.addChild(btn);
  }

  renderMap(state) {
    this.mapLayer.removeChildren();
    const size = Math.min(this.app.renderer.width / 5, this.app.renderer.height / 3);
    state.sectors.forEach((sector) => {
      const g = new PIXI.Graphics();
      g.lineStyle(2, 0xffffff);
      g.beginFill(sector.unlocked ? 0x334488 : 0x222222);
      g.drawRect(0, 0, size - 8, size - 8);
      g.endFill();
      g.x = sector.position.x * size + 4;
      g.y = sector.position.y * size + 4;
      g.eventMode = 'static';
      g.cursor = 'pointer';
      g.on('pointertap', () => this.onSectorTap(sector));
      this.mapLayer.addChild(g);

      const label = new PIXI.Text(sector.id, { fill: 'white', fontSize: 12 });
      label.anchor.set(0.5);
      label.x = g.x + (size - 8) / 2;
      label.y = g.y + 12;
      this.mapLayer.addChild(label);

      if (!sector.unlocked) {
        const lock = PIXI.Sprite.from('/assets/ui/icon-lock.svg');
        lock.anchor.set(0.5);
        lock.x = g.x + (size - 8) / 2;
        lock.y = g.y + (size - 8) / 2;
        lock.scale.set(0.5);
        this.mapLayer.addChild(lock);
      } else {
        sector.entities.forEach((ent, idx) => {
          const icon = PIXI.Sprite.from(`/assets/ui/icon-${ent.type}.svg`);
          icon.anchor.set(0.5);
          icon.x = g.x + (size - 8) / 2;
          icon.y = g.y + (size - 8) / 2 + idx * 20;
          icon.scale.set(0.5);
          icon.eventMode = 'static';
          icon.cursor = 'pointer';
          icon.on('pointertap', () => this.onEntityTap(ent));
          this.mapLayer.addChild(icon);
        });
      }
    });
  }

  onSectorTap(sector) {
    if (!sector.unlocked) {
      store.openUnlockModal(sector.id);
    }
  }

  onEntityTap(ent) {
    store.set({
      planet: {
        name: ent.name,
        hp: 100,
        maxHp: 100,
        destroyed: false,
        coreExtractable: false,
        dustSinceSpawn: 0,
      },
    });
    this.manager.goTo('MainScreen');
  }

  destroy(opts) {
    store.off('update', this.updateCb);
    super.destroy(opts);
  }
}
