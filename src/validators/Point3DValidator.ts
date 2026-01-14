export class Point3DValidator {
  static isValidCoordinates(x: number, y: number, z: number): boolean {
    return Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z);
  }

  static validate(x: number, y: number, z: number): void {
    if (!this.isValidCoordinates(x, y, z)) {
      throw new Error('Point3D coordinates must be finite numbers');
    }
  }
}
