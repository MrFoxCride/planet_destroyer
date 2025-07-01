# feature-usdt-nebula.md

## 1. Feature Summary
USDT Nebula is a time- and ad-gated entity that rewards players with real cryptocurrency. Nebula appears once per day (via ads), behaves like a planet, and grants decaying USDT rewards over a 30-day earning window. It is core to the withdraw-to-earn loop.

---

## 2. UX Integration
- Appears on `GalaxyMap` as glowing red entity
- Tap to load into `MainScreen` with same layout as planets
- Instead of HP bar, shows “Nebula Integrity”
- Uses standard WeaponSystem for interaction
- On destruction:
  - Reward modal with current USDT drop
  - Nebula despawns
- Spawned via:
  - 5 ads watched (once/day)

---

## 3. Spawn Logic
- Max 1 Nebula spawn/day
- Spawned only after watching 5 ad units (any purpose)
- After spawn:
  - Timer pauses until next eligibility
- No stacking or queueing
- Must destroy Nebula to get reward

---

## 4. Reward Decay Table

| Day | USDT Drop |
|-----|-----------|
| 1   | $3.00     |
| 2   | $2.90     |
| …   | …         |
| 30  | $0.20     |

- Day count = active play days (sessions count)
- Decay curve hardcoded into EconomyEngine

---

## 5. Withdraw Conditions
- USDT is stored in wallet vault
- Withdrawable only if ≥ $40
- Wallet bind via Telegram Wallet
- VIP10 reduces threshold to $20
- Withdraw button appears in Profile screen
  - Enabled only if conditions met

---

## 6. Data Schema

ts
interface Nebula extends Entity {
  hp: number
  destroyed: boolean
  spawnedAt: number
  dayIndex: number
}

interface USDTVault {
  balance: number
  withdrawable: boolean
  telegramWalletBound: boolean
}

7. Visual Feedback
- Map icon glows red with pulse
- “Destroy to earn $X.XX” hover text
- On MainScreen, Nebula animates with spark/fog effect
- Reward modal: large $X.XX + note “Withdraw once you reach $40”

8. Edge Cases
- Ads not watched → no Nebula
- Nebula spawned but not destroyed → reward lost for the day
- Balance < $40 → withdraw button disabled
- Ads blocked by system → fallback to info modal

9. Related Features
- feature-planet-interaction.md
- feature-analytics.md
- 6-2-economy-balance.md
