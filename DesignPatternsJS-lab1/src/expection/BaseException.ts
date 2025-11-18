export class BaseException extends Error {
    public readonly errorCode: string;
    public readonly timestamp: Date;

    constructor(message: string, errorCode: string) {
        // Вызываем конструктор базового класса Error
        super(message); 

        // Корректируем прототип для правильной работы instanceof
        Object.setPrototypeOf(this, BaseException.prototype);

        this.errorCode = errorCode;
        this.timestamp = new Date();
    }
}