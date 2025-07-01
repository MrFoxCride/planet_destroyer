# component-timer-bar.md

## 1. Component Summary
Timer Bar is a reusable UI component for displaying countdowns in a horizontal progress format. Used across dispatch missions, booster durations, wheel ticket cooldowns, and event timers.

---

## 2. Usage Contexts
- Dispatch mission countdowns (Planet Core extraction)
- Active booster duration
- Wheel of Fortune free ticket cooldown
- Colony upkeep deadline
- Any timed LiveOps event (e.g. Nebula availability)

---

## 3. Layout Structure
### 3.1. Visual Composition
- Horizontal bar:
  - Filled portion = progress (time remaining)
  - Edge label: countdown string (e.g., `03:25`)
  - Optional title or label above bar

### 3.2. Props
- `startTime: number` (timestamp)
- `endTime: number` (timestamp)
- `label?: string`
- `color?: string`
- `onComplete?: () => void`

---

## 4. Behavior & UX Logic
- Updates per second (via app.ticker or `setInterval`)
- When currentTime ≥ endTime:
  - Progress bar goes full
  - Optional callback triggered
  - Visual change (e.g., bar fades out or flashes)
- Bar auto-destroys if component is unmounted
- On resume (session reload), computes delta via `SessionManager.getUptime()` or real-time clock

---

## 5. Visual Feedback
- Smooth fill animation (linear or eased)
- Bar color configurable per use-case:
  - Boosters → green/blue
  - Dispatches → neutral or yellow
  - Critical timers → red with blinking at end
- Optional glow edge when ≤ 10 seconds remaining

---

## 6. Analytics & Logging
(Not tracked at component level)

---

## 7. Dependencies
- Used in: `modal-buy-ammo.md`, `popup-booster-activated.md`, `screen-expedition.md`, `screen-main.md`
- Depends on: App timer/ticker, global time service
