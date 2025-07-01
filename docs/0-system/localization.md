# localization.md

## 1. Feature Summary
Localization system handles multilingual text, dynamic formatting, currency display, and internationalization (i18n) across all UI and narrative layers. It ensures full support for Telegram Mini App users across multiple language regions with fallback resilience and dynamic switching.

---

## 2. Supported Languages

ts
[
  "en", // English (default)
  "ru", // Russian
  "es", // Spanish
  "pt", // Portuguese
  "tr", // Turkish
  "id", // Indonesian
  "de", // German
  "fr"  // French
]

- Telegram WebApp automatically detects preferred language via initDataUnsafe.user.language_code.
- Users can override language in screen-settings.md.

3. Language Switching Logic
- First load:
  - Uses Telegram language (if supported)
  - Else → fallback to en
- Manual override:
  - Stored in localStorage.lang
  - Used until manually reset
- Fallback chain: userLang → en → MISSING_KEY marker

4. Translation Key Format

{
  "screen.profile.title": "Your Profile",
  "quest.daily.collect_dust.title": "Collect Cosmic Dust",
  "reward.core.popup": "You received {coreCount} Core!"
}

- Dot-notation key format: namespace.component.element
- All dynamic insertions must use named placeholders {var}

5. File Structure & Storage

/lang/
  en.json
  ru.json
  es.json
  ...

- Each file = flat key-value JSON
- Managed via Google Sheet → exported to Git via Codex
- Auto-validated for key parity (no missing keys)

6. Runtime API

function t(key: string, variables?: Record<string, string | number>): string
    t('reward.core.popup', { coreCount: 3 }) → “You received 3 Core!”
    Throws warning if key not found

7. Pluralization Rules
- Pluralized keys follow:

{
  "invite.friend": {
    "one": "Invite 1 friend",
    "other": "Invite {count} friends"
  }
}

- Resolved via Intl.PluralRules internally
- Supports zero, one, few, many, other (CLDR)

8. Currency Formatting
- Dust/Core → use short unit symbols
- USDT/Magmaton → always show $ prefix
- Localized currency display available for future expansion

9. RTL Support
- Currently not supported (no Arabic/Hebrew planned)
- Text rendering locked to LTR layout
- Future toggle possible in layout engine

10. Linked Features
- screen-settings.md
- screen-profile.md
- feature-quest-system.md
- feature-reigns-events.md
