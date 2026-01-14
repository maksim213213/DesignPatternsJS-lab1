import { Comparator } from '../utils/interfaces';
import { IShape, Triangle, Pyramid, Point, Point3D } from '../entities';

export class ShapeIdComparator implements Comparator<IShape> {
  compare(a: IShape, b: IShape): number {
    const idA = String(a.id);
    const idB = String(b.id);
    return idA.localeCompare(idB);
  }
}

export class ShapeNameComparator implements Comparator<IShape> {
  compare(a: IShape, b: IShape): number {
    return a.name.localeCompare(b.name);
  }
}

export class ShapeFirstPointXComparator implements Comparator<IShape> {
  compare(a: IShape, b: IShape): number {
    let x1: number, x2: number;

    if (a instanceof Triangle) {
      x1 = a.point1.x;
    } else if (a instanceof Pyramid) {
      x1 = a.point1.x;
    } else {
      x1 = 0;
    }

    if (b instanceof Triangle) {
      x2 = b.point1.x;
    } else if (b instanceof Pyramid) {
      x2 = b.point1.x;
    } else {
      x2 = 0;
    }

    return x1 - x2;
  }
}

export class ShapeFirstPointYComparator implements Comparator<IShape> {
  compare(a: IShape, b: IShape): number {
    let y1: number, y2: number;

    if (a instanceof Triangle) {
      y1 = a.point1.y;
    } else if (a instanceof Pyramid) {
      y1 = a.point1.y;
    } else {
      y1 = 0;
    }

    if (b instanceof Triangle) {
      y2 = b.point1.y;
    } else if (b instanceof Pyramid) {
      y2 = b.point1.y;
    } else {
      y2 = 0;
    }

    return y1 - y2;
  }
}