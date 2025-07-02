import { store } from './GameEngine.js';

class WeaponSystem {
  constructor() {
    this.weapons = [
      {
        id: 'blaster',
        name: 'Blaster',
        damage: 10,
        ammo: 10,
        ammoMax: 10,
        cost: 500,
        currency: 'dust',
      },
      {
        id: 'laser',
        name: 'Laser',
        damage: 20,
        ammo: 5,
        ammoMax: 5,
        cost: 2,
        currency: 'core',
      },
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
    const p = store.state.planet;
    if (p.destroyed || p.colony || !p.choiceMade) return 0;
    this.weapon.ammo -= 1;
    store.emit('update', store.state);
    return this.weapon.damage;
  }

  applyHit(damage) {
    store.damagePlanet(damage);
    store.addDust(1, 'attack');
    store.emit('flyout', { amount: 1 });
  }

  addAmmo(amount) {
    this.weapon.ammo += amount;
    store.emit('update', store.state);
  }
}

export const weaponSystem = new WeaponSystem();
