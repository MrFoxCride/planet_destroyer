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

    this.renderMap(store.get());
    this.updateCb = (s) => this.renderMap(s);
    store.on('update', this.updateCb);
  }

  renderMap(state) {
    this.mapLayer.removeChildren();
    const { width, height } = this.app.renderer;
    const dim = Math.min(width, height);
    const count = state.sectors.length;
    const ringRadius = dim * 0.35;
    const radius = Math.max(36, dim * 0.09);
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
