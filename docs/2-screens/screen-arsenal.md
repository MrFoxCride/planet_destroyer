# screen-arsenal.md

Arsenal is the combined management hub for all equipment. It replaces the old Dispatch Center screen.

## Layout
- Top title "Arsenal".
- Two horizontal tabs: **Weapons** and **Units**.
- The active tab content scrolls vertically.

## Navigation
- Entry point via the bottom Navbar button "Arsenal".
- `stateManager.goTo('Arsenal')` loads this screen.
- Back button returns to previous screen.

## Tabs
- See `tab-weapons.md` and `tab-units.md` for details.
- Units tab also displays all active dispatch missions and allows sending units to the selected planet.
