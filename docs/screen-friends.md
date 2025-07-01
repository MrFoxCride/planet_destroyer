# screen-friends.md

## 1. Screen Summary
Friends screen visualizes the player's referral network. It displays recruited users, their progression status, and cumulative earnings from invites. The screen supports social growth, viral acquisition, and reward tracking.

---

## 2. Entry Point
- Access: bottom nav bar
- Label: “Friends”
- Icon: user group
- Always available from all screens

---

## 3. Layout Structure
1. **Referral Action Block**
   - Your referral link + “Copy” button
   - “Invite Friend” CTA → opens Telegram deep link share
   - Static note: “Premium users bring extra rewards”

2. **Referral Earnings Summary**
   - Total Dust, Core, Tickets earned from invites
   - Displayed with currency icons and counters

3. **Referral List**
   - Scrollable list of recruited users
   - For each referred user:
     - Nickname (or “Anonymous Recruit”)
     - Joined date (relative: “2d ago”)
     - VIP level badge
     - Premium status icon (if true)
     - Milestones completed (icons)
     - Total earned from this referral

---

## 4. Referral Tracking Logic
- Unique referral link tied to player ID
- Invited user must:
  - Start game via deep link
  - Use Telegram (TG ID verification)
- Referral is permanent, 1-to-1 mapping

---

## 5. Milestones Displayed
- Joined
- Finished onboarding
- Reached VIP3
- Is Telegram Premium

Each milestone:
- Displays as icon with tooltip
- Glows when completed

---

## 6. Data Schema

ts
interface ReferralEntry {
  id: string
  nickname: string
  joinedAt: number
  vipLevel: number
  isPremium: boolean
  milestones: string[]
  totalContributed: CurrencyAmount
}

interface FriendsScreenState {
  inviteLink: string
  totalEarned: CurrencyAmount
  referred: ReferralEntry[]
}

7. Visual Feedback
- New referral → toast: “You earned from a new recruit!”
- “Copied!” confirmation after link copy
- Referral milestone complete → glow + sound
- Premium user = gold badge with tooltip

8. Edge Cases
- No referrals yet → empty state illustration
- Telegram Premium status not fetched → no icon
- Duplicate referral via same device → blocked

9. Linked Features
- feature-referral-system.md
- feature-quest-system.md
- feature-profile.md
- 6-1-currency-flow.md
