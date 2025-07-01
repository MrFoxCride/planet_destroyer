export class ColonySystem {
  constructor(store) {
    this.store = store;
  }

  update() {
    const now = Date.now();
    let changed = false;
    this.store.state.sectors.forEach((sector) => {
      sector.entities.forEach((p) => {
        if (p.colony) {
          if (!p.lastIncomeAt) p.lastIncomeAt = now;
          const delta = now - p.lastIncomeAt;
          if (delta > 0) {
            const gain = (delta / 1000) * 10; // 10 dust per second
            p.storedDust = Math.min(10000, (p.storedDust || 0) + gain);
            p.lastIncomeAt = now;
            changed = true;
          }
        }
      });
    });
    if (changed) this.store.emit('update', this.store.state);
  }

  collect(planetId) {
    const planet = this._findPlanet(planetId);
    if (!planet || !planet.colony) return 0;
    const amount = Math.floor(planet.storedDust || 0);
    if (amount <= 0) return 0;
    planet.storedDust -= amount;
    planet.lastCollectionAt = Date.now();
    this.store.addDust(amount, 'colony');
    this.store.emit('update', this.store.state);
    return amount;
  }

  _findPlanet(id) {
    for (const s of this.store.state.sectors) {
      const p = s.entities.find((e) => e.id === id);
      if (p) return p;
    }
    return null;
  }
}
