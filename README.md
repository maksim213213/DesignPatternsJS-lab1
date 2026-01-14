## Design Patterns JS Lab 1 - Shapes

Комплексное TypeScript приложение, демонстрирующее множественные паттерны проектирования для управления геометрическими фигурами и контроля доступа к файлам.

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

## Реализованные паттерны проектирования

Этот проект демонстрирует следующие паттерны проектирования:

- **Repository Pattern** - Для хранения и управления геометрическими фигурами
- **Specification Pattern** - Для запросов фигур со сложными критериями
- **Comparator Pattern** - Для сортировки фигур по различным атрибутам
- **Observer Pattern** - Для автоматических обновлений при изменении фигур
- **Singleton Pattern** - Для хранилища метрик Warehouse
- **Proxy Pattern** - Для безопасного контроля доступа к файлам
- **Command Pattern** - Для отменяемых операций с файлами

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

## Основные возможности

### Репозиторий фигур

Хранение и управление геометрическими фигурами с расширенными возможностями запросов:

```typescript
// Создание репозитория и хранилища
const repository = new ShapeRepository();
const warehouse = Warehouse.getInstance();
repository.attach(warehouse);

// Добавление фигур
const triangle = ShapeFactory.createTriangle('t1', '0 0 3 0 0 4');
repository.add(triangle);

// Поиск фигур
const triangles = repository.findBySpecification(new ShapeByNameSpecification('Triangle'));
const firstQuadrantShapes = repository.findBySpecification(new ShapeInFirstQuadrantSpecification());

// Сортировка фигур
const sortedById = repository.sort(new ShapeIdComparator());
const sortedByName = repository.sort(new ShapeNameComparator());
```

### Спецификации фигур

Запрос фигур с использованием различных критериев:

```typescript
// Поиск по имени
const triangles = repository.findBySpecification(new ShapeByNameSpecification('Triangle'));

// Поиск фигур в первой четверти
const firstQuadrant = repository.findBySpecification(new ShapeInFirstQuadrantSpecification());

// Поиск по диапазону площади
const areaRange = repository.findBySpecification(new ShapeAreaInRangeSpecification(1, 10));

// Поиск по расстоянию от начала координат
const distanceRange = repository.findBySpecification(new ShapeDistanceFromOriginInRangeSpecification(0, 5));
```

### Компараторы фигур

Сортировка фигур по различным атрибутам:

```typescript
// Сортировка по ID
const byId = repository.sort(new ShapeIdComparator());

// Сортировка по имени
const byName = repository.sort(new ShapeNameComparator());

// Сортировка по координате X первой точки
const byX = repository.sort(new ShapeFirstPointXComparator());

// Сортировка по координате Y первой точки
const byY = repository.sort(new ShapeFirstPointYComparator());
```

### Warehouse (Observer + Singleton)

Автоматическое отслеживание метрик фигур:

```typescript
// Получение метрик для фигуры
const metrics = warehouse.getMetrics('triangle_1');
console.log(`Площадь: ${metrics.area}, Периметр: ${metrics.perimeter}`);

// Получение всех метрик
const allMetrics = warehouse.getAllMetrics();
```

## Управление доступом к файлам

### Proxy Pattern - Безопасный доступ к файлам

Контроль доступа к файлам с ролевыми разрешениями:

```typescript
// Создание прокси сервиса файлов
const fileService = new FileServiceProxy();

// Определение пользователей
const admin: User = { id: 'admin', role: 'admin' };
const user: User = { id: 'user', role: 'user' };
const guest: User = { id: 'guest', role: 'guest' };

// Установка разрешений
fileService.setPermission({
  userId: 'admin',
  filePath: './data/file.txt',
  canRead: true,
  canWrite: true,
  canDelete: true
});

// Выполнение операций (с контролем доступа)
const content = fileService.readFile('./data/file.txt', admin);
fileService.writeFile('./data/file.txt', 'новое содержимое', user);
fileService.deleteFile('./data/file.txt', admin);
```

### Command Pattern - Операции с отменой

Выполнение операций с файлами с возможностью отмены:

```typescript
// Создание исполнителя команд
const invoker = new CommandInvoker();

// Создание команд
const writeCmd = new WriteFileCommand(fileService, './data/file.txt', 'Hello World', admin);
const readCmd = new ReadFileCommand(fileService, './data/file.txt', admin);
const deleteCmd = new DeleteFileCommand(fileService, './data/file.txt', admin);

// Выполнение команд
invoker.executeCommand(writeCmd);
invoker.executeCommand(readCmd);
invoker.executeCommand(deleteCmd);

// Отмена операций
invoker.undoLastCommand(); // Восстанавливает удаленный файл
invoker.undoLastCommand(); // Отменяет операцию записи

// Проверка истории команд
const history = invoker.getHistory();
```

## Примеры использования

### Базовые операции с фигурами

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

### Полный пример рабочего процесса

```typescript
// Инициализация репозитория и хранилища
const repository = new ShapeRepository();
const warehouse = Warehouse.getInstance();
repository.attach(warehouse);

// Загрузка фигур из файла
const result = ShapeFileReaderService.readTrianglesFromFile('./data/shapes.txt');

// Добавление фигур в репозиторий
result.triangles.forEach(triangle => repository.add(triangle));
result.pyramids.forEach(pyramid => repository.add(pyramid));

// Запрос и сортировка фигур
const triangles = repository.findBySpecification(new ShapeByNameSpecification('Triangle'));
const sortedShapes = repository.sort(new ShapeIdComparator());

// Доступ к метрикам
triangles.forEach(triangle => {
  const metrics = warehouse.getMetrics(triangle.id);
  console.log(`Треугольник ${triangle.id}: Площадь=${metrics.area}, Периметр=${metrics.perimeter}`);
});

// Операции с файлами с безопасностью
const fileService = new FileServiceProxy();
const admin = { id: 'admin', role: 'admin' };

fileService.setPermission({
  userId: 'admin',
  filePath: './output/results.txt',
  canRead: true,
  canWrite: true,
  canDelete: true
});

const invoker = new CommandInvoker();
const writeCmd = new WriteFileCommand(fileService, './output/results.txt', 'Анализ завершен', admin);
invoker.executeCommand(writeCmd);
```

## Структура проекта

```
src/
├── commands/           # Реализация паттерна Command
├── entities/           # Сущности фигур (Triangle, Pyramid, etc.)
├── factories/          # Фабрика фигур
├── repositories/       # Реализация паттерна Repository
├── services/           # Сервисы вычислений и файловые сервисы
├── specifications/     # Паттерн Specification для запросов
├── utils/              # Компараторы, интерфейсы, наблюдатели
├── validators/         # Валидация входных данных
└── __tests__/          # Модульные тесты
```

## Тестирование

Проект включает комплексные модульные тесты, покрывающие все паттерны проектирования:

```bash
npm test
```

Покрытие тестами включает:
- Вычисления и валидация фигур
- Операции репозитория
- Запросы спецификаций
- Сортировка компараторов
- Отслеживание метрик Warehouse
- Безопасность прокси файлового сервиса
- Выполнение команд и функциональность отмены

## Обработка ошибок

Приложение включает надежную обработку ошибок:
- Валидация некорректных данных фигур
- Проверки разрешений доступа к файлам
- Восстановление после ошибок выполнения команд
- Комплексное логирование с Winston

## Лицензия

Этот проект является частью упражнения по изучению паттернов проектирования.