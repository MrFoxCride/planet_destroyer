export function getEntitySize(zoneWidth, zoneHeight, scale = 0.95) {
  return Math.min(zoneWidth, zoneHeight) * scale;
}
