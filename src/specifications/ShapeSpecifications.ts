import { Specification } from '../utils/interfaces';
import { IShape, Triangle, Pyramid } from '../entities';
import { Warehouse } from '../services/Warehouse';

export class ShapeByIdSpecification implements Specification<IShape> {
  constructor(private id: string) {}

  isSatisfiedBy(shape: IShape): boolean {
    return shape.id === this.id;
  }
}

export class ShapeByNameSpecification implements Specification<IShape> {
  constructor(private name: string) {}

  isSatisfiedBy(shape: IShape): boolean {
    return shape.name === this.name;
  }
}

export class ShapeInFirstQuadrantSpecification implements Specification<IShape> {
  isSatisfiedBy(shape: IShape): boolean {
    if (shape instanceof Triangle) {
      return shape.point1.x > 0 && shape.point1.y > 0 &&
             shape.point2.x > 0 && shape.point2.y > 0 &&
             shape.point3.x > 0 && shape.point3.y > 0;
    } else if (shape instanceof Pyramid) {
      return shape.point1.x > 0 && shape.point1.y > 0 &&
             shape.point2.x > 0 && shape.point2.y > 0 &&
             shape.point3.x > 0 && shape.point3.y > 0 &&
             shape.point4.x > 0 && shape.point4.y > 0 &&
             shape.apexPoint.x > 0 && shape.apexPoint.y > 0;
    }
    return false;
  }
}

export class ShapeAreaInRangeSpecification implements Specification<IShape> {
  constructor(private min: number, private max: number) {}

  isSatisfiedBy(shape: IShape): boolean {
    const warehouse = Warehouse.getInstance();
    const metrics = warehouse.getMetrics(shape.id);
    if (!metrics || metrics.area === undefined) return false;
    return metrics.area >= this.min && metrics.area <= this.max;
  }
}

export class ShapeVolumeInRangeSpecification implements Specification<IShape> {
  constructor(private min: number, private max: number) {}

  isSatisfiedBy(shape: IShape): boolean {
    const warehouse = Warehouse.getInstance();
    const metrics = warehouse.getMetrics(shape.id);
    if (!metrics || metrics.volume === undefined) return false;
    return metrics.volume >= this.min && metrics.volume <= this.max;
  }
}

export class ShapePerimeterInRangeSpecification implements Specification<IShape> {
  constructor(private min: number, private max: number) {}

  isSatisfiedBy(shape: IShape): boolean {
    const warehouse = Warehouse.getInstance();
    const metrics = warehouse.getMetrics(shape.id);
    if (!metrics || metrics.perimeter === undefined) return false;
    return metrics.perimeter >= this.min && metrics.perimeter <= this.max;
  }
}

export class ShapeDistanceFromOriginInRangeSpecification implements Specification<IShape> {
  constructor(private min: number, private max: number) {}

  private calculateDistance(x: number, y: number, z: number = 0): number {
    return Math.sqrt(x * x + y * y + z * z);
  }

  isSatisfiedBy(shape: IShape): boolean {
    if (shape instanceof Triangle) {
      const d1 = this.calculateDistance(shape.point1.x, shape.point1.y);
      const d2 = this.calculateDistance(shape.point2.x, shape.point2.y);
      const d3 = this.calculateDistance(shape.point3.x, shape.point3.y);
      return (d1 >= this.min && d1 <= this.max) ||
             (d2 >= this.min && d2 <= this.max) ||
             (d3 >= this.min && d3 <= this.max);
    } else if (shape instanceof Pyramid) {
      const d1 = this.calculateDistance(shape.point1.x, shape.point1.y, shape.point1.z);
      const d2 = this.calculateDistance(shape.point2.x, shape.point2.y, shape.point2.z);
      const d3 = this.calculateDistance(shape.point3.x, shape.point3.y, shape.point3.z);
      const d4 = this.calculateDistance(shape.point4.x, shape.point4.y, shape.point4.z);
      const da = this.calculateDistance(shape.apexPoint.x, shape.apexPoint.y, shape.apexPoint.z);
      return (d1 >= this.min && d1 <= this.max) ||
             (d2 >= this.min && d2 <= this.max) ||
             (d3 >= this.min && d3 <= this.max) ||
             (d4 >= this.min && d4 <= this.max) ||
             (da >= this.min && da <= this.max);
    }
    return false;
  }
}