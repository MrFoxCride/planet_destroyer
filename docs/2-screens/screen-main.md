# screen-main.md

## 1. Screen Summary
MainScreen is the core gameplay UI shown after entering a planet or Nebula. It’s the player’s most frequently visited screen and centralizes core-loop actions: destruction, reward popups, ammo control, Fortune Wheel, currency panel, and galaxy navigation.

---

## 2. Entry Point
- First screen shown on session start (if no modals active)
- via NavPanel in the botton of screen
- via GalaxyMap entity tap (planet or Nebula)

---

## 3. Layout Structure
### Top-HUD (sticky)
- **Currency panel**: Dust / Core / Magmaton / USDT
- **Settings icon**: top-right corner → `screen-settings.md` *(optional)*
- **News icon**: opens `feature-news-modal.md` manually
- **Wheel icon**: opens Fortune Wheel modal (1 badge if free ticket available)

### Center Area
- **Current Entity**
  - 3D/2D visual of planet or Nebula
  - HP bar
  - Entity name (autogen ID)
  - Optional: particle effects based on tier/shield
- **Attack Button (tap)**: triggers weapon fire (if ammo available)
- **Ammo Selector Menu (drop-down)**
  - Shows icons of all unlocked weapons
  - Each shows ammo count
  - Empty weapon triggers "Buy Ammo" modal → goes to Store tab

### Bottom Controls
- **Galaxy Map Button**: opens `screen-galaxy-map.md`
- **Central NavBar**: fixed bar (see global nav)
  - Center button = glowing planet icon
  - Highlights “Main”

---

## 4. Entity Types & Behavior
### 4.1. Planet
- HP bar depletes with damage
- On 0 HP:
  - Show Dust reward
  - Trigger dispatch panel for Core extraction

### 4.2. USDT Nebula
- Integrity bar (not HP)
- On destruction:
  - Trigger reward modal with current USDT drop
  - Entity despawns from map

---

## 5. Reward Popups (triggered here)
- `reward-dust.md`
- `reward-core.md`
- `reward-usdt.md`
- `reward-ticket.md`

Each is a **separate modal** with:
- Icon
- Amount
- CTA: Close or “Go Spend”

---

## 6. Visual Feedback
- Ammo count flashes red at 0
- Entity flashes at 10% HP
- Button lock animation if no weapon or ammo
- Confetti on reward modal (for USDT only)

---

## 7. Edge Cases
- No ammo → open modal to Store > Ammo tab
- No weapon equipped → prompt "Craft in Store"
- Entity destroyed → block further input
- Player tries to attack Nebula again → show “Already destroyed”

---

## 8. Linked Features
- `feature-planet-interaction.md`
- `feature-weapon-system.md`
- `feature-usdt-nebula.md`
- `feature-wheel-of-fortune.md`
- `screen-galaxy-map.md`
- `screen-store.md`
- `6-1-currency-flow.md`
