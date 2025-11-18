import { BaseException } from './BaseException';
// Ошибки чтения и форматирования данных

export class FileReadException extends BaseException {
    constructor(filePath: string, innerError: Error) {
        super(
            `Ошибка чтения файла данных: ${filePath}. Причина: ${innerError.message}`, 
            'FILE_READ_ERROR'
        );
        Object.setPrototypeOf(this, FileReadException.prototype);
    }
}


// Исключение: Некорректный формат строки данных. 
 
export class InvalidDataFormatException extends BaseException {
    constructor(line: string, reason: string) {
        super(
            `Некорректный формат строки данных: "${line}". ${reason}`, 
            'INVALID_FORMAT_ERROR'
        );
        Object.setPrototypeOf(this, InvalidDataFormatException.prototype);
    }
}

// Исключение: Недостаточно параметров в строке для создания фигуры.
 
export class InsufficientDataException extends BaseException {
    constructor(line: string, expectedCount: number, actualCount: number) {
        super(
            `Недостаточно данных в строке: "${line}". Ожидается ${expectedCount} параметров, получено ${actualCount}.`, 
            'INSUFFICIENT_DATA'
        );
        Object.setPrototypeOf(this, InsufficientDataException.prototype);
    }
}