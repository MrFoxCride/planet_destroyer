# feature-weapon-system.md

## 1. Feature Summary
Weapon System governs all mechanics related to crafting, upgrading, equipping, and firing weapons. It directly affects damage output, progression pace, and interaction with Planet and Nebula entities. The system also controls ammo economy and visual tiering.

---

## 2. UX Integration
- Primary use: `MainScreen`
- Access points:
  - Weapon selector (dropdown panel)
  - Ammo counter (HUD)
  - “Out of Ammo” modal → leads to Store tab
- Indirect usage:
  - Weapon crafting and upgrades in `Store`
  - VIP auto-refill visible in `Profile`

---

## 3. Core Mechanics
### 3.1. Firing
- Select weapon → click/tap to fire
- Deals `damage` to current entity
- Consumes 1 ammo per shot
- Triggers:
  - Impact VFX
  - Entity HP bar update
  - Ammo count decrement

### 3.2. Ammo System
- Each weapon has:
  - `ammo`, `ammoMax`
- If ammo = 0:
  - Weapon becomes inactive
  - Modal appears: “Buy more ammo?”
    - Buttons: [To Store] / [Cancel]
- Ammo purchasable:
  - With Cosmic Dust (low)
  - With Magmaton (high)
- Auto-refill once/day for VIP level ≥ 7

### 3.3. Crafting
- New weapons unlock via Store
- Priced in Dust or mixed with Magmaton
- Each new tier unlocked only after upgrading current to level 10

### 3.4. Upgrade System
- Leveling from 1–∞
- Every 10th level requires Cores
- Dust cost increases exponentially
- Visual VFX upgraded at each 10th level (cosmetic-only)

---

## 4. Weapon Data Schema

ts
interface Weapon {
  id: string
  tier: number
  level: number
  damage: number
  ammo: number
  ammoMax: number
  cooldown: number
  owned: boolean
}

5. Progression Formula
- damage = base × (1.1 ^ level)
- Upgrade cost (Dust):
  - cost = 100 × level × tier
- Every 10th level:
  - Requires: +Core × tier
- Max ammo = 5 × tier + 5

6. Edge Cases
- Ammo = 0 and Store unavailable → block firing
- VIP active → auto-refill skips modal
- Entity already destroyed → ignore click
- VFX not loaded → fallback to default spark

7. Related Features
- feature-planet-interaction.md
- feature-store.md
- feature-vip-system.md
- feature-booster-system.md
