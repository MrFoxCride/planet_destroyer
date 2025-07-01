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
    const { width, height } = this.app.renderer;
    const cols = Math.max(...state.sectors.map((s) => s.position.x)) + 1;
    const rows = Math.max(...state.sectors.map((s) => s.position.y)) + 1;
    const baseRadius = Math.min(
      width / ((cols + 0.5) * Math.sqrt(3)),
      height / (rows * 1.5 + 0.5)
    ) * 0.5;
    const radius = baseRadius * 1.3;
    const hexW = Math.sqrt(3) * radius;
    const hexH = 2 * radius;
    const horiz = hexW;
    const vert = 1.5 * radius;
    const totalW = horiz * (cols - 1) + hexW;
    const totalH = vert * (rows - 1) + hexH;
    const startX = (width - totalW) / 2;
    const startY = (height - totalH) / 2;

    state.sectors.forEach((sector) => {
      const cx = startX + sector.position.x * horiz + (sector.position.y % 2 ? horiz / 2 : 0) + hexW / 2;
      const cy = startY + sector.position.y * vert + hexH / 2;

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
