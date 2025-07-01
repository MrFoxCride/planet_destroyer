# 6-2. Economy Balance – Planet Destroyer

## 6.2.1. Weapon Upgrade Curve

| Tier | Level Range | Cost (Dust) | Core Required | VFX Upgrade |
|------|-------------|-------------|----------------|--------------|
| T1   | 1–9         | 100 × lvl   | No             | No           |
| T1   | 10          | 1000        | 1              | Yes          |
| T2   | 11–19       | 200 × lvl   | No             | No           |
| T2   | 20          | 2000        | 2              | Yes          |
| T3   | 21–29       | 400 × lvl   | No             | No           |
| T3   | 30          | 4000        | 3              | Yes          |
| ...  | ...         | exponential | every 10 lvl   | every 10 lvl |

---

## 6.2.2. Unit Dispatch Timing & Core Yield

| Unit Type | Base Duration | Base Yield | Efficiency/Level | Upgrade Cost (Dust) |
|-----------|---------------|------------|------------------|----------------------|
| Extractor | 30 min        | 1 Core     | +0.2 Core/lvl    | 200 × lvl            |
| Drone     | 45 min        | 2 Cores    | +0.4 Core/lvl    | 400 × lvl            |
| Scout     | 60 min        | 3 Cores    | +0.6 Core/lvl    | 600 × lvl            |

- Max active dispatches: 3
- Dispatch queue cooldown: 5 min
- Boosters reduce dispatch time by 30–50%

---

## 6.2.3. Colony Income & Upkeep

| Colony Level | Dust/hour | Upkeep Required (per day) | Upgrade Cost (Dust) |
|--------------|-----------|----------------------------|----------------------|
| 1            | 50        | No                         | 500                  |
| 2            | 75        | No                         | 1000                 |
| 3            | 100       | Yes                        | 1500                 |
| 4            | 125       | Yes                        | 2000                 |
| 5            | 150       | Yes                        | 3000                 |

- Upkeep = visit + Reigns decision every 24h
- Missed upkeep → decay: −25% output per day
- Can be stabilized via booster or VIP

---

## 6.2.4. Nebula USDT Decay Table

| Day Index | USDT Reward |
|-----------|-------------|
| 1         | $3.00       |
| 2         | $2.90       |
| 3         | $2.80       |
| ...       | ...         |
| 30        | $0.20       |

- Max: 1 Nebula/day via 5 ads
- Reward is **not** affected by boosters
- No stacking or backlog — timer pauses after spawn

---

## 6.2.5. VIP System

| VIP Level | Cost (Magmaton) | Benefit Snapshot                                |
|-----------|------------------|--------------------------------------------------|
| 1         | Free             | Unlock VIP system                                |
| 2         | 200              | +10% colony yield                                |
| 3         | 500              | Auto-harvest colony                              |
| 4         | 800              | Remove 1 ad/day                                  |
| 5         | 1200             | +1 active dispatch slot                          |
| 6         | 1800             | +10% weapon damage                               |
| 7         | 2500             | Auto-refill ammo once/day                        |
| 8         | 3500             | Bonus Wheel ticket/day                           |
| 9         | 5000             | Access to cosmetic store                         |
| 10        | 8000             | Withdraw cap reduced to $20                     |

---

## 6.2.6. Wheel of Fortune Reward Pool

| Reward Type      | Chance  | Value Range         | Limitations             |
|------------------|---------|---------------------|--------------------------|
| Cosmic Dust      | 30%     | 500–2000            | —                        |
| Core             | 20%     | 1–2                 | max 2/day via wheel      |
| Booster (24h)    | 15%     | any type            | 1 active booster max     |
| Ammo Pack        | 10%     | 10–30 units         | depends on weapon        |
| Magmaton         | 5%      | 1–3                 | total cap: 5/day         |
| Cosmetic Token   | 10%     | 1                   | collection-only          |
| Empty/Fail       | 10%     | —                   | “No win” animation only  |
