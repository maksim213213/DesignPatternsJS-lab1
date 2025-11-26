import { Triangle } from '../entities';

export class TriangleCalculationService {
  private static calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static calculatePerimeter(triangle: Triangle): number {
    const { point1, point2, point3 } = triangle;

    const side1 = this.calculateDistance(point1.x, point1.y, point2.x, point2.y);
    const side2 = this.calculateDistance(point2.x, point2.y, point3.x, point3.y);
    const side3 = this.calculateDistance(point3.x, point3.y, point1.x, point1.y);

    return side1 + side2 + side3;
  }

  static calculateArea(triangle: Triangle): number {
    const { point1, point2, point3 } = triangle;

    const area = Math.abs(
      (point2.x - point1.x) * (point3.y - point1.y)
      - (point3.x - point1.x) * (point2.y - point1.y),
    ) / 2;

    return area;
  }

  private static getSides(triangle: Triangle): [number, number, number] {
    const { point1, point2, point3 } = triangle;

    const side1 = this.calculateDistance(point1.x, point1.y, point2.x, point2.y);
    const side2 = this.calculateDistance(point2.x, point2.y, point3.x, point3.y);
    const side3 = this.calculateDistance(point3.x, point3.y, point1.x, point1.y);

    return [side1, side2, side3];
  }

  static isRightAngled(triangle: Triangle): boolean {
    const sides = this.getSides(triangle);
    sides.sort((a, b) => a - b);

    const [a, b, c] = sides;
    const epsilon = Number.EPSILON * 100;

    return Math.abs(a * a + b * b - c * c) < epsilon;
  }

  static isIsosceles(triangle: Triangle): boolean {
    const [a, b, c] = this.getSides(triangle);
    const epsilon = Number.EPSILON * 100;

    return (
      Math.abs(a - b) < epsilon
      || Math.abs(b - c) < epsilon
      || Math.abs(a - c) < epsilon
    );
  }

  static isEquilateral(triangle: Triangle): boolean {
    const [a, b, c] = this.getSides(triangle);
    const epsilon = Number.EPSILON * 100;

    return (
      Math.abs(a - b) < epsilon
      && Math.abs(b - c) < epsilon
    );
  }

  static isAcute(triangle: Triangle): boolean {
    const sides = this.getSides(triangle);
    sides.sort((a, b) => a - b);

    const [a, b, c] = sides;
    const epsilon = Number.EPSILON * 100;

    return a * a + b * b - c * c > epsilon;
  }

  static isObtuse(triangle: Triangle): boolean {
    return !this.isAcute(triangle) && !this.isRightAngled(triangle);
  }
}
