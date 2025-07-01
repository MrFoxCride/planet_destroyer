# screen-expedition.md

## 1. Screen Summary
Expedition Screen is the player interface for launching exploration missions. Expeditions consume resources, run on real-time timers, and lead to Reigns-like narrative events that reward Cores, Dust, or unique items. Multiple expeditions can run in parallel.

---

## 2. Entry Point
- Accessed from:
  - Dispatch result screen (Send → Expedition)
  - Galaxy Map if colony ship dispatched
  - In-game buttons tied to new unlocked planets

---

## 3. Layout Structure
### Top Bar
- Active Expeditions count
- Expedition Slots (based on upgrades/VIP)
- Resource tracker (Dust / Core / Magmaton)

### Expedition Cards (Vertical List)
Each card shows:
- Target (planet name)
- Time remaining (countdown or “Ready”)
- Mission type (scouting, mining, anomaly)
- Dispatch cost
- [Launch] or [Resolve] button
- Status: Idle / In progress / Ready

---

## 4. Expedition Lifecycle
1. Select mission type
2. Pay Dust + Core
3. Countdown starts (30–120 min)
4. On complete:
   - [Resolve] → opens Reigns Event
5. After event → rewards or penalties granted

---

## 5. Mission Types

| Type     | Duration | Base Cost | Outcome                           |
|----------|----------|-----------|-----------------------------------|
| Scouting | 30 min   | Low       | 1 Reigns event, small Dust/Core   |
| Mining   | 60 min   | Mid       | Core + booster chance             |
| Anomaly  | 120 min  | High      | Rare Reigns chain, Magmaton shard |

---

## 6. Upgrade Mechanics
- Unlock more slots with:
  - VIP
  - Research (future)
- Reduce timer via boosters or Magmaton
- Auto-resolve for VIP8+

---

## 7. Data Schema

ts
interface Expedition {
  id: string
  targetPlanetId: string
  missionType: 'scout' | 'mine' | 'anomaly'
  launchedAt: number
  status: 'in_progress' | 'ready' | 'resolved'
  outcome?: ExpeditionOutcome
}

8. Visual Feedback
- Countdown = ticking animation
- "Resolve" glows when ready
- Card slides out after resolution
- Reward = popup flyout

9. Edge Cases
- Player closes app → countdown resumes correctly
- Expedition expired without resolve → fallback reward
- Cancelled mission (dev only) → refund 50%

10. Linked Features
- feature-reigns-events.md
- feature-core-dispatch.md
- 6-1-currency-flow.md
- feature-vip-system.md
