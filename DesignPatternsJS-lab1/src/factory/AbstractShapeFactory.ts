import { IShape } from '../entity/IShape';
import { DataValidator } from '../validator/DataValidator';
import { AppLogger } from '../logger/Logger';
import { 
    BaseException, 
    InvalidDataFormatException, 
    InsufficientDataException 
} from '../exception/DataExceptions';

// Определяет общий интерфейс для создания фигур и логику обработки ошибок.
 
export abstract class AbstractShapeFactory {
    protected readonly validator: DataValidator;

    constructor() {
        this.validator = new DataValidator(); 
    }

    /**
     * @param data Массив числовых параметров.
     * @param id
     * @returns Созданный объект фигуры.
     */
    protected abstract createShape(data: number[], id: string): IShape;

    /**
     * Основной метод, который обрабатывает строку данных, выполняет валидацию 
     * и использует Factory Method для создания фигуры.
     * @param line Строка из файла для обработки.
     * @param id Идентификатор для создаваемой фигуры.
     * @param expectedCount Ожидаемое количество числовых параметров.
     * @returns Созданный объект IShape или null, если строка некорректна.
     */
    public buildShape(line: string, id: string, expectedCount: number): IShape | null {
        try {
            // 1. Валидация строки и извлечение чисел
            const validatedData = this.validator.validateLine(line, expectedCount);
            
            const shape = this.createShape(validatedData, id);
            
            AppLogger.info(`Фабрика: Успешно создана фигура ${shape.name} с ID ${id}.`);
            return shape;

        } catch (error) {
            // Обработка: Если встретилась некорректная строка, приложение должно переходить к следующей строке.
            if (error instanceof InvalidDataFormatException || error instanceof InsufficientDataException) {
                AppLogger.error({ 
                    errorCode: (error as BaseException).errorCode,
                    line: line 
                }, `Фабрика: Пропуск некорректной строки. ${error.message}`);
                
                return null;
            }

            AppLogger.error(error, `Фабрика: Непредвиденная ошибка при обработке строки: "${line}"`);
            return null;
        }
    }
}