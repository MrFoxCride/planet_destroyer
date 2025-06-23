// FSM — отвечает за переключение экранов (PlanetField, Arsenal и др.)
import { PlanetField } from './screens/PlanetField.js';
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

    switch (stateName) {
      case 'planetField':
        this.currentScene = new PlanetField(this.app); break;
      case 'arsenal':
        this.currentScene = new ArsenalLab(this.app); break;
      case 'upgrades':
        this.currentScene = new Upgrades(this.app); break;
      case 'dispatch':
        this.currentScene = new DispatchCenter(this.app); break;
      case 'wheel':
        this.currentScene = new FortuneWheel(this.app); break;
      case 'leaderboard':
        this.currentScene = new Leaderboard(this.app); break;
      default:
        console.warn(`Unknown state: ${stateName}`);
        return;
    }

    this.app.stage.addChild(this.currentScene);
  }
}
