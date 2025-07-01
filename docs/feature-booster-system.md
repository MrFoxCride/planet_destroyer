# feature-booster-system.md

## 1. Feature Summary
Booster System provides temporary buffs to key systems: Dust income, Colony yield, and Weapon damage. Boosters are time-limited, stack-limited, and act as soft monetization pressure and session extension tools. They are rewarded via ads, Wheel, and sold in the Store.

---

## 2. UX Integration
- Booster buttons appear:
  - On MainScreen HUD (e.g. "+50% Dust")
  - On Colony screen (e.g. “Activate Yield Boost”)
- Activation:
  - Taps open confirmation modal with timer & effect
- Booster store offers direct purchase or IAP bundles

---

## 3. Booster Types

| Booster Type     | Effect                         | Duration   | Source                         |
|------------------|--------------------------------|------------|--------------------------------|
| Dust Booster     | +50% Dust from destruction     | 15 min     | Ads, Wheel, Store              |
| Colony Booster   | +100% passive yield            | 1h         | Store, VIP, Reigns             |
| Damage Booster   | +30% weapon damage             | 10 min     | Wheel, Store                   |
| Dispatch Booster | −50% dispatch time             | 30 min     | Rare: Wheel, IAP bundles       |

- Only one booster of each type can be active
- New booster overrides old of same type

---

## 4. Activation Logic
- Each booster has:
  - `active: boolean`
  - `expiresAt: timestamp`
- At activation:
  - effect applied globally
  - countdown visible in HUD
- On expiration:
  - effect removed
  - toast shows "Booster expired"

---

## 5. Data Schema

ts
interface Booster {
  id: string
  effect: 'dust' | 'damage' | 'colony' | 'dispatch'
  multiplier: number
  duration: number
  active: boolean
  expiresAt?: number
}

6. Source Integration
- Wheel of Fortune:
  - ~15% chance to drop booster (random type)
- Store:
  - Sold in bundles or single-use
- Quests:
  - Given as reward for key milestones
- VIP:
  - Certain levels grant auto-boosts on login

7. Visual Feedback
- HUD icons pulse while active
- Countdown timer overlays on icon
- Buff effect shown in number popups (e.g. “+75 Dust → +112 w/ boost”)
- Boosted entities glow subtly (e.g. colony, weapon)

8. Edge Cases
- Multiple boosters of same type → overwrite silently
- Offline time = included in expiration
- Manually activated expired booster → show error
- Booster stack overflow → prevent >4 total active

9. Related Features
- feature-weapon-system.md
- feature-colony-system.md
- feature-core-dispatch.md
- feature-vip-system.md
- 6-1-currency-flow.md
