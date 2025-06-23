import * as PIXI from 'pixi.js';

export class PlanetField extends PIXI.Container {
  constructor(app, stateManager) {
    super();
    this.app = app;
    this.stateManager = stateManager;
    this.interactive = true;

    const { width, height } = app.renderer;

    // Currencies
    let dust = 0;
    let magmaton = 0;

    // weapon placeholder
    let weaponCount = 5;
    const weaponDamage = 25;

    // planets data
    const planets = [
      { id: 1, hp: 100, maxHp: 100, destroyed: false },
      { id: 2, hp: 120, maxHp: 120, destroyed: false },
      { id: 3, hp: 150, maxHp: 150, destroyed: false },
    ];
    let current = 0;

    // HUD
    const dustText = new PIXI.Text(`Dust: ${dust}`, { fill: 'white' });
    dustText.x = 10;
    dustText.y = 10;
    const magmatonText = new PIXI.Text(`Magmaton: ${magmaton}`, { fill: 'white' });
    magmatonText.x = 10;
    magmatonText.y = 30;
    this.addChild(dustText, magmatonText);

    // Leaderboard button
    const leaderboardBtn = new PIXI.Text('LB', { fill: 'yellow' });
    leaderboardBtn.interactive = true;
    leaderboardBtn.buttonMode = true;
    leaderboardBtn.x = width - 40;
    leaderboardBtn.y = 10;
    leaderboardBtn.on('pointertap', () => {
      this.stateManager.changeState('leaderboard');
    });
    this.addChild(leaderboardBtn);

    // planet container
    const planetContainer = new PIXI.Container();
    planetContainer.x = width / 2;
    planetContainer.y = height * 0.4;
    this.addChild(planetContainer);

    const planetGraphic = new PIXI.Graphics();
    planetContainer.addChild(planetGraphic);

    const hpBarBg = new PIXI.Graphics();
    hpBarBg.beginFill(0x333333);
    hpBarBg.drawRect(-75, -110, 150, 10);
    hpBarBg.endFill();
    planetContainer.addChild(hpBarBg);

    const hpBar = new PIXI.Graphics();
    planetContainer.addChild(hpBar);

    function drawPlanet() {
      const p = planets[current];
      planetGraphic.clear();
      planetGraphic.beginFill(p.destroyed ? 0x555555 : 0x8888ff);
      planetGraphic.drawCircle(0, 0, 60);
      planetGraphic.endFill();

      hpBar.clear();
      hpBar.beginFill(0xff5555);
      const ratio = p.hp / p.maxHp;
      hpBar.drawRect(-75, -110, 150 * ratio, 10);
      hpBar.endFill();
    }

    drawPlanet();

    // attack button
    const attackBtn = new PIXI.Graphics();
    attackBtn.beginFill(0x444444);
    attackBtn.drawRoundedRect(-60, 0, 120, 40, 8);
    attackBtn.endFill();
    attackBtn.y = height * 0.65;
    attackBtn.x = width / 2;
    attackBtn.interactive = true;
    attackBtn.buttonMode = true;
    attackBtn.on('pointertap', () => {
      const planet = planets[current];
      if (planet.destroyed || weaponCount <= 0) return;
      planet.hp -= weaponDamage;
      weaponCount -= 1;
      if (planet.hp <= 0) {
        planet.hp = 0;
        planet.destroyed = true;
        dust += 50;
        dustText.text = `Dust: ${dust}`;
        showDispatch();
      }
      drawPlanet();
    });
    const attackLabel = new PIXI.Text('Attack', { fill: 'white' });
    attackLabel.anchor.set(0.5);
    attackBtn.addChild(attackLabel);
    this.addChild(attackBtn);

    // dispatch panel
    const dispatchPanel = new PIXI.Container();
    dispatchPanel.y = height * 0.75;
    dispatchPanel.x = width / 2 - 150;
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
      btn.on('pointertap', () => {
        dispatchPanel.visible = false;
        planets[current].harvested = true;
        nextPlanet();
      });
      const t = new PIXI.Text(u, { fill: 'white', fontSize: 12 });
      t.anchor.set(0.5);
      t.x = 35;
      t.y = 15;
      btn.addChild(t);
      dispatchPanel.addChild(btn);
    });

    function showDispatch() {
      dispatchPanel.visible = true;
    }

    // bottom navigation
    const nav = new PIXI.Container();
    nav.y = height - 50;
    this.addChild(nav);
    const screens = [
      ['Arsenal', 'arsenalLab'],
      ['Upgrades', 'upgrades'],
      ['Dispatch', 'dispatchCenter'],
      ['Wheel', 'fortuneWheel'],
    ];
    screens.forEach((s, i) => {
      const btn = new PIXI.Graphics();
      btn.beginFill(0x333333);
      btn.drawRect(0, 0, width / 4, 50);
      btn.endFill();
      btn.x = (width / 4) * i;
      btn.interactive = true;
      btn.buttonMode = true;
      btn.on('pointertap', () => {
        stateManager.changeState(s[1]);
      });
      const txt = new PIXI.Text(s[0], { fill: 'white' });
      txt.anchor.set(0.5);
      txt.x = width / 8;
      txt.y = 25;
      btn.addChild(txt);
      nav.addChild(btn);
    });

    // swipe detection
    let startX = null;
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

    function prevPlanet() {
      if (current > 0) {
        current -= 1;
        drawPlanet();
        dispatchPanel.visible = planets[current].destroyed && !planets[current].harvested;
      }
    }

    function nextPlanet() {
      if (current < planets.length - 1) {
        current += 1;
        drawPlanet();
        dispatchPanel.visible = planets[current].destroyed && !planets[current].harvested;
      }
    }

    this.destroy = (options) => {
      this.removeAllListeners();
      super.destroy(options);
    };
  }
}
