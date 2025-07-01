# popup-booster-activated.md

## 1. Modal Summary
Booster Activated Popup confirms that a time-limited booster has been successfully applied. It displays the effect, duration, and directs the player to take advantage of the active buff.

---

## 2. Trigger Sources
- Booster purchased via Store
- Booster received from Wheel of Fortune or Quest
- Triggered manually via: `OverlayManager.open('RewardPopup', { type: 'booster', boosterId })`

---

## 3. Layout Structure
### 3.1. Modal Container
- Medium overlay popup
- Z-layer: 200
- Tap-outside and Back dismissible

### 3.2. Content Elements
- **Icon**: based on booster effect (`dust`, `damage`, `colony`)
- **Label**: “Booster Activated!”
- **Effect Text**: e.g., “+30% Dust for 1h”
- **Timer Preview**: countdown bar (optional)
- **CTA Button**: [Go Use It] → navigates to relevant screen (e.g., MainScreen, Colony, etc.)
- **Secondary Button**: [OK]

---

## 4. Behavior & UX Logic
- Booster data pulled from `BoosterSystem.getActive()`
- Timer starts immediately on activation
- Navigation target depends on booster type:
  - `dust` → MainScreen
  - `colony` → MainScreen if colony active
  - `damage` → Weapon usage (no nav change)
- Modal does not interrupt ad flow if from ad

---

## 5. Visual Feedback
- Entry: scale-in + glow effect
- Effect text pulses
- Optional timer bar animates once
- “Go Use It” button glows if booster is impactful (dust, colony)

---

## 6. Analytics & Logging
- Event: `reward.booster`
  - Payload:
    - `boosterId: string`
    - `effect: string`
    - `duration: number`
    - `source: string`
    - `sessionId`, `timestamp`

---

## 7. Dependencies
- BoosterSystem
- OverlayManager
- EventLogger
- GameStateStore
