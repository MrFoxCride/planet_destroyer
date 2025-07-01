export class StateManager {
  constructor(store) {
    this.store = store;
    this.current = null;
  }

  changeState(name, params) {
    console.log('State change ->', name, params);
    this.current = name;
    this.store.set({ currentScreen: name });
  }
}
