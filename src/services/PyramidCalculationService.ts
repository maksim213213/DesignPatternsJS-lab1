import { Pyramid } from '../entities';

/**
 * Service for Pyramid calculations
 */
export class PyramidCalculationService {
  /**
   * Calculate distance between two 3D points
   */
  private static calculateDistance3D(
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number,
  ): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Calculate area of rectangle base
   */
  private static calculateBaseArea(pyramid: Pyramid): number {
    const { point1, point2, point3, point4 } = pyramid;

    // Get unique x and y coordinates
    const xs = [point1.x, point2.x, point3.x, point4.x].sort((a, b) => a - b);
    const ys = [point1.y, point2.y, point3.y, point4.y].sort((a, b) => a - b);

    const width = xs[xs.length - 1] - xs[0];
    const height = ys[ys.length - 1] - ys[0];

    return Math.abs(width * height);
  }

  /**
   * Calculate distance from apex to base plane
   */
  private static calculateHeight(pyramid: Pyramid): number {
    const baseZ = pyramid.point1.z;
    const apexZ = pyramid.apexPoint.z;

    return Math.abs(apexZ - baseZ);
  }

  /**
   * Calculate volume of pyramid
   */
  static calculateVolume(pyramid: Pyramid): number {
    const baseArea = this.calculateBaseArea(pyramid);
    const height = this.calculateHeight(pyramid);

    return (baseArea * height) / 3;
  }

  /**
   * Calculate area of triangular face
   */
  private static calculateTriangleFaceArea(
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number,
    x3: number,
    y3: number,
    z3: number,
  ): number {
    // Vector 1
    const v1x = x2 - x1;
    const v1y = y2 - y1;
    const v1z = z2 - z1;

    // Vector 2
    const v2x = x3 - x1;
    const v2y = y3 - y1;
    const v2z = z3 - z1;

    // Cross product
    const cx = v1y * v2z - v1z * v2y;
    const cy = v1z * v2x - v1x * v2z;
    const cz = v1x * v2y - v1y * v2x;

    const magnitude = Math.sqrt(cx * cx + cy * cy + cz * cz);

    return magnitude / 2;
  }

  /**
   * Calculate surface area of pyramid (base + 4 triangular faces)
   */
  static calculateSurfaceArea(pyramid: Pyramid): number {
    const { point1, point2, point3, point4, apexPoint } = pyramid;

    const baseArea = this.calculateBaseArea(pyramid);

    // Calculate area of 4 triangular faces
    const face1 = this.calculateTriangleFaceArea(
      point1.x, point1.y, point1.z,
      point2.x, point2.y, point2.z,
      apexPoint.x, apexPoint.y, apexPoint.z,
    );

    const face2 = this.calculateTriangleFaceArea(
      point2.x, point2.y, point2.z,
      point3.x, point3.y, point3.z,
      apexPoint.x, apexPoint.y, apexPoint.z,
    );

    const face3 = this.calculateTriangleFaceArea(
      point3.x, point3.y, point3.z,
      point4.x, point4.y, point4.z,
      apexPoint.x, apexPoint.y, apexPoint.z,
    );

    const face4 = this.calculateTriangleFaceArea(
      point4.x, point4.y, point4.z,
      point1.x, point1.y, point1.z,
      apexPoint.x, apexPoint.y, apexPoint.z,
    );

    return baseArea + face1 + face2 + face3 + face4;
  }

  /**
   * Check if pyramid base is on coordinate plane (XY, XZ, or YZ)
   */
  static isBaseOnCoordinatePlane(pyramid: Pyramid): boolean {
    const { point1, point2, point3, point4 } = pyramid;
    const epsilon = Number.EPSILON * 100;

    const baseZ1 = point1.z;
    const baseZ2 = point2.z;
    const baseZ3 = point3.z;
    const baseZ4 = point4.z;

    // Check if all base points have same Z coordinate (on XY plane)
    if (
      Math.abs(baseZ1 - baseZ2) < epsilon
      && Math.abs(baseZ2 - baseZ3) < epsilon
      && Math.abs(baseZ3 - baseZ4) < epsilon
    ) {
      return true;
    }

    // Check if all base points have same Y coordinate (on XZ plane)
    const baseY1 = point1.y;
    const baseY2 = point2.y;
    const baseY3 = point3.y;
    const baseY4 = point4.y;

    if (
      Math.abs(baseY1 - baseY2) < epsilon
      && Math.abs(baseY2 - baseY3) < epsilon
      && Math.abs(baseY3 - baseY4) < epsilon
    ) {
      return true;
    }

    // Check if all base points have same X coordinate (on YZ plane)
    const baseX1 = point1.x;
    const baseX2 = point2.x;
    const baseX3 = point3.x;
    const baseX4 = point4.x;

    if (
      Math.abs(baseX1 - baseX2) < epsilon
      && Math.abs(baseX2 - baseX3) < epsilon
      && Math.abs(baseX3 - baseX4) < epsilon
    ) {
      return true;
    }

    return false;
  }

  /**
   * Calculate volume ratio when pyramid is cut by coordinate plane
   * Returns ratio of volume above plane to total volume
   */
  static calculateVolumeRatioAfterCut(
    pyramid: Pyramid,
    planeType: 'XY' | 'XZ' | 'YZ',
    planeValue: number,
  ): number {
    const totalVolume = this.calculateVolume(pyramid);

    if (totalVolume < Number.EPSILON) {
      return 0;
    }

    // Simplified calculation: determine what fraction of height is above plane
    const { point1, apexPoint } = pyramid;

    let height = 0;
    let baseValue = 0;
    let apexValue = 0;

    if (planeType === 'XY') {
      baseValue = point1.z;
      apexValue = apexPoint.z;
      height = Math.abs(apexValue - baseValue);
    } else if (planeType === 'XZ') {
      baseValue = point1.y;
      apexValue = apexPoint.y;
      height = Math.abs(apexValue - baseValue);
    } else if (planeType === 'YZ') {
      baseValue = point1.x;
      apexValue = apexPoint.x;
      height = Math.abs(apexValue - baseValue);
    }

    // Calculate distance from plane to apex
    let distanceToApex = Math.abs(apexValue - planeValue);

    if (distanceToApex > height) {
      distanceToApex = height;
    }

    // Volume scales with cube of height ratio
    const heightRatio = distanceToApex / height;
    const volumeRatio = heightRatio ** 3;

    return volumeRatio;
  }
}
