# feature-vip-system.md

## 1. Feature Summary
VIP System provides permanent progression bonuses, monetization hooks, and QOL unlocks across 10 levels. Progression is tied to Magmaton spending. VIP integrates with boosters, ammo auto-refill, ad-reduction, and USDT withdraw conditions.

---

## 2. UX Integration
- Accessible via:
  - `Profile` screen (VIP badge, progress bar, benefit list)
  - `Store` screen (VIP tab / bundle packs)
- Each level-up shows modal with unlocked perks
- Current level badge visible in HUD (MainScreen)

---

## 3. VIP Progression

| VIP Level | Total Magmaton Spent | Unlocks                                           |
|-----------|-----------------------|--------------------------------------------------|
| 1         | Free                  | System unlock                                     |
| 2         | 200                   | +10% Colony yield                                 |
| 3         | 500                   | Auto-harvest colonies once/day                    |
| 4         | 800                   | −1 ad per day on ad-limited rewards               |
| 5         | 1200                  | +1 active dispatch slot                           |
| 6         | 1800                  | +10% weapon damage                                |
| 7         | 2500                  | Auto-refill ammo once/day                         |
| 8         | 3500                  | +1 free Wheel ticket/day                          |
| 9         | 5000                  | Access to cosmetic store                          |
| 10        | 8000                  | USDT withdraw cap reduced from $40 → $20         |

- VIP is permanent, non-decaying
- Cumulative Magmaton spent → tracked passively

---

## 4. Logic & Triggers
- All Magmaton spend is logged via `EventLogger`
- On reaching threshold:
  - Auto-upgrade to next VIP level
  - Show reward modal
- Effects apply globally, no manual toggling

---

## 5. Data Schema

ts
interface VIPState {
  level: number
  totalMagmatonSpent: number
  perksUnlocked: string[]
}

6. Visual Feedback
- Profile screen: VIP badge with animated glow
- HUD: static VIP icon near resource display
- Store: special pricing/bonuses for VIPs
- MainScreen: reward popups with "VIP Bonus +" where applicable

7. Edge Cases
- Overlapping effects (e.g. booster + VIP) stack multiplicatively
- Magmaton refunds don’t lower VIP level
- Dev override resets → forced re-sync via server

8. Related Features
- feature-store.md
- feature-booster-system.md
- feature-profile.md
- feature-analytics.md
- 6-2-economy-balance.md
