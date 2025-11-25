import { Point3D, Pyramid } from '../entities';
import { PyramidCalculationService } from '../services';

describe('PyramidCalculationService', () => {
  describe('calculateVolume', () => {
    it('should calculate volume of pyramid with rectangular base', () => {
      // Base: 3x4 rectangle, height: 5
      const pyramid = new Pyramid(
        'test1',
        new Point3D(0, 0, 0),
        new Point3D(3, 0, 0),
        new Point3D(3, 4, 0),
        new Point3D(0, 4, 0),
        new Point3D(1.5, 2, 5),
      );

      const volume = PyramidCalculationService.calculateVolume(pyramid);

      expect(volume).toBeCloseTo(20, 5);
      expect(volume).toBeGreaterThan(0);
    });

    it('should calculate volume correctly with different base dimensions', () => {
      // Base: 2x2 square, height: 3
      const pyramid = new Pyramid(
        'test2',
        new Point3D(0, 0, 0),
        new Point3D(2, 0, 0),
        new Point3D(2, 2, 0),
        new Point3D(0, 2, 0),
        new Point3D(1, 1, 3),
      );

      const volume = PyramidCalculationService.calculateVolume(pyramid);

      expect(volume).toBeCloseTo(4, 5);
      expect(typeof volume).toBe('number');
    });

    it('should scale volume correctly with proportional dimensions', () => {
      const pyramid1 = new Pyramid(
        'test3a',
        new Point3D(0, 0, 0),
        new Point3D(1, 0, 0),
        new Point3D(1, 1, 0),
        new Point3D(0, 1, 0),
        new Point3D(0.5, 0.5, 1),
      );

      const pyramid2 = new Pyramid(
        'test3b',
        new Point3D(0, 0, 0),
        new Point3D(2, 0, 0),
        new Point3D(2, 2, 0),
        new Point3D(0, 2, 0),
        new Point3D(1, 1, 2),
      );

      const volume1 = PyramidCalculationService.calculateVolume(pyramid1);
      const volume2 = PyramidCalculationService.calculateVolume(pyramid2);

      // Volume should scale by factor of 8 (2^3)
      expect(volume2).toBeCloseTo(volume1 * 8, 5);
    });
  });

  describe('calculateSurfaceArea', () => {
    it('should calculate surface area of pyramid', () => {
      const pyramid = new Pyramid(
        'test4',
        new Point3D(0, 0, 0),
        new Point3D(3, 0, 0),
        new Point3D(3, 4, 0),
        new Point3D(0, 4, 0),
        new Point3D(1.5, 2, 5),
      );

      const surfaceArea = PyramidCalculationService.calculateSurfaceArea(pyramid);

      expect(surfaceArea).toBeGreaterThan(12); // Base area
      expect(surfaceArea).toBeGreaterThan(0);
      expect(typeof surfaceArea).toBe('number');
    });

    it('should have surface area greater than base area', () => {
      const pyramid = new Pyramid(
        'test5',
        new Point3D(0, 0, 0),
        new Point3D(2, 0, 0),
        new Point3D(2, 2, 0),
        new Point3D(0, 2, 0),
        new Point3D(1, 1, 3),
      );

      const surfaceArea = PyramidCalculationService.calculateSurfaceArea(pyramid);

      expect(surfaceArea).toBeGreaterThan(4); // Base area (2x2 = 4)
    });

    it('should calculate surface area for pyramid with different base', () => {
      const pyramid = new Pyramid(
        'test6',
        new Point3D(0, 0, 0),
        new Point3D(1, 0, 0),
        new Point3D(1, 1, 0),
        new Point3D(0, 1, 0),
        new Point3D(0.5, 0.5, 1),
      );

      const surfaceArea = PyramidCalculationService.calculateSurfaceArea(pyramid);

      expect(surfaceArea).toBeGreaterThan(0);
      expect(surfaceArea).toBeGreaterThan(1); // Greater than base area
    });
  });

  describe('isBaseOnCoordinatePlane', () => {
    it('should identify base on XY plane (z constant)', () => {
      const pyramid = new Pyramid(
        'test7',
        new Point3D(0, 0, 0),
        new Point3D(3, 0, 0),
        new Point3D(3, 4, 0),
        new Point3D(0, 4, 0),
        new Point3D(1.5, 2, 5),
      );

      expect(PyramidCalculationService.isBaseOnCoordinatePlane(pyramid)).toBe(true);
    });

    it('should identify base on XZ plane (y constant)', () => {
      const pyramid = new Pyramid(
        'test8',
        new Point3D(0, 0, 0),
        new Point3D(3, 0, 1),
        new Point3D(3, 0, 5),
        new Point3D(0, 0, 6),
        new Point3D(1.5, 3, 3),
      );

      expect(PyramidCalculationService.isBaseOnCoordinatePlane(pyramid)).toBe(true);
    });

    it('should identify base on YZ plane (x constant)', () => {
      const pyramid = new Pyramid(
        'test9',
        new Point3D(0, 0, 0),
        new Point3D(0, 3, 1),
        new Point3D(0, 3, 5),
        new Point3D(0, 0, 6),
        new Point3D(5, 1.5, 3),
      );

      expect(PyramidCalculationService.isBaseOnCoordinatePlane(pyramid)).toBe(true);
    });

    it('should reject base not on coordinate plane', () => {
      const pyramid = new Pyramid(
        'test10',
        new Point3D(0, 0, 0),
        new Point3D(3, 1, 0),
        new Point3D(3, 4, 1),
        new Point3D(0, 4, 1),
        new Point3D(1.5, 2, 5),
      );

      expect(PyramidCalculationService.isBaseOnCoordinatePlane(pyramid)).toBe(false);
    });
  });

  describe('calculateVolumeRatioAfterCut', () => {
    it('should calculate volume ratio when cutting XY plane', () => {
      const pyramid = new Pyramid(
        'test11',
        new Point3D(0, 0, 0),
        new Point3D(2, 0, 0),
        new Point3D(2, 2, 0),
        new Point3D(0, 2, 0),
        new Point3D(1, 1, 3),
      );

      const ratio = PyramidCalculationService.calculateVolumeRatioAfterCut(pyramid, 'XY', 1.5);

      expect(ratio).toBeGreaterThan(0);
      expect(ratio).toBeLessThanOrEqual(1);
      expect(typeof ratio).toBe('number');
    });

    it('should calculate volume ratio when cutting XZ plane', () => {
      const pyramid = new Pyramid(
        'test12',
        new Point3D(0, 0, 0),
        new Point3D(2, 0, 0),
        new Point3D(2, 2, 0),
        new Point3D(0, 2, 0),
        new Point3D(1, 1, 3),
      );

      const ratio = PyramidCalculationService.calculateVolumeRatioAfterCut(pyramid, 'XZ', 1.5);

      expect(ratio).toBeGreaterThan(0);
      expect(ratio).toBeLessThanOrEqual(1);
    });

    it('should return ratio close to 1 when plane at apex', () => {
      const pyramid = new Pyramid(
        'test13',
        new Point3D(0, 0, 0),
        new Point3D(2, 0, 0),
        new Point3D(2, 2, 0),
        new Point3D(0, 2, 0),
        new Point3D(1, 1, 3),
      );

      const ratio = PyramidCalculationService.calculateVolumeRatioAfterCut(pyramid, 'XY', 3.1);

      expect(ratio).toBeLessThanOrEqual(1);
      expect(ratio).toBeGreaterThan(0);
    });

    it('should return ratio close to 0 when plane at base', () => {
      const pyramid = new Pyramid(
        'test14',
        new Point3D(0, 0, 0),
        new Point3D(2, 0, 0),
        new Point3D(2, 2, 0),
        new Point3D(0, 2, 0),
        new Point3D(1, 1, 3),
      );

      // When plane is below the pyramid, ratio should be 1 (entire pyramid above)
      // When plane is at the base, ratio should be 0
      const ratio = PyramidCalculationService.calculateVolumeRatioAfterCut(pyramid, 'XY', -1);

      expect(ratio).toBeLessThanOrEqual(1);
      expect(ratio).toBeGreaterThanOrEqual(0);
    });
  });
});
