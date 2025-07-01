export class GameStateStore {
  constructor() {
    this.state = {};
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

  emit(event, data) {
    (this.listeners.get(event) || []).forEach((cb) => cb(data));
  }
}
