# screen-profile.md

## 1. Screen Summary
Profile is the user identity and account-level control hub. It contains VIP status, wallet integration, USDT withdraw flow, and referral code. This screen is critical for managing progression context, monetization access, and social growth.

---

## 2. Entry Point
- Accessed via bottom nav bar
- Label: “Profile”
- Icon: silhouette or badge icon
- Always visible from all screens

---

## 3. Layout Structure
1. **Header Block**
   - Nickname (TG username or anonymized fallback)
   - Avatar (static for now, editable in future)

2. **VIP Block**
   - Current VIP level badge (glowing)
   - Progress bar to next level
   - “See benefits” button → opens full VIP list modal

3. **Wallet & Withdraw Block**
   - USDT balance: `$XX.XX`
   - Static info: “Withdraw available once ≥ $40”  
     - (VIP10: “≥ $20”)
   - Bind Wallet button (if not yet linked)
   - Withdraw button (enabled/disabled based on state)

4. **Referral Block**
   - Personal referral code + “Copy”
   - “Invite Friend” button (TG deep link)
   - Total earned from referrals: Dust / Core / Tickets

---

## 4. Wallet Integration Logic
- Bind wallet → launches Telegram Wallet flow
- Withdraw flow:
  - If balance ≥ cap → button active
  - Clicking → confirmation modal → deep link to withdraw

---

## 5. Data Schema

ts
interface ProfileState {
  nickname: string
  vipLevel: number
  usdtBalance: number
  telegramWalletBound: boolean
  referralCode: string
  totalReferralEarnings: CurrencyAmount
}

6. Visual Feedback
- VIP badge = glow with ring
- USDT balance: color-coded (green if withdrawable)
- Tooltip on disabled Withdraw: “Need $40 to withdraw” (or $20 for VIP10)
- “Copied!” toast when copying referral code
- Confetti + popup after successful withdrawal

7. Edge Cases
- Wallet not linked → Withdraw button hidden or greyed
- Balance < cap → button disabled, info tooltip visible
- Failed withdrawal → show retry modal
- Referral code reuse or spam → backend throttle

8. Linked Features
- feature-vip-system.md
- feature-usdt-nebula.md
- feature-referral-system.md
- 6-1-currency-flow.md
