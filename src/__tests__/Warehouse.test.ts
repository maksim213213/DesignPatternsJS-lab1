import { Warehouse } from '../services/Warehouse';
import { Triangle, Pyramid, Point, Point3D } from '../entities';

describe('Warehouse', () => {
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
  });

  afterEach(() => {
    // Clear metrics
    const allMetrics = warehouse.getAllMetrics();
    allMetrics.forEach(metric => warehouse.removeMetrics(metric.id));
  });

  it('should be singleton', () => {
    const warehouse2 = Warehouse.getInstance();
    expect(warehouse).toBe(warehouse2);
  });

  it('should update metrics for triangle', () => {
    const triangle = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
    warehouse.updateMetrics(triangle);

    const metrics = warehouse.getMetrics('t1');
    expect(metrics).toBeDefined();
    expect(metrics?.area).toBe(0.5);
    expect(metrics?.perimeter).toBeCloseTo(3.414, 3);
  });

  it('should update metrics for pyramid', () => {
    const pyramid = new Pyramid(
      'p1',
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(1, 1, 0),
      new Point3D(0, 1, 0),
      new Point3D(0.5, 0.5, 1)
    );
    warehouse.updateMetrics(pyramid);

    const metrics = warehouse.getMetrics('p1');
    expect(metrics).toBeDefined();
    expect(metrics?.volume).toBeDefined();
    expect(metrics?.area).toBeDefined();
  });

  it('should remove metrics', () => {
    const triangle = new Triangle('t1', new Point(0, 0), new Point(1, 0), new Point(0, 1));
    warehouse.updateMetrics(triangle);
    warehouse.removeMetrics('t1');

    expect(warehouse.getMetrics('t1')).toBeUndefined();
  });
});