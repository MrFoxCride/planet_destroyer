# screen-store.md

## 1. Screen Summary
Store is the monetization center of the game, offering IAP-first products and progression-related purchases. It is structured into tabs prioritizing paid offers and smart recommendations. Most purchases are made via USDT/TON, with limited exceptions for Dust and Cores.

---

## 2. Entry Point
- Accessed from: bottom nav bar
- Label: “Store”
- Icon: coin stack or shopping bag
- Always visible from all screens

---

## 3. Tab Order (by priority)
1. **Recommended**
2. **Currencies**
3. **VIP**
4. **Boosters**
5. **Weapons**
6. **Ammo**

---

## 4. Recommended Tab
- Dynamically personalized list:
  - Based on recent user actions, session stage, currency levels
- Includes:
  - Limited-time offers
  - "Almost out of ammo?" prompt
  - First purchase bonus
  - “New weapon unlocked” upsell
- Powered by rule-based logic:
  - Weapon ammo < 20% → suggest refill
  - User reached Colony Lv3 → suggest booster
  - Daily first login → daily deal
- Admin panel controlled placement of banners & offers

---

## 5. Currencies Tab
- First item: **MagmaTon Pack**
  - Two payment options: USDT / TON (side-by-side CTA)
- Followed by:
  - Dust Packs (buy with Magmaton)
  - Ticket Packs (buy with Magmaton or as bundle)
- “Best value” badge shown for top tier

---

## 6. VIP Tab
- Shows:
  - Current VIP level
  - Progress bar toward next
  - VIP perks summary
- Purchase methods:
  - Fixed Magmaton upgrade packs
  - Direct IAP (via USDT/TON)

---

## 7. Boosters Tab
- Purchasable: Dust, Colony, Damage, Dispatch boosters
- Duration shown on card
- Quantity limit per day (if any)
- VIP discounts applied automatically if eligible

---

## 8. Weapons Tab
- List of unlockable weapons:
  - Crafting cost = Dust + sometimes Core
- Upgrade offers shown inline
- VFX preview on card for current tier

---

## 9. Ammo Tab
- Refill ammo for currently owned weapons
- Sorted by:
  - Equipped weapon first
  - Then by tier descending
- Refill methods:
  - Dust (low tier)
  - Magmaton (high tier)
- VIP auto-refill shown as toggle (VIP7+)

---

## 10. Purchase Card Structure
- Icon + name
- Tier/level (if applicable)
- Price + currency icon
- “Buy” or “Refill” button
- “Limited” or “VIP” tags

---

## 11. Linked Features
- `feature-weapon-system.md`
- `feature-vip-system.md`
- `feature-booster-system.md`
- `feature-wheel-of-fortune.md`
- `6-1-currency-flow.md`

---

## 12. Technical Notes
- All payments via Telegram Pay API
- Support for:
  - USDT
  - TON
- Recommended logic configurable via admin rules
- Prices / limits editable live
