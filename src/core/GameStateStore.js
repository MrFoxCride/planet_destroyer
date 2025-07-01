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
        dustSinceSpawn: 0,
      },
      resources: {
        dust: 0,
        cores: 0,
        magmaton: 0,
      },
      sectors: [],
      ui: {
        unlockSectorId: null,
      },
    };
    this.listeners = new Map();
    this.namePool = [];
  }

  initNamePool(names) {
    this.namePool = [...names];
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
    if (source === 'attack') {
      this.state.planet.dustSinceSpawn += amount;
    } else {
      this.emit('reward:dust', { amount, source });
    }
    this.emit('update', this.state);
  }

  addCore(amount, source = 'dispatch') {
    this.state.resources.cores += amount;
    this.emit('reward:core', { amount, source });
    this.emit('update', this.state);
  }

  selectPlanet(ent) {
    if (!ent) return;
    this.state.planet = ent;
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
      if (p.dustSinceSpawn > 0) {
        this.emit('reward:dust', {
          amount: p.dustSinceSpawn,
          source: 'planet_destroy',
        });
        p.dustSinceSpawn = 0;
      }
    }
    this.emit('update', this.state);
  }

  resetPlanet() {
    const p = this.state.planet;
    p.hp = p.maxHp;
    p.destroyed = false;
    p.coreExtractable = false;
    p.dustSinceSpawn = 0;
    this.emit('update', this.state);
  }

  initSectors(list) {
    const used = new Set();
    this.state.sectors = list.map((s) => {
      const sector = { ...s };
      if (!sector.entities) {
        const count = 5 + Math.floor(Math.random() * 6);
        sector.entities = [];
        for (let i = 0; i < count; i++) {
          const name = this._uniqueName(used);
          const pos = this._randomPos(sector.entities);
          sector.entities.push({
            id: `${s.id}-P${i + 1}`,
            type: 'planet',
            name,
            position: { x: pos.x * 100, y: pos.y * 100 },
            hp: 100,
            maxHp: 100,
            destroyed: false,
            coreExtractable: false,
            dustSinceSpawn: 0,
            colony: false,
          });
        }
      }
      return sector;
    });
    this.emit('update', this.state);
  }

  _uniqueName(used) {
    if (!this.namePool.length) return `Planet ${used.size + 1}`;
    let name = this.namePool.shift();
    while (used.has(name) && this.namePool.length) {
      name = this.namePool.shift();
    }
    used.add(name);
    return name;
  }

  _randomPos(existing) {
    const margin = 0.1;
    const minDist = 0.15;
    for (let t = 0; t < 100; t++) {
      const x = margin + Math.random() * (1 - margin * 2);
      const y = margin + Math.random() * (1 - margin * 2);
      if (
        existing.every((e) => {
          const dx = x - e.position.x / 100;
          const dy = y - e.position.y / 100;
          return Math.hypot(dx, dy) >= minDist;
        })
      ) {
        return { x, y };
      }
    }
    return { x: margin, y: margin };
  }

  openUnlockModal(id) {
    this.state.ui.unlockSectorId = id;
    this.emit('update', this.state);
  }

  closeUnlockModal() {
    this.state.ui.unlockSectorId = null;
    this.emit('update', this.state);
  }

  unlockSector(id) {
    const sector = this.state.sectors.find((s) => s.id === id);
    if (!sector || sector.unlocked) return false;
    if (this.state.resources.dust < sector.cost) return false;
    this.state.resources.dust -= sector.cost;
    sector.unlocked = true;
    this.state.ui.unlockSectorId = null;
    this.emit('update', this.state);
    return true;
  }

  unlockAllSectors() {
    this.state.sectors.forEach((s) => (s.unlocked = true));
    this.emit('update', this.state);
  }
}
