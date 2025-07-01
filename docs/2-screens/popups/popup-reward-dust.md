# popup-reward-dust.md

## 1. Modal Summary
Dust Reward Popup is a generic confirmation overlay shown when the player earns Cosmic Dust from various sources (planet destruction, quest completion, Wheel of Fortune, etc.). Its purpose is to deliver immediate positive feedback and suggest optional follow-up actions.

---

## 2. Trigger Sources
- Planet fully destroyed → reward granted (see `screen-main.md`)
- Quest complete → claim (via `screen-earn.md`)
- Wheel of Fortune result
- Referral milestone
- Daily login bonus

---

## 3. Layout Structure
### 3.1. Overlay Container
- Centered modal with fade-in scale animation (`OverlayManager.open('RewardPopup', { z: 200 })`)
- Z-layer: 200
- Auto-blocks background input

### 3.2. Content Elements
- **Icon**: large Dust icon (animated glow)
- **Label**: static title “Cosmic Dust Received”
- **Amount**: numeric reward amount (formatted, e.g. `+1,200`)
- **Subtext**: contextual note (e.g., “from Planet Destruction” or “Quest Complete”)
- **CTA Button**: [OK] (closes modal)
- **Optional Button**: [Go Spend] → navigates to `screen-store.md` (Dust tab)

---

## 4. Behavior & UX Logic
- Triggered programmatically via `OverlayManager.open('RewardPopup', { type: 'dust', amount: 1200, source: 'planet' })`
- If reward > 1000 Dust → highlight amount with confetti burst (`vfx.confetti.medium`)
- “Go Spend” only shown if reward ≥ 500
- Modal dismissible by:
  - OK button
  - Android Back Button
- Cannot be opened multiple times in parallel

---

## 5. Visual Feedback
- Fade-in + scale-in animation (300ms, ease-out)
- Glow pulse on Dust icon
- Optional: confetti burst behind modal (if big win)

---

## 6. Analytics & Logging
- Event: `reward.dust`
- Payload:
  - `amount: number`
  - `source: string` (`planet`, `quest`, `wheel`, etc.)
  - `sessionId`, `timestamp`

---

## 7. Dependencies
- Asset: `/assets/ui/reward_dust_icon.webp`
- VFX: `vfx.confetti.medium` (optional)
- OverlayManager, EventLogger, GameStateStore
# popup-reward-dust.md

## 1. Modal Summary
Dust Reward Popup is a generic confirmation overlay shown when the player earns Cosmic Dust from various sources (planet destruction, quest completion, Wheel of Fortune, etc.). Its purpose is to deliver immediate positive feedback and suggest optional follow-up actions.

---

## 2. Trigger Sources
- Planet fully destroyed → reward granted (see `screen-main.md`)
- Quest complete → claim (via `screen-earn.md`)
- Wheel of Fortune result
- Referral milestone
- Daily login bonus

---

## 3. Layout Structure
### 3.1. Overlay Container
- Centered modal with fade-in scale animation (`OverlayManager.open('RewardPopup', { z: 200 })`)
- Z-layer: 200
- Auto-blocks background input

### 3.2. Content Elements
- **Icon**: large Dust icon (animated glow)
- **Label**: static title “Cosmic Dust Received”
- **Amount**: numeric reward amount (formatted, e.g. `+1,200`)
- **Subtext**: contextual note (e.g., “from Planet Destruction” or “Quest Complete”)
- **CTA Button**: [OK] (closes modal)
- **Optional Button**: [Go Spend] → navigates to `screen-store.md` (Dust tab)

---

## 4. Behavior & UX Logic
- Triggered programmatically via `OverlayManager.open('RewardPopup', { type: 'dust', amount: 1200, source: 'planet' })`
- If reward > 1000 Dust → highlight amount with confetti burst (`vfx.confetti.medium`)
- “Go Spend” only shown if reward ≥ 500
- Modal dismissible by:
  - OK button
  - Android Back Button
- Cannot be opened multiple times in parallel

---

## 5. Visual Feedback
- Fade-in + scale-in animation (300ms, ease-out)
- Glow pulse on Dust icon
- Optional: confetti burst behind modal (if big win)

---

## 6. Analytics & Logging
- Event: `reward.dust`
- Payload:
  - `amount: number`
  - `source: string` (`planet`, `quest`, `wheel`, etc.)
  - `sessionId`, `timestamp`

---

## 7. Dependencies
- Asset: `/assets/ui/reward_dust_icon.webp`
- VFX: `vfx.confetti.medium` (optional)
- OverlayManager, EventLogger, GameStateStore