# feature-daily-bonus.md

## 1. Feature Summary
Daily Bonus is a 7-day cyclic reward system designed to create habit loops and reward consistent daily logins. It appears on session start once per 24h and must be claimed manually. The cycle resets upon full completion or inactivity >48h.

---

## 2. UX Integration
- Triggered on app launch (once per 24h)
- Modal with 7-day horizontal grid
- Claimed days: checkmark + fade
- Current day: glowing + "Claim" button
- Future days: locked
- Reward preview always visible

---

## 3. Claim Logic
- Timer: 24h between claims (reset at midnight UTC)
- Inactivity > 48h:
  - Resets to Day 1
- On Day 7 claim:
  - Modal resets to Day 1
  - Optional bonus animation/screen

---

## 4. Reward Table (example)

| Day | Reward      |
|-----|-------------|
| 1   | 500 Dust    |
| 2   | 1 Core      |
| 3   | 1000 Dust   |
| 4   | 1 Booster   |
| 5   | 1500 Dust   |
| 6   | 1 Magmaton  |
| 7   | 2500 Dust + 1 Core |

- Rewards are fixed, no randomization
- Can be updated via LiveOps backend

---

## 5. Data Schema

ts
interface DailyBonusState {
  currentDayIndex: number
  lastClaimAt: number
  claimedDays: number[]
}

6. Visual Feedback
- Glowing “Claim” button
- Animations: reward flyout
- Toast: “+1 Core claimed!” etc.
- Modal auto-closes after claim

7. Edge Cases
- Claim attempted twice in 24h → show modal “Come back tomorrow!”
- Timer fails to reset (offline) → fallback to server time
- Claim button greyed out if already claimed

8. Related Features
- feature-news-modal.md
- feature-analytics.md
- 6-1-currency-flow.md
