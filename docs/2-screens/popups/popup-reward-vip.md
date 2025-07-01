# popup-reward-vip.md

## 1. Modal Summary
VIP Reward Popup confirms that the player has reached a new VIP level, either via Magmaton payment or high engagement. It communicates new unlocked benefits and encourages further progression.

---

## 2. Trigger Sources
- VIP level upgrade (via Store → VIP tab)
- Referral milestone (if tied to VIP)
- Achievements or quests (if any grant VIP XP)

---

## 3. Layout Structure
### 3.1. Overlay Container
- Center modal via `OverlayManager.open('RewardPopup', { z: 300 })`
- Z-layer: 300
- High-priority modal with exclusive screen time (no parallel overlays)

### 3.2. Content Elements
- **Icon**: VIP badge (based on level)
- **Label**: “VIP Level Up!”
- **Subtext**: “You are now VIP Level X”
- **Benefits List**: bullet-style summary (e.g., “+10% colony income”, “Ad removed”)
- **CTA Button**: [See Benefits] → opens `modal-vip-benefits.md`
- **Secondary Button**: [OK]

---

## 4. Behavior & UX Logic
- Triggered via `OverlayManager.open('RewardPopup', { type: 'vip', level: 3 })`
- Pulls benefit text from `VIPSystem.getBenefits(level)`
- If `modal-vip-benefits.md` is already open → disables [See Benefits] and shows tooltip
- Player can always dismiss with [OK] or Android Back

---

## 5. Visual Feedback
- Gold glow pulse on VIP icon
- Slide-in animation from bottom
- Confetti burst (`vfx.confetti.gold`) if level ≥ 5
- Optional sound: level-up jingle

---

## 6. Analytics & Logging
- Event: `reward.vip`
- Payload:
  - `level: number`
  - `sessionId`, `timestamp`

---

## 7. Dependencies
- Data: `VIPSystem.getBenefits(level)`
- VFX: `vfx.confetti.gold`
- OverlayManager, EventLogger, VIPSystem
