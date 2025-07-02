import * as PIXI from 'pixi.js';
import { BlurFilter } from '@pixi/filter-blur';
import { store } from '../core/GameEngine.js';
import { getEntitySize } from '../core/LayoutUtils.js';

export class SectorMap extends PIXI.Container {
  constructor(app, manager, params) {
    super();
    this.screenId = 'SectorMap';
    this.app = app;
    this.manager = manager;
    this.sectorId = params.sectorId;

    this.mapLayer = new PIXI.Container();
    this.addChild(this.mapLayer);

    this.renderSector(store.get());
    this.updateCb = (s) => this.renderSector(s);
    store.on('update', this.updateCb);
  }

  renderSector(state) {
    this.mapLayer.removeChildren();
    const sector = state.sectors.find((s) => s.id === this.sectorId);
    if (!sector) return;
    const { width, height } = this.app.renderer;

    const PADDING = 24;
    const HUD_HEIGHT = 48;
    const BACK_SIZE = 48;
    const NAV_HEIGHT = 56;

    const zoneLeft = PADDING;
    const zoneRight = width - PADDING;
    const zoneTop = HUD_HEIGHT + BACK_SIZE + PADDING;
    const zoneBottom = height - NAV_HEIGHT - PADDING;
    const zoneW = zoneRight - zoneLeft;
    const zoneH = zoneBottom - zoneTop;

    const baseSize = getEntitySize(zoneW, zoneH, 0.09);
    const radius = baseSize / 2;
    sector.entities.forEach((ent) => {
      const x = zoneLeft + (ent.position.x / 100) * zoneW;
      const y = zoneTop + (ent.position.y / 100) * zoneH;
      const glow = new PIXI.Graphics();
      glow.beginFill(ent.glowColor, 0.6);
      glow.drawCircle(0, 0, radius * 1.4);
      glow.endFill();
      glow.filters = [new BlurFilter(4)];
      glow.x = x;
      glow.y = y;
      this.mapLayer.addChild(glow);

      const g = new PIXI.Graphics();
      let color = ent.surfaceColor;
      if (ent.status === 'destroyed' || ent.status === 'extracting') {
        color = 0x666666;
      } else if (ent.status === 'empty') {
        color = 0x333333;
      }
      g.beginFill(color);
      g.drawCircle(0, 0, radius);
      g.endFill();
      g.x = x;
      g.y = y;
      g.eventMode = 'static';
      g.cursor = 'pointer';
      g.hitArea = new PIXI.Circle(0, 0, radius);
      g.on('pointertap', () => this.onPlanetTap(ent));
      this.mapLayer.addChild(g);

      const label = new PIXI.Text(ent.name, { fill: 'white', fontSize: 16 });
      label.anchor.set(0.5);
      label.x = x;
      label.y = y - radius - 4;
      this.mapLayer.addChild(label);

      if (ent.colony) {
        const icon = PIXI.Sprite.from('/assets/ui/icon-colony.svg');
        icon.anchor.set(0.5);
        icon.width = 24;
        icon.height = 24;
        icon.x = label.x - label.width / 2 - 14;
        icon.y = label.y;
        this.mapLayer.addChild(icon);
      }
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
