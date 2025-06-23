import * as PIXI from 'pixi.js';

// Основной игровой экран с управлением планетами и навигацией
export class PlanetField extends PIXI.Container {
  constructor(app) {
    super();
    this.app = app;
    this.stateManager = app.stateManager;

    this.planets = this._createPlanets();
    this.currentIndex = 0;
    this.weapons = 3;
    this.dust = 0;

    this._createHUD();
    this._createPlanetView();
    this._createAttackButton();
    this._createDispatchPanel();
    this._createNavBar();
    this._createLeaderboardButton();

    this._showPlanet(this.currentIndex);
    this._bindSwipe();

    this.app.ticker.add(this._update, this);
  }

  _createPlanets() {
    return [
      { id: 'p1', maxHp: 100, hp: 100, destroyed: false, harvested: false },
      { id: 'p2', maxHp: 120, hp: 120, destroyed: false, harvested: false },
    ];
  }

  _createHUD() {
    this.hud = new PIXI.Container();
    this.addChild(this.hud);

    this.dustText = new PIXI.Text('Dust: 0', { fill: 0xffffff, fontSize: 16 });
    this.magmatonText = new PIXI.Text('Magmaton: 0', { fill: 0xff9900, fontSize: 16 });
    this.hud.addChild(this.dustText, this.magmatonText);
    this.dustText.position.set(10, 10);
    this.magmatonText.position.set(10, 30);
  }

  _createPlanetView() {
    this.planetContainer = new PIXI.Container();
    this.addChild(this.planetContainer);

    this.planetGraphics = new PIXI.Graphics();
    this.planetContainer.addChild(this.planetGraphics);
    this.planetGraphics.position.set(this.app.renderer.width / 2, this.app.renderer.height * 0.4);

    this.hpBar = new PIXI.Graphics();
    this.addChild(this.hpBar);
  }

  _createAttackButton() {
    this.attackButton = new PIXI.Container();
    const bg = new PIXI.Graphics();
    bg.beginFill(0x333333).drawRoundedRect(-60, -20, 120, 40, 8).endFill();
    const label = new PIXI.Text('Attack', { fill: 0xffffff });
    label.anchor.set(0.5);
    this.attackButton.addChild(bg, label);
    this.attackButton.interactive = true;
    this.attackButton.buttonMode = true;
    this.attackButton.position.set(this.app.renderer.width / 2, this.app.renderer.height * 0.75);
    this.attackButton.on('pointertap', this._onAttack, this);
    this.addChild(this.attackButton);
  }

  _createDispatchPanel() {
    this.dispatchPanel = new PIXI.Container();
    this.dispatchPanel.visible = false;
    this.addChild(this.dispatchPanel);

    const types = ['Ship', 'Station', 'Robot', 'UFO'];
    types.forEach((t, i) => {
      const btn = new PIXI.Container();
      const g = new PIXI.Graphics();
      g.beginFill(0x555555).drawRoundedRect(-40, -15, 80, 30, 6).endFill();
      const text = new PIXI.Text(t, { fill: 0xffffff, fontSize: 12 });
      text.anchor.set(0.5);
      btn.addChild(g, text);
      btn.position.set(this.app.renderer.width / 2 - 150 + i * 100, this.app.renderer.height * 0.6);
      btn.interactive = true;
      btn.buttonMode = true;
      btn.on('pointertap', () => this._dispatchUnit(t));
      this.dispatchPanel.addChild(btn);
    });
  }

  _createNavBar() {
    this.navBar = new PIXI.Container();
    this.addChild(this.navBar);
    const screens = ['arsenal', 'upgrades', 'dispatch', 'wheel'];
    screens.forEach((name, i) => {
      const item = new PIXI.Container();
      const g = new PIXI.Graphics();
      g.beginFill(0x222222).drawRect(-40, -20, 80, 40).endFill();
      const txt = new PIXI.Text(name, { fill: 0xffffff, fontSize: 12 });
      txt.anchor.set(0.5);
      item.addChild(g, txt);
      item.position.set(60 + i * 90, this.app.renderer.height - 30);
      item.interactive = true;
      item.buttonMode = true;
      item.on('pointertap', () => this.stateManager && this.stateManager.changeState(name));
      this.navBar.addChild(item);
    });
  }

  _createLeaderboardButton() {
    const btn = new PIXI.Container();
    const g = new PIXI.Graphics();
    g.beginFill(0x444444).drawCircle(0, 0, 20).endFill();
    const t = new PIXI.Text('LB', { fill: 0xffffff, fontSize: 12 });
    t.anchor.set(0.5);
    btn.addChild(g, t);
    btn.position.set(this.app.renderer.width - 30, 30);
    btn.interactive = true;
    btn.buttonMode = true;
    btn.on('pointertap', () => this.stateManager && this.stateManager.changeState('leaderboard'));
    this.addChild(btn);
    this.leaderButton = btn;
  }

  _bindSwipe() {
    this.interactive = true;
    this.on('pointerdown', (e) => { this.startX = e.data.global.x; });
    this.on('pointerup', (e) => {
      const dx = e.data.global.x - this.startX;
      if (Math.abs(dx) > 50) {
        if (dx > 0) this._swipeRight();
        else this._swipeLeft();
      }
    });
  }

  _swipeLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this._showPlanet(this.currentIndex);
    }
  }

  _swipeRight() {
    if (this.currentIndex < this.planets.length - 1) {
      this.currentIndex++;
      this._showPlanet(this.currentIndex);
    } else if (!this.searching) {
      this._startSearch();
    }
  }

  _startSearch() {
    this.searching = true;
    const txt = new PIXI.Text('Searching for planet... 3', { fill: 0xffffff });
    txt.anchor.set(0.5);
    txt.position.set(this.app.renderer.width / 2, this.app.renderer.height * 0.4);
    this.addChild(txt);
    let count = 3;
    const timer = setInterval(() => {
      count--;
      txt.text = `Searching for planet... ${count}`;
      if (count <= 0) {
        clearInterval(timer);
        this.removeChild(txt);
        this.planets.push({ id: 'p' + (this.planets.length + 1), maxHp: 150, hp: 150, destroyed: false, harvested: false });
        this.currentIndex++;
        this._showPlanet(this.currentIndex);
        this.searching = false;
      }
    }, 1000);
  }

  _onAttack() {
    const planet = this.planets[this.currentIndex];
    if (this.weapons <= 0 || planet.destroyed) return;
    this.weapons--;
    planet.hp -= 20;
    if (planet.hp <= 0) {
      planet.hp = 0;
      planet.destroyed = true;
      this._onPlanetDestroyed();
    }
    this._updateHPBar();
  }

  _onPlanetDestroyed() {
    this.dust += 100;
    const popup = new PIXI.Text('+100 Dust', { fill: 0xffff00, fontSize: 18 });
    popup.anchor.set(0.5);
    popup.position.set(this.app.renderer.width / 2, this.app.renderer.height * 0.3);
    this.addChild(popup);
    setTimeout(() => this.removeChild(popup), 1000);
    this.dispatchPanel.visible = true;
    this.attackButton.visible = false;
    this._updateHUD();
  }

  _dispatchUnit(type) {
    if (!this.planets[this.currentIndex].destroyed) return;
    const txt = new PIXI.Text(`${type} dispatched`, { fill: 0x00ff00, fontSize: 14 });
    txt.anchor.set(0.5);
    txt.position.set(this.app.renderer.width / 2, this.app.renderer.height * 0.5);
    this.addChild(txt);
    setTimeout(() => {
      this.removeChild(txt);
      this._harvestComplete();
    }, 2000);
  }

  _harvestComplete() {
    this.planets[this.currentIndex].harvested = true;
    this.dust += 50;
    this._updateHUD();
    this.dispatchPanel.visible = false;
    this.attackButton.visible = true;
    this._swipeRight();
  }

  _updateHUD() {
    this.dustText.text = `Dust: ${this.dust}`;
  }

  _showPlanet(index) {
    const planet = this.planets[index];
    this.planetGraphics.clear();
    this.planetGraphics.beginFill(planet.destroyed ? 0x555555 : 0x7777ff);
    this.planetGraphics.drawCircle(0, 0, 60);
    this.planetGraphics.endFill();
    this._updateHPBar();
    this.dispatchPanel.visible = planet.destroyed && !planet.harvested;
    this.attackButton.visible = !planet.destroyed;
  }

  _updateHPBar() {
    const planet = this.planets[this.currentIndex];
    const pct = planet.hp / planet.maxHp;
    this.hpBar.clear();
    this.hpBar.beginFill(0xff0000).drawRect(0, 0, 200, 10).endFill();
    this.hpBar.beginFill(0x00ff00).drawRect(0, 0, 200 * pct, 10).endFill();
    this.hpBar.position.set(this.app.renderer.width / 2 - 100, this.app.renderer.height * 0.4 - 80);
  }

  _update() {
    this.planetGraphics.rotation += 0.01;
  }

  destroy(options) {
    this.app.ticker.remove(this._update, this);
    super.destroy(options);
  }
}

