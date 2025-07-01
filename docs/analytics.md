# feature-analytics.md

## 1. Feature Summary
Analytics system captures key gameplay, monetization, and session data via standardized events. It sends structured payloads to GameAnalytics backend, enabling KPI tracking, cohort analysis, and economy tuning. It is environment-aware and DevTools-compatible.

---

## 2. Architecture
- Core function: `logEvent(eventName: string, payload?: object)`
- Analytics stack:
  - GameAnalytics SDK (Telegram-safe version)
  - Fallback to local buffer if offline
  - Optional dev-console mirroring
- Event Types:
  - Instant (sent on trigger)
  - Buffered (batched every 10s or on session end)

---

## 3. Event Categories
### 3.1. Economic Events

| Event Name             | Payload                              |
|------------------------|---------------------------------------|
| `currency_earned`      | { currency: 'dust', amount, source } |
| `currency_spent`       | { currency: 'core', amount, sink }   |
| `booster_activated`    | { type: 'damage', source }           |
| `vip_upgraded`         | { newLevel, totalSpent }             |

---

### 3.2. UX Flow Events

| Event Name             | Payload                              |
|------------------------|---------------------------------------|
| `screen_open`          | { screen: 'store' }                  |
| `quest_claimed`        | { questId, group }                   |
| `daily_bonus_claimed`  | { dayIndex }                         |
| `modal_open`           | { modalId }                          |

---

### 3.3. Session & Lifecycle

| Event Name             | Payload                              |
|------------------------|---------------------------------------|
| `session_start`        | { ts, tgUserId }                     |
| `session_end`          | { duration, actionsCount }           |
| `logout`               | { reason }                           |

---

### 3.4. Monetization

| Event Name             | Payload                              |
|------------------------|---------------------------------------|
| `iap_purchase`         | { skuId, usdAmount, source }         |
| `rewarded_ad_viewed`   | { placement, result }                |
| `wheel_spin`           | { ticketType, rewardType, value }    |
| `withdraw_initiated`   | { amount, walletBound }              |

---

### 3.5. Debug (dev only)

| Event Name             | Payload                              |
|------------------------|---------------------------------------|
| `debug_action`         | { action, context }                  |
| `event_test`           | { mockData }                         |

---

## 4. Payload Conventions

- All events must include:
ts
interface BasePayload {
  tgUserId: string
  sessionId: string
  clientVersion: string
  screen?: string
  vipLevel?: number
  isPremium?: boolean
}

- Use snake_case for keys
- Avoid nesting deeper than 1 level
- Use enums for source, sink, placement

5. Technical Controls
- logEvent() throttled to 50 events/sec max
- Buffer flush on session end, app unload
- Dev override: window.analytics.logEventPreview = true
- Separate GA project for staging env

6. Visual Debugging (Dev Only)
- Dev panel (see feature-debug-panel.md):
  - Live feed of last 20 events
  - Manual fire form
  - Toggle real send ON/OFF
- Mirror console.log on dev flag

7. Edge Cases
- Network offline → buffer and retry
- Invalid payload → discard silently, log locally
- User blocks telemetry → disable send, log flag telemetry_disabled: true

8. Linked Features
- feature-debug-panel.md
- feature-wheel-of-fortune.md
- feature-quest-system.md
- 6-2-economy-balance.md
