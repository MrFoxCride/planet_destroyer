# tab-weapons.md

Default tab inside the Arsenal screen. Shows owned and purchasable weapons.

## UI Elements
- List of `WeaponCard` components.
- Each card shows icon, name, damage and a select/buy action.
- Ammo refill buttons may appear here in future.

## Logic
- Uses data from `WeaponSystem`.
- Selecting a weapon updates `weaponSystem.weapon`.
