# feature-news-modal.md

## 1. Feature Summary
News Modal is a dynamic, admin-controlled panel used for player-facing updates, partner banners, and LiveOps announcements. It appears once per session after the Daily Bonus and is swipeable with auto-advance rotation.

---

## 2. UX Integration
- Triggered on session start (after Daily Bonus)
- Modal overlay with full width banners
- Manual navigation: swipe left/right
- Auto-rotation: every 5 seconds
- Clickable banners → open deeplinks (TG channels, events, store)

---

## 3. Banner Logic
- Banners are managed remotely via Admin Panel
- Each banner contains:
  - Image asset (URL)
  - Action: link | store tab | modal
  - Priority & visibility window

- Banner carousel layout:
  - Max 5 active at once
  - Older banners rotate out

---

## 4. Data Schema

ts
interface NewsBanner {
  id: string
  imageUrl: string
  action: 'link' | 'openStoreTab' | 'modal'
  payload: string // e.g. URL, tabId, modalId
  startsAt: number
  endsAt: number
  priority: number
}

5. Admin Controls
- CMS-like editor for:
  - Uploading new banners
  - Setting publish/unpublish windows
  - Assigning actions
- Preview environment required
- Live sync every 5 minutes via CDN or backend polling

6. Visual Feedback
- Auto-advance timer bar (bottom)
- Swipe gesture + haptic feedback
- Tap = open action immediately
- “X” to close — cannot be reopened in same session

7. Edge Cases
- No valid banners = modal skipped
- Expired asset = fallback to default
- Link fails (e.g. deep link blocked) → open fallback modal

8. Related Features
- feature-daily-bonus.md
- feature-store.md
- feature-liveops-ops.md (TBD)
- feature-analytics.md
