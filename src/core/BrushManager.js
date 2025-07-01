export const BrushManager = {
  brushes: ['circle', 'oval', 'star'],
  current: 'circle',
  set(brush) {
    if (this.brushes.includes(brush)) this.current = brush;
  },
  get() {
    return this.current;
  },
  random() {
    this.current = this.brushes[Math.floor(Math.random() * this.brushes.length)];
    return this.current;
  },
};
