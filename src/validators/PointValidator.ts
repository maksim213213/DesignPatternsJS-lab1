export class PointValidator {
  static isValidCoordinates(x: number, y: number): boolean {
    return Number.isFinite(x) && Number.isFinite(y);
  }

  static validate(x: number, y: number): void {
    if (!this.isValidCoordinates(x, y)) {
      throw new Error('Point coordinates must be finite numbers');
    }
  }
}
