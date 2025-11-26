import { Point3D } from './Point3D';
import { IShape } from './IShape';


export class Pyramid implements IShape {
  readonly id: string;
  readonly name: string = 'Pyramid';
  readonly point1: Point3D; // Base corner 1
  readonly point2: Point3D; // Base corner 2
  readonly point3: Point3D; // Base corner 3
  readonly point4: Point3D; // Base corner 4
  readonly apexPoint: Point3D; // Apex of pyramid

  constructor(
    id: string,
    point1: Point3D,
    point2: Point3D,
    point3: Point3D,
    point4: Point3D,
    apexPoint: Point3D,
  ) {
    this.id = id;
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.point4 = point4;
    this.apexPoint = apexPoint;
  }
}
