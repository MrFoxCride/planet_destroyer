import * as PIXI from 'pixi.js';
import { store } from '../core/GameEngine.js';
import { weaponSystem } from '../core/WeaponSystem.js';
import { PlanetMask } from '../core/PlanetMask.js';
import { BrushManager } from '../core/BrushManager.js';

export class MainScreen extends PIXI.Container {
  constructor(app) {
    super();
    this.screenId = 'MainScreen';

    const { width, height } = app.renderer;
    this.radius = Math.max(width * 0.28, 114);
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
    this.glow.beginFill(0x6666ff, 0.4);
    this.glow.drawCircle(0, 0, this.radius * 1.2);
    this.glow.endFill();
    this.glow.filters = [new PIXI.filters.BlurFilter(8)];
    this.planetContainer.addChild(this.glow);
    this.glowPulse = 0;
    PIXI.Ticker.shared.add(this.pulseGlow, this);

    this.core = new PIXI.Graphics();
    this.core.beginFill(0xffaa33);
    this.core.drawCircle(0, 0, this.radius * 0.6);
    this.core.endFill();
    this.planetContainer.addChild(this.core);

    this.surface = new PIXI.Graphics();
    this.mask = new PlanetMask(this.radius);
    this.surface.mask = this.mask.sprite;
    this.planetContainer.addChild(this.surface);
    this.planetContainer.addChild(this.mask.sprite);
    this.mask.sprite.renderable = false;
    this.effectLayer = new PIXI.Container();
    this.planetContainer.addChild(this.effectLayer);

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
      const dmg = weaponSystem.fire();
      if (dmg) this.launchProjectile(dmg);
    });

    this.updateView(store.get());
    this.listener = (state) => this.updateView(state);
    store.on('update', this.listener);
  }

  updateView(state) {
    const p = state.planet;
    if (p.hp === p.maxHp && !p.destroyed) {
      this.mask.reset();
    }
    this.surface.visible = !p.destroyed;
    this.surface.clear();
    if (!p.destroyed) {
      this.surface.beginFill(0x8888ff);
      this.surface.drawCircle(0, 0, this.radius);
      this.surface.endFill();
    }
    this.mask.sprite.alpha = p.destroyed ? 0 : 1;
    this.glow.clear();
    this.glow.beginFill(p.destroyed ? 0x444444 : 0x6666ff, 0.4);
    this.glow.drawCircle(0, 0, this.radius * 1.2);
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
    PIXI.Ticker.shared.remove(this.animateIn, this);
    PIXI.Ticker.shared.remove(this.pulseGlow, this);
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

  pulseGlow(delta) {
    this.glowPulse += delta / (60 * 1.3) * Math.PI * 2;
    this.glow.alpha = 0.3 + 0.1 * Math.sin(this.glowPulse);
  }

  launchProjectile(dmg) {
    const { width, height } = this.app.renderer;
    const side = Math.floor(Math.random() * 4);
    const start = new PIXI.Point();
    if (side === 0) {
      start.set(0, Math.random() * height);
    } else if (side === 1) {
      start.set(width, Math.random() * height);
    } else if (side === 2) {
      start.set(Math.random() * width, 0);
    } else {
      start.set(Math.random() * width, height);
    }
    const angle = Math.random() * Math.PI * 2;
    const localHit = new PIXI.Point(
      Math.cos(angle) * this.radius,
      Math.sin(angle) * this.radius
    );
    const globalHit = this.planetContainer.toGlobal(localHit);
    const bullet = new PIXI.Graphics();
    bullet.beginFill(0xffffff);
    bullet.drawCircle(0, 0, 4);
    bullet.endFill();
    bullet.position.copyFrom(start);
    this.projectileLayer.addChild(bullet);
    const duration = 200 + Math.random() * 100;
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
    const r = this.radius * (0.08 + Math.random() * 0.04) * (dmg / 10);
    const brush = BrushManager.get();
    this.mask.cut(x, y, r, brush);
    this.spawnSmoke(x, y, r);
    weaponSystem.applyHit(dmg);
    if (!store.state.planet.destroyed && this.mask.coverage() >= 0.95) {
      store.damagePlanet(store.state.planet.hp);
    }
  }

  spawnSmoke(x, y, r) {
    const g = new PIXI.Graphics();
    g.beginFill(0xffffff, 0.6);
    g.drawCircle(0, 0, r * 1.2);
    g.endFill();
    g.filters = [new PIXI.filters.BlurFilter(4)];
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
