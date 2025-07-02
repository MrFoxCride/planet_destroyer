# tab-units.md

Second tab of the Arsenal screen focused on unit management.

## UI Elements
- List of available units from `src/data/units.js` rendered via `UnitCard`.
- Craft queue with timers for units in production.
- Buttons to start crafting new units (uses `CreateUnitButton`).
- Active dispatch list with timers and claim buttons.

## Logic
- Calls `GameStateStore.startUnitCraft()` to craft units.
- Calls `GameStateStore.startDispatch()` to send a unit to the selected planet.
- Progress persists via `SaveManager`.
- Replaces the functionality of the old Dispatch Center screen.
