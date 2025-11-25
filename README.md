# Design Patterns JS Lab 1 - Shapes

Приложение для работы с геометрическими фигурами (Треугольник и Пирамида) с использованием паттернов проектирования.

## Возможности

### Треугольник (2D)
- ✅ Вычисление площади
- ✅ Вычисление периметра
- ✅ Определение типа треугольника:
  - Прямоугольный
  - Равнобедренный
  - Равносторонний
  - Остроугольный
  - Тупоугольный
- ✅ Проверка, составляют ли точки валидный треугольник

### Пирамида (3D)
- ✅ Вычисление объема
- ✅ Вычисление площади поверхности
- ✅ Проверка, находится ли основание на координатной плоскости (XY, XZ, YZ)
- ✅ Расчет соотношения объемов при рассечении координатной плоскостью

## Архитектура проекта

```
src/
├── entities/           # Entity классы (без бизнес-логики)
│   ├── Point.ts        # Точка в 2D пространстве
│   ├── Point3D.ts      # Точка в 3D пространстве
│   ├── Triangle.ts     # Сущность Треугольник
│   ├── Pyramid.ts      # Сущность Пирамида
│   └── IShape.ts       # Интерфейс фигуры
├── factories/          # Factory Method
│   └── ShapeFactory.ts # Фабрика для создания фигур
├── validators/         # Валидаторы
│   ├── NumericValidator.ts
│   ├── PointValidator.ts
│   ├── Point3DValidator.ts
│   ├── TriangleValidator.ts
│   ├── PyramidValidator.ts
│   └── ValidationConstants.ts
├── exceptions/         # Пользовательские исключения
│   ├── InvalidShapeDataError.ts
│   ├── InvalidPointError.ts
│   └── FileReadError.ts
├── services/           # Бизнес-логика
│   ├── TriangleCalculationService.ts
│   ├── PyramidCalculationService.ts
│   └── ShapeFileReaderService.ts
├── utils/              # Утилиты
│   └── logger.ts       # Логгер (pino)
├── __tests__/          # Unit-тесты
│   ├── TriangleCalculationService.test.ts
│   ├── PyramidCalculationService.test.ts
│   ├── ShapeFactory.test.ts
│   └── Validators.test.ts
└── main.ts             # Точка входа приложения

data/
└── shapes.txt          # Файл с данными фигур

logs/
└── app.log             # Логи приложения
```

## Использованные паттерны проектирования

1. **Factory Method** - `ShapeFactory` для создания фигур с валидацией
2. **Strategy Pattern** - Различные валидаторы для разных типов данных
3. **Service Layer** - Разделение бизнес-логики от entity классов

## Требования

- Node.js >= 14
- npm >= 6

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Компиляция TypeScript
npm run build

# Запуск приложения
npm start

# Запуск в режиме разработки
npm run dev

# Запуск тестов
npm test

# Запуск тестов в режиме наблюдения
npm run test:watch

# Запуск тестов с покрытием
npm run test:coverage

# Проверка кодстайла
npm run lint

# Автоисправление кодстайла
npm run lint:fix
```

## Формат входного файла

Файл `data/shapes.txt` содержит описание фигур в следующем формате:

### Треугольник
```
TRIANGLE x1 y1 x2 y2 x3 y3
```
Пример:
```
TRIANGLE 0 0 3 0 0 4
```

### Пирамида
```
PYRAMID x1 y1 z1 x2 y2 z2 x3 y3 z3 x4 y4 z4 apex_x apex_y apex_z
```
Пример:
```
PYRAMID 0 0 0 4 0 0 4 3 0 0 3 0 2 1.5 3
```

**Примечания:**
- Основание пирамиды должно быть прямоугольником, параллельным одной из координатных плоскостей
- Вершина пирамиды должна быть на другой высоте, чем основание
- Некорректные строки будут пропущены с логированием ошибки

## Обработка ошибок

Приложение использует пользовательские исключения:
- `InvalidShapeDataError` - ошибка при создании фигуры
- `InvalidPointError` - ошибка валидации координат точки
- `FileReadError` - ошибка при чтении файла

Все ошибки логируются в консоль и в файл `logs/app.log`.

## Тестирование

Проект содержит 72 unit-теста с использованием Jest, покрывающих:
- Все методы вычисления (площадь, периметр, объем, поверхность)
- Все методы определения типов фигур
- Валидацию данных
- Обработку исключений

```bash
npm test

# Результат:
# Test Suites: 4 passed, 4 total
# Tests:       72 passed, 72 total
```

## Кодстайл

Проект использует ESLint с конфигурацией Airbnb TypeScript:
- TypeScript для статической типизации
- ES6 модули
- Строгие правила линтера
- Форматирование кода согласно конвенциям

## Логирование

Используется библиотека `pino` для логирования:
- Логи выводятся в консоль в читаемом формате
- Логи сохраняются в файл `logs/app.log` в JSON формате
- Уровни логирования: info, warn, error

## Примеры использования

```typescript
// Создание треугольника
const triangle = ShapeFactory.createTriangle('t1', '0 0 3 0 0 4');

// Вычисление параметров треугольника
const area = TriangleCalculationService.calculateArea(triangle);
const perimeter = TriangleCalculationService.calculatePerimeter(triangle);
const isRight = TriangleCalculationService.isRightAngled(triangle);

// Создание пирамиды
const pyramid = ShapeFactory.createPyramid('p1', '0 0 0 3 0 0 3 4 0 0 4 0 1.5 2 5');

// Вычисление параметров пирамиды
const volume = PyramidCalculationService.calculateVolume(pyramid);
const surfaceArea = PyramidCalculationService.calculateSurfaceArea(pyramid);
const isOnPlane = PyramidCalculationService.isBaseOnCoordinatePlane(pyramid);
```

## Автор

Разработано в соответствии с требованиями курса "Design Patterns JavaScript"

---

**Статус:** ✅ Все требования выполнены
- ✅ Entity классы без бизнес-логики
- ✅ Factory Method для создания фигур
- ✅ Валидаторы для входных данных
- ✅ Пользовательские исключения
- ✅ Логирование в консоль и файл
- ✅ Unit-тесты с Jest (72 теста)
- ✅ ESLint с Airbnb конфигом
- ✅ TypeScript строгая типизация
