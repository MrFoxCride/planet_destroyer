# popup-event-outcome.md

## 1. Modal Summary
Event Outcome Popup is shown after the player completes a full Reigns-style decision chain. It displays the final result of their choices: success or failure, and shows the cumulative effects (reward, penalty, trigger).

---

## 2. Trigger Sources
- Final swipe in `screen-reigns-event.md` chain
- ReignsSystem returns `isEventResolved(eventId) = true`
- Opened via: `OverlayManager.open('EventOutcome', { eventId, success, reward })`

---

## 3. Layout Structure
### 3.1. Modal Container
- Fullscreen or large overlay panel
- Z-layer: 300
- All input blocked in background

### 3.2. Content Elements
- **Header**
  - Outcome title: “Mission Success” or “Event Failed”
  - Visual: icon or color code (green = success, red = fail)
- **Summary**
  - Description: “You convinced the faction to join” or “You lost colony morale”
- **Reward Preview**
  - Resource icons with amounts (Dust, Core, Booster, etc.)
  - Only shown on success or partial success
- **Trigger Info**
  - Optional string: “New Unit Unlocked” or “Unlocked Colony Upgrade”
- **CTA Button**
  - [Back to Colony] → returns to `MainScreen` with current colony

---

## 4. Behavior & UX Logic
- Triggered when ReignsSystem marks event resolved
- Modal auto-populates from `ReignsEvent` outcome
- Reward gets injected into GameStateStore on modal confirm
- No “dismiss” without CTA
- Android Back = same as [Back to Colony]

---

## 5. Visual Feedback
- Fade-in + shake (fail) or glow (success)
- Resource icons pop-in with small delay
- Outcome text pulses on entry
- Optional VFX on win: `vfx.confetti.soft`

---

## 6. Analytics & Logging
- Event: `event.outcome`
  - Payload:
    - `eventId: string`
    - `success: boolean`
    - `rewards: object`
    - `trigger?: string`
    - `sessionId`, `timestamp`

---

## 7. Dependencies
- ReignsSystem
- GameStateStore
- OverlayManager
- EventLogger
