import { DataValidator } from '../../src/validator/DataValidator';
import { 
    InvalidDataFormatException, 
    InsufficientDataException 
} from '../../src/exception/DataExceptions';
import { TriangleFactory } from '../../src/factory/TriangleFactory';

// Используем ожидаемое количество для треугольника (9 параметров)
const EXPECTED_COUNT = TriangleFactory.EXPECTED_COUNT; 

describe('DataValidator', () => {
    let validator: DataValidator;

    // Присваиваем немедленно
    beforeAll(() => {
        validator = new DataValidator();
    });
    
    // Тест 1: Позитивный сценарий (корректные данные)
    test('should successfully validate and return an array of numbers', () => {
        // Проверяем 9 корректных параметров для Треугольника
        const line = '0.0 1.5 -2.0 4 5 6 7 8 9'; 
        const expectedResult = [0.0, 1.5, -2.0, 4, 5, 6, 7, 8, 9];
        
        const result = validator.validateLine(line, EXPECTED_COUNT);

        expect(result).toEqual(expectedResult);
        expect(result.length).toBe(EXPECTED_COUNT);
    });

    // Тест 2: Ошибка формата (недопустимый символ)
    test('should throw InvalidDataFormatException for non-numeric characters', () => {
        // Содержит 'a'
        const line = '1.0 2a.0 3.0 4 5 6 7 8 9';
        
        // Использовать различные виды expect
        expect(() => { 
            validator.validateLine(line, EXPECTED_COUNT);
        }).toThrow(InvalidDataFormatException);
        
        expect(() => {
            validator.validateLine(line, EXPECTED_COUNT);
        }).toThrow('Строка содержит недопустимые символы или неверный числовой формат.');
    });

    // Тест 3: Ошибка количества (недостаточно данных)
    test('should throw InsufficientDataException if not enough parameters are provided', () => {
        // Предоставлено только 8 параметров, ожидается 9
        const line = '1 2 3 4 5 6 7 8'; 
        
        // Проверяем тип исключения
        expect(() => {
            validator.validateLine(line, EXPECTED_COUNT);
        }).toThrow(InsufficientDataException); 
        
        // Проверяем, что сообщение содержит ключевые слова
        expect(() => {
            validator.validateLine(line, EXPECTED_COUNT);
        }).toThrow(/Ожидается 9 параметров, получено 8/);
    });
    
    // Тест 4: Обработка избыточных данных
    test('should correctly handle and truncate excessive data', () => {
        // Предоставлено 10 параметров, ожидается 9
        const line = '1 2 3 4 5 6 7 8 9 10'; 
        const expectedResult = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const result = validator.validateLine(line, EXPECTED_COUNT);

        expect(result).toEqual(expectedResult);
        expect(result.length).toBe(EXPECTED_COUNT); // Убеждаемся, что взяли только 9
    });
});