# feature-store.md

## 1. Feature Summary
Store is the centralized UI for all monetization and progression purchases: weapons, ammo, currencies, boosters, VIP levels, and tickets. It is split into logical tabs and supports both soft-currency and IAP transactions. Integrates directly with Codex purchasing API.

---

## 2. UX Integration

- Access: Bottom nav tab “Store”
- Tabs inside Store:
  - Weapons
  - Ammo
  - Currencies (Dust / Magmaton)
  - Boosters
  - Tickets
  - VIP
- All purchases are immediate (no cart)
- Price shown with appropriate icon (Dust / Magmaton)

---

## 3. Purchase Types

### 3.1. Weapons
- Unlockable by tier
- Requires Dust or Dust + Cores
- “Craft” button → unlocks new weapon

### 3.2. Ammo
- Refills ammo for equipped weapon
- Costs:
  - Low tier = Dust
  - Mid/high tier = Magmaton or mix
- Auto-refill toggle for VIP7+

### 3.3. Currencies
- Dust Packs (for Magmaton)
- Magmaton Packs (IAP only)
- Occasional sales & bonuses

### 3.4. Boosters
- Any type available for Magmaton
- Also available in bundles

### 3.5. Tickets
- Wheel Tickets purchasable (Magmaton)
- Max 10 per day

### 3.6. VIP
- “Upgrade” button shown with progress bar
- One-click IAP to increase VIP by fixed amount

---

## 4. UI Layout Notes

- Top bar: currency display (Magmaton, Dust)
- Tabs scroll horizontally if overflow
- Products shown in cards with:
  - Icon
  - Title
  - Price
  - Button

---

## 5. Data Schema

ts
interface StoreItem {
  id: string
  type: 'weapon' | 'ammo' | 'currency' | 'booster' | 'ticket' | 'vip'
  price: CurrencyCost
  payload: any
  limit?: number
}

interface CurrencyCost {
  currency: 'dust' | 'magmaton'
  amount: number
}

6. Visual Feedback
- Purchase button → bounce click
- Reward modal for each purchase
- If insufficient funds → open currency pack offer

7. Edge Cases
- VIP-only item clicked by non-VIP → show upsell modal
- Already owned weapon → disable buy
- Insufficient funds → redirect to relevant tab (e.g. buy Dust)

8. Related Features
- feature-vip-system.md
- feature-weapon-system.md
- feature-booster-system.md
- feature-wheel-of-fortune.md
- 6-1-currency-flow.md
