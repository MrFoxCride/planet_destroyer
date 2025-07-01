# modal-quest-block.md

## 1. Modal Summary
Quest Block Modal is a shared collapsible UI component used inside the Earn (QuestHub) screen. Each block groups quests of a specific type (daily, onboarding, referral, etc.) and can be expanded or collapsed by the user.

---

## 2. Trigger Sources
- Always visible inside `screen-earn.md`
- Each quest group rendered as an instance of this modal component
- Optional scroll-to opened group when navigating via highlight (FTUE)

---

## 3. Layout Structure
### 3.1. Collapsible Block Container
- Rounded rectangular panel with border
- Static header row (always visible)
- Expandable content list (animated height)

### 3.2. Header Elements
- **Icon**: group icon (e.g., star, rocket, referral)
- **Title**: group name (e.g., "Daily Quests")
- **Progress Summary**: X/Y quests complete
- **Expand/Collapse Toggle**: arrow icon

### 3.3. Expanded Content
- Vertical list of quests (see `Quest` entity)
  - Title
  - Progress bar
  - Reward preview
  - [Claim] button (if complete)

---

## 4. Behavior & UX Logic
- First visit: All blocks expanded by default
- Toggle:
  - Tap header row → expands/collapses with smooth animation
  - Only one block may be expanded at a time (accordion logic)
- Claimed quests fade out or slide up
- Group highlight logic for FTUE:
  - If `QuestSystem.getGroup(group).some(q => !q.claimed)` → auto-expand on entry

---

## 5. Visual Feedback
- Expand animation: height tween + fade-in
- Collapse animation: height shrink + fade-out
- Claim button glow if quest complete
- Red notification dot on header if unclaimed quests exist

---

## 6. Analytics & Logging
- Event: `modal.questBlock.toggle`
  - Payload:
    - `group: string`
    - `expanded: boolean`
- Event: `quest.claim`
  - Triggered per quest ID (see `QuestSystem.claim`)

---

## 7. Dependencies
- Data: `QuestSystem.getGroup(type)`
- OverlayManager (optional if pulled out), GameStateStore, EventLogger
