# Planet Destroyer – User Flow (High-Level)

Игрок взаимодействует с игрой через 6 основных экранов, между которыми перемещается по нижней навигационной панели. Все экраны переключаются через FSM (stateManager), каждый экран — самостоятельный контейнер (`PIXI.Container`).

## Start Point

- Игрок начинает на экране **Planet Field**
- Тут он свайпает, разрушает планеты, собирает ресурсы

---

## Navigation Structure (FSM level)

**Fixed bottom nav bar (4 иконки)**:
- Arsenal (→ ArsenalLab screen)
- Upgrades (→ Upgrades screen)
- Dispatch (→ DispatchCenter screen)
- Wheel (→ FortuneWheel screen)

**Top-right optional icon**:
- Fake Leaderboard (→ Leaderboard screen)

---

## User Flow Overview

```mermaid
graph LR
  A[Planet Field] --> B[ArsenalLab]
  A --> C[Upgrades]
  A --> D[DispatchCenter]
  A --> E[FortuneWheel]
  A --> F[Leaderboard]
  
##  Screen Access Rules
Screen	Entry	Exit (Back)	Notes
Planet Field	Start screen	-	Каноничный root
ArsenalLab	bottom nav: Arsenal	Return button	Craft logic, queue system
Upgrades	bottom nav: Upgrades	Return button	Passive permanent boosts
DispatchCenter	bottom nav: Dispatch	Return button	Active/Completed harvest timers
FortuneWheel	bottom nav: Wheel	Return button	Ad-gated spin logic
Leaderboard	top-right icon	Return button	Fake leaderboard, motivational-only UI

## Flow Notes

- Игрок возвращается на Planet Field после любого экрана (одноуровневая глубина)

- Навигация жёстко FSM-контролируемая — не через DOM, а через stateManager.changeState(screenName)

- UI state должен всегда сбрасываться при входе в экран (fresh render)

- PlanetField — единственный экран со свайпами, таймерами, боем и добычей