import { IShape } from './IShape';
import { Point } from './Point';

export abstract class Shape implements IShape {
    public readonly id: string;
    public readonly name: string;
    public readonly points: Point[];

    /**
     * @param id Уникальный идентификатор фигуры.
     * @param name Название фигуры (например, 'Triangle', 'Pyramid').
     * @param points Массив точек, определяющих фигуру.
     */
    constructor(id: string, name: string, points: Point[]) {
        this.id = id;
        this.name = name;
        this.points = points;
    }

    public toString(): string {
        const pointStrings = this.points.map(p => p.toString()).join(', ');
        return `${this.name} {id: ${this.id}, points: [${pointStrings}]}`;
    }
}