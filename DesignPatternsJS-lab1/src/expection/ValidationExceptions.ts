import { BaseException } from './BaseException';

// Исключение: Невозможно создать фигуру из заданных точек.

export class InvalidShapeException extends BaseException {
    constructor(shapeName: string, reason: string) {
        super(
            `Невозможно создать ${shapeName} по определению. Причина: ${reason}`, 
            'INVALID_SHAPE_DEFINITION'
        );
        Object.setPrototypeOf(this, InvalidShapeException.prototype);
    }
}

// Исключение: Результаты вычислений не соответствуют ожидаемым (например, площадь оказалась отрицательной).
 
export class CalculationValidationException extends BaseException {
    constructor(calculation: string, value: number) {
        super(
            `Ошибка валидации вычислений: ${calculation} дал недопустимое значение ${value}.`, 
            'CALCULATION_VALIDATION_ERROR'
        );
        Object.setPrototypeOf(this, CalculationValidationException.prototype);
    }
}