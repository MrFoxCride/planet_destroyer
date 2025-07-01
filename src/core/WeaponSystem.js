import { store } from './GameEngine.js';

class WeaponSystem {
  constructor() {
    this.weapons = [
      { id: 'blaster', name: 'Blaster', damage: 10, ammo: 10, ammoMax: 10 },
      { id: 'laser', name: 'Laser', damage: 20, ammo: 5, ammoMax: 5 },
    ];
    this.weapon = this.weapons[0];
  }

  selectWeapon(id) {
    const w = this.weapons.find((wp) => wp.id === id);
    if (w) {
      this.weapon = w;
      store.emit('update', store.state);
    }
  }

  fire() {
    if (this.weapon.ammo <= 0) return 0;
    if (store.state.planet.destroyed) return 0;
    this.weapon.ammo -= 1;
    store.emit('update', store.state);
    return this.weapon.damage;
  }

  applyHit(damage) {
    store.damagePlanet(damage);
    store.addDust(1, 'attack');
  }

  addAmmo(amount) {
    this.weapon.ammo += amount;
    store.emit('update', store.state);
  }
}

export const weaponSystem = new WeaponSystem();
