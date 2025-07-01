# popup-reward-usdt.md

## 1. Modal Summary
USDT Reward Popup appears when the player destroys a Nebula and earns real-currency payout. This is the most valuable and emotionally significant reward screen in the game, and must deliver strong feedback and anticipation for withdraw.

---

## 2. Trigger Sources
- Destruction of Nebula entity (`screen-main.md`)
- Reward granted by `NebulaRewardSystem.spawnByAd() → destroy → reward`

---

## 3. Layout Structure
### 3.1. Overlay Container
- Center modal via `OverlayManager.open('RewardPopup', { z: 300 })`
- Z-layer: 300 (above other popups)
- Fully blocks input, backdrop dimmed with starfield fade

### 3.2. Content Elements
- **Icon**: animated USDT coin (rotating or shimmering)
- **Label**: “USDT Earned”
- **Amount**: formatted in `$X.XX` (e.g., `$2.80`)
- **Subtext**: “Nebula destroyed” or “Nebula reward – Day 3”
- **CTA Button**: [Withdraw] → opens `screen-profile.md`, auto-scroll to Withdraw section
- **Secondary Button**: [OK] (just closes modal)

---

## 4. Behavior & UX Logic
- Triggered via `OverlayManager.open('RewardPopup', { type: 'usdt', amount: 2.8, day: 3 })`
- Always shows “Withdraw” CTA unless balance < $40 → in that case, CTA shows tooltip: “Minimum is $40”
- If current balance ≥ $40 → button navigates to `screen-profile.md`
- Modal must prevent accidental dismiss (no tap-outside, no auto-close)

---

## 5. Visual Feedback
- Entry: scale-in + glow flare burst (500ms)
- Amount text animates with slow number roll-up from `$0.00` to final amount
- Optional confetti burst and sound
- Background shimmer on modal panel

---

## 6. Analytics & Logging
- Event: `reward.usdt`
- Payload:
  - `amount: number`
  - `dayIndex: number`
  - `sessionId`, `timestamp`

---

## 7. Dependencies
- VFX: `vfx.usdt.drop`
- OverlayManager, WalletService, EventLogger, GameStateStore
