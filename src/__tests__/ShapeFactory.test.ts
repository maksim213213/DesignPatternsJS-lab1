import { ShapeFactory } from '../factories';
import { InvalidShapeDataError } from '../exceptions';

describe('ShapeFactory', () => {
  describe('createTriangle', () => {
    it('should create valid triangle', () => {
      const triangle = ShapeFactory.createTriangle('t1', '0 0 3 0 0 4');

      expect(triangle).toBeDefined();
      expect(triangle.id).toBe('t1');
      expect(triangle.name).toBe('Triangle');
      expect(triangle.point1.x).toBe(0);
      expect(triangle.point1.y).toBe(0);
      expect(triangle.point2.x).toBe(3);
      expect(triangle.point2.y).toBe(0);
      expect(triangle.point3.x).toBe(0);
      expect(triangle.point3.y).toBe(4);
    });

    it('should throw error for collinear points', () => {
      expect(() => {
        ShapeFactory.createTriangle('t2', '0 0 1 1 2 2');
      }).toThrow(InvalidShapeDataError);
    });

    it('should throw error for insufficient coordinates', () => {
      expect(() => {
        ShapeFactory.createTriangle('t3', '1 1 2 2');
      }).toThrow(InvalidShapeDataError);
    });

    it('should throw error for invalid numeric format', () => {
      expect(() => {
        ShapeFactory.createTriangle('t4', '1a 2 3 4 5 6');
      }).toThrow(InvalidShapeDataError);
    });

    it('should create triangle with negative coordinates', () => {
      const triangle = ShapeFactory.createTriangle('t5', '-1 -1 1 -1 0 1');

      expect(triangle).toBeDefined();
      expect(triangle.point1.x).toBe(-1);
      expect(triangle.point1.y).toBe(-1);
    });

    it('should create triangle with decimal coordinates', () => {
      const triangle = ShapeFactory.createTriangle('t6', '0.5 0.5 3.5 0.5 2 4.5');

      expect(triangle).toBeDefined();
      expect(triangle.point1.x).toBeCloseTo(0.5, 5);
      expect(triangle.point2.x).toBeCloseTo(3.5, 5);
    });
  });

  describe('createPyramid', () => {
    it('should create valid pyramid', () => {
      const pyramid = ShapeFactory.createPyramid(
        'p1',
        '0 0 0 3 0 0 3 4 0 0 4 0 1.5 2 5',
      );

      expect(pyramid).toBeDefined();
      expect(pyramid.id).toBe('p1');
      expect(pyramid.name).toBe('Pyramid');
      expect(pyramid.point1.x).toBe(0);
      expect(pyramid.point1.y).toBe(0);
      expect(pyramid.point1.z).toBe(0);
      expect(pyramid.apexPoint.z).toBe(5);
    });

    it('should throw error for non-rectangular base', () => {
      expect(() => {
        ShapeFactory.createPyramid('p2', '0 0 0 3 1 0 3 4 0 0 4 0 1.5 2 5');
      }).toThrow(InvalidShapeDataError);
    });

    it('should throw error for apex at same height as base', () => {
      expect(() => {
        ShapeFactory.createPyramid('p3', '0 0 0 3 0 0 3 4 0 0 4 0 1.5 2 0');
      }).toThrow(InvalidShapeDataError);
    });

    it('should throw error for insufficient coordinates', () => {
      expect(() => {
        ShapeFactory.createPyramid('p4', '1 2 3 4 5 6');
      }).toThrow(InvalidShapeDataError);
    });

    it('should create pyramid with different dimensions', () => {
      const pyramid = ShapeFactory.createPyramid(
        'p5',
        '0 0 0 2 0 0 2 2 0 0 2 0 1 1 3',
      );

      expect(pyramid).toBeDefined();
      expect(pyramid.point1.x).toBe(0);
      expect(pyramid.apexPoint.z).toBe(3);
    });

    it('should create pyramid with negative coordinates', () => {
      const pyramid = ShapeFactory.createPyramid(
        'p6',
        '-1 -1 0 1 -1 0 1 1 0 -1 1 0 0 0 5',
      );

      expect(pyramid).toBeDefined();
      expect(pyramid.point1.x).toBe(-1);
      expect(pyramid.point1.y).toBe(-1);
    });
  });
});
