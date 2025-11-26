import { NumericValidator } from './NumericValidator';
import { Point3DValidator } from './Point3DValidator';
import { COORDINATE_COUNT_PYRAMID } from './ValidationConstants';

export class PyramidValidator {
  static validateLine(line: string): { coordinates: number[] } {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      throw new Error('Invalid or empty line');
    }

    const parts = trimmedLine.split(/\s+/);

    if (parts.length < COORDINATE_COUNT_PYRAMID) {
      throw new Error(`Expected ${COORDINATE_COUNT_PYRAMID} coordinates, got ${parts.length}`);
    }

    const coordinates: number[] = [];

    for (let i = 0; i < COORDINATE_COUNT_PYRAMID; i += 1) {
      if (!NumericValidator.isValidNumber(parts[i])) {
        throw new Error(`Invalid coordinate format at position ${i}: ${parts[i]}`);
      }
      coordinates.push(NumericValidator.parseNumber(parts[i]));
    }

    for (let i = 0; i < 5; i += 1) {
      const x = coordinates[i * 3];
      const y = coordinates[i * 3 + 1];
      const z = coordinates[i * 3 + 2];
      Point3DValidator.validate(x, y, z);
    }

    return { coordinates };
  }

  static isValidRectangularBase(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
  ): boolean {

    const xs = [x1, x2, x3, x4].sort((a, b) => a - b);
    const ys = [y1, y2, y3, y4].sort((a, b) => a - b);

    const uniqueXs = new Set(xs);
    const uniqueYs = new Set(ys);

    return uniqueXs.size === 2 && uniqueYs.size === 2;
  }

  static isValidPyramidHeight(baseZ: number, apexZ: number): boolean {
    return Math.abs(baseZ - apexZ) > Number.EPSILON;
  }
}
