# feature-referral-system.md

## 1. Feature Summary
Referral System incentivizes players to invite Telegram users into the game. It tracks each invited player, their status (joined, active, premium), and grants the inviter currency bonuses. It's tightly integrated with quest rewards and viral loops.

---

## 2. UX Integration
- Entry: `Friends` tab in bottom nav
- UI Elements:
  - Referral tree block
  - “Invite Friend” button → shares deep link
  - Total earnings summary
  - List of referred users (nickname, status, earnings per user)

---

## 3. Invite Flow
- Each player has a unique referral link
- When new user starts game via that link:
  - They are permanently linked to inviter
- If referred user has Telegram Premium:
  - Bonus rewards given to inviter

---

## 4. Reward Logic

| Referral Condition           | Reward to Inviter      |
|-----------------------------|-------------------------|
| User joins game             | +100 Dust               |
| Reaches VIP 3               | +1 Core                 |
| Completes onboarding        | +1 Wheel ticket         |
| Has Telegram Premium        | +200 Dust               |

- Cumulative: same user can trigger multiple rewards
- Reward claimed via `Quest System` milestones

---

## 5. Data Schema

ts
interface Referral {
  playerId: string
  nickname: string
  joinedAt: number
  isPremium: boolean
  vipLevel: number
  progressFlags: string[] // e.g. ['joined', 'vip3', 'onboardingDone']
}

interface ReferralState {
  inviteLink: string
  totalEarnings: number
  referred: Referral[]
}

6. Visual Feedback
- New referral → toast: “You earned from a new recruit!”
- Referral milestone unlocked → claim button glows in Quest System
- Premium user referral → gold badge icon in list
- Tree display animates new nodes

7. Edge Cases
- Re-using link by existing user → ignored
- Multiple users from same device → only first counts
- Telegram Premium flag lost later → reward persists

8. Related Features
- feature-quest-system.md
- feature-earn-screen.md
- feature-profile.md
- 6-1-currency-flow.md
