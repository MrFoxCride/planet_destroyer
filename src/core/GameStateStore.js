import { EventLogger } from './EventLogger.js';

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
        colony: false,
        choiceMade: false,
        dustSinceSpawn: 0,
        dustPerHour: 50,
        storedDust: 0,
        lastIncomeAt: 0,
        status: 'new',
        extraction: null,
      },
      resources: {
        dust: 0,
        cores: 0,
        magmaton: 0,
        usdt: 0,
      },
      units: [],
      craftQueue: [],
      dispatches: [],
      sectors: [],
      ui: {
        unlockSectorId: null,
        arsenalTab: 'weapons',
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

  addMagmaton(amount, source = 'iap') {
    this.state.resources.magmaton += amount;
    this.emit('reward:magmaton', { amount, source });
    this.emit('update', this.state);
  }

  addUSDT(amount, source = 'nebula') {
    this.state.resources.usdt += amount;
    this.emit('reward:usdt', { amount, source });
    this.emit('update', this.state);
  }

  spend(resource, amount) {
    if (this.state.resources[resource] === undefined) return false;
    if (this.state.resources[resource] < amount) return false;
    this.state.resources[resource] -= amount;
    this.emit('update', this.state);
    return true;
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
      p.status = 'destroyed';
      p.extraction = null;
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
    p.colony = false;
    p.dustSinceSpawn = 0;
    p.status = 'new';
    p.extraction = null;
    this.emit('update', this.state);
  }

  load(data) {
    const defaults = this.state;
    this.state = {
      ...defaults,
      ...data,
      craftQueue: Array.isArray(data.craftQueue) ? data.craftQueue : [],
      dispatches: Array.isArray(data.dispatches) ? data.dispatches : [],
    };
    this.emit('update', this.state);
  }

  chooseDestroy() {
    const p = this.state.planet;
    p.choiceMade = true;
    this.emit('update', this.state);
  }

  chooseColonize() {
    const p = this.state.planet;
    p.choiceMade = true;
    p.colony = true;
    p.destroyed = false;
    p.hp = p.maxHp;
    p.coreExtractable = false;
    p.storedDust = 0;
    p.lastIncomeAt = Date.now();
    p.status = 'colony';
    p.extraction = null;
    this.emit('update', this.state);
  }

  collectColonyDust() {
    const p = this.state.planet;
    if (!p.colony) return 0;
    const amount = Math.floor(p.storedDust || 0);
    if (amount <= 0) return 0;
    p.storedDust -= amount;
    p.lastCollectionAt = Date.now();
    this.addDust(amount, 'colony');
    this.emit('update', this.state);
    return amount;
  }

  tapColonyDust() {
    const p = this.state.planet;
    if (!p.colony) return 0;
    const available = Math.floor(p.storedDust || 0);
    const amount = Math.min(5, available);
    if (amount <= 0) return 0;
    p.storedDust -= amount;
    this.addDust(amount, 'colonyTap');
    this.emit('flyout', { amount });
    this.emit('update', this.state);
    return amount;
  }

  startDispatch(unitId, planetId, duration = 30000) {
    if (this.state.dispatches.length >= 3) return false;
    const unit = this.state.units.find((u) => u.id === unitId);
    if (!unit || unit.busy) return false;
    const planet = this._findPlanet(planetId);
    if (!planet || planet.status !== 'destroyed') return false;
    const now = Date.now();
    const inst = {
      id: `${unitId}-${now}`,
      unitId,
      targetId: planetId,
      startedAt: now,
      duration,
      doneAt: now + duration,
      status: 'dispatching',
    };
    this.state.dispatches.push(inst);
    unit.busy = true;
    planet.status = 'extracting';
    planet.coreExtractable = false;
    planet.extraction = { startedAt: now, duration, dispatchId: inst.id };
    EventLogger.logEvent('dispatch.start', { unit: unit.type, planetId });
    this.emit('update', this.state);
    return inst.id;
  }

  finishAllDispatches() {
    const now = Date.now();
    this.state.dispatches.forEach((d) => {
      d.doneAt = now;
      d.status = 'complete';
    });
    this.emit('update', this.state);
  }

  claimDispatch(id) {
    const idx = this.state.dispatches.findIndex((d) => d.id === id);
    if (idx === -1) return false;
    const d = this.state.dispatches[idx];
    if (d.status !== 'complete') return false;
    const unit = this.state.units.find((u) => u.id === d.unitId);
    if (unit) unit.busy = false;
    const planet = this._findPlanet(d.targetId);
    if (planet) {
      planet.status = 'empty';
      planet.extraction = null;
      planet.coreExtractable = false;
    }
    this.state.dispatches.splice(idx, 1);
    this.addCore(1, 'dispatch');
    EventLogger.logEvent('dispatch.claim', { unit: unit?.type, planetId: d.targetId });
    this.emit('dispatch:claimed', { unitId: d.unitId, planetId: d.targetId });
    this.emit('update', this.state);
    return true;
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
          const { surface, glow } = this._randomColors();
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
            choiceMade: false,
            dustPerHour: 50,
            storedDust: 0,
            lastIncomeAt: 0,
            status: 'new',
            extraction: null,
            surfaceColor: surface,
            glowColor: glow,
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

  _randomColors() {
    const palette = [0x8e44ad, 0x3498db, 0x27ae60, 0xf1c40f, 0xe91e63];
    const base = palette[Math.floor(Math.random() * palette.length)];
    const surface = base;
    const lighten = (c, f) => {
      const r = Math.min(255, ((c >> 16) & 0xff) * f);
      const g = Math.min(255, ((c >> 8) & 0xff) * f);
      const b = Math.min(255, (c & 0xff) * f);
      return (r << 16) | (g << 8) | b;
    };
    const glow = lighten(base, 1.3);
    return { surface, glow };
  }

  _findPlanet(id) {
    for (const s of this.state.sectors) {
      const p = s.entities.find((e) => e.id === id);
      if (p) return p;
    }
    return null;
  }

  updateDispatches() {
    const now = Date.now();
    let changed = false;
    this.state.dispatches.forEach((d) => {
      if (d.status === 'dispatching' && now >= d.doneAt) {
        d.status = 'complete';
        changed = true;
      }
    });
    if (changed) this.emit('update', this.state);
  }

  removePlanet(sectorId, planetId) {
    const sector = this.state.sectors.find((s) => s.id === sectorId);
    if (!sector) return false;
    const idx = sector.entities.findIndex((e) => e.id === planetId);
    if (idx === -1) return false;
    sector.entities.splice(idx, 1);
    this.emit('update', this.state);
    return true;
  }

  openUnlockModal(id) {
    this.state.ui.unlockSectorId = id;
    this.emit('update', this.state);
  }

  closeUnlockModal() {
    this.state.ui.unlockSectorId = null;
    this.emit('update', this.state);
  }

  setArsenalTab(tab) {
    this.state.ui.arsenalTab = tab;
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

  startUnitCraft(type, cost, duration) {
    if (!Array.isArray(this.state.craftQueue)) this.state.craftQueue = [];
    if (this.state.craftQueue.length >= 3) return false;
    if (this.state.craftQueue.some((c) => c.type === type && !c.collected))
      return false;
    if (this.state.resources.dust < cost) return false;
    this.state.resources.dust -= cost;
    const item = {
      id: `${type}-${Date.now()}`,
      type,
      startedAt: Date.now(),
      duration,
      collected: false,
      done: false,
    };
    this.state.craftQueue.push(item);
    EventLogger.logEvent('dispatch.create', { type });
    this.emit('update', this.state);
    return item.id;
  }

  updateCraftQueue() {
    const now = Date.now();
    const completed = [];
    const queue = Array.isArray(this.state.craftQueue)
      ? this.state.craftQueue
      : (this.state.craftQueue = []);
    queue.forEach((c) => {
      if (!c.done && now >= c.startedAt + c.duration) {
        c.done = true;
        completed.push(c);
      }
    });
    if (completed.length) {
      this.emit('update', this.state);
      completed.forEach((c) => {
        EventLogger.logEvent('dispatch.finish', { type: c.type });
        this.emit('craft:completed', c);
      });
    }
  }

  claimCraft(id) {
    if (!Array.isArray(this.state.craftQueue)) this.state.craftQueue = [];
    const idx = this.state.craftQueue.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    const item = this.state.craftQueue[idx];
    if (!item.done) return false;
    this.state.craftQueue.splice(idx, 1);
    this.state.units.push({ id: `${item.type}-${Date.now()}`, type: item.type, level: 1 });
    EventLogger.logEvent('dispatch.claim', { type: item.type });
    this.emit('update', this.state);
    return true;
  }

  addUnit(type) {
    this.state.units.push({ id: `${type}-${Date.now()}`, type, level: 1 });
    this.emit('update', this.state);
  }

  finishAllCrafts() {
    const now = Date.now();
    const queue = Array.isArray(this.state.craftQueue)
      ? this.state.craftQueue
      : (this.state.craftQueue = []);
    queue.forEach((c) => {
      c.startedAt = now - c.duration;
      c.done = true;
    });
    this.updateCraftQueue();
  }

  unlockAllSectors() {
    this.state.sectors.forEach((s) => (s.unlocked = true));
    this.emit('update', this.state);
  }
}

