import { 
    InvalidDataFormatException, 
    InsufficientDataException 
} from '../exception/DataExceptions';
import { VALID_NUMBER_STRING_REGEX } from '../constants/Regex';
import { AppLogger } from '../logger/Logger';

export class DataValidator {

    /**
     * @param line Исходная строка из файла.
     * @param expectedCount Ожидаемое количество числовых параметров.
     * @returns Массив числовых значений, если валидация успешна.
     * @throws InvalidDataFormatException, InsufficientDataException
     */
    public validateLine(line: string, expectedCount: number): number[] {
        if (!VALID_NUMBER_STRING_REGEX.test(line)) {
            AppLogger.warn(`Валидация: Строка содержит недопустимые символы. Строка: "${line}"`);
            throw new InvalidDataFormatException(line, 'Строка содержит недопустимые символы или неверный числовой формат.');
        }

        const numbers = line.match(VALID_NUMBER_STRING_REGEX);
        const data = numbers ? numbers.map(s => parseFloat(s.trim())).filter(n => !isNaN(n)) : [];

        // Проверка на достаточность информации
        const actualCount = data.length;
        if (actualCount < expectedCount) {
            AppLogger.warn(`Валидация: Недостаточно данных. Ожидалось ${expectedCount}, получено ${actualCount}. Строка: "${line}"`);
            throw new InsufficientDataException(line, expectedCount, actualCount);
        }
        
        // Проверка на избыточность
        if (actualCount > expectedCount) {
             AppLogger.warn(`Валидация: Избыточное количество данных. Ожидалось ${expectedCount}, получено ${actualCount}. Будут использованы первые ${expectedCount} значений.`);
             return data.slice(0, expectedCount);
        }

        return data;
    }
}