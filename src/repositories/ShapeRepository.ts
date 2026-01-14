import { IShape } from '../entities';
import { Comparator, Specification } from '../utils/interfaces';
import { Subject, Observer } from '../utils/observer';

export class ShapeRepository implements Subject {
  private shapes: IShape[] = [];
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(shape: IShape): void {
    this.observers.forEach(obs => obs.update(shape));
  }

  notifyRemove(id: string | number): void {
    this.observers.forEach(obs => obs.updateRemove(id));
  }

  add(shape: IShape): void {
    this.shapes.push(shape);
    this.notify(shape);
  }

  remove(id: string): void {
    const index = this.shapes.findIndex(s => s.id === id);
    if (index !== -1) {
      this.shapes.splice(index, 1);
      this.notifyRemove(id);
    }
  }

  findById(id: string): IShape | undefined {
    return this.shapes.find(s => s.id === id);
  }

  findBySpecification(spec: Specification<IShape>): IShape[] {
    return this.shapes.filter(spec.isSatisfiedBy.bind(spec));
  }

  getAll(): IShape[] {
    return [...this.shapes];
  }

  sort(comparator: Comparator<IShape>): IShape[] {
    return [...this.shapes].sort(comparator.compare.bind(comparator));
  }
}