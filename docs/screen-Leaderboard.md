# Screen – Leaderboard

## 1. Description

Фейковый лидерборд без реального мультиплеера. Показывает игрока среди сгенерированных пользователей с похожими параметрами. Используется для мотивации: игрок видит, как "обгоняет" других и поднимается в рейтинге.

---

## 2. UX/Game Design

- Вертикальный список игроков:
  - Username
  - Аватар
  - Ранг
  - Ключевой параметр (например, Dust или Destroyed Planets)
- Игрок всегда находится ближе к топ-3, но чуть ниже
- При обгоне → появляется popup "You Beat [Name]!"
- Без вкладок, фильтров, свайпов — чисто визуальный экран

---

## 3. UI Elements

### 3.1. Leaderboard Entry (Fake Player)
- Аватар (пресет)
- Username (генерируется: `NovaRunner23`, `CosmoBlitz`)
- Rank #
- Стат: `Total Dust` или `Planets Destroyed`
- Элемент пульсирует, если игрок близко к обгону

### 3.2. Player Highlight Entry
- Статус `"You"` или имя игрока (если настроено)
- Отображается всегда
- Подсвечен (рамка, glow)
- Обновляется в реальном времени

### 3.3. "You Beat [X]!" Popup
- Всплывающее сообщение
- Показывает кого игрок обогнал
- Анимация появления → исчезновения

### 3.4. Stat Selector (optional)
- Dropdown: `Total Dust`, `Planets Destroyed`, `Artifacts Collected`
- По умолчанию — `Planets Destroyed`

### 3.5. Return Button
- `"Return to Field"`
- FSM-переход в `PlanetField`

---

## 4. Entities & Logic

### 4.1. Leaderboard Entry Model
- `username: string`
- `avatarId: string`
- `rank: number`
- `statValue: number`
- `isPlayer: boolean`

### 4.2. Player Placement Logic
- Игрок помещается:
  - либо ровно под топ-3,
  - либо в центр (позиция 7/15 и т.п.)
- Статистика фейков синхронизируется по кривой:
  - `value = playerStat × randomMultiplier (0.9–1.1)`
- После каждого существенного прогресса игрок "обгоняет" кого-то

### 4.3. Motivation Sync
- Фейк-игроки адаптируются под текущий прогресс
- `toast` появляется при обгоне
- Без экономических эффектов

---

## 5. Events (Triggers)

| Событие               | Действие                                      |
|------------------------|-----------------------------------------------|
| `progressUpdate()`     | Проверка — не обогнал ли игрок кого-то        |
| `showToast(name)`      | Показ `You Beat [Name]!`                      |
| `changeStat(metric)`   | Переключение метрики (если dropdown активен) |
| `returnClick()`        | FSM → PlanetField                             |

---

## 6. Notes

- Нет сохранения leaderboard — он процедурно генерируется при каждом заходе
- Для стабильности можно фиксировать порядок рангов в локальном кэше (session-based)
- Можно расширить до социальных функций в будущем