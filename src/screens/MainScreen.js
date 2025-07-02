import * as PIXI from 'pixi.js';
import { BlurFilter } from '@pixi/filter-blur';
import { store, stateManager } from '../core/GameEngine.js';
import { weaponSystem } from '../core/WeaponSystem.js';
import { PlanetMask } from '../core/PlanetMask.js';
import { BrushManager } from '../core/BrushManager.js';
import { getEntitySize } from '../core/LayoutUtils.js';

export class MainScreen extends PIXI.Container {
  constructor(app) {
    super();
    this.screenId = 'MainScreen';

    const { width, height } = app.renderer;
    const size = getEntitySize(width, height, 0.56);
    this.radius = Math.max(size / 2, 114);
    this.app = app;

    this.planetContainer = new PIXI.Container();
    this.planetContainer.x = width / 2;
    this.planetContainer.y = height / 2;
    this.planetContainer.alpha = 0;
    this.planetContainer.scale.set(0.8);
    PIXI.Ticker.shared.add(this.animateIn, this);
    this.addChild(this.planetContainer);

    this.projectileLayer = new PIXI.Container();
    this.addChild(this.projectileLayer);


    this.glow = new PIXI.Graphics();
    this.glow.beginFill(0xffffff, 0.4);
    this.glow.drawCircle(0, 0, this.radius * 1.2);
    this.glow.endFill();
    this.glow.filters = [new BlurFilter(8)];
    this.planetContainer.addChild(this.glow);
    this.glowPulse = 0;
    PIXI.Ticker.shared.add(this.pulseGlow, this);

    this.core = new PIXI.Graphics();
    this.core.beginFill(0xffaa33);
    this.core.drawCircle(0, 0, this.radius * 0.6);
    this.core.endFill();
    this.planetContainer.addChild(this.core);

    this.surface = new PIXI.Graphics();
    this.planetMask = new PlanetMask(this.radius);
    if (this.planetMask.isValid()) {
      console.log(
        'PlanetMask visible area',
        this.planetMask.totalArea - this.planetMask.removedArea
      );
      this.surface.mask = this.planetMask.sprite;
      this.planetContainer.addChild(this.planetMask.sprite);
      this.planetMask.sprite.renderable = false;
    }
    this.planetContainer.addChild(this.surface);
    this.effectLayer = new PIXI.Container();
    this.planetContainer.addChild(this.effectLayer);

    // HP bar handled by React HUD only
    this.hpBg = new PIXI.Graphics();
    this.hpBar = new PIXI.Graphics();
    this.hpText = new PIXI.Text('', { fill: 'white', fontSize: 16 });

    this.dustBg = new PIXI.Graphics();
    this.dustBg.beginFill(0x222222, 0.8);
    this.dustBg.lineStyle(2, 0xffffff);
    this.dustBg.drawRoundedRect(-this.radius, -this.radius - 24, this.radius * 2, 16, 8);
    this.dustBg.endFill();
    this.dustBg.visible = false;
    this.planetContainer.addChild(this.dustBg);

    this.dustBar = new PIXI.Graphics();
    this.dustBar.visible = false;
    this.planetContainer.addChild(this.dustBar);

    this.dustText = new PIXI.Text('', { fill: 'yellow', fontSize: 16 });
    this.dustText.anchor.set(0.5);
    this.dustText.y = -this.radius - 16;
    this.dustText.visible = false;
    this.planetContainer.addChild(this.dustText);

    this.nameLabel = new PIXI.Text('', { fill: 'white', fontSize: 20 });
    this.nameLabel.anchor.set(0.5);
    this.nameLabel.y = -this.radius - 40;
    this.planetContainer.addChild(this.nameLabel);

    this.colonyIcon = PIXI.Sprite.from('/assets/ui/icon-colony.svg');
    this.colonyIcon.anchor.set(0.5);
    this.colonyIcon.width = 24;
    this.colonyIcon.height = 24;
    this.colonyIcon.visible = false;
    this.planetContainer.addChild(this.colonyIcon);

    // hide built-in labels and bars, overlay handled by React HUD
    this.hpBg.visible = false;
    this.hpBar.visible = false;
    this.hpText.visible = false;
    this.dustBg.visible = false;
    this.dustBar.visible = false;
    this.dustText.visible = false;
    this.nameLabel.visible = false;
    this.colonyIcon.visible = false;

    this.planetContainer.eventMode = 'static';
    this.planetContainer.cursor = 'pointer';
    this.planetContainer.on('pointertap', () => {
      const p = store.state.planet;
      if (p.colony) {
        store.tapColonyDust();
      } else {
        const dmg = weaponSystem.fire();
        if (dmg) this.launchProjectile(dmg);
      }
    });

    this.updateView(store.get());
    this.listener = (state) => this.updateView(state);
    store.on('update', this.listener);
  }

  updateView(state) {
    const p = state.planet;
    if (p.hp === p.maxHp && !p.destroyed && this.planetMask.isValid()) {
      this.planetMask.reset();
    }
    this.surface.visible = !p.destroyed;
    this.surface.clear();
    if (!p.destroyed) {
      this.surface.beginFill(p.surfaceColor);
      this.surface.drawCircle(0, 0, this.radius);
      this.surface.endFill();
    }
    if (this.planetMask.isValid()) {
      this.planetMask.sprite.alpha = p.destroyed ? 0 : 1;
    }
    this.glow.clear();
    this.glow.beginFill(p.destroyed ? 0x444444 : p.glowColor, 0.4);
    this.glow.drawCircle(0, 0, this.radius * 1.2);
    this.glow.endFill();

    // hp bar handled by React HUD only

    this.dustBar.clear();
    if (p.colony) {
      const dr = Math.min(1, (p.storedDust || 0) / 10000);
      this.dustBar.beginFill(0xffcc33);
      this.dustBar.drawRoundedRect(
        -this.radius,
        -this.radius - 24,
        this.radius * 2 * dr,
        16,
        8
      );
      this.dustBar.endFill();
    }
    this.dustBg.visible = p.colony;
    this.dustBar.visible = p.colony;
    this.dustText.visible = p.colony;
    this.dustText.text = `${Math.floor(p.storedDust || 0)}/10000`;

    this.nameLabel.text = p.name;
    this.colonyIcon.visible = p.colony;
    if (p.colony) {
      this.colonyIcon.x = -this.nameLabel.width / 2 - 14;
      this.colonyIcon.y = this.nameLabel.y;
    }
  }

  destroy(opts) {
    store.off('update', this.listener);
    PIXI.Ticker.shared.remove(this.animateIn, this);
    PIXI.Ticker.shared.remove(this.pulseGlow, this);
    this.destroyMask();
    super.destroy(opts);
  }

  destroyMask() {
    if (this.surface.mask) this.surface.mask = null;
    if (this.planetMask) {
      this.planetMask.destroy({ children: true, texture: true, baseTexture: true });
      this.planetMask = null;
    }
  }

  killPlanet() {
    if (this.planetMask && this.planetMask.isValid()) {
      this.planetMask.removeAll();
    }
    PIXI.Ticker.shared.remove(this.animateIn, this);
    PIXI.Ticker.shared.remove(this.pulseGlow, this);
    if (!store.state.planet.destroyed) {
      store.damagePlanet(store.state.planet.hp);
    }
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

  pulseGlow(delta) {
    this.glowPulse += delta / (60 * 1.3) * Math.PI * 2;
    this.glow.alpha = 0.3 + 0.1 * Math.sin(this.glowPulse);
  }

  launchProjectile(dmg) {
    const { width, height } = this.app.renderer;
    const cx = this.planetContainer.x;
    const cy = this.planetContainer.y;

    // random spawn on wrapper edges
    const edge = Math.floor(Math.random() * 4);
    let sx = 0;
    let sy = 0;
    if (edge === 0) {
      sx = Math.random() * width;
      sy = 0;
    } else if (edge === 1) {
      sx = width;
      sy = Math.random() * height;
    } else if (edge === 2) {
      sx = Math.random() * width;
      sy = height;
    } else {
      sx = 0;
      sy = Math.random() * height;
    }
    const start = new PIXI.Point(sx, sy);

    // nearest point on planet circle to spawn
    const vecX = sx - cx;
    const vecY = sy - cy;
    const vecLen = Math.sqrt(vecX * vecX + vecY * vecY) || 1;
    const hitX = cx + (vecX / vecLen) * this.radius;
    const hitY = cy + (vecY / vecLen) * this.radius;
    const globalHit = new PIXI.Point(hitX, hitY);
    const localHit = this.planetContainer.toLocal(globalHit);
    const bullet = new PIXI.Graphics();
    bullet.beginFill(0xffffff);
    bullet.drawCircle(0, 0, 4);
    bullet.endFill();
    bullet.position.copyFrom(start);
    this.projectileLayer.addChild(bullet);

    const dist = Math.hypot(globalHit.x - start.x, globalHit.y - start.y);
    const speed = 1200; // pixels per second
    const duration = (dist / speed) * 1000;
    const startTime = performance.now();
    const tick = () => {
      const t = Math.min((performance.now() - startTime) / duration, 1);
      bullet.x = start.x + (globalHit.x - start.x) * t;
      bullet.y = start.y + (globalHit.y - start.y) * t;
      if (t >= 1) {
        PIXI.Ticker.shared.remove(tick);
        bullet.destroy();
        this.applyHit(localHit.x, localHit.y, dmg);
      }
    };
    PIXI.Ticker.shared.add(tick);
  }

  applyHit(x, y, dmg) {
    const maxHp = store.state.planet.maxHp;
    const baseRatio = 0.45;
    const minRatio = 0.06;
    const maxRatio = 0.45;
    let ratio = baseRatio * Math.sqrt(dmg / maxHp);
    ratio = Math.min(maxRatio, Math.max(minRatio, ratio));
    const r = this.radius * ratio;
    const brush = BrushManager.get();
    if (this.planetMask.isValid()) {
      this.planetMask.cut(x, y, r, brush);
    }
    this.spawnSmoke(x, y, r);
    weaponSystem.applyHit(dmg);
    if (
      !store.state.planet.destroyed &&
      this.planetMask.isValid() &&
      this.planetMask.coverage() >= 0.95
    ) {
      store.damagePlanet(store.state.planet.hp);
    }
  }

  spawnSmoke(x, y, r) {
    const g = new PIXI.Graphics();
    g.beginFill(0xffffff, 0.6);
    g.drawCircle(0, 0, r * 1.2);
    g.endFill();
    g.filters = [new BlurFilter(4)];
    g.x = x;
    g.y = y;
    this.effectLayer.addChild(g);
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      g.alpha = 0.6 * (1 - t);
      if (t >= 1) {
        g.destroy();
        PIXI.Ticker.shared.remove(tick);
      }
    };
    PIXI.Ticker.shared.add(tick);
  }

  // no bump animation in new attack flow
}
