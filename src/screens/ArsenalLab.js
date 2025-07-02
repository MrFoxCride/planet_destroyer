import * as PIXI from 'pixi.js';

export class ArsenalLab extends PIXI.Container {
  constructor(app) {
    super();
    this.screenId = 'Arsenal';
    this.app = app;
    this.activeTab = 'weapons';

    this.tabWeapons = new PIXI.Text('Weapons', { fill: 'white' });
    this.tabUnits = new PIXI.Text('Units', { fill: 'white' });
    this.tabWeapons.anchor.set(0.5);
    this.tabUnits.anchor.set(0.5);
    this.tabWeapons.y = 40;
    this.tabUnits.y = 40;
    this.tabWeapons.x = app.renderer.width / 2 - 60;
    this.tabUnits.x = app.renderer.width / 2 + 60;
    this.tabWeapons.eventMode = 'static';
    this.tabUnits.eventMode = 'static';
    this.tabWeapons.cursor = 'pointer';
    this.tabUnits.cursor = 'pointer';
    this.tabWeapons.on('pointertap', () => this.switchTab('weapons'));
    this.tabUnits.on('pointertap', () => this.switchTab('units'));
    this.addChild(this.tabWeapons, this.tabUnits);

    this.content = new PIXI.Text('', { fill: 'yellow' });
    this.content.anchor.set(0.5);
    this.content.x = app.renderer.width / 2;
    this.content.y = app.renderer.height / 2;
    this.addChild(this.content);

    this.updateTab();
  }

  switchTab(id) {
    this.activeTab = id;
    this.updateTab();
  }

  updateTab() {
    this.tabWeapons.style.fill = this.activeTab === 'weapons' ? '#ff0' : '#fff';
    this.tabUnits.style.fill = this.activeTab === 'units' ? '#ff0' : '#fff';
    this.content.text =
      this.activeTab === 'weapons' ? 'Weapons Tab' : 'Units Tab';
  }
}
