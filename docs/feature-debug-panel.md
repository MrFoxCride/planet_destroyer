# feature-debug-panel.md

## 1. Feature Summary
Debug Panel is a developer-only interface for testing, inspecting game state, and triggering edge-case flows. It is never exposed to live players and requires a specific gesture to open. Used during development and QA for rapid iteration and diagnostics.

---

## 2. Access Method
- Gesture:
  - Two-finger hold for 8 seconds
  - One finger in top-right corner
  - One finger in bottom-left corner
- Only activates from `Friends` screen
- Fails silently if attempted elsewhere

---

## 3. UI Structure
- Full-screen overlay with:
  - Tabbed nav (Data / Triggers / Economy / Force Events)
  - Live variable readouts (currencies, timers, sector unlocks)
  - Toggle switches for feature flags
  - One-click buttons to trigger flows

---

## 4. Debug Tools
### 4.1. Player State
- Grant currencies (Dust / Core / Magmaton / USDT)
- Set VIP level
- Bind / unbind wallet (simulated)
- Force referral milestone

### 4.2. Game Progress
- Unlock sectors
- Auto-complete onboarding
- Grant tickets / boosters
- Force Daily Bonus / News modal to appear again

### 4.3. Reigns / Nebula / Dispatch
- Trigger specific Reigns event ID
- Spawn Nebula (ignore ad/timer logic)
- Force dispatch completion for all units

### 4.4. Analytics
- View last 20 logEvent() calls
- Toggle event logging ON/OFF
- Manual fire logEvent(key: string, payload?: any)

---

## 5. Data Schema (partial)

ts
interface DebugPanelState {
  visible: boolean
  activeTab: 'player' | 'progress' | 'events' | 'analytics'
  overrides: {
    currencies: Partial<Player['currencies']>
    vipLevel: number
    sectorUnlocks: string[]
  }
  analyticsLogs: LogEvent[]
}

6. Visual Feedback
- Live logs: timestamp + key + payload preview
- Color-coded toggles:
  - Red = OFF
  - Green = ON
- Toast: “Dev Action Executed” on any button press

7. Edge Cases
- Dev build only (hard disabled in prod)
- Gesture ignored if any modal is open
- Debug-triggered actions log as debug_* category for separation

8. Linked Features
- feature-analytics.md
- feature-usdt-nebula.md
- feature-reigns-events.md
- feature-dispatch-system.md
