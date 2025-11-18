import { TriangleFactory } from '../../src/factory/TriangleFactory';
import { Triangle } from '../../src/entity/Triangle';
import { AppLogger } from '../../src/logger/Logger';

// Мокаем логгер, чтобы не засорять консоль и файл во время тестов
jest.mock('../../src/logger/Logger', () => ({
    AppLogger: {
        error: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
    }
}));

describe('TriangleFactory', () => {
    let factory: TriangleFactory;
    const expectedCount = TriangleFactory.EXPECTED_COUNT;

    beforeAll(() => {
        factory = new TriangleFactory();
    });

    // Тест 1: Успешное создание треугольника
    test('should successfully create a Triangle entity from valid data', () => {
        const line = '0 0 0 10 0 0 0 10 0'; // 9 параметров
        const id = 'TR_1';

        const shape = factory.buildShape(line, id, expectedCount);

        // Используем больше одного expect на каждый тест кейс.
        expect(shape).not.toBeNull();
        expect(shape instanceof Triangle).toBe(true);
        expect(shape?.id).toBe(id);
        expect(shape?.points.length).toBe(3);
        // Проверяем, что первая точка создана корректно
        expect(shape?.points[0].x).toBe(0); 
        expect(AppLogger.info).toHaveBeenCalledWith(
            expect.stringContaining(`Успешно создана фигура Triangle`),
        );
    });

    // Тест 2: Обработка некорректного формата (должен пропустить и логировать)
    test('should return null and log error for data format exception', () => {
        const line = '1 2a 3 4 5 6 7 8 9'; // Некорректный символ 'a'
        const id = 'TR_2';

        const shape = factory.buildShape(line, id, expectedCount);

        // Проверяем, что объект не был создан (Фабрика должна пропустить)
        expect(shape).toBeNull(); 
        
        // Проверяем, что ошибка была залогирована
        expect(AppLogger.error).toHaveBeenCalledWith(
            expect.objectContaining({ errorCode: 'INVALID_FORMAT_ERROR' }), 
            expect.stringContaining('Фабрика: Пропуск некорректной строки.')
        );
    });
    
    // Тест 3: Обработка недостаточного количества данных
    test('should return null and log error for insufficient data exception', () => {
        const line = '1 2 3 4 5 6 7 8'; // 8 параметров
        const id = 'TR_3';

        const shape = factory.buildShape(line, id, expectedCount);

        // Проверяем, что объект не был создан (Фабрика должна пропустить)
        expect(shape).toBeNull(); 
        
        // Проверяем, что ошибка была залогирована
        expect(AppLogger.error).toHaveBeenCalledWith(
            expect.objectContaining({ errorCode: 'INSUFFICIENT_DATA' }), 
            expect.stringContaining('Фабрика: Пропуск некорректной строки.')
        );
    });
});