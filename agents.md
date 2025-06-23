# AGENT PROFILE: PixiJS Telegram Mini Apps Game

## PURPOSE

This project is a fully modular and scalable boilerplate for creating swipe-based idle-tycoon games on Telegram Mini App using:
- PixiJS (rendering engine)
- TailwindCSS (UI layout and DOM overlays)
- Vite (dev server and bundler)
- FSM-based screen navigation
- Optional AI Dev (Codex) integration

## DOCUMENTATION STRUCTURE (docs/)

- `0-vision.md` — основа всей игры (loop, ресурсы, мета)
- `1-tech-requirements-n-restrictions.md` — ограничения платформы
- `2-user-flow.md` — переходы между экранами
- `3-economics.md` — экономика и монетизация
- `screen-*.md` — описание каждого экрана, по одному файлу

-## WORKFLOW RULES

- Полное видение игры — в `docs/0-vision.md`, начинай с чтения именно этого файла, чтобы освежить память о продукте.

- Каждый `screen-*.md` содержит описание одного игрового экрана.
- Ты получаешь только один `.md`-файл за раз — не делай предположений про другие.
- Не трогай `index.html`, `vite.config.js` и окружение.
- Перед реализацией всегда анализируй UI Elements и Logic отдельно.
- Никогда не генерируй ассеты — используй заглушки (`PIXI.Text`, прямоугольники).

## GAME SCREENS

Each game screen is a separate class extending `PIXI.Container`, stored in `src/screens/`.

Screens are loaded via `StateManager.changeState(screenName)`.

## CODE ARCHITECTURE

| Folder           | Content Description                                     |
|------------------|----------------------------------------------------------|
| `/screens`       | Pixi containers representing game scenes                 |
| `/core`          | Utility modules: AssetLoader, SaveManager, TimerManager |
| `/ui`            | UI components (buttons, bars, overlays)                 |
| `/data`          | Config files for game logic (JS, not JSON)              |
| `/assets/sprites`| Static image assets (PNG, atlas, etc.)                 |

## RENDERING STRUCTURE

- Pixi canvas injected into `<div id="game-container">`
- DOM UI overlays in `<div id="ui-layer">` (Tailwind-driven)
- Only one screen (PIXI.Container) visible at a time

## CODING RULES FOR CODEX

- All game screens must extend `PIXI.Container`
- Use `app.ticker.add(...)` for per-frame updates
- All logic must work with `StateManager` transitions
- UI overlays must go to `#ui-layer` unless explicitly Pixi-based
- Use JS modules (`export class`, `import ... from ...`)
- Avoid writing to DOM directly — prefer Pixi or Tailwind UI

## FILE STRUCTURE EXTENSION RULES

You are allowed to extend the project structure **only if**:

- The new feature or screen is described in a `docs/screen-*.md` file
- You are explicitly asked to implement the logic or screen based on that file
- You follow the current folder layout: all new screens go to `src/screens/`, shared logic to `src/core/`, UI to `src/ui/`, configs to `src/data/`

You MUST NOT:
- Move existing files or folders
- Restructure the architecture
- Add any dependencies or global styles

You MAY:
- Create new `.js` files in correct folders
- Generate supporting components (UI, core, data) **if clearly required** by the screen's logic
- Add temporary placeholder UI using `PIXI.Text`, `PIXI.Graphics`, etc.

ALWAYS assume that:
- You don’t need to ask where to place files — use the existing pattern
- If something is unclear — follow the structure of current .js files

## INIT COMMAND
