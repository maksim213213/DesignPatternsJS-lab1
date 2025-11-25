import { NUMERIC_PATTERN } from '../utils/RegexPatterns';

/**
 * Validator for numeric values
 */
export class NumericValidator {
  static isValidNumber(value: string): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }
    return NUMERIC_PATTERN.test(value.trim());
  }

  static parseNumber(value: string): number {
    if (!this.isValidNumber(value)) {
      throw new Error(`Invalid number format: ${value}`);
    }
    const parsed = parseFloat(value.trim());
    if (Number.isNaN(parsed)) {
      throw new Error(`Cannot parse number: ${value}`);
    }
    return parsed;
  }
}
