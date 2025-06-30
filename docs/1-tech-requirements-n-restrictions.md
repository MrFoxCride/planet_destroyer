# 1. Technical Requirements & Restrictions – Planet Destroyer

## 1.1. Platform Constraints
- **Platform**: Telegram Mini App (TMA)
- **Orientation**: Mobile-only, vertical (9:16)
- **Connection**: Online-only, no offline mode
- **Navigation**: tabs, or multi-level nesting
- **Screen resolution**: 360×640 to 414×896 px
- **Input**: Touch-based only (swipe, tap, long tap)
- Navigation: FSM + manual stack
- Visual tabbar allowed, but no native tab controllers
- No nested DOM routing

## 1.2. Runtime Architecture
- React.js for `#ui-layer` (buttons, panels, overlays)
- PixiJS v7 for `#game-canvas` (rendered scenes)
- TailwindCSS for layout and UI styling
- Vite for local dev and builds
- Codex auto-generates game logic, UI, placeholder assets, and PRs

## 1.3. Screen System & FSM
- Navigation managed via `StateManager.changeState(screenName)`
- All screens are subclasses of `PIXI.Container`
- No DOM routing; FSM manages transitions and resets
- Only one active screen at a time (stateless except PlanetField)
- Screen transitions handled via `StateManager.changeState(screenName)`
- Maintain a manual navStack for history (`goTo()`, `goBack()`)
- Visual tabs use FSM under the hood
- React-based popups and modals must mount in `#ui-layer`, not Pixi
- Multiple overlays allowed simultaneously (modal + toast + HUD)

## 1.4. Input System
- **Swipe** — left/right on PlanetField only (screen-specific)
- **Tap** — standard interactions (buttons, confirm, spin)
- **Long tap** — optional extended interaction (e.g., fast dispatch)
- Scrolls, drag/drop, double-tap: DISALLOWED unless explicitly specified per screen

## 1.5. Asset Handling
- All assets must exist or be auto-generated placeholders:
  - Sprites → `/assets/sprites/`
  - VFX → `/assets/vfx/`
  - UI → `/assets/ui/`
- `assets.json` or `spritesheets.json` must always be updated
- Texture atlases required where possible
- Image formats: `.webp` (preferred), `.png` fallback
- Audio: only short `.mp3` or `.ogg` SFX under 200kb

## 1.6. Performance Targets
- ≤75 draw calls per screen (always use per-layer batching)
- Target memory per session ≤15MB
- Heavy FX must use batch-friendly particles or skeletal animations. Avoid frame-by-frame large sprite swaps.
- All secondary assets (e.g. Fortune Wheel, Reigns events, leaderboard UI) must be lazy-loaded. Use `AssetLoader.load()` with Promises or hooks before `StateManager.changeState(...)`
- Destroy inactive screens on exit (`container.destroy()`)
- Max texture memory: ≤32MB on initial load

## 1.7. Save System
- **Preferred**: Telegram WebApp Cloud Storage API
- **Fallback**: `localStorage`
- Save Keys:
  - `save.playerStats`
  - `save.planetQueue`
  - `save.unitTimers`
  - `save.resources`
  - `save.lastSeen`
- Auto-resume all timers after reconnect
- Offline time delta must be handled (e.g. `dispatch` resume)

## 1.8. Network / API Requirements
- All network calls via HTTPS `fetch()`, `POST/GET`, or WebSocket
- Back-end endpoints:
  - `/api/player/bind`
  - `/api/save/load`
  - `/api/withdraw/initiate`
  - `/api/referral/use`
- Ad events and IAP routed via Telegram SDK (BotFather)
- Must function under TMA runtime with no SSR

## 1.9. Ads & IAP Integration
- **Ads**: rewarded only (e.g., Fortune Wheel, speedups, Nebula)
  - Placeholder: `setTimeout` + alert for dev mode
- **IAP**: via Telegram Payments (Magmaton packs, bundles)
- Entry points must be coded even if SDK is mocked in dev

## 1.10. Dev Tools & Debug Mode
- Must include `DevPanel.tsx` React overlay
- Toggles:
  - Add Dust
  - Skip ads
  - Unlock screens
  - Force Nebula drop
- Only visible if `!isProd`
- Trigger via `?debug=true` or hotkey

## 1.11. Telemetry & Logging
- Event hooks must be coded for:
  - `event.destroy.planet`
  - `event.craft.weapon`
  - `event.dispatch.unit`
  - `event.watch.ad`
  - `event.withdraw.attempt`
- Logging via:
  - Telegram bot messages (optional)
  - Custom webhook to backend
  - Internal dev console overlay (`logEvent()`)
