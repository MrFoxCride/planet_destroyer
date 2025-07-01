# popup-reward-core.md

## 1. Modal Summary
Core Reward Popup is a feedback overlay shown when the player successfully extracts a Core from a destroyed planet using a dispatched unit. It confirms the high-value gain and optionally redirects the player to upgrade usage.

---

## 2. Trigger Sources
- Successful dispatch mission → Core reward collected
- Quest completion (if reward includes Core)
- Wheel of Fortune rare drop
- Reigns event with Core outcome

---

## 3. Layout Structure
### 3.1. Overlay Container
- Centered modal via `OverlayManager.open('RewardPopup', { z: 200 })`
- Z-layer: 200
- Backdrop dimmed, input blocked

### 3.2. Content Elements
- **Icon**: animated Core crystal
- **Label**: “Core Acquired”
- **Amount**: `+1`, `+2`, etc.
- **Subtext**: “via Dispatch” or other contextual text
- **CTA Button**: [OK] (closes modal)
- **Optional Button**: [Upgrade Weapon] → opens `screen-store.md`, auto-scroll to current equipped weapon card

---

## 4. Behavior & UX Logic
- Triggered via `OverlayManager.open('RewardPopup', { type: 'core', amount: 2, source: 'dispatch' })`
- If reward ≥ 2 cores → pulse + glow on amount
- “Upgrade Weapon” shown only if:
  - Any equipped weapon is upgradeable
  - Player meets Dust requirement
- Modal dismissed by OK or Back Button

---

## 5. Visual Feedback
- Fade-in + scale-in (300ms)
- Icon has idle shimmer loop
- Amount text may “pop” with tween if high value

---

## 6. Analytics & Logging
- Event: `reward.core`
- Payload:
  - `amount: number`
  - `source: string` (`dispatch`, `quest`, `wheel`, etc.)
  - `sessionId`, `timestamp`

---

## 7. Dependencies
- Asset: `/assets/ui/reward_core_icon.webp`
- VFX: `vfx.core.glow` (loop)
- OverlayManager, EventLogger, GameStateStor
