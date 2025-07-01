# feature-wheel-of-fortune.md

## 1. Feature Summary
Wheel of Fortune is a luck-based engagement mechanic offering randomized rewards to players. It serves retention, monetization, and progression through daily free spins, ad-watched bonus tickets, and paid spin bundles.

---

## 2. UX Integration
- Entry point: `MainScreen` HUD → Wheel icon
- Modal overlays game when opened
- UI Elements:
  - Wheel visual with reward slots
  - Spin button
  - Ticket counter (with "+ get more" CTA)
  - Rewards history (optional)

---

## 3. Ticket Logic
- Each spin consumes 1 Wheel Ticket
- Sources of tickets:
  - +1 ticket every 4 real hours (max 1 if unclaimed — timer pauses)
  - +1 ticket for every 2 ads watched (up to 5/day)
  - VIP8+: +1 free ticket daily
  - Purchasable via Store or IAP bundles
- Max daily tickets from ads: 5
- No hard cap on stored tickets

---

## 4. Reward Table

| Reward Type      | Chance | Value Range   | Notes                      |
|------------------|--------|---------------|----------------------------|
| Cosmic Dust      | 30%    | 500–2000      | —                          |
| Core             | 20%    | 1–2           | Max 2/day via Wheel        |
| Booster          | 15%    | Random type   | 1 active per type allowed  |
| Ammo Pack        | 10%    | 10–30         | Type = active weapon       |
| Magmaton         | 5%     | 1–3           | Max 5/day cap              |
| Cosmetic Token   | 10%    | 1             | For future cosmetics       |
| Empty/Fail       | 10%    | —             | Fake spin w/ “No win” text |

---

## 5. Spin Mechanics
- Click “Spin” → animates rotation
- Deceleration and stop controlled via reward outcome
- Always deterministic (pre-rolled reward on server)
- After spin: reward popup with type & amount

---

## 6. Data Schema

ts
interface WheelTicket {
  count: number
  lastFreeGivenAt: number
  adTicketsToday: number
}

interface SpinResult {
  rewardType: 'dust' | 'core' | 'booster' | 'ammo' | 'magmaton' | 'cosmetic' | 'none'
  value: number
}

7. Visual Feedback
- Wheel glow pulse if ticket available
- “Free spin available!” toast if idle
- Reward fly-out animation
- Wheel greys out when no tickets

8. Edge Cases
- Tickets = 0 → open “Get more” modal (ads/store)
- Spin fails (e.g. network) → retry flow
- Reward already maxed (e.g. daily Core cap) → fallback reward

9. Related Features
- feature-booster-system.md
- feature-store.md
- feature-vip-system.md
- 6-2-economy-balance.md
