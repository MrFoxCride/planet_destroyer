export class DispatchSystem {
  constructor(store) {
    this.store = store;
    this.active = [];
    this.cooldownUntil = 0;
    this.maxActive = 3;
  }

  start(unitId, targetId, duration, yieldAmount) {
    const now = Date.now();
    if (this.active.length >= this.maxActive) return false;
    if (now < this.cooldownUntil) return false;
    const id = `${unitId}-${now}`;
    const inst = {
      id,
      unitId,
      targetId,
      startedAt: now,
      duration,
      doneAt: now + duration,
      yield: yieldAmount,
      status: 'pending'
    };
    this.active.push(inst);
    this.cooldownUntil = now + 5 * 60 * 1000;
    return inst.id;
  }

  update() {
    const now = Date.now();
    this.active.forEach((d) => {
      if (d.status === 'pending' && now >= d.doneAt) {
        d.status = 'completed';
      }
    });
  }

  collect(id) {
    const idx = this.active.findIndex((d) => d.id === id && d.status === 'completed');
    if (idx === -1) return false;
    const d = this.active[idx];
    this.store.addCore(d.yield, 'dispatch');
    d.status = 'collected';
    this.active.splice(idx, 1);
    return true;
  }
}
