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
  - Save/load player state
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

## GAME SCREENS
Each game screen is a separate class extending `PIXI.Container`, stored in `src/screens/`.
Screens are loaded via `StateManager.changeState(screenName)`.

## NAVIGATION MODEL
- Core screen logic uses FSM via `StateManager.changeState()`
- Visual navigation bar at bottom (tab-style) triggers FSM transitions
- All screen transitions must use `goTo(screen, params?)` and `goBack()` for history
- Do NOT use native routing libraries (React Router, TabNavigator)
- Popups, modals, overlays must render via `#ui-layer` (React or Pixi Z-layer)
- Overlays must be dismissible, state must be tracked separately from FSM


## CODE ARCHITECTURE
| Folder           | Content Description                                     |
|------------------|----------------------------------------------------------|
| `/screens`       | Pixi containers representing game scenes                 |
| `/core`          | Utility modules: AssetLoader, SaveManager, TimerManager |
| `/ui`            | UI components (buttons, bars, overlays)                 |
| `/data`          | Config files for game logic (JS, not JSON)              |
| `/assets/sprites`| Static image assets (PNG, atlas, etc.)                 |

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

## DEBUG MODE
Codex must include a `DevPanel.tsx` React component when generating projects or core screens.
This component must include debug cheats: Add Dust, Skip Ads, Unlock Screens, Force Nebula.
All debug elements must be wrapped in `if (!isProd)` conditions.

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
