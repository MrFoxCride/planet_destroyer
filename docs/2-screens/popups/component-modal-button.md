# component-modal-button.md

## 1. Component Summary
Modal Button is a shared UI element used across all modals and overlays for CTA actions. It supports states (default, disabled, loading), icons, and optional sublabels. Used to standardize interaction affordances across UI.

---

## 2. Usage Contexts
- Reward popups ([OK], [Go Spend], [Withdraw], etc.)
- Confirmation modals (Unlock Sector, Withdraw Confirm)
- VIP modals ([Upgrade VIP], [See Benefits])
- Ad prompts ([Watch Ad], [Cancel])
- Store and wheel buttons

---

## 3. Layout Structure
### 3.1. Visual Composition
- Rectangular button with:
  - Icon (optional, left side)
  - Label text (centered)
  - Subtext (optional, under label)
  - State feedback (loading spinner, disabled opacity)

### 3.2. Props
- `label: string`
- `onClick: () => void`
- `icon?: IconId`
- `subtext?: string`
- `disabled?: boolean`
- `loading?: boolean`
- `style?: 'primary' | 'secondary' | 'destructive'`

---

## 4. Behavior & UX Logic
- Click triggers `onClick`, debounced
- Loading state blocks re-entry
- Disabled state shown as greyed-out with no interaction
- Tooltip shown if disabled with reason (e.g., “Not enough Dust”)

---

## 5. Visual Feedback
- Press-in shrink animation
- Glow pulse on primary CTAs
- Spinner shown in place of icon during loading
- Style variants:
  - Primary: bold color (green/blue)
  - Secondary: neutral background
  - Destructive: red tone (for irreversible actions)

---

## 6. Analytics & Logging
(Not tracked here; wrapped in parent interaction events)

---

## 7. Dependencies
- Global UI style tokens
- Used in: all modal layouts (`OverlayManager` layer)
