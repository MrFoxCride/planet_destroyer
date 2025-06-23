# Planet Destroyer – Technical Requirements and Restrictions

## Target Platform

- **Telegram Mini App (TMA)**
- Vertical orientation
- Online-only
- No external scrolls or multi-tab navigation

## Device Support

- Mobile-first
- Supported screen sizes: 360×640 to 414×896 px
- Must scale to full screen without overflow or scroll

## Rendering Engine

- **PixiJS (v7)** with WebGL fallback
- Canvas embedded in `#game-container`
- UI overlays through TailwindCSS in `#ui-layer`

## Performance Constraints

- ≤60 draw calls per screen
- ≤10MB memory load per session (target)
- Use texture atlases where possible

## Controls

- **Swipe left/right only**
  - Horizontal swipe to navigate planets
- **Tap**
  - To attack, craft, collect, spin
- **Long press**
  - For advanced interactions (optional)
- **No drag/drop**
- **No vertical scroll**

## Audio

- SFX only (short, lightweight)
- No background music
- AudioContext must be gated behind user interaction (for autoplay rules)

## Persistence

- **localStorage** fallback
- **Telegram WebApp Cloud Storage API** (preferred, if authenticated)
- State must resume seamlessly after reload or reconnect

## Session Management

- Real-time timers (for units, crafting)
- Auto-resume timers on reconnect
- Offline time calculation must be correct on restore

## Networking

- Must support:
  - Ad calls (for rewarded videos)
  - IAP initiation via Telegram API
- Online connection is mandatory

## Integration Points

- **Rewarded Ads (ad network or placeholder)**
- **Telegram IAP via BotFather**
- **Fake leaderboard with local simulation**
- Future optional: Telegram bot message hooks

## File/Asset Constraints

- All image assets must be optimized (webp/png)
- Use texture atlases where possible
- Avoid large standalone audio files

## Project Stack

- Vite (dev/build tool)
- PixiJS (canvas logic)
- Tailwind (UI overlays)
- Codex (AI-assist logic insert)
- GitHub (repo hosting)
- Telegram WebApp (platform runtime)