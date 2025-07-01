# popup-reward-ticket.md

## 1. Modal Summary
Ticket Reward Popup is shown when the player receives a Wheel of Fortune ticket from ads, quests, or achievements. It confirms acquisition and suggests immediate usage to maintain engagement momentum.

---

## 2. Trigger Sources
- Watching ad for ticket (via Wheel modal or Earn quests)
- Quest completion with ticket reward
- Referral milestone
- Daily login bonus (if ticket included)

---

## 3. Layout Structure
### 3.1. Overlay Container
- Center-aligned modal opened via `OverlayManager.open('RewardPopup', { z: 200 })`
- Z-layer: 200
- Dark backdrop, modal blocks interaction

### 3.2. Content Elements
- **Icon**: ticket visual with sparkle loop
- **Label**: “Fortune Ticket Received”
- **Amount**: always `+1`
- **Subtext**: “New ticket available”
- **CTA Button**: [Spin Now] → opens `WheelOfFortune` modal
- **Secondary Button**: [OK]

---

## 4. Behavior & UX Logic
- Called as `OverlayManager.open('RewardPopup', { type: 'ticket', source: 'ad' })`
- “Spin Now” is always shown if player has ≥1 ticket (checked via GameStateStore)
- If player already has Wheel modal open → dismisses current and reopens to refresh
- If reward pool exhausted → show “OK” only, no CTA

---

## 5. Visual Feedback
- Scale-in entry + particle sparkle on ticket
- Button glow pulse if ticket is usable
- Optional “whoosh” sound

---

## 6. Analytics & Logging
- Event: `reward.ticket`
- Payload:
  - `source: string` (`ad`, `quest`, `referral`, `daily`)
  - `sessionId`, `timestamp`

---

## 7. Dependencies
- VFX: `vfx.glow.soft` (optional)
- OverlayManager, GameStateStore, WheelSystem, EventLogger
