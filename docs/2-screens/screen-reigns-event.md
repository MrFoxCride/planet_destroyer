# screen-reigns-event.md

## 1. Screen Summary
Reigns Event Screen is a decision-driven narrative interface that presents players with interactive event chains. Each event is a multi-step scenario with binary swipe choices (left/right), influencing rewards, penalties, and future world state.

---

## 2. Entry Point
- Triggered from:
  - Expeditions
  - Colonies (events or invasions)
  - Random passive Reigns calls
- Cannot be accessed manually

---

## 3. Layout Structure
### Center Card (core interaction)
- Large card with:
  - Character/avatar illustration
  - Short event text (1–2 sentences)
  - Optional: animated effect (e.g. shaking, flicker)
- Swipe Left: Choice A → label shown as arrow tooltip
- Swipe Right: Choice B → label shown as arrow tooltip

### HUD Overlay
- Top-left: Event chain step counter (e.g. 3/7)
- Top-right: Close button (if cancel allowed — debug only)
- Bottom: Event title, optional progress bar

---

## 4. Event Structure

- One event = multi-step decision chain (5–10 cards)
- Each decision updates state (internally):
  - Flags set
  - Outcome weight shifted
  - Event progression path rerouted

### Example Event: Alien Negotiation
ts
{
  eventId: 'alien_peace',
  steps: 6,
  decisions: [
    { text: "Aliens hail your colony", left: "Ignore", right: "Respond" },
    { ... }
  ],
  outcomes: [
    "Win: Gain Core + Colony boost",
    "Lose: Colony loses HP"
  ]
}

5. Visual Feedback
- Swipe direction → highlights choice briefly
- Card slides off + new card slides in
- Background animates slightly per card (color, theme)
- End of event:
  - Reward / penalty modal
  - Fade-out + return to origin screen

6. Result Logic
- Outcome depends on:
  - Player decisions (flags)
  - Colony or expedition state
  - Random factors (weighted)
- All outcomes are terminal:
  - Reward → add resources
  - Penalty → HP loss, delay, missed reward

7. Edge Cases
- Session interrupted mid-event → resumes from step
- Forced exit (via debug) → discard event
- Repeated same event → alternate path available

8. Linked Features
- feature-reigns-events.md
- feature-colony-system.md
- 6-2-economy-balance.md
