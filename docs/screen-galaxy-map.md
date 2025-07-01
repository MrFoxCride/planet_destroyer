# screen-galaxy-map.md

## 1. Screen Summary
Galaxy Map is the primary navigation interface for selecting sectors and entities (planets, Nebulae). It visualizes progression, fog-of-war, and acts as the entry point to the MainScreen for core gameplay interactions. Sectors unlock progressively via economy rules.

---

## 2. Entry Point
- Access:
  - From MainScreen via “Galaxy” button
  - From session start if no sectors unlocked yet

---

## 3. Layout Structure
### 3.1. Sector Map View
- Full-screen stylized star chart
- Irregular polygonal sectors
- Fog covers locked sectors
- Current unlocked sector: glowing outline
- Tap sector → zoom-in view

### 3.2. Inside Sector View
- Visual map with:
  - Planets (2–6 per sector) → tap to open `screen-main.md`
  - Max 1 Nebula (if available)
- Each entity represented as:
  - Icon or small model (planet = sphere, nebula = swirl)
  - Tooltip on hover: name, type
  - Disabled if: under cooldown, already destroyed, dispatched

### 3.3. Top Bar
- Sector name
- Back to full galaxy view
- Optional: Sector level indicator (affects yield)

---

## 4. Sector Unlocking Logic
- Locked sectors obscured by fog
- Unlock by:
  - Paying Dust + Cores
  - Meeting progression milestones (e.g. destroy 10 planets)
- Unlock modal shows:
  - Cost
  - New content preview (rarity range, sector theme)
- Unlock action triggers fade-in animation

---

## 5. Entity States

| State             | Visual Cue             | Interaction              |
|------------------|------------------------|--------------------------|
| Available         | Normal glow            | Opens `screen-main.md`   |
| Already Destroyed | Cracked / disabled look| Blocked                  |
| Dispatched        | Unit icon overlay      | Blocked                  |
| Nebula            | Pulsing purple aura    | Opens `screen-main.md`   |
| Locked Sector     | Fog & padlock          | Shows unlock modal       |

---

## 6. Visual Feedback
- Sector glow on hover
- Fog dissipates with dissolve on unlock
- Entity pop animation on tap
- Tooltip follows cursor/finger on hold

---

## 7. Edge Cases
- All entities destroyed → message: “Return later”
- Player in locked sector (debug) → fallback to default
- Nebula cooldown active → greyed out with timer

---

## 8. Linked Features
- `feature-planet-interaction.md`
- `feature-usdt-nebula.md`
- `feature-sector-progression.md` *(TBD)*
- `screen-main.md`
- `6-2-economy-balance.md`
