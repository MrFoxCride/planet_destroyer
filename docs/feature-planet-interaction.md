# feature-planet-interaction.md

## 1. Feature Summary
Planet Interaction governs the moment-to-moment gameplay when the player engages with a planet entity. The system handles planet selection, destruction, core exposure, and the decision flow between Destroy vs Colonize. It's the central loop of the game and the first action the player performs.

---

## 2. UX Integration

- Triggered from: `GalaxyMap` → on planet tap
- Screen: `MainScreen`
- Components:
  - Centerpiece planet model (dynamic visual)
  - HP bar with damage feedback
  - Name label (auto-generated ID-based)
  - Weapon selector dropdown
  - Ammo counters
  - Core extraction dispatch button (after destruction)

---

## 3. Gameplay Logic

### 3.1. Selection
- Swipe-to-select inside sector
- Only unlocked planets are swipable
- Each selection loads the entity into MainScreen

### 3.2. Destroy vs Colonize
- On first interaction with a planet, show modal:
  - "Do you want to Destroy or Colonize this world?"
  - Options:
    - Destroy → enables HP bar, weapons
    - Colonize → hands off to `ColonySystem`

### 3.3. HP & Damage
- Each planet has:
  - `hp: number`
  - `destroyed: boolean` flag
- WeaponSystem handles damage application
- Visual feedback per hit (VFX bursts)

### 3.4. Core Exposure
- After `hp == 0`, the planet disappears
- Core becomes visible in center
- `coreExtractable = true`

### 3.5. Core Extraction
- Only via DispatchSystem
- Button appears: “Send Unit”
- Triggers unit select → starts dispatch timer

---

## 4. States

```ts
interface Planet extends Entity {
  hp: number
  destroyed: boolean
  coreExtractable: boolean
  weaponHits: number
}
