import { BuildFlags } from '../data/BuildFlags.js';

class Logger {
  constructor() {
    this.buffer = [];
    this.lastEventTime = {};
    setInterval(() => this.flush(), 10000);
  }

  logEvent(event, payload = {}) {
    if (!BuildFlags.logEvents) return;
    const now = Date.now();
    const last = this.lastEventTime[event] || 0;
    if (now - last < 500) return;
    this.lastEventTime[event] = now;
    this.buffer.push({ event, payload, ts: now });
    if (this.buffer.length >= 20) this.flush();
  }

  flush() {
    if (!this.buffer.length) return;
    console.log('Event batch', this.buffer);
    this.buffer.length = 0;
  }
}

export const EventLogger = new Logger();
