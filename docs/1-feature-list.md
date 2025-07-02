Planet Destroyer — Feature Tree (Full Granularity)
/-- 1. Core Gameplay
|   /-- 1.1. Cluster Map & Navigation
|   |   /-- 1.1.1. Procedural galaxy generation
|   |   /-- 1.1.2. Clusters (nodes) — data model
|   |   /-- 1.1.3. Hypercorridor connectivity (edges)
|   |   /-- 1.1.4. Progression logic (sequential, manual, gating)
|   |   /-- 1.1.5. Cluster states: Locked / Unlocked / Cleared / Event Hub
|   |   /-- 1.1.6. Visualization: cluster icon, markers, connections
|   |   /-- 1.1.7. Auto-jump logic after clearing cluster
|   /-- 1.2. Destructible Entities
|   |   /-- 1.2.1. Asteroids
|   |   |   /-- 1.2.1.1. Spin speed/rotation logic
|   |   |   /-- 1.2.1.2. Core placement/visibility (currency type)
|   |   |   /-- 1.2.1.3. HP, reward curve, scaling
|   |   |   /-- 1.2.1.4. VFX: explosion, hit, break
|   |   /-- 1.2.2. Wrecks
|   |   |   /-- 1.2.2.1. Special properties: random event trigger
|   |   |   /-- 1.2.2.2. Rare core (Core, Magmaton, artifact chance)
|   |   |   /-- 1.2.2.3. HP, physics, unique VFX
|   |   /-- 1.2.3. Stations/Comets/Debris
|   |   |   /-- 1.2.3.1. Visual variety, rare bonuses
|   |   |   /-- 1.2.3.2. Linked event pool (mini-boss, anomaly)
|   |   |   /-- 1.2.3.3. Custom destruction sequence
|   /-- 1.3. Core Loop
|   |   /-- 1.3.1. Tap/click to fire weapon
|   |   /-- 1.3.2. Projectile flight/impact calculation
|   |   /-- 1.3.3. Physics (hit, explosion, shake)
|   |   /-- 1.3.4. Core overlap check (reward currency)
|   |   /-- 1.3.5. Reward: instant Dust/Cores/Magmaton
|   |   /-- 1.3.6. Auto-fire/automation integration
|   |   /-- 1.3.7. Escalating HP, reduction of AoE per cluster
|   |   /-- 1.3.8. Soft-lock (forced upgrade, time-to-destroy > N sec)
|   /-- 1.4. Reigns-style Events
|   |   /-- 1.4.1. Event generator per cluster (guaranteed 1, random 2nd)
|   |   /-- 1.4.2. Event pool: survivors, anomalies, worm, UFO, artifact
|   |   /-- 1.4.3. UI: modal/card, swipe, visual icons
|   |   /-- 1.4.4. Choices: binary, context-dependent
|   |   /-- 1.4.5. Persistent outcomes: reward, penalty, unlock
|   |   /-- 1.4.6. Event history, log per player, effect stacking
|   /-- 1.5. Endgame: Galaxy Packaging
|   |   /-- 1.5.1. Black Hole node: access unlock logic
|   |   /-- 1.5.2. “Packaging” sequence (Cinematic, input phase)
|   |   /-- 1.5.3. Aggregation: merging all active colonies, perks, boosters
|   |   /-- 1.5.4. Legendary Colony/Hyperstructure creation
|   |   /-- 1.5.5. Archive: record of galaxy, stats, meta-bonus assignment
|   |   /-- 1.5.6. Transition logic to new galaxy (prestige cycle, new params)
|
/-- 2. Meta & Progression
|   /-- 2.1. Colonies
|   |   /-- 2.1.1. Discovery logic: planet eligibility, rarity, gating
|   |   /-- 2.1.2. Creation: user input, initial state, UI flow
|   |   /-- 2.1.3. Upgrades: level curve, cost scaling, VFX
|   |   /-- 2.1.4. Automation unlock (auto-income, auto-upkeep)
|   |   /-- 2.1.5. Passive yield: Dust/hour, Cores (rare), meta-bonus
|   |   /-- 2.1.6. Upkeep mechanic: required visits, decay, penalty
|   |   /-- 2.1.7. Buffs: income%, stability, event frequency
|   |   /-- 2.1.8. Booster/vip-stabilization
|   |   /-- 2.1.9. Visual state: healthy, decaying, boosted
|   |   /-- 2.1.10. Colony archive/history after packaging
|   /-- 2.2. Legendary Colony System (Endgame Artifact)
|   |   /-- 2.2.1. Artifact generation per galaxy cycle
|   |   /-- 2.2.2. Meta-bonus calculation: permanent yield, unlocks
|   |   /-- 2.2.3. Visual gallery: customization, prestige skins
|   |   /-- 2.2.4. Cumulative stats: total yield, legacy, history
|   /-- 2.3. Passive Artifacts & Perks
|   |   /-- 2.3.1. Artifact slot unlocks, gating
|   |   /-- 2.3.2. Artifact types: yield, automation, event bonus, visual
|   |   /-- 2.3.3. Leveling: upgrade path, cost scaling
|   |   /-- 2.3.4. Unlock methods: event, achievement, purchase
|   /-- 2.4. Automation Layer
|   |   /-- 2.4.1. Core-loop: auto-fire, speed, power
|   |   /-- 2.4.2. Colony: auto-income, auto-upkeep, decay reduction
|   |   /-- 2.4.3. Booster activation/auto-redeem
|   |   /-- 2.4.4. Upgrade mechanics: permanent, temporary, stackable
|
/-- 3. Weapons & Boosters
|   /-- 3.1. Weapon System
|   |   /-- 3.1.1. Weapon types: basic, penetrator, AoE, chain, splitter, missile, turret
|   |   /-- 3.1.2. Upgrade path: damage, radius, fire rate, unique effect per type
|   |   /-- 3.1.3. Tier progression: cost, milestone, VFX update
|   |   /-- 3.1.4. Ammo system: resource cost, refill UI, shortage triggers
|   |   /-- 3.1.5. Visuals: icon, animation, VFX for each tier/type
|   |   /-- 3.1.6. Integration: auto-fire, boosters, artifact synergy
|   /-- 3.2. Boosters
|   |   /-- 3.2.1. Types: x2 damage, auto-clear, income+, dispatch speed, anti-decay
|   |   /-- 3.2.2. Acquisition: Wheel, event, shop, reward ad
|   |   /-- 3.2.3. Duration: 1h, 24h, stackable, permanent
|   |   /-- 3.2.4. UI: activation, timer, expiry, notification
|   |   /-- 3.2.5. Upgrade path: extend duration, effect, unlock via meta
|   /-- 3.3. Wheel of Fortune
|   |   /-- 3.3.1. Spinner UI: modal, animation, input, tactile feedback
|   |   /-- 3.3.2. Reward pool: Dust, Cores, Ammo, Booster, Magmaton, Cosmetic, Empty
|   |   /-- 3.3.3. Ticket logic: free/ads/premium, cooldown, cap
|   |   /-- 3.3.4. Pool tuning: limits per day, rare drop logic
|   |   /-- 3.3.5. Prize popup, auto-claim, sound, VFX
|
/-- 4. Economy & Currency
|   /-- 4.1. Currencies
|   |   /-- 4.1.1. Dust (soft): earning, spending, overflow, decay
|   |   /-- 4.1.2. Cores (rare): earning, milestone, sink
|   |   /-- 4.1.3. Magmaton (hard): IAP, shop, booster, special event, ticket
|   |   /-- 4.1.4. USDT (withdraw): Nebula, milestone, Wheel, withdrawal, KYC
|   /-- 4.2. Inputs
|   |   /-- 4.2.1. Destruction rewards (cluster, entity, event)
|   |   /-- 4.2.2. Colonies (idle)
|   |   /-- 4.2.3. Boosters, Wheel, quest, referral, achievement, store
|   |   /-- 4.2.4. Ads (rewarded, daily, event)
|   /-- 4.3. Outputs
|   |   /-- 4.3.1. Weapon upgrades, boosters, ammo, customizations
|   |   /-- 4.3.2. Colony upgrade, upkeep, automation, artifact
|   |   /-- 4.3.3. Wheel spins, event unlocks, skip timers
|   |   /-- 4.3.4. Overflow burn, decay, soft/hard cap, meta-upgrade
|   /-- 4.4. Scaling & Locks
|   |   /-- 4.4.1. Exponential curve, hard milestone lock (core/tier)
|   |   /-- 4.4.2. Soft-lock: yield reduction, slow-down, decay triggers
|   |   /-- 4.4.3. Currency conversion, cap expansion (via meta/VIP)
|
/-- 5. Monetization
|   /-- 5.1. IAP
|   |   /-- 5.1.1. Magmaton packs: price, limits, purchase flow
|   |   /-- 5.1.2. Boosters, bundles, custom offers
|   |   /-- 5.1.3. Cosmetics (skins, frames, HUD themes)
|   |   /-- 5.1.4. VIP system: tiers, progression, benefits, cost
|   /-- 5.2. Rewarded Ads
|   |   /-- 5.2.1. Wheel, boosters, Nebula (10 per spawn)
|   |   /-- 5.2.2. Ad-cap logic, anti-abuse, cooldowns
|   |   /-- 5.2.3. UI, reward, fallback for ad failure
|   /-- 5.3. USDT
|   |   /-- 5.3.1. Earn logic: Nebula, milestones, wheel (ultra-rare)
|   |   /-- 5.3.2. Withdrawal: minimum, KYC, UI flow
|   |   /-- 5.3.3. Decay table, limits, daily/monthly caps
|
/-- 6. Social & Referral
|   /-- 6.1. Referral Tree
|   |   /-- 6.1.1. Deep link generator, Telegram integration
|   |   /-- 6.1.2. Invite flow, UI, referral counter
|   |   /-- 6.1.3. Rewards: Dust, Magmaton, bonus pool, cap
|   |   /-- 6.1.4. Premium invite detection, highlight, bonuses
|   /-- 6.2. Fake-leaderboard
|   |   /-- 6.2.1. Loop: 10-min reset, top-N visual, reward logic
|   |   /-- 6.2.2. UI: modal, highlight, notification
|   |   /-- 6.2.3. Push/FOMO triggers, reward triggers
|   /-- 6.3. Friends
|   |   /-- 6.3.1. Overview tree, reward collection, progress milestones
|   |   /-- 6.3.2. Premium status, milestone, notification, debug entry
|
/-- 7. LiveOps & Events
|   /-- 7.1. USDT Nebula
|   |   /-- 7.1.1. Spawn logic: event pool, cap, ad-trigger
|   |   /-- 7.1.2. Entity: HP, reward, VFX, decay
|   |   /-- 7.1.3. Reward flow: USDT grant, min/max, anti-abuse
|   |   /-- 7.1.4. UI: spawn animation, reward, withdrawal, history
|   /-- 7.2. Timed Events
|   |   /-- 7.2.1. Config: event schedule, type, duration, trigger
|   |   /-- 7.2.2. Multipliers: drop, booster, income, custom
|   |   /-- 7.2.3. Banner overlays, notification, claim logic
|   /-- 7.3. Quest System
|   |   /-- 7.3.1. Onboarding quest chain: triggers, reward, claim UI
|   |   /-- 7.3.2. Daily, referral, achievement, TG Premium
|   |   /-- 7.3.3. Progression, claim, notification
|   /-- 7.4. News Feed
|   |   /-- 7.4.1. Banner modal: horizontal swipe, auto-scroll
|   |   /-- 7.4.2. Banner config: link, image, reward, CTA
|   |   /-- 7.4.3. Scheduling, content update, fallback
|
/-- 8. Customization & Cosmetics
|   /-- 8.1. Weapon Skins & Effects
|   |   /-- 8.1.1. Unlock logic: drop, IAP, event, quest
|   |   /-- 8.1.2. Preview UI, apply logic, collection
|   /-- 8.2. UI Themes & Avatars
|   |   /-- 8.2.1. Map themes, frames, profile, unlocks
|   |   /-- 8.2.2. Event themes, time-limited, animated themes
|   /-- 8.3. Achievements, Trophies, Gallery
|   |   /-- 8.3.1. Achievement types: core, meta, special, secret
|   |   /-- 8.3.2. Trophy room/gallery: view, stats, history, filter
|   |   /-- 8.3.3. Progression, reward, showcase UI
|
/-- 9. Tech, Tools & QA
|   /-- 9.1. DevPanel
|   |   /-- 9.1.1. Debug tools: resource grant, nav override
|   |   /-- 9.1.2. Cheats: unlock all, skip timers, test event
|   |   /-- 9.1.3. BuildFlags: enable/disable features
|   |   /-- 9.1.4. UI access: gesture, screen, console
|   /-- 9.2. Analytics & Telemetry
|   |   /-- 9.2.1. Event logging: core, economy, retention, error
|   |   /-- 9.2.2. Batching, throttling, eventVersion, payloads
|   |   /-- 9.2.3. Session/user tagging, device ID, log levels
|   /-- 9.3. Save System
|   |   /-- 9.3.1. Telegram Cloud, API, fallback logic
|   |   /-- 9.3.2. localStorage backup, sync, migration
|   |   /-- 9.3.3. Version control, restore, reset
|   /-- 9.4. Feature Flags & Experiments
|   |   /-- 9.4.1. Real-time toggles, AB-test groups, dev overrides
|   |   /-- 9.4.2. Integration with DevPanel
|   |   /-- 9.4.3. Rollout protocols, kill switch, forced disable
|   /-- 9.5. Asset & Animation Standards
|   |   /-- 9.5.1. Sprite/image standards: .webp, .png, spritesheet
|   |   /-- 9.5.2. Animation: idle/active/destroyed, VFX system
|   |   /-- 9.5.3. Manifest integration, Codex auto-gen
|   |   /-- 9.5.4. Folder structure, naming, auto-stub logic
|   /-- 9.6. FSM Navigation, Overlay Protocols
|   |   /-- 9.6.1. State stack, one-active-screen rule
|   |   /-- 9.6.2. Z-index rules, overlay/modal/alert types
|   |   /-- 9.6.3. Navigation fallback, error recovery
|
/-- 10. Out of Scope for Launch (Planned)
|   /-- 10.1. Deep Colony Strategy (Governance, Wars, Politics)
|   |   /-- 10.1.1. Colony law/policy, resource wars, diplomacy
|   |   /-- 10.1.2. Player-to-player governance, meta-events
|   /-- 10.2. PvP & Competitive Modes
|   |   /-- 10.2.1. PvP combat, leaderboard, live tournaments
|   |   /-- 10.2.2. Co-op modes, alliances, shared events
|   /-- 10.3. Nonlinear Galaxy, Alt-Routes, Multi-Galaxy Simultaneous Progression
|   |   /-- 10.3.1. Branching path generation, routing UI
|   |   /-- 10.3.2. Parallel universes, linked progression
|   /-- 10.4. Advanced LiveOps (Mini-seasons, Guilds, Co-op)
|   |   /-- 10.4.1. Seasonal content, weekly/monthly events
|   |   /-- 10.4.2. Guilds/clans: formation, chat, shared goals
|   |   /-- 10.4.3. Co-op mission, server-wide rewards, sync
