import * as PIXI from 'pixi.js';

export class PlanetField extends PIXI.Container {
  constructor(app, stateManager) {
    super();
    this.app = app;
    this.stateManager = stateManager;
    this.interactive = true;

    const { width, height } = app.renderer;

    let dust = 0;
    let magmaton = 0;
    let weaponCount = 5;
    const weaponDamage = 25;

    const planets = [
      {
        planetId: 1,
        hp: 100,
        maxHp: 100,
        destroyedAt: null,
        harvested: false,
        resourceProfile: { baseYield: 50, multiplier: 1 },
      },
      {
        planetId: 2,
        hp: 130,
        maxHp: 130,
        destroyedAt: null,
        harvested: false,
        resourceProfile: { baseYield: 70, multiplier: 1 },
      },
    ];
    let currentIndex = 0;

    const hud = new PIXI.Container();
    const dustText = new PIXI.Text(`Dust: ${dust}`, { fill: 'white' });
    const magText = new PIXI.Text(`Magmaton: ${magmaton}`, { fill: 'white' });
    dustText.x = 10;
    dustText.y = 10;
    magText.x = 10;
    magText.y = 30;
    hud.addChild(dustText, magText);
    this.addChild(hud);

    const lbBtn = new PIXI.Text('LB', { fill: 'yellow' });
    lbBtn.x = width - 40;
    lbBtn.y = 10;
    lbBtn.interactive = true;
    lbBtn.buttonMode = true;
    lbBtn.on('pointertap', () => {
      this.stateManager.changeState('leaderboard');
    });
    this.addChild(lbBtn);

    const planetView = new PIXI.Container();
    planetView.x = width / 2;
    planetView.y = height * 0.5;
    this.addChild(planetView);

    const planetGraphic = new PIXI.Graphics();
    planetView.addChild(planetGraphic);

    const hpBg = new PIXI.Graphics();
    hpBg.beginFill(0x333333);
    hpBg.drawRect(-70, -110, 140, 10);
    hpBg.endFill();
    planetView.addChild(hpBg);

    const hpBar = new PIXI.Graphics();
    planetView.addChild(hpBar);

    const attackBtn = new PIXI.Graphics();
    attackBtn.beginFill(0x555555);
    attackBtn.drawRoundedRect(-60, -20, 120, 40, 8);
    attackBtn.endFill();
    attackBtn.x = width / 2;
    attackBtn.y = height * 0.75;
    attackBtn.interactive = true;
    attackBtn.buttonMode = true;
    const attackTxt = new PIXI.Text('Attack', { fill: 'white' });
    attackTxt.anchor.set(0.5);
    attackBtn.addChild(attackTxt);
    attackBtn.on('pointertap', onAttack);
    this.addChild(attackBtn);

    const popup = new PIXI.Text('', { fill: 'yellow' });
    popup.anchor.set(0.5);
    popup.x = width / 2;
    popup.visible = false;
    this.addChild(popup);

    const dispatchPanel = new PIXI.Container();
    dispatchPanel.x = width / 2 - 150;
    dispatchPanel.y = height * 0.8;
    dispatchPanel.visible = false;
    this.addChild(dispatchPanel);

    const units = ['Ship', 'Station', 'Robot', 'UFO'];
    units.forEach((u, i) => {
      const btn = new PIXI.Graphics();
      btn.beginFill(0x222222);
      btn.drawRoundedRect(0, 0, 70, 30, 6);
      btn.endFill();
      btn.x = i * 80;
      btn.interactive = true;
      btn.buttonMode = true;
      btn.on('pointertap', () => dispatchUnit(u));
      const t = new PIXI.Text(u, { fill: 'white', fontSize: 12 });
      t.anchor.set(0.5);
      t.x = 35;
      t.y = 15;
      btn.addChild(t);
      dispatchPanel.addChild(btn);
    });

    const searchPanel = new PIXI.Container();
    searchPanel.x = width / 2;
    searchPanel.y = height * 0.5;
    searchPanel.visible = false;
    this.addChild(searchPanel);

    const searchText = new PIXI.Text('', { fill: 'white' });
    searchText.anchor.set(0.5);
    searchPanel.addChild(searchText);

    const skipBtn = new PIXI.Graphics();
    skipBtn.beginFill(0x444444);
    skipBtn.drawRoundedRect(-50, 20, 100, 30, 6);
    skipBtn.endFill();
    skipBtn.interactive = true;
    skipBtn.buttonMode = true;
    const skipTxt = new PIXI.Text('Skip', { fill: 'white', fontSize: 12 });
    skipTxt.anchor.set(0.5);
    skipTxt.x = 0;
    skipTxt.y = 35;
    skipBtn.addChild(skipTxt);
    skipBtn.on('pointertap', () => {
      if (searchTimer) {
        clearInterval(searchTimer);
        searchTimer = null;
        spawnPlanet();
      }
    });
    searchPanel.addChild(skipBtn);

    const nav = new PIXI.Container();
    nav.y = height - 50;
    this.addChild(nav);

    const navItems = [
      ['Arsenal', 'arsenalLab'],
      ['Upgrades', 'upgrades'],
      ['Dispatch', 'dispatchCenter'],
      ['Wheel', 'fortuneWheel'],
    ];
    navItems.forEach((n, i) => {
      const btn = new PIXI.Graphics();
      btn.beginFill(0x333333);
      btn.drawRect(0, 0, width / 4, 50);
      btn.endFill();
      btn.x = i * (width / 4);
      btn.interactive = true;
      btn.buttonMode = true;
      btn.on('pointertap', () => stateManager.changeState(n[1]));
      const t = new PIXI.Text(n[0], { fill: 'white' });
      t.anchor.set(0.5);
      t.x = width / 8;
      t.y = 25;
      btn.addChild(t);
      nav.addChild(btn);
    });

    let startX = null;
    let searchTimer = null;
    let searchCountdown = 0;

    this.on('pointerdown', (e) => {
      startX = e.data.global.x;
    });
    this.on('pointerup', (e) => {
      if (startX === null) return;
      const diff = e.data.global.x - startX;
      if (diff > 50) prevPlanet();
      if (diff < -50) nextPlanet();
      startX = null;
    });

    function drawPlanet() {
      const planet = planets[currentIndex];
      if (!planet) return;
      planetGraphic.clear();
      planetGraphic.beginFill(planet.destroyedAt ? 0x555555 : 0x8888ff);
      planetGraphic.drawCircle(0, 0, 60);
      planetGraphic.endFill();

      hpBar.clear();
      hpBar.beginFill(0xff4444);
      const r = planet.hp / planet.maxHp;
      hpBar.drawRect(-70, -110, 140 * r, 10);
      hpBar.endFill();

      dispatchPanel.visible = planet.destroyedAt && !planet.harvested;
      attackBtn.visible = !planet.destroyedAt;
      searchPanel.visible = false;
    }

    function onAttack() {
      const planet = planets[currentIndex];
      if (!planet || planet.destroyedAt || weaponCount <= 0) return;
      planet.hp -= weaponDamage;
      weaponCount -= 1;
      if (planet.hp <= 0) {
        planet.hp = 0;
        planet.destroyedAt = Date.now();
        const reward = Math.floor(planet.resourceProfile.baseYield * planet.resourceProfile.multiplier);
        dust += reward;
        dustText.text = `Dust: ${dust}`;
        popup.text = `+${reward} Dust`;
        popup.y = planetView.y - 80;
        popup.alpha = 1;
        popup.visible = true;
        app.ticker.add(fadePopup);
        dispatchPanel.visible = true;
      }
      drawPlanet();
    }

    function fadePopup() {
      popup.y -= 1;
      popup.alpha -= 0.02;
      if (popup.alpha <= 0) {
        popup.visible = false;
        app.ticker.remove(fadePopup);
      }
    }

    function dispatchUnit() {
      const planet = planets[currentIndex];
      if (!planet || planet.harvested) return;
      planet.harvested = true;
      dispatchPanel.visible = false;
      startSearch(3, 'Harvesting');
    }

    function prevPlanet() {
      if (searchTimer) return;
      if (currentIndex > 0) {
        currentIndex -= 1;
        drawPlanet();
      }
    }

    function nextPlanet() {
      if (searchTimer) return;
      if (currentIndex < planets.length - 1) {
        currentIndex += 1;
        drawPlanet();
      } else {
        startSearch(5, 'Searching for planet');
      }
    }

    function startSearch(sec, text) {
      searchCountdown = sec;
      searchText.text = `${text}... ${searchCountdown}s`;
      planetGraphic.clear();
      hpBar.clear();
      attackBtn.visible = false;
      dispatchPanel.visible = false;
      searchPanel.visible = true;
      searchTimer = setInterval(() => {
        searchCountdown -= 1;
        searchText.text = `${text}... ${searchCountdown}s`;
        if (searchCountdown <= 0) {
          clearInterval(searchTimer);
          searchTimer = null;
          if (text === 'Searching for planet') spawnPlanet();
          else completeHarvest();
        }
      }, 1000);
    }

    function spawnPlanet() {
      const id = planets.length ? planets[planets.length - 1].planetId + 1 : 1;
      planets.push({
        planetId: id,
        hp: 100 + id * 20,
        maxHp: 100 + id * 20,
        destroyedAt: null,
        harvested: false,
        resourceProfile: { baseYield: 50 + id * 10, multiplier: 1 },
      });
      currentIndex = planets.length - 1;
      drawPlanet();
    }

    function completeHarvest() {
      const planet = planets[currentIndex];
      const reward = planet.resourceProfile.baseYield * 2;
      dust += reward;
      dustText.text = `Dust: ${dust}`;
      planets.splice(currentIndex, 1);
      if (currentIndex >= planets.length) currentIndex = planets.length - 1;
      if (planets.length === 0) startSearch(5, 'Searching for planet');
      else drawPlanet();
      searchPanel.visible = false;
    }

    drawPlanet();

    this.destroy = (opts) => {
      if (searchTimer) clearInterval(searchTimer);
      app.ticker.remove(fadePopup);
      this.removeAllListeners();
      super.destroy(opts);
    };
  }
}
