# modal-news.md

## 1. Modal Summary
The News Modal is a horizontal swipe-based banner carousel that auto-presents promotional or informational content after session start. It supports manual swipe, auto-scroll timer, and clickable banners for deep actions (Store, Wheel, etc.).

---

## 2. Trigger Sources
- Auto-triggered after Daily Bonus Modal (see `screen-main.md`)
- Manually triggered from News icon in HUD
- Also accessible via `OverlayManager.open('News', { z: 300 })`

---

## 3. Layout Structure
### 3.1. Overlay Container
- Full-width horizontal panel (80% screen height)
- Mounted in `#ui-layer` as modal with `z: 300`
- Semi-transparent background, swipeable content area

### 3.2. Banner Slider
- **Banner cards**: 320×180 (fixed ratio)
  - Image-only or image + title
  - Clickable area
- **Pagination Dots**: bottom-center
- **Close Button**: top-right corner

---

## 4. Behavior & UX Logic
- Supports:
  - Manual swipe (horizontal, 1 card per screen)
  - Auto-scroll every 5s
  - Auto-scroll pauses on user input
  - Resets to card 0 after full cycle
- Clicking a banner executes its `actionType`:
  - `store`, `wheel`, `profile`, `externalLink`, etc.
- Modal dismissed by:
  - Tap on [X]
  - Android Back Button
- If no banners available → auto-close

---

## 5. Visual Feedback
- Entry: fade-in + slide-up (300ms)
- Banners have glow-on-hover effect
- Active pagination dot enlarged
- Optional: bounce-in on first card

---

## 6. Analytics & Logging
- Event: `modal.news.open`
- Additional: `modal.news.click`
  - Payload:
    - `bannerId: string`
    - `actionType: string`
    - `sessionId`, `timestamp`

---

## 7. Dependencies
- Asset: `/assets/ui/news_banner_*.webp`
- Data: pulled from remote config or `NewsSystem.getBanners()`
- OverlayManager, EventLogger, NewsSystem
