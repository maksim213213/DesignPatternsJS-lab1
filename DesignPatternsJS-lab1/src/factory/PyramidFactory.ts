import { AbstractShapeFactory } from './AbstractShapeFactory';
import { Pyramid } from '../entity/Pyramid';
import { Point } from '../entity/Point';
import { IShape } from '../entity/IShape';

export class PyramidFactory extends AbstractShapeFactory {
    public static readonly EXPECTED_COUNT: number = 15;

    protected createShape(data: number[], id: string): IShape {
        
        const p1 = new Point(data[0], data[1], data[2]);
        const p2 = new Point(data[3], data[4], data[5]);
        const p3 = new Point(data[6], data[7], data[8]);
        const p4 = new Point(data[9], data[10], data[11]);
        const apex = new Point(data[12], data[13], data[14]);

        return new Pyramid(id, p1, p2, p3, p4, apex);
    }
}