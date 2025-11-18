import { AbstractShapeFactory } from './AbstractShapeFactory';
import { Triangle } from '../entity/Triangle';
import { Point } from '../entity/Point';
import { IShape } from '../entity/IShape';

export class TriangleFactory extends AbstractShapeFactory {
    public static readonly EXPECTED_COUNT: number = 9;

    protected createShape(data: number[], id: string): IShape {
        
        // Создаем три точки из 9 параметров: [x1, y1, z1, x2, y2, z2, x3, y3, z3]
        const p1 = new Point(data[0], data[1], data[2]);
        const p2 = new Point(data[3], data[4], data[5]);
        const p3 = new Point(data[6], data[7], data[8]);

        return new Triangle(id, p1, p2, p3);
    }
}