import { Point, Triangle } from '../entities';
import { TriangleCalculationService } from '../services';

describe('TriangleCalculationService', () => {
  describe('calculateArea', () => {
    it('should calculate area of right triangle correctly', () => {
      const triangle = new Triangle(
        'test1',
        new Point(0, 0),
        new Point(3, 0),
        new Point(0, 4),
      );

      const area = TriangleCalculationService.calculateArea(triangle);

      expect(area).toBe(6);
      expect(typeof area).toBe('number');
    });

    it('should calculate area of triangle with positive coordinates', () => {
      const triangle = new Triangle(
        'test2',
        new Point(1, 1),
        new Point(4, 1),
        new Point(1, 5),
      );

      const area = TriangleCalculationService.calculateArea(triangle);

      expect(area).toBe(6);
      expect(area).toBeGreaterThan(0);
    });

    it('should return same area regardless of point order', () => {
      const triangle1 = new Triangle(
        'test3a',
        new Point(0, 0),
        new Point(3, 0),
        new Point(0, 4),
      );

      const triangle2 = new Triangle(
        'test3b',
        new Point(3, 0),
        new Point(0, 4),
        new Point(0, 0),
      );

      const area1 = TriangleCalculationService.calculateArea(triangle1);
      const area2 = TriangleCalculationService.calculateArea(triangle2);

      expect(area1).toBe(area2);
    });
  });

  describe('calculatePerimeter', () => {
    it('should calculate perimeter of right triangle (3-4-5)', () => {
      const triangle = new Triangle(
        'test4',
        new Point(0, 0),
        new Point(3, 0),
        new Point(0, 4),
      );

      const perimeter = TriangleCalculationService.calculatePerimeter(triangle);

      expect(perimeter).toBeCloseTo(12, 5);
      expect(perimeter).toBeGreaterThan(0);
    });

    it('should calculate perimeter of equilateral triangle', () => {
      const side = Math.sqrt(3) / 2;
      const triangle = new Triangle(
        'test5',
        new Point(0, 0),
        new Point(1, 0),
        new Point(0.5, side),
      );

      const perimeter = TriangleCalculationService.calculatePerimeter(triangle);

      expect(perimeter).toBeCloseTo(3, 5);
    });

    it('should have perimeter greater than sum of any two sides', () => {
      const triangle = new Triangle(
        'test6',
        new Point(0, 0),
        new Point(3, 0),
        new Point(0, 4),
      );

      const perimeter = TriangleCalculationService.calculatePerimeter(triangle);

      // Triangle inequality
      expect(perimeter).toBeGreaterThan(3);
      expect(perimeter).toBeGreaterThan(4);
    });
  });

  describe('isRightAngled', () => {
    it('should identify right triangle (3-4-5)', () => {
      const triangle = new Triangle(
        'test7',
        new Point(0, 0),
        new Point(3, 0),
        new Point(0, 4),
      );

      expect(TriangleCalculationService.isRightAngled(triangle)).toBe(true);
    });

    it('should not identify acute triangle as right-angled', () => {
      const triangle = new Triangle(
        'test8',
        new Point(0, 0),
        new Point(2, 0),
        new Point(1, 2),
      );

      expect(TriangleCalculationService.isRightAngled(triangle)).toBe(false);
    });

    it('should identify right triangle with different orientation', () => {
      const triangle = new Triangle(
        'test9',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
      );

      expect(TriangleCalculationService.isRightAngled(triangle)).toBe(true);
    });
  });

  describe('isIsosceles', () => {
    it('should identify isosceles triangle', () => {
      const triangle = new Triangle(
        'test10',
        new Point(0, 0),
        new Point(2, 0),
        new Point(1, 2),
      );

      expect(TriangleCalculationService.isIsosceles(triangle)).toBe(true);
    });

    it('should identify equilateral as isosceles', () => {
      const side = Math.sqrt(3) / 2;
      const triangle = new Triangle(
        'test11',
        new Point(0, 0),
        new Point(1, 0),
        new Point(0.5, side),
      );

      expect(TriangleCalculationService.isIsosceles(triangle)).toBe(true);
    });

    it('should not identify scalene triangle as isosceles', () => {
      const triangle = new Triangle(
        'test12',
        new Point(0, 0),
        new Point(3, 0),
        new Point(1, 2),
      );

      expect(TriangleCalculationService.isIsosceles(triangle)).toBe(false);
    });
  });

  describe('isEquilateral', () => {
    it('should identify equilateral triangle', () => {
      const side = Math.sqrt(3) / 2;
      const triangle = new Triangle(
        'test13',
        new Point(0, 0),
        new Point(1, 0),
        new Point(0.5, side),
      );

      expect(TriangleCalculationService.isEquilateral(triangle)).toBe(true);
    });

    it('should not identify isosceles as equilateral', () => {
      const triangle = new Triangle(
        'test14',
        new Point(0, 0),
        new Point(2, 0),
        new Point(1, 2),
      );

      expect(TriangleCalculationService.isEquilateral(triangle)).toBe(false);
    });

    it('should not identify right triangle as equilateral', () => {
      const triangle = new Triangle(
        'test15',
        new Point(0, 0),
        new Point(3, 0),
        new Point(0, 4),
      );

      expect(TriangleCalculationService.isEquilateral(triangle)).toBe(false);
    });
  });

  describe('isAcute', () => {
    it('should identify acute triangle', () => {
      const triangle = new Triangle(
        'test16',
        new Point(0, 0),
        new Point(2, 0),
        new Point(1, 2),
      );

      expect(TriangleCalculationService.isAcute(triangle)).toBe(true);
    });

    it('should not identify right triangle as acute', () => {
      const triangle = new Triangle(
        'test17',
        new Point(0, 0),
        new Point(3, 0),
        new Point(0, 4),
      );

      expect(TriangleCalculationService.isAcute(triangle)).toBe(false);
    });

    it('should not identify obtuse triangle as acute', () => {
      const triangle = new Triangle(
        'test18',
        new Point(0, 0),
        new Point(4, 0),
        new Point(0.5, 1),
      );

      expect(TriangleCalculationService.isAcute(triangle)).toBe(false);
    });
  });

  describe('isObtuse', () => {
    it('should identify obtuse triangle', () => {
      const triangle = new Triangle(
        'test19',
        new Point(0, 0),
        new Point(4, 0),
        new Point(0.5, 1),
      );

      expect(TriangleCalculationService.isObtuse(triangle)).toBe(true);
    });

    it('should not identify right triangle as obtuse', () => {
      const triangle = new Triangle(
        'test20',
        new Point(0, 0),
        new Point(3, 0),
        new Point(0, 4),
      );

      expect(TriangleCalculationService.isObtuse(triangle)).toBe(false);
    });

    it('should not identify acute triangle as obtuse', () => {
      const triangle = new Triangle(
        'test21',
        new Point(0, 0),
        new Point(2, 0),
        new Point(1, 2),
      );

      expect(TriangleCalculationService.isObtuse(triangle)).toBe(false);
    });
  });
});
