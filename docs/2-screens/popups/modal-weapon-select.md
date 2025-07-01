# modal-weapon-select.md

## 1. Modal Summary
Weapon Select Modal is a dropdown panel activated from MainScreen, showing all available weapons, their current ammo count, and allowing the player to switch active weapon. If ammo is depleted, the modal redirects to Store.

---

## 2. Trigger Sources
- Tap on Weapon icon (MainScreen center area)
- Auto-open if player attempts to fire and multiple weapons are available
- Triggered via `OverlayManager.open('WeaponSelect', { z: 200 })`

---

## 3. Layout Structure
### 3.1. Modal Container
- Collapsible dropdown anchored under Weapon icon
- Z-layer: 200
- Touch-outside closes modal

### 3.2. Content Elements
- **Weapon Slots** (scrollable vertical list if >4)
  - Icon (tier-based)
  - Weapon name
  - Ammo count: `X / Max`
  - Cooldown indicator (grayed out if blocked)
  - Status: active / inactive
- **Empty Ammo State**
  - If ammo = 0 → red highlight
  - Tap triggers `modal-buy-ammo.md` or redirect to Store tab: Ammo

---

## 4. Behavior & UX Logic
- Active weapon is visually marked
- Tap switches weapon instantly (no confirmation)
- If cooldown is active → selection disabled
- On mobile tap-outside → modal closes
- Android Back → closes dropdown first

---

## 5. Visual Feedback
- Entry: dropdown slide-down (200ms)
- Ammo count pulses if near 0
- Red flash on 0-ammo weapons
- Tooltip on locked or on-cooldown weapons

---

## 6. Analytics & Logging
- Event: `modal.weaponSelect.open`
- Event: `weapon.switch`
  - Payload:
    - `from: weaponId`
    - `to: weaponId`
    - `sessionId`, `timestamp`

---

## 7. Dependencies
- OverlayManager, WeaponSystem, EventLogger
