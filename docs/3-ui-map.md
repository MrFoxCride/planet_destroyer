# 3. UI Map – Planet Destroyer

## Global Navigation
### Bottom NavBar (always visible, fixed order)
- **[Profile]** → opens Profile screen
- **[Store]** → opens Store screen
- **[MainScreen]** *(center button)* → primary gameplay
- **[Earn]** → opens QuestHub screen
- **[Friends]** → opens Referral screen

---

## Entry Flow
### On Launch:
1. Trigger: Daily Bonus Modal → [Dismiss]
2. Then: News Modal → [Dismiss]
3. Then: Landing on **MainScreen** (default central screen)

---

## MainScreen
### General Layout:
- Central visual of current entity (planet / nebula / colony)
- Entity name displayed top-center (auto-generated unique name based on ID)
- Currency HUD (Cosmic Dust, Core, Magmaton, USDT)
- Weapons Panel:
  - Toggleable dropdown showing all equipped weapons
  - Each shows current ammo count
  - If ammo = 0 → trigger modal:
    - “Buy more ammo?”
    - Buttons: [To Arsenal] / [Cancel]
- Bonus buttons (e.g., Watch Ad → Reward)
- Wheel of Fortune button
- Galaxy Map button

### Context: Active Entity Mode
- **Planet**:
  - HP bar visible
  - Core becomes extractable after full destruction
  - After break: dispatch prompt
- **Nebula**:
  - High-HP, VFX-rich target
  - Rewards USDT
- **Colony**:
  - Passive Dust generator
  - Upkeep indicator
  - Reigns event trigger zone (icon shown if pending)

---

## GalaxyMap Screen
- Visually structured galactic map
- Galaxy is divided into **irregular sectors** by visible borders
- Each sector displays:
  - Entity markers (planets, colonies, nebulae) with tapable icons
- Tapping an entity:
  - Loads it into MainScreen

---

## Profile Screen
- Player nickname (Telegram-linked)
- VIP level (1–10)
- Withdrawable USDT balance
- Withdraw button
  - Disabled until $40 reached
  - Static helper text: “Minimum withdrawal amount is $40”
- Telegram Wallet binding / status
- Visual perks: title, avatar frame, glow, cosmetics

---

## Store Screen
- Tabs:
  - **Weapons** – weapon cards + upgrade buttons
  - **Ammo** – ammo packs purchasable via Dust or Magmaton
  - **Boosters** – timed % effects
  - **Currencies** – Magmaton packs
  - **VIP** – VIP tier unlocks
- Purchase interactions:
  - Direct purchase
  - Daily ad-redeemed items

---

## Earn (QuestHub) Screen
- Sectioned layout (no horizontal tabs)
- Static blocks (in fixed vertical order):
  1. Onboarding quests
  2. Daily quests
  3. Referral quests
  4. Telegram Premium quests
  5. Achievements
- Each block:
  - Quest list with progress
  - Claim buttons per completed quest

---

## Friends (Referral) Screen
- Display: Invite tree
- Rewards earned from referrals
- Total invites count
- Premium referrals highlighted
- Invite via deep Telegram link
- Hidden debug gesture trigger (corners)

---

## Modal / Overlay Screens
### Reigns Event Modal
- Card-by-card swipe navigation
- Each event = sequence of 5–10 decision points
- Cards include:
  - Prompt text
  - Icons (consequence preview)
  - Swipe left/right to respond

### Daily Bonus Modal
- 7-day track
- One reward/day
- Appears if not claimed today

### News Modal
- Auto-pops after Daily Bonus
- Horizontal swipeable banners
- Each banner:
  - Clickable
  - Auto-scrolls every 5 seconds
  - Manual swipe resets timer

### Reward Popups
*All separate overlays, unique logic per trigger*
- **Dispatch return**
- **Weapon unlock**
- **Weapon upgrade**
- **Colony passive income claim**
- **Quest complete (all types)**
- **Referral milestone**
- **Nebula destruction (USDT earned)**
- **Achievement unlocked**
- **Daily login reward**
- **Wheel of Fortune prize**

### Wheel of Fortune Modal
- Visual spinner
- Mechanics:
  - 1 free ticket every 4 real hours (countdown pauses after issuance)
  - 5 total extra tickets daily via ads (2 ads per ticket)
  - Tickets also purchasable with Magmaton
- Reward pool includes:
  - Dust
  - Cores
  - Ammo
  - Boosters
  - Cosmetic-only items
