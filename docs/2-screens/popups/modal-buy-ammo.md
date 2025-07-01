# modal-buy-ammo.md

## 1. Modal Summary
Buy Ammo Modal appears when the player attempts to fire a weapon with 0 ammo. It prompts the player to refill ammo via Dust or Magmaton, or go to the Store for larger packs.

---

## 2. Trigger Sources
- Tap “Fire” with 0 ammo on equipped weapon
- Tap on empty weapon slot in `modal-weapon-select.md`
- Manually via: `OverlayManager.open('AmmoPurchase', { weaponId })`

---

## 3. Layout Structure
### 3.1. Modal Container
- Compact modal panel centered on screen
- Z-layer: 200
- Full input block while open

### 3.2. Content Elements
- **Weapon Info**
  - Icon + name
  - Current ammo: `0 / Max`
- **Refill Options**
  - Option A: [Buy 10 Ammo] for X Dust
  - Option B: [Buy 10 Ammo] for Y Magmaton
- **Store Link**
  - Text: “Need more? Visit Store for larger packs”
  - [Go to Store] button → opens `screen-store.md`, Ammo tab
- **Cancel**
  - [Cancel] button → closes modal

---

## 4. Behavior & UX Logic
- Buttons A and B disabled if insufficient Dust/Magmaton
- On purchase:
  - Deduct currency
  - Add ammo to selected weapon
  - Close modal + trigger weapon UI refresh
- [Go to Store] navigates to Ammo tab with scroll focus
- Android Back closes modal

---

## 5. Visual Feedback
- Entry: fade-in + scale-up (200ms)
- Red ammo count if 0
- Button glow if currency is sufficient

---

## 6. Analytics & Logging
- Event: `modal.buyAmmo.open`
- Event: `ammo.purchase`
  - Payload:
    - `weaponId: string`
    - `currency: 'dust' | 'magmaton'`
    - `amount: number`
    - `sessionId`, `timestamp`

---

## 7. Dependencies
- WeaponSystem
- EconomyEngine
- OverlayManager
- GameStateStore
- EventLogger
