import { IShape } from '../entities';
import { TriangleCalculationService, PyramidCalculationService } from '../services';
import { Triangle, Pyramid } from '../entities';
import { Observer } from '../utils/observer';

interface ShapeMetrics {
  id: string | number;
  area?: number;
  volume?: number;
  perimeter?: number;
}

export class Warehouse implements Observer {
  private static instance: Warehouse;
  private metrics: Map<string | number, ShapeMetrics> = new Map();

  private constructor() {}

  static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  update(shape: IShape): void {
    this.updateMetricsInternal(shape);
  }

  updateRemove(id: string | number): void {
    this.removeMetricsInternal(id);
  }

  updateMetrics(shape: IShape): void {
    this.updateMetricsInternal(shape);
  }

  removeMetrics(id: string | number): void {
    this.removeMetricsInternal(id);
  }

  private updateMetricsInternal(shape: IShape): void {
    const metrics: ShapeMetrics = { id: shape.id };

    if (shape instanceof Triangle) {
      metrics.area = TriangleCalculationService.calculateArea(shape);
      metrics.perimeter = TriangleCalculationService.calculatePerimeter(shape);
    } else if (shape instanceof Pyramid) {
      metrics.volume = PyramidCalculationService.calculateVolume(shape);
      metrics.area = PyramidCalculationService.calculateSurfaceArea(shape);
    }

    this.metrics.set(shape.id, metrics);
  }

  private removeMetricsInternal(id: string | number): void {
    this.metrics.delete(id);
  }

  getMetrics(id: string | number): ShapeMetrics | undefined {
    return this.metrics.get(id);
  }

  getAllMetrics(): ShapeMetrics[] {
    return Array.from(this.metrics.values());
  }
}