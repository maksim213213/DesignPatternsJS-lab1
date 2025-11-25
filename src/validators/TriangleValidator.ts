import { NumericValidator } from './NumericValidator';
import { PointValidator } from './PointValidator';
import { COORDINATE_COUNT_TRIANGLE } from './ValidationConstants';

/**
 * Validator for Triangle data
 */
export class TriangleValidator {
  static validateLine(line: string): { coordinates: number[] } {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      throw new Error('Invalid or empty line');
    }

    const parts = trimmedLine.split(/\s+/);

    if (parts.length < COORDINATE_COUNT_TRIANGLE) {
      throw new Error(`Expected ${COORDINATE_COUNT_TRIANGLE} coordinates, got ${parts.length}`);
    }

    const coordinates: number[] = [];

    for (let i = 0; i < COORDINATE_COUNT_TRIANGLE; i += 1) {
      if (!NumericValidator.isValidNumber(parts[i])) {
        throw new Error(`Invalid coordinate format at position ${i}: ${parts[i]}`);
      }
      coordinates.push(NumericValidator.parseNumber(parts[i]));
    }

    // Validate points
    for (let i = 0; i < 3; i += 1) {
      const x = coordinates[i * 2];
      const y = coordinates[i * 2 + 1];
      PointValidator.validate(x, y);
    }

    return { coordinates };
  }

  static isValidTriangle(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
  ): boolean {
    // Check if points form a triangle (not collinear)
    const area = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)) / 2;
    return area > Number.EPSILON;
  }
}
