import { MainScreen } from '../screens/MainScreen.js';
import { GalaxyMap } from '../screens/GalaxyMap.js';
import { SectorMap } from '../screens/SectorMap.js';
import { Profile } from '../screens/Profile.js';
import { Store } from '../screens/Store.js';
import { Earn } from '../screens/Earn.js';
import { Friends } from '../screens/Friends.js';

const registry = {
  MainScreen,
  GalaxyMap,
  SectorMap,
  Profile,
  Store,
  Earn,
  Friends,
};

export class StateManager {
  constructor(store, app) {
    this.store = store;
    this.app = app;
    this.stack = [];
  }

  goTo(name, params) {
    const ScreenClass = registry[name];
    if (!ScreenClass) return console.warn('Unknown screen', name);

    const screen = new ScreenClass(this.app, this, params);
    if (this.current) {
      this.app.stage.removeChild(this.current);
    }
    this.stack.push(screen);
    this.current = screen;
    this.app.stage.addChild(screen);
    this.store.set({
      currentScreen: name,
      navStack: this.stack.map((s) => s.screenId),
    });
  }

  goBack() {
    if (this.stack.length <= 1) return;
    const old = this.stack.pop();
    this.app.stage.removeChild(old);
    if (old.destroy) old.destroy({ children: true });
    this.current = this.stack[this.stack.length - 1];
    this.app.stage.addChild(this.current);
    this.store.set({
      currentScreen: this.current.screenId,
      navStack: this.stack.map((s) => s.screenId),
    });
  }
}
