# 1.1. Art, Animation & FX Rules – Planet Destroyer

## 1.1.1. Asset Format Standards
All graphical assets must conform to strict structural and naming standards to support Codex automation, runtime performance, and TMA packaging.

### Image Assets
- Format: `.webp` (preferred), `.png` (fallback)
- Dimensions: power-of-two (64×64, 128×128, etc.)
- Naming: `category_entity_state.ext` (e.g. `planet_core_destroyed.webp`)

### Spritesheets
- Format: TexturePacker `.json` + `.png` pair (standard PixiJS format)
- Structure: frame-based (e.g. `planet_spin`, `unit_warp`, `vfx_explosion`)
- Required fields: `"frames"`, `"animations"`, `"meta.size"`, `"frameTags"` (optional)

### Spine Animations (optional, for future scale)
- Format: `.json + .atlas + .png`
- Limit: ≤ 1MB per Spine asset
- Rendered via PixiJS Spine runtime (`pixi-spine`)

---

## 1.1.2. Animation Constraints
### General
- All animated entities must support:
  - `idle`
  - `active` (e.g., attack, spin, warp)
  - `destroyed` (e.g., break apart, fade out)

### Performance Targets
- ≤ 4 animations per screen concurrently
- Each animation ≤ 30 frames
- Max frame size: 256×256
- Animation speed: 12–24 FPS

### Codex Rules
- Codex must:
  - Auto-generate animation stubs
  - Register them in `/assets/assets.json`
  - Link them via `EntityAnimator.attach(entityId, animationId)`

---

## 1.1.3. VFX System
### Engine
- All VFX must use:
  - `PIXI.ParticleContainer` (for batchable effects)
  - `PIXI.AnimatedSprite` (for small FX sequences)
  - `PixiParticles` (for burst, trail, aura)

### VFX Rules
- Must be fully GPU-accelerated, no per-frame sprite swaps
- Max FX instances:
  - ≤ 5 per type
  - ≤ 25 total per screen
- FX duration must auto-expire (no memory leaks)

### Categories
- `vfx.attack.hit`
- `vfx.attack.crit`
- `vfx.death`
- `vfx.core.extract`
- `vfx.usdt.drop`

---

## 1.1.4. UI Animation & Transitions
### UI Entry/Exit
- Entry: scale-in + fade-in
- Exit: scale-out + fade-out
- Duration: 200ms (default), 100ms (toasts), 300ms (modals)
- Easing: `ease-out` (enter), `ease-in` (exit)

### UI Animation API
- All transitions must be declared via:
ts
OverlayManager.open(id, { z: 200, enter: 'fadeIn', exit: 'fadeOut' })
- No manual alpha = 0 → alpha = 1 transitions outside overlay manager

## 1.1.5. Physics & Motion

### Motion Rules
- All entity and UI motion must be scripted. No physics engines allowed.
- Allowed motion properties:
  - `shake`, `fade`, `scale`, `rotate`, `position`, `offset`
- Motion must use:
  - `PIXI.tween`
  - or `gsap.to()`

### Movement Usage
- Entity motion (e.g. planets wobble, units warp) must be implemented via tweens only.
- Planet destruction must be a pre-authored animation, not procedural.
- No collision detection, no force application, no physics resolution.
- Shake effects must use camera/viewport offsets only.

---

## 1.1.6. Heavy FX Constraints

### What counts as Heavy FX
- Particle bursts (≥ 100 instances)
- Fullscreen overlays with shaders
- Repeated animated loops on >3 entities
- Bloom, glow, screen distortion

### Rules
- Allowed only on:
  - GalaxyMap transition
  - Nebula explosion
  - Reigns major outcome
- Must be **lazy-loaded** via `AssetLoader.load()`
- Max memory usage (runtime texture memory): `≤ 32MB`
- Max FX draw calls per screen: `≤ 75`
- Must use `PIXI.ParticleContainer` or `PixiParticles`

---

## 1.1.7. Codex Integration Rules

### Responsibilities
- Always auto-generate:
  - Placeholder static sprites
  - Placeholder animation `.json + .png`
  - Placeholder VFX config `.json`
- Always update `/assets/assets.json`

### Restrictions
- Never inline assets in logic files.
- Never hardcode animation frame sequences.
- Always declare animations in the manifest:
json
{
  "planet_explosion": {
    "type": "spritesheet",
    "path": "/assets/vfx/planet_explosion.json",
    "frames": 16
  }
}

## 1.1.8. Asset Folder Structure
/assets/
  /sprites/       → static planet parts, units, icons
  /animations/    → frame-based or Spine animations
  /vfx/           → particle textures, explosions, bursts
  /ui/            → interface panels, icons, buttons
/assets/assets.json → unified manifest auto-managed by Codex

- Each file must follow naming convention: category_entity_state.ext
  - Examples:
    - planet_core_idle.png  
    - planet_shell_destroyed.webp  
    - ufo_warp.json  
    - leaderboard_button_hover.png  

json
// Example manifest entry (auto-generated)
{
  "planet_explosion": {
    "type": "spritesheet",
    "path": "/assets/vfx/planet_explosion.json",
    "frames": 16
  },
  "robot_idle": {
    "type": "spritesheet",
    "path": "/assets/animations/robot_idle.json",
    "frames": 12
  },
  "core_icon": {
    "type": "sprite",
    "path": "/assets/ui/core_icon.png"
  }
}

ts
// Example: Loading and applying animation
await AssetLoader.load('/assets/animations/robot_idle.json');
EntityAnimator.attach('robot01', 'robot_idle');

ts
// Example: Registering new FX
VFXSystem.register('planet_explosion', {
  type: 'spritesheet',
  frames: 16,
  loop: false,
  path: '/assets/vfx/planet_explosion.json'
});

## 1.1.9. Visual Impact Guidelines (How to Achieve Rich Effects in TMA Limits)
To preserve visual richness without violating Telegram Mini App constraints, follow these layered design practices:

### Layered FX Composition (composite over raw power)
- Use multiple lightweight FX stacked:
  - glow background (`vfx.core.glow`)
  - animated burst (`vfx.explode.frame`)
  - flash overlay (`ui.flashFrame`)
  - smoke trail (`vfx.smoke.loop`)
- Total ≤4 draw calls → high impact, low cost

### Planet/Unit Animations
- Use `.spritesheet` for pseudo-3D effects:
  - Rotate effect = 16-frame sequence
  - Destruction = 12-frame fracture sheet
- Animate at 12 FPS to save memory and emphasize stylization

### UI Boosts
- Overlay temporary UI FX (e.g. bonus popups, fake bloom)
- Prefer animating UI layers (`fade`, `scale`, `glow pulse`) over canvas VFX

### Fake Physics
- Simulate motion with staggered tweens:
  - recoil, bounce, offset, shake
- Use GSAP or PIXI.tween, avoid physics engines

### Avoid:
- Shader-based blur/glow/distortion (except rare overlays)
- Fullscreen particle showers
- 60FPS VFX loops on >3 entities simultaneously

Codex must prefer visual fakes over real FX logic where possible.
