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
    this.currentState = null;
    this.states = {
      planetField: PlanetField,
      loading: LoadingScreen,
      arsenalLab: ArsenalLab,
      upgrades: Upgrades,
      dispatchCenter: DispatchCenter,
      fortuneWheel: FortuneWheel,
      leaderboard: Leaderboard,
    };
  }

  // Подключение нового состояния (экрана)
  changeState(stateName) {
    if (!this.states[stateName]) {
      console.warn(`Unknown state: ${stateName}`);
      return;
    }

    if (this.currentState && this.currentState.destroy) {
      this.currentState.destroy();
      this.app.stage.removeChild(this.currentState);
    }

    this.currentState = new this.states[stateName](this.app, this);
    this.app.stage.addChild(this.currentState);
  }
}
