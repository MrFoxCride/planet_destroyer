import * as PIXI from 'pixi.js';

export class PlanetMask {
  constructor(radius) {
    this.radius = radius;
    const size = Math.ceil(radius * 2);
    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, size, size);
    this.texture = PIXI.Texture.from(this.canvas);
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(0, 0);
    this.sprite.visible = false;
    this.totalArea = Math.PI * radius * radius;
    this.removedArea = 0;
    this.destroyed = false;
  }

  isValid() {
    return (
      this.texture instanceof PIXI.Texture &&
      !this.texture.destroyed &&
      !this.destroyed
    );
  }

  reset() {
    if (!this.isValid()) return;
    const size = this.canvas.width;
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.clearRect(0, 0, size, size);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, size, size);
    this.removedArea = 0;
    this.texture.update();
  }

  cut(x, y, r, brush = 'circle') {
    if (!this.isValid()) return;
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'destination-out';
    this.drawBrush(brush, x + this.radius, y + this.radius, r);
    this.ctx.restore();
    this.texture.update();
    this.removedArea += Math.PI * r * r;
  }

  drawBrush(brush, cx, cy, r) {
    const ctx = this.ctx;
    ctx.beginPath();
    if (brush === 'oval') {
      ctx.ellipse(cx, cy, r * 1.4, r, 0, 0, Math.PI * 2);
    } else if (brush === 'star') {
      const spikes = 5;
      const outerR = r;
      const innerR = r * 0.5;
      let rot = Math.PI / 2 * 3;
      const step = Math.PI / spikes;
      ctx.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerR);
      ctx.closePath();
    } else {
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
    }
    ctx.fill();
  }

  coverage() {
    return this.removedArea / this.totalArea;
  }

  destroy(opts) {
    if (this.destroyed) return;
    this.destroyed = true;
    this.sprite?.destroy(opts);
    if (this.texture && !this.texture.destroyed) {
      this.texture.destroy(true);
    }
    this.canvas = null;
    this.ctx = null;
  }
}
