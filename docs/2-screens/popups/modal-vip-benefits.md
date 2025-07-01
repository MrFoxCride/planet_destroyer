# modal-vip-benefits.md

## 1. Modal Summary
VIP Benefits Modal displays the list of perks associated with the player's current and upcoming VIP levels. It’s accessible from the Profile screen and VIP-related popups, supporting conversion and upgrade motivation.

---

## 2. Trigger Sources
- Tap “See Benefits” on VIP level badge in `screen-profile.md`
- Tap from `popup-reward-vip.md`
- Optional Store VIP tab CTA
- Triggered via: `OverlayManager.open('VipBenefits', { currentLevel })`

---

## 3. Layout Structure
### 3.1. Modal Container
- Full-height scrollable modal
- Z-layer: 300
- Dimmed background with focus lock

### 3.2. Content Elements
- **Current Level Header**
  - “You are VIP Level X”
  - Badge + short benefits summary

- **Benefits List**
  - One card per level (1–10)
  - Each shows:
    - Level number
    - Unlock cost (Magmaton)
    - Bullet list of perks
    - Lock state (✓ if reached, lock icon otherwise)

- **CTA Buttons**
  - [Upgrade VIP] → goes to Store VIP tab
  - [Close]

---

## 4. Behavior & UX Logic
- Scroll snaps to current level by default
- All level perks pulled via `VIPSystem.getBenefits(level)`
- If max level → hide [Upgrade VIP]
- [Upgrade VIP] CTA disabled if insufficient Magmaton

---

## 5. Visual Feedback
- Entry: slide-up + glow on current level
- Locked perks are grayed out with small lock icon
- Tooltip shown if player taps locked perk: “Reach VIP X to unlock”

---

## 6. Analytics & Logging
- Event: `modal.vipBenefits.open`
  - Payload:
    - `currentLevel: number`
    - `sessionId`, `timestamp`
- Event: `vip.upgrade.attempt` (if button used)

---

## 7. Dependencies
- VIPSystem
- GameStateStore
- OverlayManager
- EventLogger
