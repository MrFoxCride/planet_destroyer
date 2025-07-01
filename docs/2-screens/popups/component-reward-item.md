# component-reward-item.md

## 1. Component Summary
Reward Item is a reusable UI component for displaying a currency or item reward (icon + amount). It appears in most reward popups, quest blocks, wheel outcomes, and booster modals.

---

## 2. Usage Contexts
- All `popup-reward-*.md`
- `modal-quest-block.md` (quest reward preview)
- `popup-event-outcome.md`
- `modal-ad-reward-prompt.md`
- Wheel of Fortune result summary

---

## 3. Layout Structure
### 3.1. Visual Layout
- Horizontal or grid-aligned unit:
  - Icon (left-aligned)
  - Amount (right or under icon)
  - Optional label

### 3.2. Data Binding
- Props:
  - `type: 'dust' | 'core' | 'magmaton' | 'usdt' | 'ticket' | 'booster' | 'cosmetic'`
  - `amount: number`
  - `label?: string`

---

## 4. Behavior & UX Logic
- Icons mapped to static assets or icon registry
- Amount formatting:
  - Dust/Core → comma-separated integers
  - USDT → `$X.XX`
- Tooltip on hover or long-press (mobile): “Used for X”

---

## 5. Visual Feedback
- Entry: fade-in or staggered pop-in
- Amount pulses if reward ≥ threshold (context-defined)
- Optional glow border on rare rewards

---

## 6. Analytics & Logging
(Not tracked individually — only wrapped in parent modal events)

---

## 7. Dependencies
- Used by: all overlays with rewards
- Pulled into React/PIXI render trees as subcomponent
