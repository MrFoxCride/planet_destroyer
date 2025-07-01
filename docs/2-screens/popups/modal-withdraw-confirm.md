# modal-withdraw-confirm.md

## 1. Modal Summary
Withdraw Confirm Modal appears when the player initiates a USDT withdrawal from the Profile screen. It summarizes the amount, wallet binding status, and confirms the irreversible action.

---

## 2. Trigger Sources
- Tap “Withdraw” button in `screen-profile.md` (if balance ≥ $40)
- Triggered via: `OverlayManager.open('Withdraw', { amount })`

---

## 3. Layout Structure
### 3.1. Modal Container
- Centered modal (medium size)
- Z-layer: 300
- Locks background input

### 3.2. Content Elements
- **USDT Amount**
  - Bold: “Withdraw $X.XX?”
- **Wallet Status**
  - If bound → “Telegram Wallet connected”
  - If not bound → warning: “You must bind your wallet first”
- **Warning Text**
  - “Withdrawals are final and cannot be reversed”
- **CTA Buttons**
  - [Confirm Withdraw] → triggers WalletService.withdraw()
  - [Cancel] → closes modal

---

## 4. Behavior & UX Logic
- [Confirm Withdraw] enabled only if:
  - Wallet is bound (`WalletService.isBound() = true`)
  - USDT balance ≥ minimum threshold
- On success:
  - Close modal
  - Show toast: “Withdrawal initiated”
  - Mark session state as “pendingWithdraw”
- On failure:
  - Stay open, show error message
- Android Back or tap outside = close modal

---

## 5. Visual Feedback
- Entry: fade-in + scale-up
- Amount pulses once
- Warning in red font
- Button loading spinner during async call

---

## 6. Analytics & Logging
- Event: `modal.withdraw.open`
- Event: `withdraw.attempt`
  - Payload:
    - `amount: number`
    - `success: boolean`
    - `walletBound: boolean`
    - `sessionId`, `timestamp`

---

## 7. Dependencies
- WalletService
- OverlayManager
- GameStateStore
- EventLogger
