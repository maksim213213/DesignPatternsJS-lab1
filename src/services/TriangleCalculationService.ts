import { Triangle } from '../entities';

/**
 * Service for Triangle calculations
 */
export class TriangleCalculationService {
  /**
   * Calculate distance between two points
   */
  private static calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculate perimeter of triangle
   */
  static calculatePerimeter(triangle: Triangle): number {
    const { point1, point2, point3 } = triangle;

    const side1 = this.calculateDistance(point1.x, point1.y, point2.x, point2.y);
    const side2 = this.calculateDistance(point2.x, point2.y, point3.x, point3.y);
    const side3 = this.calculateDistance(point3.x, point3.y, point1.x, point1.y);

    return side1 + side2 + side3;
  }

  /**
   * Calculate area of triangle using cross product
   */
  static calculateArea(triangle: Triangle): number {
    const { point1, point2, point3 } = triangle;

    const area = Math.abs(
      (point2.x - point1.x) * (point3.y - point1.y)
      - (point3.x - point1.x) * (point2.y - point1.y),
    ) / 2;

    return area;
  }

  /**
   * Get all three sides of the triangle
   */
  private static getSides(triangle: Triangle): [number, number, number] {
    const { point1, point2, point3 } = triangle;

    const side1 = this.calculateDistance(point1.x, point1.y, point2.x, point2.y);
    const side2 = this.calculateDistance(point2.x, point2.y, point3.x, point3.y);
    const side3 = this.calculateDistance(point3.x, point3.y, point1.x, point1.y);

    return [side1, side2, side3];
  }

  /**
   * Check if triangle is right-angled (has 90 degree angle)
   */
  static isRightAngled(triangle: Triangle): boolean {
    const sides = this.getSides(triangle);
    sides.sort((a, b) => a - b);

    const [a, b, c] = sides;
    const epsilon = Number.EPSILON * 100;

    return Math.abs(a * a + b * b - c * c) < epsilon;
  }

  /**
   * Check if triangle is isosceles (two equal sides)
   */
  static isIsosceles(triangle: Triangle): boolean {
    const [a, b, c] = this.getSides(triangle);
    const epsilon = Number.EPSILON * 100;

    return (
      Math.abs(a - b) < epsilon
      || Math.abs(b - c) < epsilon
      || Math.abs(a - c) < epsilon
    );
  }

  /**
   * Check if triangle is equilateral (all sides equal)
   */
  static isEquilateral(triangle: Triangle): boolean {
    const [a, b, c] = this.getSides(triangle);
    const epsilon = Number.EPSILON * 100;

    return (
      Math.abs(a - b) < epsilon
      && Math.abs(b - c) < epsilon
    );
  }

  /**
   * Check if triangle is acute (all angles < 90 degrees)
   */
  static isAcute(triangle: Triangle): boolean {
    const sides = this.getSides(triangle);
    sides.sort((a, b) => a - b);

    const [a, b, c] = sides;
    const epsilon = Number.EPSILON * 100;

    // For acute triangle: a² + b² > c²
    return a * a + b * b - c * c > epsilon;
  }

  /**
   * Check if triangle is obtuse (one angle > 90 degrees)
   */
  static isObtuse(triangle: Triangle): boolean {
    // A triangle that is not acute and not right-angled is obtuse
    return !this.isAcute(triangle) && !this.isRightAngled(triangle);
  }
}
