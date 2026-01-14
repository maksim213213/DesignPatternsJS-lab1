import { Triangle, Pyramid, Point, Point3D } from '../entities';
import { TriangleValidator, PyramidValidator } from '../validators';
import { InvalidShapeDataError } from '../exceptions';
import logger from '../utils/logger';

export class ShapeFactory {
  static createTriangle(id: string, line: string): Triangle {
    try {
      const { coordinates } = TriangleValidator.validateLine(line);

      const [
        x1, y1, 
        x2, y2, 
        x3, y3
      ] = coordinates;

      if (!TriangleValidator.isValidTriangle(x1, y1, x2, y2, x3, y3)) {
        throw new InvalidShapeDataError('Points are collinear - cannot form a triangle');
      }

      const point1 = new Point(x1, y1);
      const point2 = new Point(x2, y2);
      const point3 = new Point(x3, y3);

      return new Triangle(id, point1, point2, point3);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Failed to create Triangle with id ${id}: ${errorMessage}`);
      throw new InvalidShapeDataError(`Cannot create triangle: ${errorMessage}`);
    }
  }

  static createPyramid(id: string, line: string): Pyramid {
    try {
      const { coordinates } = PyramidValidator.validateLine(line);

      const [
        x1, y1, z1,
        x2, y2, z2,
        x3, y3, z3,
        x4, y4, z4,
        ax, ay, az,
      ] = coordinates;

      if (!PyramidValidator.isValidRectangularBase(x1, y1, x2, y2, x3, y3, x4, y4)) {
        throw new InvalidShapeDataError('Base points do not form a rectangle');
      }

      if (!PyramidValidator.isValidPyramidHeight(z1, az)) {
        throw new InvalidShapeDataError('Apex must be at different height than base');
      }

      const point1 = new Point3D(x1, y1, z1);
      const point2 = new Point3D(x2, y2, z2);
      const point3 = new Point3D(x3, y3, z3);
      const point4 = new Point3D(x4, y4, z4);
      const apexPoint = new Point3D(ax, ay, az);

      return new Pyramid(id, point1, point2, point3, point4, apexPoint);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Failed to create Pyramid with id ${id}: ${errorMessage}`);
      throw new InvalidShapeDataError(`Cannot create pyramid: ${errorMessage}`);
    }
  }
}
