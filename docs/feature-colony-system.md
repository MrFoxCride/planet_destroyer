# feature-colony-system.md

## 1. Feature Summary
Colony System governs the passive income, upkeep, and event chains for colonized planets. Each colony acts as a long-term resource generator, requiring player attention to maintain output. It integrates Tamagotchi-like mechanics and Reigns-style decision events.

---

## 2. UX Integration
- Entry point:
  - On first visit to planet → choose “Colonize”
  - Or via GalaxyMap → tap existing colony marker
- Renders in `MainScreen` with:
  - Passive Dust income rate
  - Happiness indicator
  - “Collect” button
  - Reigns icon (if event active)

---

## 3. Gameplay Logic
### 3.1. Income Generation
- Passive yield: `dustPerHour`
- Storage fills over time until cap reached
- Player must visit colony and press “Collect” to claim
- If storage full → income halts until collected

### 3.2. Upgrades

| Level | Dust/hour | Upkeep Required | Upgrade Cost |
|-------|-----------|------------------|---------------|
| 1     | 50        | No               | 500 Dust      |
| 2     | 75        | No               | 1000 Dust     |
| 3     | 100       | Yes              | 1500 Dust     |
| 4+    | +25/lvl   | Yes              | +500/lvl      |

- Upgrades unlock higher yields but trigger upkeep system

### 3.3. Upkeep Mechanism
- Each 24h: player must interact via Reigns event
- If skipped → `happiness -1`
- If happiness < 0:
  - Output decays by 25%/day
  - Event icon becomes red
- VIP level ≥ 3 enables auto-upkeep

---

## 4. Reigns Events Integration
- Triggered when:
  - New day starts
  - Manual player visit
- Uses shared Reigns chain system:
  - 5–10 decisions
  - Each affects happiness, boost, penalty
- Resolved event resets upkeep timer

---

## 5. Data Structures

ts
interface Colony extends Entity {
  dustIncomePerHour: number
  happiness: number // range: -3 to +3
  activeEventId?: string
  upkeepLevel: number
  lastCollectionAt: number
}

6. Visual Feedback
- Income progress bar fills over time
- “Collect” button glows if full
- Happiness displayed with face icon:
  - Green = stable
  - Yellow = needs attention
  - Red = in decay
- Reigns icon pulses when event active

7. Edge Cases
- Storage full = no income → trigger toast
- Missed upkeep:
  - Show warning in modal
  - Offer Booster (auto-care)
- Reigns event incomplete → colony blocked until resolved
- Colony abandoned (by dev tool) → mark as “lost”

8. Related Features
- feature-reigns-events.md
- feature-resource-flow.md
- feature-vip-system.md
- feature-booster-system.md
- feature-galaxy-map.md
