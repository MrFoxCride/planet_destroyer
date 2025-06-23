# Screen – DispatchCenter

## 1. Description

Экран управления юнитами, отправленными на добычу ресурсов с разрушенных планет. Игрок отслеживает активные и завершённые миссии, собирает Cosmic Dust и при желании ускоряет процесс за Magmaton.

---

## 2. UX/Game Design

- Список всех активных и завершённых миссий
- Каждая миссия:
  - Связана с конкретной планетой
  - Имеет юнита, таймер и награду
- По завершении — появляется кнопка `Collect`
- Возможно ускорение миссии за Magmaton
- Фильтры: All / Active / Ready (опционально)
- Вверху — счётчик активных юнитов (например, `4/8 Active`)
- Внизу — `Return to Field` кнопка

---

## 3. UI Elements

### 3.1. Dispatch Row (на каждую миссию)
- Планета (иконка/миниатюра)
- Тип юнита (Robot, Ship, Station, UFO)
- Оставшееся время (таймер)
- Ожидаемая награда (Dust range)
- Цветовая кодировка:
  - Активная (синий)
  - Готова к сбору (зелёный)

### 3.2. Collect Button (если таймер = 0)
- Заменяет таймер
- Нажатие:
  - Удаляет миссию
  - Переводит Dust в баланс
  - Запускает анимацию `+X Dust`

### 3.3. Speed-Up Button (если таймер > 0)
- Кнопка справа от таймера
- Отображает цену в Magmaton
- Завершает миссию немедленно

### 3.4. Filter Bar (optional)
- Tabs: All / Active / Ready
- Упрощает поиск завершённых
- Подсветка `Ready`, если есть не собранные

### 3.5. Units in Field HUD
- Верх экрана
- Пример: `3 Units Active / 8 Max`
- Статичная или диаграмма
- Помогает контролировать лимит миссий

### 3.6. Return Button
- Внизу
- `"Return to Field"` — возвращает в PlanetField

---

## 4. Entities & Logic

### 4.1. Dispatch Mission Model
- `planetId: string`
- `unitType: 'robot' | 'ship' | 'station' | 'ufo'`
- `startTime: timestamp`
- `endTime: timestamp`
- `rewardRange: [min, max]`
- `status: active | ready`
- `magmatonSkipCost: number`

### 4.2. Reward Calculation
baseYield × unitMultiplier × planetMultiplier × upgrades


### 4.3. Timer System
- Реальные timestamp'ы
- После reload/resume → пересчёт оставшегося времени
- В Codex: реализуется через `Date.now()` diff

---

## 5. Events (Triggers)

| Событие           | Действие                                    |
|--------------------|---------------------------------------------|
| `collectClick(id)` | Dust → баланс, удаление миссии              |
| `speedUpClick(id)` | Проверка Magmaton → досрочное завершение    |
| `filterClick(type)`| Отображение нужной группы миссий            |
| `returnClick()`    | FSM → `PlanetField`                         |

---

## 6. Notes

- Миссии после сбора должны удаляться (или архивироваться в будущем)
- Планета, связанная с миссией, не должна исчезать до завершения добычи
- Юнитов нельзя отправить повторно на ту же планету
- Расчёт награды и таймера должен работать одинаково онлайн/оффлайн