import { Shape } from './Shape';
import { Point } from './Point';

export class Triangle extends Shape {
    /**
     * @param id Уникальный идентификатор.
     * @param p1 Первая вершина (Point).
     * @param p2 Вторая вершина (Point).
     * @param p3 Третья вершина (Point).
     */
    constructor(id: string, p1: Point, p2: Point, p3: Point) {

        super(id, 'Triangle', [p1, p2, p3]);
    }

    public get p1(): Point {
        return this.points[0];
    }

    public get p2(): Point {
        return this.points[1];
    }

    public get p3(): Point {
        return this.points[2];
    }
}