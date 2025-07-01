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
    const PADDING = 24;
    const HUD_HEIGHT = 48;
    const btnSize = 36;
    const hit = new PIXI.Graphics();
    hit.beginFill(0x000000, 0);
    hit.drawRect(0, 0, 48, 48);
    hit.endFill();
    hit.x = PADDING;
    hit.y = HUD_HEIGHT;
    hit.eventMode = 'static';
    hit.cursor = 'pointer';
    hit.on('pointertap', () => this.manager.goBack());

    const icon = PIXI.Sprite.from('/assets/ui/icon-back.svg');
    icon.width = btnSize;
    icon.height = btnSize;
    icon.x = 6;
    icon.y = 6;
    icon.tint = 0xffffff;
    icon.filters = [new PIXI.filters.DropShadowFilter({ blur: 2, alpha: 0.8 })];
    hit.addChild(icon);
    this.addChild(hit);
  }

  renderMap(state) {
    this.mapLayer.removeChildren();
    const { width, height } = this.app.renderer;
    const count = state.sectors.length;
    const ringRadius = width * 0.35;
    const radius = Math.max(36, width * 0.09);
    const hexW = Math.sqrt(3) * radius;
    const hexH = 2 * radius;

    state.sectors.forEach((sector, idx) => {
      const angle = (-Math.PI / 2) + (idx * (Math.PI * 2)) / count;
      const cx = width / 2 + ringRadius * Math.cos(angle);
      const cy = height / 2 + ringRadius * Math.sin(angle);

      const g = new PIXI.Graphics();
      g.lineStyle(2, sector.unlocked ? 0xffffff : 0x555555);
      g.beginFill(sector.unlocked ? 0x334488 : 0x222222);
      const pts = [];
      for (let i = 0; i < 6; i++) {
        const ang = Math.PI / 6 + (i * Math.PI) / 3;
        pts.push(cx + radius * Math.cos(ang), cy + radius * Math.sin(ang));
      }
      g.drawPolygon(pts);
      g.endFill();
      g.eventMode = 'static';
      g.cursor = 'pointer';
      g.on('pointertap', () => this.onSectorTap(sector));
      this.mapLayer.addChild(g);

      const label = new PIXI.Text(sector.id, { fill: 'white', fontSize: 12 });
      label.anchor.set(0.5);
      label.x = cx;
      label.y = cy - 8;
      this.mapLayer.addChild(label);

      if (!sector.unlocked) {
        const lock = PIXI.Sprite.from('/assets/ui/icon-lock.svg');
        lock.anchor.set(0.5);
        lock.x = cx;
        lock.y = cy + 4;
        lock.scale.set(0.5);
        this.mapLayer.addChild(lock);
      }
    });
  }

  onSectorTap(sector) {
    if (!sector.unlocked) {
      store.openUnlockModal(sector.id);
      return;
    }
    if (sector.entities && sector.entities.length > 0) {
      this.manager.goTo('SectorMap', { sectorId: sector.id });
    } else {
      window.alert('Sector empty');
    }
  }

  onEntityTap(ent) {
    store.selectPlanet(ent);
    this.manager.goTo('MainScreen');
  }

  destroy(opts) {
    store.off('update', this.updateCb);
    super.destroy(opts);
  }
}
