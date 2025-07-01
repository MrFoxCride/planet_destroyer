# modal-fake-leaderboard.md

## 1. Modal Summary
Fake Leaderboard Modal presents a motivational ranking screen to the player, showing their position among fictional users. It’s tied to the referral system and Reigns-like competitive fantasies but has no real PvP logic.

---

## 2. Trigger Sources
- Referral milestone reached
- End of Reigns event with “influence” theme
- Manual tap on “Leaderboard” button (if implemented)
- Triggered via: `OverlayManager.open('FakeLeaderboard', { playerRank, boostSource })`

---

## 3. Layout Structure
### 3.1. Modal Container
- Fullscreen modal with scrollable list
- Z-layer: 300
- Blocks all background input

### 3.2. Content Elements
- **Header**
  - Title: “Galactic Influence Rankings”
  - Subtext: e.g., “Updated hourly”

- **Leaderboard List**
  - Top 10 slots
  - Each row:
    - Rank number
    - Avatar (generated or static)
    - Username (fake)
    - Referral count or “influence score”
  - Player row:
    - Highlighted with tag: “You”
    - Pseudo-rank inserted between others

- **Boost CTA**
  - Text: “Invite more to rise in ranks”
  - [Invite Friends] → opens Telegram deep link

- **Close Button**

---

## 4. Behavior & UX Logic
- Player always shown in rank 3–8 range depending on referral count
- Names, avatars, scores are generated client-side
- No real-time updates, fixed dataset per session
- [Invite Friends] uses `ReferralSystem.inviteLink()`
- Scroll snaps to player row on open

---

## 5. Visual Feedback
- Entry: fade + vertical slide (300ms)
- Player row has glow frame
- Rank #1 row may have crown icon + confetti loop

---

## 6. Analytics & Logging
- Event: `modal.fakeLeaderboard.open`
  - Payload:
    - `playerRank: number`
    - `referrals: number`
    - `source: string` (`quest`, `referralScreen`, `event`)
    - `sessionId`, `timestamp`

---

## 7. Dependencies
- ReferralSystem
- OverlayManager
- GameStateStore
- EventLogger
