import * as fs from 'fs';
import * as path from 'path';
import { AppLogger } from '../logger/Logger';
import { FileReadException } from '../exception/DataExceptions';
import { IShape } from '../entity/IShape';
import { AbstractShapeFactory } from '../factory/AbstractShapeFactory';
import { TriangleFactory } from '../factory/TriangleFactory';
import { PyramidFactory } from '../factory/PyramidFactory';

const SHAPE_TYPE_TRIANGLE = 'TRIANGLE';
const SHAPE_TYPE_PYRAMID = 'PYRAMID';

const SHAPE_TYPE_REGEX: RegExp = /^(\w+)/; 


export class FileReader {
 
    private readonly triangleFactory: TriangleFactory;
    private readonly pyramidFactory: PyramidFactory;

    constructor() {
        this.triangleFactory = new TriangleFactory();
        this.pyramidFactory = new PyramidFactory();
    }

    /**
     * Читает файл, обрабатывает каждую строку и создает фигуры.
     * @param filePath Относительный путь к файлу данных (например, 'data/input.txt').
     * @returns Массив созданных корректных фигур.
     */
    public readShapes(filePath: string): IShape[] {
        const absolutePath = path.resolve(filePath);
        let fileContent = '';
        const createdShapes: IShape[] = [];

        AppLogger.info(`Попытка чтения файла по пути: ${absolutePath}`);

        try {
            fileContent = fs.readFileSync(absolutePath, 'utf-8');
        } catch (error) {
            const fileError = error as Error;
            
            throw new FileReadException(filePath, fileError);
        }
        
        // Разбиваем содержимое на строки и фильтруем пустые
        const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        let idCounter = 1;

        AppLogger.info(`Файл прочитан. Всего строк для обработки: ${lines.length}`);

        for (const line of lines) {
            const typeMatch = line.match(SHAPE_TYPE_REGEX);
            const shapeType = typeMatch ? typeMatch[1].toUpperCase() : '';
            const dataLine = line.replace(SHAPE_TYPE_REGEX, '').trim();
            
            // Определяем, какая фабрика нужна
            let shape: IShape | null = null;
            const currentId = `${shapeType}_${idCounter}`;

            switch (shapeType) {
                case SHAPE_TYPE_TRIANGLE:
                    shape = this.triangleFactory.buildShape(
                        dataLine, 
                        currentId, 
                        TriangleFactory.EXPECTED_COUNT
                    );
                    break;
                case SHAPE_TYPE_PYRAMID:
                    shape = this.pyramidFactory.buildShape(
                        dataLine, 
                        currentId, 
                        PyramidFactory.EXPECTED_COUNT
                    );
                    break;
                default:
                    AppLogger.warn(`Чтение: Неизвестный тип фигуры в строке: "${line}". Пропуск.`);
                    continue; 
            }

            // Сохраняем успешно созданную фигуру
            if (shape) {
                createdShapes.push(shape);
                idCounter++;
            }
        }

        AppLogger.info(`Обработка завершена. Создано корректных фигур: ${createdShapes.length}`);
        return createdShapes;
    }
}