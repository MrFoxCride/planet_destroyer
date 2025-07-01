# feature-core-dispatch.md

## 1. Feature Summary
Core Dispatch governs the extraction of Core resources from destroyed planets. Cores are inaccessible via damage and must be collected by sending specialized units. The system is time-gated, upgradeable, and critical for progression beyond level 10 upgrades.

---

## 2. UX Integration
- Trigger: Appears on `MainScreen` after a planet is destroyed and core is exposed
- Button: “Send Unit” (opens unit selection modal)
- Modal includes:
  - Available units with stats
  - Estimated duration and yield
  - Dispatch confirmation
- After dispatch: planet marked as "processing"
- Return after timer to claim Cores

---

## 3. Gameplay Logic
### 3.1. Unit Types

| Type       | Base Time | Base Core Yield | Efficiency Gain |
|------------|-----------|------------------|------------------|
| Extractor  | 30 min    | 1                | +0.2 per level   |
| Drone      | 45 min    | 2                | +0.4 per level   |
| Scout      | 60 min    | 3                | +0.6 per level   |

- Each unit has `dispatchTime`, `efficiency`, `level`
- Units must be idle to dispatch

### 3.2. Dispatch Lifecycle
- Select unit → dispatch to planet → dispatch entry created
- While active:
  - Unit becomes unavailable
  - Target planet cannot receive new dispatch
- After timer:
  - Button turns into “Collect Reward”
  - Cores added to inventory
  - Unit returns to pool

### 3.3. Limitations
- Max 3 active dispatches simultaneously
- Dispatch cooldown (5 minutes global between starts)
- Boosters can reduce dispatch time by 30–50%

---

## 4. Data Structures

ts
interface Unit {
  id: string
  type: 'extractor' | 'drone' | 'scout'
  level: number
  efficiency: number
  dispatchTime: number
  available: boolean
}

interface DispatchInstance {
  id: string
  unitId: string
  targetId: string
  startedAt: number
  duration: number
  doneAt: number
  status: 'pending' | 'completed' | 'collected'
}

## 5. Upgrade System
- Units upgradeable with Dust:
  - cost = 200 × level (extractor), 400 × level (drone), 600 × level (scout)
- Upgrading improves efficiency linearly
- No cap on level
- No Core requirement for upgrades

## 6. Visual Feedback
- Planet shows dispatch timer overlay
- Unit status panel shows “Busy (X:XX)”
- “Collect” popup appears when complete
- Reward popup on successful claim (separate modal)

## 7. Edge Cases
- No idle units → show modal “All units are busy”
- Max dispatches reached → block new dispatch
- Unit aborted (via debug only) → clean up orphan dispatch
- Late return → no penalty, just idle collection

## 8. Related Features
- feature-planet-interaction.md
- feature-resource-flow.md
- feature-booster-system.md
- feature-analytics.md
