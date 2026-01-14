import { IShape } from '../entities';

export interface Observer {
  update(shape: IShape): void;
  updateRemove(id: string | number): void;
}

export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(shape: IShape): void;
  notifyRemove(id: string): void;
}