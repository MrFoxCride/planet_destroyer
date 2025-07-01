import * as PIXI from 'pixi.js';
import { store } from '../core/GameEngine.js';

export class SectorMap extends PIXI.Container {
  constructor(app, manager, params) {
    super();
    this.screenId = 'SectorMap';
    this.app = app;
    this.manager = manager;
    this.sectorId = params.sectorId;

    this.mapLayer = new PIXI.Container();
    this.addChild(this.mapLayer);

    this.createBackButton();
    this.renderSector(store.get());
    this.updateCb = (s) => this.renderSector(s);
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

  renderSector(state) {
    this.mapLayer.removeChildren();
    const sector = state.sectors.find((s) => s.id === this.sectorId);
    if (!sector) return;
    const { width, height } = this.app.renderer;
    const size = Math.min(width, height) * 0.6;
    const startX = (width - size) / 2;
    const startY = (height - size) / 2;

    const border = new PIXI.Graphics();
    border.lineStyle(2, 0x555555);
    border.beginFill(0x222222);
    border.drawRect(startX, startY, size, size);
    border.endFill();
    this.mapLayer.addChild(border);

    sector.entities.forEach((ent) => {
      const x = startX + (ent.position.x / 100) * size;
      const y = startY + (ent.position.y / 100) * size;
      const g = new PIXI.Graphics();
      g.beginFill(0x88aaff);
      g.drawCircle(0, 0, 8);
      g.endFill();
      g.x = x;
      g.y = y;
      g.eventMode = 'static';
      g.cursor = 'pointer';
      g.on('pointertap', () => this.onPlanetTap(ent));
      this.mapLayer.addChild(g);

      const label = new PIXI.Text(ent.name, { fill: 'white', fontSize: 12 });
      label.anchor.set(0.5, 0);
      label.x = x;
      label.y = y + 10;
      this.mapLayer.addChild(label);
    });
  }

  onPlanetTap(ent) {
    store.selectPlanet(ent);
    this.manager.goTo('MainScreen');
  }

  destroy(opts) {
    store.off('update', this.updateCb);
    super.destroy(opts);
  }
}
