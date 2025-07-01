# modal-ad-reward-prompt.md

## 1. Modal Summary
Ad Reward Prompt Modal is a universal confirmation window shown before playing a rewarded ad. It previews the reward, confirms the ad watch requirement, and prevents accidental triggering.

---

## 2. Trigger Sources
- Tap “Watch Ad” in:
  - Wheel of Fortune (for extra tickets)
  - Nebula spawn
  - Booster unlocks
  - Store items (if gated by ad)
- Triggered via: `OverlayManager.open('AdRewardPrompt', { rewardType, amount, context })`

---

## 3. Layout Structure
### 3.1. Modal Container
- Medium-size modal, centered
- Z-layer: 300
- Dismissible by back or outside tap

### 3.2. Content Elements
- **Reward Preview**
  - Icon + label (e.g., `+1 Wheel Ticket`, `+30% Dust Boost`)
- **Text**
  - “Watch a short ad to receive this reward?”
- **CTA Buttons**
  - [Watch Ad] → triggers `AdsService.watchAd(purpose)`
  - [Cancel] → closes modal

---

## 4. Behavior & UX Logic
- Dynamically maps `rewardType` to correct visual + label
- On confirm:
  - Close modal
  - Open ad via `AdsService.watchAd(purpose)`
  - On success → reward injected, show reward popup
- On ad fail → show toast: “Ad not available”
- Android Back = cancel

---

## 5. Visual Feedback
- Entry: scale-in
- Reward icon pulses once
- CTA button glows briefly

---

## 6. Analytics & Logging
- Event: `modal.adReward.open`
  - Payload:
    - `rewardType: string`
    - `context: string` (e.g., `wheel`, `nebula`, `booster`)
    - `sessionId`, `timestamp`

---

## 7. Dependencies
- OverlayManager
- AdsService
- GameStateStore
- EventLogger
