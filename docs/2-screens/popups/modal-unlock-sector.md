# modal-unlock-sector.md

## 1. Modal Summary
Unlock Sector Modal appears when the player taps on a locked sector in the Galaxy Map. It previews the sector, shows unlock cost (usually Dust), and allows confirmation or cancellation of the action.

---

## 2. Trigger Sources
- Tap on locked sector in `screen-galaxy-map.md`
- Triggered via: `OverlayManager.open('UnlockSector', { sectorId, cost })`

---

## 3. Layout Structure
### 3.1. Modal Container
- Centered overlay panel
- Z-layer: 300
- Full input block on background

### 3.2. Content Elements
- **Sector Preview**
  - Static image or placeholder visual
  - Name/ID of sector
- **Unlock Cost**
  - Icon + numeric Dust cost
  - Red highlight if insufficient Dust
- **Warning**
  - Text: “Are you sure you want to unlock this sector?”
- **CTA Buttons**
  - [Unlock] → triggers sector unlock
  - [Cancel] → closes modal

---

## 4. Behavior & UX Logic
- Button [Unlock] only enabled if player has enough Dust
- On press:
  - Deduct Dust via `EconomyEngine`
  - Unlock sector in `GameStateStore`
  - Refresh Galaxy Map
- On insufficient funds:
  - Tooltip: “Not enough Dust”
  - Optional: grey out button
- Android Back closes modal
- Tap-outside closes modal

---

## 5. Visual Feedback
- Slide-up + fade-in animation (300ms)
- Dust cost pulses if insufficient
- Success triggers flash + close + toast “Sector Unlocked”

---

## 6. Analytics & Logging
- Event: `modal.unlockSector.open`
- Event: `sector.unlock.attempt`
  - Payload:
    - `sectorId: string`
    - `cost: number`
    - `success: boolean`
    - `sessionId`, `timestamp`

---

## 7. Dependencies
- EconomyEngine
- GameStateStore
- OverlayManager
- EventLogger
