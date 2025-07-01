export class GameStateStore {
  constructor() {
    // runtime navigation state stored here
    this.state = {
      currentScreen: null,
      navStack: [],
      planet: {
        name: 'Alpha',
        hp: 100,
        maxHp: 100,
        destroyed: false,
        coreExtractable: false,
      },
      resources: {
        dust: 0,
        cores: 0,
        magmaton: 0,
      },
    };
    this.listeners = new Map();
  }

  set(partial) {
    Object.assign(this.state, partial);
    this.emit('update', this.state);
  }

  get() {
    return this.state;
  }

  on(event, cb) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event).push(cb);
  }

  off(event, cb) {
    const arr = this.listeners.get(event) || [];
    const idx = arr.indexOf(cb);
    if (idx >= 0) arr.splice(idx, 1);
  }

  emit(event, data) {
    (this.listeners.get(event) || []).forEach((cb) => cb(data));
  }

  addDust(amount, source = 'attack') {
    this.state.resources.dust += amount;
    this.emit('reward:dust', { amount, source });
    this.emit('update', this.state);
  }

  addCore(amount, source = 'dispatch') {
    this.state.resources.cores += amount;
    this.emit('reward:core', { amount, source });
    this.emit('update', this.state);
  }

  damagePlanet(amount) {
    const p = this.state.planet;
    if (p.destroyed) return;
    p.hp -= amount;
    if (p.hp <= 0) {
      p.hp = 0;
      p.destroyed = true;
      p.coreExtractable = true;
    }
    this.emit('update', this.state);
  }

  resetPlanet() {
    const p = this.state.planet;
    p.hp = p.maxHp;
    p.destroyed = false;
    p.coreExtractable = false;
    this.emit('update', this.state);
  }
}
