# 0. Vision – Planet Destroyer

## 0.1. Game Summary
Planet Destroyer is an infinite idle-tycoon with real-time dispatches, soft-strategic progression, and withdraw-to-earn mechanics. The player destroys planets to gather Cosmic Dust, sends units to extract rare Cores, expands across galactic sectors, and ultimately earns real-world USDT which can be withdrawn via Telegram Wallet. Built as a Telegram Mini App with swipe-based interaction, it's optimized for mobile-only vertical gameplay.

## 0.2. Core Fantasy
You are an anonymous force consuming the universe planet by planet, choosing whether to obliterate, exploit, or colonize each world. As you grow in power, you unlock deeper sectors, rare resources, and real monetary value from your destructive expansion.

## 0.3. Genre & Format
- **Genre**: Idle Tycoon with light strategy elements  
- **Format**: Telegram Mini App (TMA), vertical mobile-only  
- **UX**: Full-touch interface: swipe (left/right), tap, long tap  

## 0.4. Core Loop
1. Swipe right to find a new planet  
2. Attack using crafted weapons  
3. Gain Cosmic Dust instantly  
4. Dispatch units to extract Cores from the remaining planetary core  
5. Spend Dust on:  
   - Crafting new weapons  
   - Upgrading units, colonies, and tech  
   - Sending expeditions  
6. Unlock new planets and sectors  
7. Trigger Reigns-like events (narrative + decision-based impact)  
8. Receive passive income from colonies  
9. Receive daily USDT via Nebula events  
10. Repeat  

## 0.5. Key Systems
- **Swipe-to-Explore** — Tinder-like horizontal planet navigation  
- **Weapon Crafting** — Damage = progress. No weapon = soft-limit  
- **Unit Dispatch** — Extract resources by time-based idle mechanics  
- **Colony System** — Tamagotchi-like passive generators with upkeep  
- **Expedition System** — Event chains in Reigns-style interaction  
- **Sectors** — Map-based meta progression with fog-unlock logic  
- **Fake Leaderboard** — Motivational, referral-linked, no PvP  
- **USDT Nebula** — Real-money drops via daily timed & ad-gated events  

## 0.6. Currencies
- `Cosmic Dust` — main soft currency, used for all major actions  
- `Cores` — rare upgrade material, extracted only via units  
- `Magmaton` — hard currency (IAP/ad-based), used for speedups & skips  
- `USDT` — real currency, withdrawable only, earned via special drops  

## 0.7. Monetization
- Rewarded Ads — spins, speedups, daily Nebula access, bonuses  
- IAPs — Magmaton packs, resource bundles, automation kits  
- Time-limited Offers — weapon deals, colony boosts, etc.  
- Subscription (TBD) — VIP status, auto-harvest, exclusive visuals  

## 0.8. Progression Drivers
- Weapon level & tier  
- Unit type, level, and efficiency  
- Sector depth (planet rarity, HP, yield)  
- Colony upgrades and survival  
- Event outcomes (positive/negative)  
- Referral tree (rewards scale with invited players)  

## 0.9. Win Condition
There is no final win. The player aims to reach higher sector yield, build passive income from colonies, and unlock consistent USDT flow.

## 0.10. Technical Platform
- Platform: Telegram Mini App  
- Engine: PixiJS (WebGL), Tailwind overlay  
- Storage: Telegram WebApp Cloud API + localStorage fallback  
- Input: Swipe (horizontal), tap, long tap  
- Ads: SDK or mock wrappers for rewarded flow  
- IAP: Telegram Pay API  
- Orientation: Vertical 9:16 only  

## 0.11. Session Structure
- **Short sessions (1–3 min)** — check timers, collect, trigger events  
- **Mid sessions (3–10 min)** — spin wheel, upgrade, clear multiple planets  
- **Long sessions (10+ min)** — expedition runs, Reigns-like chains, colony care  

## 0.12. Target Audience
- Male/female, 18–35, mobile-native  
- Telegram-heavy users, crypto-literate or reward-seeking  
- Fans of idle games, resource games, clickers, passive income fantasies  
- Similar product affinities: Hamster Kombat, Digger, Reigns, AFK Journey  

## 0.13. Unique Selling Points
- Swipe-to-destroy core loop  
- 4-layer economy with real-world exit (USDT)  
- Reigns-style decision events tied to progression  
- Tamagotchi-colony meta that requires strategic upkeep  
- Fully Telegram-native gameplay, no install, no updates  

## 0.14. Risks & Mitigations
- **Exploit Risk** — USDT farm-bots → solved by cooldowns, decay, referral validation  
- **User Burnout** — Overwhelm by colony micromanagement → auto-tools, subscriptions  
- **Revenue Unsustainability** — Poor ARPU vs USDT outflow → gated nebula, ad-thresholds  

## 0.15. References
- *Planet Destroyer: Idle Game* (UX pacing)  
- *Reigns* (event structure)  
- *Digger: Pirate Adventures* (dispatch & reward)  
- *Eve Online* (unit taxonomy inspiration)  
- *Lords Mobile* (VIP system & visual density)  
