# screen-settings.md

## 1. Screen Summary
Settings Screen provides access to global configuration, user preferences, legal info, and diagnostics. It is not part of the main progression loop, but necessary for transparency, compliance, and power-user control.

---

## 2. Entry Point
- Accessed via:
  - Gear icon on `screen-main.md` (top-right)
  - Optional footer in `screen-profile.md`
- Only accessible during non-modal state

---

## 3. Layout Structure
### Section 1: User Preferences
- Language Selector (dropdown)
- Sound: [Toggle]
- Music: [Toggle]
- Haptics: [Toggle]

### Section 2: Account & Data
- Clear local cache [Button]
- Log out [Button]
- Player ID display (read-only)
- Environment: Prod / Dev (dev builds only)

### Section 3: Legal
- Privacy Policy [Opens link]
- Terms of Service [Opens link]
- Version info: build number, client version

### Section 4: DevTools (dev-only builds)
- Enable Debug Panel [Toggle]
- Enable Analytics Logging [Toggle]
- Reset Progress [Button]
- Log Events Viewer [Opens modal]

---

## 4. Visual Feedback
- Toggles: smooth slide
- Buttons: ripple effect
- Legal links open in external browser or modal (TMA-safe)
- Version string = small text footer

---

## 5. Data Schema

ts
interface SettingsState {
  language: string
  sound: boolean
  music: boolean
  haptics: boolean
  debugEnabled: boolean
  analyticsLogging: boolean
}

6. Edge Cases
- Clear cache → triggers confirmation
- Log out → restarts WebApp session
- Dev toggles hidden in prod
- Language resets on clear

7. Linked Features
- feature-debug-panel.md
- feature-analytics.md
- 1-1-tech-requirements-n-restrictions.md
- localization.md
