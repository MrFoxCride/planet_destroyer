# screen-earn.md

## 1. Screen Summary
Earn screen centralizes all in-game missions and reward tasks. It includes onboarding, daily, referral, Telegram Premium, and achievement quests. Each block is scrollable and dynamically updates as progress is made. This screen is a primary retention driver.

---

## 2. Entry Point
- Access: bottom nav bar
- Label: “Earn”
- Icon: gift box or trophy
- Always available from all screens

---

## 3. Layout Structure
- Vertical scroll layout with 5 distinct quest blocks:
  1. **Onboarding Quests**
  2. **Daily Quests**
  3. **Referral Milestones**
  4. **Telegram Premium Quests**
  5. **Achievements**

- Each block:
  - Header label
  - Collapsible section (expanded by default)
  - List of quests with progress bars and claim buttons

---

## 4. Quest Card Structure
- Title
- Progress bar (0–100%)
- Reward preview:
  - Currency icon + amount
- “Claim” button (glows when available)
- Optional “New” badge if recently unlocked

---

## 5. Quest Block Behavior
### 5.1. Onboarding
- One-time tasks guiding first session(s)
- Unlock Reigns, Store, Dispatch, etc.

### 5.2. Daily Quests
- Reset at midnight UTC
- 3–5 quests per day
- Track ad views, spins, dispatches, etc.

### 5.3. Referral
- Tied to referred users’ progression
- Claimable once per milestone/user

### 5.4. Telegram Premium
- Only visible to Premium users
- Offer higher rewards (incl. Magmaton)

### 5.5. Achievements
- Permanent progression goals
- Unlock cosmetic tokens, Wheel tickets, Core packs

---

## 6. Data Schema

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

7. Visual Feedback
- Block header pulses if unclaimed quests present
- Claim button glows when ready
- After claim: reward flyout modal
- Full completion of a block = confetti burst

8. Edge Cases
- Non-Premium user → Premium block hidden
- Already claimed quest → card fades out
- Missing milestone due to referral error → toast fallback

9. Linked Features
- feature-quest-system.md
- feature-referral-system.md
- feature-vip-system.md
- 6-1-currency-flow.md
