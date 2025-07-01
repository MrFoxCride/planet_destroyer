# feature-quest-system.md

## 1. Feature Summary
Quest System manages short- and long-term objectives for engagement, retention, and monetization reinforcement. It’s split into 5 quest blocks: onboarding, daily, referral, Telegram Premium, and achievements. Each quest has a type, progress, reward, and claim state.

---

## 2. UX Integration
- Accessed via `Earn` screen
- Divided into 5 scrollable blocks:
  1. **Onboarding**
  2. **Daily Quests**
  3. **Referral Milestones**
  4. **Telegram Premium Tasks**
  5. **Achievements**
- Each quest displays:
  - Title
  - Progress bar
  - Reward preview (Dust, Core, Magmaton)
  - Claim button (glows when completed)

---

## 3. Quest Structure

ts
interface Quest {
  id: string
  group: 'onboarding' | 'daily' | 'referral' | 'premium' | 'achievement'
  title: string
  progress: number
  target: number
  reward: Partial<Player['currencies']>
  claimed: boolean
  repeatable: boolean
}

4. Quest Groups & Examples
4.1. Onboarding
- One-time FTUE chain
- Examples:
  - Destroy your first planet
  - Send a unit to extract Core
  - Open the Store
  - Spin the Wheel

4.2. Daily Quests
- Refresh every 24h
- Limit: 3–5 per day
- Examples:
  - Watch 3 ads
  - Destroy 5 planets
  - Claim Colony income

4.3. Referral Milestones
- Based on number of invited users and their activity
- Examples:
  - Invite 3 users → +1 Core
  - Referred user reaches VIP3 → +200 Dust

4.4. Telegram Premium Tasks
- Available only if user has Telegram Premium
- Examples:
  - Claim 2 Nebula rewards → +1 Magmaton
  - Upgrade weapon to level 10 → +1 Wheel ticket

4.5. Achievements
- Permanent, milestone-based
- Examples:
  - Dispatch 100 units
  - Reach Colony Level 5
  - Withdraw first $40 USDT

5. Reward Logic
- Currencies only: Dust, Core, Magmaton
- No direct USDT ever
- Rare rewards (Magmaton) gated to:
  - Premium
  - Referral
  - Achievements

6. Visual Feedback
  - Claim button: glowing animation on complete
  - New quest: “New” badge
  - Progress bar fills smoothly
  - Reward popup after claim

7. Edge Cases
  - Already claimed quest → lock UI, gray out
  - Referral quest with invalid link → fail silently
  - Premium-only quest on non-premium user → hide block

8. Related Features
  - feature-earn-screen.md
  - feature-referral-system.md
  - feature-analytics.md
  - 6-1-currency-flow.md
