# Feature List – Planet Destroyer

## 1. Core Gameplay

### 1.1. Planet Interaction
- Swipe-to-select next planet (within current sector)
- Each planet = unique HP, core, and possible decision path
- Player chooses: Destroy or Colonize at start of interaction
- Destruction via weapons
- Core revealed after full destruction (not destructible by weapon)

### 1.2. Weapon System
- Weapons have limited ammo
- Ammo can be bought using Cosmic Dust or Magmaton
- Craft new weapons (using Dust)
- Weapon tiers and upgrades
- Every 10th level requires Core to upgrade (soft progression wall)
- Visual VFX upgrade every 10th tier

### 1.3. Resource System
- Currencies:
  - Cosmic Dust: soft currency (instant reward from destruction)
  - Core: extracted from planet core by units only
  - Magmaton: hard currency (IAP or super rarely rewarded)
  - USDT: real currency, obtained only via Nebula events
- Each has distinct sink and acquisition method

---

## 2. Meta Progression

### 2.1. Dispatch System
- Units: extractors, drones, scouts
- Used to extract Cores (not Dust)
- Timer-based missions
- Unit upgrades: efficiency, cooldown, yield
- Per-planet limitation per session

### 2.2. Colony System
- Chosen instead of destruction at interaction start
- Passive Dust generation (slow)
- Requires upkeep (Tamagotchi-like)
- Periodic Reigns-like event chains from colonies
- Upgrades: income rate, event frequency, colony HP

### 2.3. Galaxy Map
- Sector-based meta map
- Each sector contains planets and possibly a Nebula
- Selecting any entity → loads MainScreen for interaction
- Fog-of-War reveals new sectors over progression

---

## 3. Reigns System

### 3.1. Event Engine
- Triggered by colony, dispatch, time, or planet attributes
- Each event = chain of 5–10 decision points
- Branching narrative with persistent effects
- Effects: resource changes, state changes, unit unlocks

### 3.2. Input Model
- Interaction: swipe left/right for binary decision
- Optionally: tap to reveal info or expand choice detail

---

## 4. Economic & Monetization Systems

### 4.1. Magmaton System
- Hard currency
- Gained via IAP or super rare in-game rewards
- Uses: skip timers, booster packs, premium items

### 4.2. Boosters
- Time-limited bonuses
- Types:
  - Dust income boost
  - Colony yield boost
  - Weapon damage multiplier
- Acquired via Magmaton or ad-watching

### 4.3. VIP Progression
- 10 levels
- Benefits: auto-harvest, no ads, visual cosmetics
- Progressed via payment or high engagement
- Displayed in Profile screen

---

## 5. Referral System

### 5.1. Invite System
- Telegram-native deep link invites
- Bonus boost if invitee has Telegram Premium
- Rewards increase with invite count

### 5.2. Referral Overview
- Tree of all referred users
- Passive earnings from their activity
- Tracked via Friends screen

---

## 6. USDT Nebula

### 6.1. Access
- Appears on Galaxy Map among planets
- May be spawned once per day by watching 5 rewarded ads
- Each Nebula must be destroyed like a planet (with weapons)
- Behaves like high-HP target with VFX-rich response

### 6.2. Rewards
- Grants USDT upon destruction
- Initial USDT yield high
- Decreases across 30 play days (≈80–100 sessions)

### 6.3. Withdraw
- Only possible after reaching $40 USDT
- Requires Telegram Wallet binding
- Withdraw action via Profile screen

---

## 7. UI Systems

### 7.1. MainScreen
- Central screen for interacting with selected entity (planet/nebula/colony)
- Displays:
  - Entity in center
  - Resource HUD
  - Weapon panel
  - Bonus buttons (e.g., watch ad for reward)
  - Wheel of Fortune
  - Galaxy Map button

### 7.2. Navigation Panel
- Always visible bottom bar with fixed order:
  - Profile | Store | MainScreen (center) | Earn | Friends
- MainScreen button styled as central planet orb
- Navigates between key screens

### 7.3. Overlays
- Modal layers for temporary interactions:
  - News
  - Daily Bonus
  - Reward popups
  - Reigns event windows
- Z-layer hierarchy enforced

---

## 8. LiveOps Systems

### 8.1. Quest System
- Grouped by type in Earn screen:
  - Onboarding
  - Daily
  - Referral
  - Telegram Premium
  - Achievements
- Each group has unique claim logic and conditions

### 8.2. Timed Events
- Global conditions (e.g., “Double Core Week”)
- Delivered via LiveOps config
- Visual: event banners, overlays
- Effects: drop multipliers, booster chances

---

## 9. Dev & Ops

### 9.1. Debug Panel
- Triggered by pressing opposite screen corners (Friends screen) for 8 sec
- Includes:
  - Log toggles
  - Instant resource grant
  - Nav override

### 9.2. Analytics
- Events batched with session throttling
- Format: `logEvent(namespace, action, payload)`
- Includes: sessionId, playerId, eventVersion, deviceId
