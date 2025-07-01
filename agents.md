# AGENT PROFILE: PixiJS Vertical Telegram Mini Apps Game

## PURPOSE
This project is a fully modular and scalable boilerplate for creating swipe-based idle-tycoon games on Telegram Mini App using:
- PixiJS (rendering engine)
- TailwindCSS (UI layout and DOM overlays)
- Vite (dev server and bundler)
- FSM-based screen navigation
- Optional AI Dev (Codex) integration

## STACK OVERVIEW
**Frontend**:  
- React.js (UI logic, `#ui-layer`)  
- PixiJS v7 (canvas rendering, `#game-canvas`)  
- TypeScript / JavaScript  
- HTML, CSS, TailwindCSS  
- Vite (dev/build)  
- Codex (AI code gen via PRs)  
- Deployment: Vercel (static, no SSR)  

**Backend**:  
- Golang (API logic, event handling, auth)  
- Redis (timers, ephemeral game state, cooldowns, missions)  
- MySQL (persistent player state, economy balance, IAP logs)

**Runtime Split**:
- All game logic (UI, combat, dispatches, etc.) runs fully client-side in TMA
- Backend used only for:
  - Account binding / Telegram auth
  - Save/load player 
  - IAP & Ad verification
  - USDT withdraw logic
  - Anti-fraud and referrals

**Codex constraints**:
- No SSR
- No `fs`, `path`, `process`
- No access to server files (backend is external)
- All client-server interactions must go via fetch or websocket endpoints

## DOCUMENTATION STRUCTURE (docs/)
- `0-vision.md` — основа всей игры (loop, ресурсы, мета)
- `1-tech-requirements-n-restrictions.md` — ограничения платформы
- `2-user-flow.md` — переходы между экранами
- `3-economics.md` — экономика и монетизация
- `screen-*.md` — описание каждого экрана, по одному файлу

-## WORKFLOW RULES
- Полное видение игры — в `docs/0-vision.md`, начинай с чтения именно этого файла, чтобы освежить память о продукте.
- Каждый `screen-*.md` содержит описание одного игрового экрана.
- Перед реализацией всегда анализируй UI Elements и Logic отдельно.

## ASSET PIPELINE CONSTRAINTS
- Codex и любые AI-агенты не имеют права генерировать, добавлять или менять бинарные ассеты (изображения, звуки, спрайты, видео) в репозитории через auto-PR или генерацию.
- Codex генерирует только:
  - плейсхолдеры для ассетов,
  - корректные имена файлов,
  - ссылки и entries в manifest-файлах (assets.json и аналоги).
- Все бинарные ассеты (sprites, иконки, анимации, VFX, SFX) всегда интегрируются вручную, отдельным коммитом, после генерации плейсхолдеров.
- Финальная подмена плейсхолдеров на реальные ассеты производится только вручную, без участия Codex.
- Любая попытка AI сгенерировать или затронуть бинарный файл — это ошибка пайплайна и должна быть отклонена на уровне review/CI.

## GAME SCREENS
Each game screen is a separate class extending `PIXI.Container`, stored in `src/screens/`.
Screens are loaded via `Manager.changeState(screenName)`.

## NAVIGATION MODEL
- Core screen logic uses FSM via `StateManager.changeState()`
- Visual navigation bar at bottom (tab-style) triggers FSM transitions
- All screen transitions must use `goTo(screen, params?)` and `goBack()` for history
- Do NOT use native routing libraries (React Router, TabNavigator)
- Popups, modals, overlays must render via `#ui-layer` (React or Pixi Z-layer)
- Overlays must be dismissible, state must be tracked separately from FSM
- Android Back Button must always be intercepted
- Follow UX logic:
  - Close modals first
  - If FSM screen stack > 1 → `goBack()`
  - If in MainScreen → ignore press
- Never use native browser history APIs

## CODE ARCHITECTURE
| Folder           | Content Description                                     |
|------------------|---------------------------------------------------------|
| `/screens`       | Pixi containers representing game scenes                |
| `/core`          | Utility modules: AssetLoader, SaveManager, TimerManager |
| `/ui`            | UI components (buttons, bars, overlays)                 |
| `/data`          | Config files for game logic (JS, not JSON)              |
| `/assets`        | Static image assets (PNG, atlas, etc.)                  |

## CODING RULES
- All game screens must extend `PIXI.Container`
- PixiJS rendering must be encapsulated in `#game-canvas`, React interface in `#ui-layer`. 
- All cross-layer interactions go through a shared `GameStateStore` (global FSM/observer).
- Direct mutation of Pixi from React is forbidden. All logic updates must pass through the store.
- Use `app.ticker.add(...)` for per-frame updates
- All logic must work with `StateManager` transitions
- UI overlays must go to `#ui-layer` unless explicitly Pixi-based
- Use JS modules (`export class`, `import ... from ...`)
- Avoid writing to DOM directly — prefer Pixi or Tailwind UI
- Generated code must be fully browser-safe. No Node.js APIs (`fs`, `path`, `process`) are allowed.
- Ensure Vercel deploy works under TMA runtime (no server-side logic).
- `logEvent()` must support:
  - batching mode (flush every 10s or every 20 events)
  - optional throttle (min delay between same-type events: 500ms)
  - optional sessionId + local timestamp offset

## GAME STATE MODEL
- All runtime state (player data, current planet, timers, currency, active screen, etc.) must be stored in `GameStateStore`.
- No screen/component should maintain long-lived local state except for temporary UI.
- GameStateStore must be singleton, observable, persistent-safe.
- Structure:
  - `player`: id, vipLevel, usdtBalance, sessionId
  - `game`: currentScreen, navStack, currentEntity (planet | nebula | colony)
  - `resources`: dust, cores, magmaton
  - `timers`: dispatchTimers[], craftQueue[]
 
## UI Z-LAYER HIERARCHY
- All overlays must declare Z-layer explicitly:
  - Toasts: 100
  - Confirm / Modals: 200
  - News / FTUE: 300
  - DevPanel: 400
  - Emergency overlay: 999
- Use `OverlayManager.open(type, zIndex)` for consistent stacking
- Codex must assign Z-index per overlay type explicitly

## DEBUG MODE
- Codex must include a `DevPanel.tsx` React component when generating projects or core screens.
- This component must include debug cheats: Add Dust, Skip Ads, Unlock Screens, Force Nebula.
- All debug elements must be wrapped in `if (!isProd)` conditions.
- All overlays must declare Z-order explicitly: e.g., toast < modal < devpanel

## FILE STRUCTURE EXTENSION RULES
You are allowed to extend the project structure
Each generated feature/script/component must auto-generate immediately:
- All referenced assets as placeholder files (sprites, VFX, animations)
- Update `/assets/assets.json` or relevant manifest
- Maintain structure: `/assets/sprites/`, `/assets/vfx/`, `/assets/ui/`

You MUST:
- Create new `.js` files in correct folders
- Generate supporting components (UI, core, data) **if clearly required** by the screen's logic
- Add temporary placeholder UI using `PIXI.Text`, `PIXI.Graphics`, etc.
