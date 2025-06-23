# AGENT PROFILE: Planet Destroyer – PixiJS TMA Game Template

## PURPOSE

This project is a fully modular and scalable boilerplate for creating swipe-based idle-tycoon games on Telegram Mini App using:
- PixiJS (rendering engine)
- TailwindCSS (UI layout and DOM overlays)
- Vite (dev server and bundler)
- FSM-based screen navigation
- Optional AI Dev (Codex) integration

- Полное видение игры — в `docs/0-vision.md`, начинай с чтения именно этого файла, чтобы освежить память о продукте.

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

## INIT COMMAND
