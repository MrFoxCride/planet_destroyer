# screen-dispatch-center.md

## Summary
Dispatch Center manages unit crafting and queue progress. It lists all unit types and lets the player craft new ones using Dust.

## Layout
- Scrollable list of units from `src/data/units.js`.
- Each card shows icon, name, cost, level and a **Craft** button.
- Active crafting shows a horizontal timer bar.
- Up to three crafts may run simultaneously.

## Logic
- Buttons call `GameStateStore.startUnitCraft()`.
- Progress restores after reload via `SaveManager`.
- Completion shows a popup and adds the unit to inventory.
- Back button returns to previous screen.
