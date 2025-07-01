## 1. Feature Summary
Reigns Events are swipe-based narrative sequences that present the player with moral, strategic, or humorous choices. Each event is composed of 5–10 sequential decisions, each affecting the game state: happiness, currencies, or triggering outcomes. Used in colonies, onboarding, and LiveOps.

---

## 2. UX Integration

- Triggered from:
  - Colony screen (as upkeep)
  - Global event (e.g. onboarding, quest)
  - LiveOps hooks
- Overlay modal UI
- Interaction: swipe left / swipe right
- Optional skip (dev only)

---

## 3. Gameplay Logic

### 3.1. Event Structure

ts
interface ReignsEvent {
  id: string
  stepIndex: number
  steps: ReignsEventStep[]
}

interface ReignsEventStep {
  prompt: string
  left: ReignsOutcome
  right: ReignsOutcome
}

interface ReignsOutcome {
  delta: Partial<Player['currencies']> | Colony modifiers
  trigger?: string // optional: unlock, redirect, modal
}

- Each step:
        1 text prompt
        2 choices (left/right) → fixed outcomes
- Steps are chained; state saved per player

3.2. Outcome Types
- Currency gain/loss: Dust, Core, Magmaton
- Happiness +/- for colony
- Special unlocks: achievement, trigger quests
- Visual-only outcomes (cosmetics, popup)

3.3. Resolution
- Event is complete after last step
- Triggers:
        Modal popup (e.g. “+2 Core”)
        Colony upkeep reset
        Event archive entry (if needed)
- Cannot be replayed unless manually reset

4. Content Types
- Types of events:
        Colony upkeep: political, ecological, social dilemmas
        Global onboarding: power fantasy, humor, fourth-wall
        Partnership events: brand integrations, themed arcs
- Scripting format:
        Stored as JSON or external YAML
        Tags for consequence weighting

5. Visual Feedback
- Card swipe left/right with bounce
- Backgrounds and icons per card
- Result shown briefly after each swipe
- Final card → reward popup

6. Edge Cases
- User exits mid-event → resume from stepIndex
- Same event re-triggered → ignore if resolved
- Invalid outcome key → fallback to “neutral”

7. Related Features
- feature-colony-system.md
- feature-quest-system.md
- feature-daily-bonus.md
