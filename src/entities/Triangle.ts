import { Point } from './Point';
import { IShape } from './IShape';

/**
 * Entity class for Triangle (no business logic)
 */
export class Triangle implements IShape {
  readonly id: string;
  readonly name: string = 'Triangle';
  readonly point1: Point;
  readonly point2: Point;
  readonly point3: Point;

  constructor(id: string, point1: Point, point2: Point, point3: Point) {
    this.id = id;
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
  }
}
