# 4. uml.md – System Architecture (UML-level abstraction)

//4.1. Core Entities & Data Models – Planet Destroyer (UML as TypeScript Interfaces)

export interface Entity {
  id: string
  type: 'planet' | 'nebula' | 'colony'
  name: string // auto-generated
  sectorId: string
  createdAt: number
  unlocked: boolean
}

export interface Planet extends Entity {
  hp: number
  coreExtractable: boolean
  destroyed: boolean
  weaponHits: number
  coreDispatchId?: string
}

export interface Nebula extends Entity {
  hp: number
  rewardAmountUSDT: number
  destroyed: boolean
  dailyDecayStage: number
}

export interface Colony extends Entity {
  dustIncomePerHour: number
  happiness: number
  activeEventId?: string
  upkeepLevel: number
  lastCollectionAt: number
}

export interface Sector {
  id: string
  unlocked: boolean
  position: { x: number; y: number }
  entities: string[] // Entity IDs
}

export interface Weapon {
  id: string
  tier: number
  level: number
  damage: number
  ammo: number
  ammoMax: number
  cooldown: number
  owned: boolean
}

export interface Unit {
  id: string
  type: 'extractor' | 'scout' | 'drone'
  level: number
  efficiency: number
  dispatchTime: number
  available: boolean
}

export interface Booster {
  id: string
  effect: 'dust' | 'damage' | 'colony'
  multiplier: number
  duration: number // in seconds
  active: boolean
  expiresAt?: number
}

export interface Player {
  id: string
  nickname: string
  vipLevel: number
  currencies: {
    dust: number
    core: number
    magmaton: number
    usdt: number
  }
  referrals: string[] // playerId[]
  weapons: Weapon[]
  units: Unit[]
  boosters: Booster[]
  galaxyMap: Sector[]
}

// 4.2. GameState & Persistence Layer – Planet Destroyer

// --- Save Schema Definition (persistent across sessions)

export interface SaveSchema {
  version: number
  player: Player
  entities: Record<string, Entity> // planets, colonies, nebulae
  weapons: Record<string, Weapon>
  units: Record<string, Unit>
  boosters: Record<string, Booster>
  sectors: Record<string, Sector>
  quests: QuestState
  vip: VIPState
  economy: EconomyState
  reigns: ReignsState
  dispatches: DispatchState
  featureFlags: Record<string, boolean>
  lastSessionAt: number
}

// --- GameStateStore (reactive layer, runtime-bound)

export class GameStateStore {
  static state: SaveSchema

  static get<T = any>(path: string): T
  static set(path: string, value: any): void
  static patch(partial: Partial<SaveSchema>): void
  static subscribe(path: string, cb: (val: any) => void): void
  static reset(): void
}

// --- SaveMigrator (versioning tool)

export class SaveMigrator {
  static migrate(oldSave: any): SaveSchema
  static currentVersion = 3
}

// --- SessionManager (cold start, timestamping)

export class SessionManager {
  static getSessionId(): string
  static markStart(): void
  static markEnd(): void
  static getUptime(): number
}

// 4.3. Systems & Engines – Planet Destroyer

// --- Weapon System: Craft, Fire, Upgrade, Ammo

export class WeaponSystem {
  static fire(weaponId: string, targetId: string): number // returns damage
  static upgrade(weaponId: string): void
  static refillAmmo(weaponId: string, currency: 'dust' | 'magmaton'): void
  static getAvailableWeapons(): Weapon[]
}

// --- Dispatch System: Core Extraction from Planet Cores

export class DispatchSystem {
  static dispatch(unitId: string, targetId: string): void
  static collectResult(dispatchId: string): CoreReward
  static getActiveDispatches(): DispatchInstance[]
}

export interface DispatchInstance {
  id: string
  unitId: string
  targetId: string
  startedAt: number
  duration: number
  doneAt: number
  status: 'pending' | 'completed' | 'collected'
}

export interface CoreReward {
  coreAmount: number
}

// --- Colony System: Passive Income + Reigns

export class ColonySystem {
  static collectDust(colonyId: string): number
  static upkeep(colonyId: string): void
  static triggerEvent(colonyId: string): string | null // returns eventId or null
}

// --- Reigns System: Events, Chains, Outcomes

export class ReignsSystem {
  static getEvent(eventId: string): ReignsEvent
  static progress(eventId: string, decision: 'left' | 'right'): void
  static isEventResolved(eventId: string): boolean
}

export interface ReignsEvent {
  id: string
  stepIndex: number
  steps: ReignsEventStep[]
}

export interface ReignsEventStep {
  prompt: string
  left: ReignsOutcome
  right: ReignsOutcome
}

export interface ReignsOutcome {
  delta: Partial<Player['currencies']>
  trigger?: string // e.g., unlock, redirect
}

// --- Booster System: Apply and Expire Effects

export class BoosterSystem {
  static activate(boosterId: string): void
  static expire(boosterId: string): void
  static getActive(): Booster[]
}

// --- Economy Engine: Soft Walls, Yield Scaling

export class EconomyEngine {
  static getWeaponUpgradeCost(tier: number, level: number): { dust: number; core?: number }
  static getNebulaReward(dayIndex: number): number // in USDT
  static getColonyIncome(colonyId: string): number
}

// 4.4. UI Architecture – Planet Destroyer

// --- Screen Manager: Navigation by FSM stack

export class ScreenManager {
  static goTo(screenId: ScreenId): void
  static goBack(): void
  static getCurrent(): ScreenId
  static stack: ScreenId[]
}

export type ScreenId =
  | 'MainScreen'
  | 'GalaxyMap'
  | 'Profile'
  | 'Store'
  | 'Earn'
  | 'Friends'

// --- Overlay Manager: Modals & Z-Layers

export class OverlayManager {
  static open(modalId: ModalId, payload?: any): void
  static close(modalId: ModalId): void
  static isOpen(modalId: ModalId): boolean
  static listOpen(): ModalId[]
}

export type ModalId =
  | 'DailyBonus'
  | 'News'
  | 'RewardPopup'
  | 'ReignsEvent'
  | 'WheelOfFortune'
  | 'AmmoPurchase'
  | 'Withdraw'
  | 'DebugPanel'

// --- Base UI Component (abstract reactive)

export abstract class UIComponentBase {
  abstract mount(root: HTMLElement): void
  abstract update(): void
  abstract destroy(): void
}

// --- HUD: Top-layer resource + event display

export class ResourceHUD {
  static setVisible(flag: boolean): void
  static updateResources(): void
  static blink(currency: keyof Player['currencies']): void
}

// --- Modal Registry: Attach logic to overlay IDs

export const ModalRegistry: Record<
  ModalId,
  {
    open: (payload?: any) => void
    close: () => void
    component: UIComponentBase
  }
>

// 4.5. Analytics & Dev – Planet Destroyer

// --- Event Logger: Core telemetry logic

export class EventLogger {
  static logEvent(
    namespace: string,
    action: string,
    payload?: Record<string, any>
  ): void

  static flush(): void // force-send buffered events
  static setThrottle(maxPerSession: number): void
  static enable(): void
  static disable(): void
}

// Example:
EventLogger.logEvent('dispatch', 'start', {
  unit: 'extractor',
  targetId: 'planet_982',
  dispatchId: 'dsp_2482',
})

// --- Session Metadata

export interface SessionMeta {
  sessionId: string
  playerId: string
  startTime: number
  deviceId: string
  version: string
}

// --- DevPanel (Overlay)

export class DebugPanel {
  static toggle(): void
  static isVisible(): boolean
  static enableCheats(): void
  static grantResources(): void
  static teleport(screenId: ScreenId): void
  static spawnNebula(): void
}

// --- Feature Flags

export const FeatureFlags: Record<string, boolean> = {
  'debug.force-weapon': false,
  'ui.dev-mode': false,
  'ads.fake-reward': true,
  'vip.enabled': true,
}

// --- DevMode Bootstrap

export class DevModeToggle {
  static init(): void // attach gesture unlock
  static isDev(): boolean
}

// 4.6. LiveOps Interfaces – Planet Destroyer

// --- Quest System

export class QuestSystem {
  static getAll(): Quest[]
  static getGroup(type: QuestGroup): Quest[]
  static claim(questId: string): void
  static refreshDailies(): void
}

export type QuestGroup = 'onboarding' | 'daily' | 'referral' | 'premium' | 'achievements'

export interface Quest {
  id: string
  type: QuestGroup
  title: string
  progress: number
  target: number
  reward: Partial<Player['currencies']>
  claimed: boolean
}

// --- Referral System

export class ReferralSystem {
  static getMyReferrals(): Referral[]
  static getEarnings(): number
  static inviteLink(): string
}

export interface Referral {
  playerId: string
  nickname: string
  isPremium: boolean
  earnings: number
}

// --- VIP System

export class VIPSystem {
  static getLevel(): number
  static getBenefits(level: number): string[]
  static upgrade(): void
  static isMax(): boolean
}

// --- Nebula Reward System

export class NebulaRewardSystem {
  static getTodayStatus(): {
    freeSpawnUsed: boolean
    adsWatched: number
    maxAdsPerDay: number
  }

  static canSpawn(): boolean
  static spawnByAd(): void
  static getRewardAmount(dayIndex: number): number // based on decay
  static markClaimed(): void
}

// --- Wallet Integration

export class WalletService {
  static isBound(): boolean
  static bind(): Promise<void>
  static getUSDT(): number
  static withdraw(): Promise<boolean> // returns success
  static getMinThreshold(): number // always $40
}

// 4.7. Infrastructure Integration – Planet Destroyer

// --- Telegram Binding

export class TelegramBinding {
  static getUserId(): string
  static getUsername(): string
  static isPremium(): boolean
  static getLanguage(): string
  static getAvatarUrl(): string
}

// --- Ads Service

export class AdsService {
  static isAvailable(): boolean
  static watchAd(purpose: AdPurpose): Promise<boolean> // resolves on completion
  static getRemaining(purpose: AdPurpose): number
}

export type AdPurpose =
  | 'wheel'
  | 'nebulaSpawn'
  | 'booster'
  | 'currencyReward'
  | 'dailyQuest'

// --- IAP Service

export class IAPService {
  static purchase(sku: IAPSku): Promise<IAPPurchaseResult>
  static getCatalog(): IAPSku[]
}

export interface IAPSku {
  id: string
  title: string
  description: string
  priceUSD: number
  rewards: Partial<Player['currencies']>
}

export interface IAPPurchaseResult {
  success: boolean
  transactionId: string
}

// --- Wallet API (Telegram)

export class WalletAPI {
  static connect(): Promise<boolean>
  static withdrawUSDT(amount: number): Promise<boolean>
  static getBalance(): Promise<number>
}

// --- Asset Loader

export class AssetLoader {
  static preloadCategory(name: AssetGroup): void
  static unload(name: AssetGroup): void
  static isLoaded(name: AssetGroup): boolean
  static loadSprite(id: string): Promise<HTMLImageElement>
}

export type AssetGroup =
  | 'MainScreen'
  | 'Weapons'
  | 'FX'
  | 'Colony'
  | 'Nebula'
  | 'UI'
  | 'Reigns'
