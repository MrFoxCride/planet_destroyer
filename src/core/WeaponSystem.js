import { store } from './GameEngine.js';

class WeaponSystem {
  constructor() {
    this.weapon = {
      damage: 10,
      ammo: 10,
      ammoMax: 10,
    };
  }

  fire() {
    if (this.weapon.ammo <= 0) return false;
    if (store.state.planet.destroyed) return false;
    this.weapon.ammo -= 1;
    store.damagePlanet(this.weapon.damage);
    store.addDust(1, 'attack');
    return true;
  }

  addAmmo(amount) {
    this.weapon.ammo = Math.min(
      this.weapon.ammo + amount,
      this.weapon.ammoMax
    );
    store.emit('update', store.state);
  }
}

export const weaponSystem = new WeaponSystem();
