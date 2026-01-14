import { ShapeIdComparator, ShapeNameComparator, ShapeFirstPointXComparator, ShapeFirstPointYComparator } from '../utils/comparators';
import { Triangle, Pyramid, Point, Point3D } from '../entities';

describe('Comparators', () => {
  describe('ShapeIdComparator', () => {
    it('should compare by id', () => {
      const triangle1 = new Triangle('a', new Point(0, 0), new Point(1, 0), new Point(0, 1));
      const triangle2 = new Triangle('b', new Point(0, 0), new Point(1, 0), new Point(0, 1));
      const comparator = new ShapeIdComparator();

      expect(comparator.compare(triangle1, triangle2)).toBeLessThan(0);
      expect(comparator.compare(triangle2, triangle1)).toBeGreaterThan(0);
      expect(comparator.compare(triangle1, triangle1)).toBe(0);
    });
  });

  describe('ShapeNameComparator', () => {
    it('should compare by name', () => {
      const triangle = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
      const pyramid = new Pyramid('p1',
        new Point3D(0, 0, 0), new Point3D(1, 0, 0), new Point3D(1, 1, 0), new Point3D(0, 1, 0),
        new Point3D(0.5, 0.5, 1));
      const comparator = new ShapeNameComparator();

      expect(comparator.compare(pyramid, triangle)).toBeLessThan(0); // Pyramid < Triangle
      expect(comparator.compare(triangle, pyramid)).toBeGreaterThan(0);
    });
  });

  describe('ShapeFirstPointXComparator', () => {
    it('should compare by first point X coordinate', () => {
      const triangle1 = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
      const triangle2 = new Triangle('t2', new Point(1, 0), new Point(2, 0), new Point(1, 1));
      const comparator = new ShapeFirstPointXComparator();

      expect(comparator.compare(triangle1, triangle2)).toBeLessThan(0);
      expect(comparator.compare(triangle2, triangle1)).toBeGreaterThan(0);
    });
  });

  describe('ShapeFirstPointYComparator', () => {
    it('should compare by first point Y coordinate', () => {
      const triangle1 = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
      const triangle2 = new Triangle('t2', new Point(0, 1), new Point(1, 1), new Point(0, 2));
      const comparator = new ShapeFirstPointYComparator();

      expect(comparator.compare(triangle1, triangle2)).toBeLessThan(0);
      expect(comparator.compare(triangle2, triangle1)).toBeGreaterThan(0);
    });
  });
});