import { Shape } from './Shape';
import { Point } from './Point';

export class Pyramid extends Shape {
    /**
     * @param id Уникальный идентификатор.
     * @param p1 Первая точка основания.
     * @param p2 Вторая точка основания.
     * @param p3 Третья точка основания.
     * @param p4 Четвертая точка основания.
     * @param apex Вершина (апекс) пирамиды.
     */
    constructor(id: string, p1: Point, p2: Point, p3: Point, p4: Point, apex: Point) {
        super(id, 'Pyramid', [p1, p2, p3, p4, apex]);
    }

    public get apex(): Point {
        return this.points[4];
    }

    public get basePoints(): Point[] {
        return this.points.slice(0, 4);
    }
}