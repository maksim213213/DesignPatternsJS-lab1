## Design Patterns JS Lab 1 - Shapes


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
```

## Формат входного файла

Файл `data/shapes.txt` содержит описание фигур в следующем формате:

### Треугольник
```
TRIANGLE x1 y1 x2 y2 x3 y3
```

### Пирамида
```
PYRAMID x1 y1 z1 x2 y2 z2 x3 y3 z3 x4 y4 z4 apex_x apex_y apex_z
```

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