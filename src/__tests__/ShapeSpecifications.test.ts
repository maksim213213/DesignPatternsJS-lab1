import {
  ShapeByIdSpecification,
  ShapeByNameSpecification,
  ShapeInFirstQuadrantSpecification,
  ShapeAreaInRangeSpecification,
  ShapeDistanceFromOriginInRangeSpecification
} from '../specifications/ShapeSpecifications';
import { Triangle, Pyramid, Point, Point3D } from '../entities';
import { Warehouse } from '../services/Warehouse';

describe('ShapeSpecifications', () => {
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
  });

  afterEach(() => {
    const allMetrics = warehouse.getAllMetrics();
    allMetrics.forEach(metric => warehouse.removeMetrics(metric.id));
  });

  describe('ShapeByIdSpecification', () => {
    it('should find shape by id', () => {
      const triangle = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
      const spec = new ShapeByIdSpecification('t1');

      expect(spec.isSatisfiedBy(triangle)).toBe(true);

      const spec2 = new ShapeByIdSpecification('t2');
      expect(spec2.isSatisfiedBy(triangle)).toBe(false);
    });
  });

  describe('ShapeByNameSpecification', () => {
    it('should find shape by name', () => {
      const triangle = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
      const spec = new ShapeByNameSpecification('Triangle');

      expect(spec.isSatisfiedBy(triangle)).toBe(true);

      const spec2 = new ShapeByNameSpecification('Pyramid');
      expect(spec2.isSatisfiedBy(triangle)).toBe(false);
    });
  });

  describe('ShapeInFirstQuadrantSpecification', () => {
    it('should find shapes in first quadrant', () => {
      const triangle1 = new Triangle('t1', new Point(1, 1), new Point(2, 1), new Point(1, 2));
      const triangle2 = new Triangle('t2', new Point(-1, 1), new Point(1, 1), new Point(0, 2));
      const spec = new ShapeInFirstQuadrantSpecification();

      expect(spec.isSatisfiedBy(triangle1)).toBe(true);
      expect(spec.isSatisfiedBy(triangle2)).toBe(false);
    });
  });

  describe('ShapeAreaInRangeSpecification', () => {
    it('should find shapes with area in range', () => {
      const triangle = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
      warehouse.updateMetrics(triangle);

      const spec = new ShapeAreaInRangeSpecification(0.4, 0.6);
      expect(spec.isSatisfiedBy(triangle)).toBe(true);

      const spec2 = new ShapeAreaInRangeSpecification(1, 2);
      expect(spec2.isSatisfiedBy(triangle)).toBe(false);
    });
  });

  describe('ShapeDistanceFromOriginInRangeSpecification', () => {
    it('should find shapes within distance range', () => {
      const triangle = new Triangle('t1', new Point(1, 1), new Point(2, 1), new Point(1, 2));
      const spec = new ShapeDistanceFromOriginInRangeSpecification(0, 2);

      expect(spec.isSatisfiedBy(triangle)).toBe(true);

      const spec2 = new ShapeDistanceFromOriginInRangeSpecification(3, 5);
      expect(spec2.isSatisfiedBy(triangle)).toBe(false);
    });
  });
});