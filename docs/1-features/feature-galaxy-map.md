# feature-galaxy-map.md

## 1. Feature Summary
Galaxy Map governs the player's navigation across the universe. It's a visual spatial interface consisting of sectors, each containing multiple entities (planets, nebulae, colonies). The player selects sectors and taps on entities to engage with them via MainScreen.

---

## 2. UX Integration
- Access via Galaxy button on `MainScreen`
- Opens full-screen map with zoomable view
- Sectors rendered as irregular polygons
- Inside each sector: markers for entities (planet, colony, nebula)
- Tapping on a marker:
  - Closes map
  - Loads selected entity into MainScreen

---

## 3. Core Mechanics
### 3.1. Sector Management
- Each sector has:
  - `id`, `position`, `unlocked: boolean`
  - Unlocked manually via Store or by progression
- Sector borders visible on map
- Fog-of-war applied to locked sectors

### 3.2. Entity Placement
- Entities are positioned by sector map data:
  - Planet: standard circular marker
  - Colony: hex marker with passive glow
  - Nebula: animated red glow with rarity VFX
- Markers are:
  - Tap-responsive
  - Show tooltip: [Entity Name]

### 3.3. Context Transfer
- On tap:
  - `MainScreen` opens with selected entity context
  - Screen reuses standard MainScreen layout
  - Entity type determines logic (`feature-planet-interaction.md`, etc.)

---

## 4. Data Structures

ts
interface Sector {
  id: string
  unlocked: boolean
  position: { x: number; y: number }
  entities: string[] // list of Entity IDs
}

interface Entity {
  id: string
  type: 'planet' | 'nebula' | 'colony'
  sectorId: string
  name: string
  unlocked: boolean
}

5. Visual Feedback
- Unlocked sectors: colorized, interactive
- Locked sectors: grayscale + padlock overlay
- Entity markers animate on hover or tap
- Tooltip shows name
- Nebula: pulse glow
- Colony: subtle ambient particle

6. Edge Cases
- Tapping locked sector: shows modal “Unlock this sector?”
- No unlocked entities in sector: show message “Explore further”
- Already selected entity: map closes without reload
- If entity is invalid → fallback to default planet

7. Related Features
- feature-planet-interaction.md
- feature-usdt-nebula.md
- feature-colony-system.md
- feature-store.md
- feature-debug-panel.md
