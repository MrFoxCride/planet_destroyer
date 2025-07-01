import { store } from './GameEngine.js';

export const PlanetInteraction = {
  attack(damage) {
    store.damagePlanet(damage);
  },
  reset() {
    store.resetPlanet();
  },
};
