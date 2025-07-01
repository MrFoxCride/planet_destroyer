export class NebulaSystem {
  constructor(store) {
    this.store = store;
    this.active = null;
    this.dayIndex = 1;
  }

  spawn() {
    if (this.active) return false;
    const reward = Math.max(0.2, 3 - (this.dayIndex - 1) * 0.1);
    this.active = {
      hp: 100,
      reward,
    };
    return true;
  }

  destroy() {
    if (!this.active) return false;
    this.store.addUSDT(this.active.reward, 'nebula');
    this.dayIndex += 1;
    this.active = null;
    return true;
  }
}
