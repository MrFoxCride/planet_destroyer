// FSM — отвечает за переключение экранов (PlanetField, Arsenal и др.)
import { PlanetField } from './screens/PlanetField.js';
import { LoadingScreen } from './screens/LoadingScreen.js';
import { ArsenalLab } from './screens/ArsenalLab.js';
import { Upgrades } from './screens/Upgrades.js';
import { DispatchCenter } from './screens/DispatchCenter.js';
import { FortuneWheel } from './screens/FortuneWheel.js';
import { Leaderboard } from './screens/Leaderboard.js';

export class StateManager {
  constructor(app) {
    this.app = app;
    this.currentScene = null;
  }

  // Подключение нового состояния (экрана)
  changeState(stateName) {
    if (this.currentScene) {
      this.app.stage.removeChild(this.currentScene);
      this.currentScene.destroy({ children: true });
    }

    let scene;
    switch (stateName) {
      case 'planetField':
        scene = new PlanetField(this.app, this);
        break;
      case 'loading':
        scene = new LoadingScreen(this.app, this);
        break;
      case 'arsenalLab':
        scene = new ArsenalLab(this.app, this);
        break;
      case 'upgrades':
        scene = new Upgrades(this.app, this);
        break;
      case 'dispatchCenter':
        scene = new DispatchCenter(this.app, this);
        break;
      case 'fortuneWheel':
        scene = new FortuneWheel(this.app, this);
        break;
      case 'leaderboard':
        scene = new Leaderboard(this.app, this);
        break;
      default:
        console.warn(`Unknown state: ${stateName}`);
        return;
    }

    this.currentScene = scene;
    this.app.stage.addChild(this.currentScene);
  }
}
