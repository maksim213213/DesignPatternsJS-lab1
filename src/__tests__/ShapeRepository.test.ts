import { ShapeRepository } from '../repositories/ShapeRepository';
import { Warehouse } from '../services/Warehouse';
import { Triangle, Pyramid, Point, Point3D } from '../entities';

describe('ShapeRepository', () => {
  let repository: ShapeRepository;
  let warehouse: Warehouse;

  beforeEach(() => {
    repository = new ShapeRepository();
    warehouse = Warehouse.getInstance();
    repository.attach(warehouse);
  });

  afterEach(() => {
    // Clear warehouse for next test
    const allShapes = repository.getAll();
    allShapes.forEach(shape => warehouse.removeMetrics(shape.id));
  });

  it('should add shapes and notify warehouse', () => {
    const triangle = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
    repository.add(triangle);

    expect(repository.getAll()).toHaveLength(1);
    expect(warehouse.getMetrics('t1')).toBeDefined();
  });

  it('should remove shapes and notify warehouse', () => {
    const triangle = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
    repository.add(triangle);
    repository.remove('t1');

    expect(repository.getAll()).toHaveLength(0);
    expect(warehouse.getMetrics('t1')).toBeUndefined();
  });

  it('should find shape by id', () => {
    const triangle = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
    repository.add(triangle);

    const found = repository.findById('t1');
    expect(found).toBe(triangle);
  });
});