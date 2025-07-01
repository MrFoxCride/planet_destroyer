# feature-profile.md

## 1. Feature Summary
Profile screen is the player’s identity and account hub. It shows nickname, VIP status, wallet binding, and USDT withdraw button. It acts as the control center for user-level metadata and real-world monetization access.

---

## 2. UX Integration
- Access: Bottom nav tab “Profile”
- Always visible, static position in nav
- Layout sections:
  1. Nickname and avatar (editable in future)
  2. VIP badge + progress to next level
  3. USDT Wallet block:
     - Wallet binding
     - Withdraw button
     - $40 cap text (or $20 if VIP10)
  4. Referral code + Invite button

---

## 3. Withdraw Logic
- USDT balance shown (from Vault)
- Button: “Withdraw to Telegram Wallet”
- States:
  - Disabled (balance < $40 or wallet not bound)
  - Enabled (ready to withdraw)
- After click:
  - Opens Telegram Wallet via deep link
  - Shows confirmation modal

- VIP10 benefit:
  - Cap lowered from $40 → $20
  - Text updates dynamically

---

## 4. Data Schema

ts
interface ProfileState {
  nickname: string
  vipLevel: number
  totalMagmatonSpent: number
  usdtBalance: number
  telegramWalletBound: boolean
}

5. Visual Feedback
- VIP badge = glowing with animated tier ring
- USDT block:
  - Progress bar to cap
  - Tooltip: “Bind wallet to withdraw”
- Error modal if Telegram Wallet is not linked
- Withdraw success = popup + confetti

6. Edge Cases
- Wallet not connected → prompt bind modal
- Withdraw < cap → button greyed out
- Failed withdraw (network) → retry popup
- VIP level drops (dev/debug) → cap reverts to $40

7. Related Features
- feature-vip-system.md
- feature-usdt-nebula.md
- feature-referral-system.md
- 6-1-currency-flow.md
