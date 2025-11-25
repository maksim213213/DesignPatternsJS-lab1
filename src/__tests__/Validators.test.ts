import {
  NumericValidator,
  PointValidator,
  Point3DValidator,
  TriangleValidator,
  PyramidValidator,
} from '../validators';

describe('NumericValidator', () => {
  describe('isValidNumber', () => {
    it('should validate integer strings', () => {
      expect(NumericValidator.isValidNumber('123')).toBe(true);
      expect(NumericValidator.isValidNumber('0')).toBe(true);
      expect(NumericValidator.isValidNumber('-42')).toBe(true);
    });

    it('should validate decimal strings', () => {
      expect(NumericValidator.isValidNumber('3.14')).toBe(true);
      expect(NumericValidator.isValidNumber('-2.5')).toBe(true);
      expect(NumericValidator.isValidNumber('0.001')).toBe(true);
    });

    it('should reject invalid number strings', () => {
      expect(NumericValidator.isValidNumber('12a')).toBe(false);
      expect(NumericValidator.isValidNumber('1.2.3')).toBe(false);
      expect(NumericValidator.isValidNumber('abc')).toBe(false);
    });

    it('should reject empty or null values', () => {
      expect(NumericValidator.isValidNumber('')).toBe(false);
      expect(NumericValidator.isValidNumber(' ')).toBe(false);
    });
  });

  describe('parseNumber', () => {
    it('should parse valid numbers', () => {
      expect(NumericValidator.parseNumber('42')).toBe(42);
      expect(NumericValidator.parseNumber('3.14')).toBeCloseTo(3.14, 5);
      expect(NumericValidator.parseNumber('-2.5')).toBe(-2.5);
    });

    it('should throw error for invalid format', () => {
      expect(() => NumericValidator.parseNumber('12a')).toThrow();
      expect(() => NumericValidator.parseNumber('abc')).toThrow();
    });
  });
});

describe('PointValidator', () => {
  describe('isValidCoordinates', () => {
    it('should validate finite coordinates', () => {
      expect(PointValidator.isValidCoordinates(0, 0)).toBe(true);
      expect(PointValidator.isValidCoordinates(3.14, -2.5)).toBe(true);
      expect(PointValidator.isValidCoordinates(-100, 100)).toBe(true);
    });

    it('should reject infinite coordinates', () => {
      expect(PointValidator.isValidCoordinates(Infinity, 0)).toBe(false);
      expect(PointValidator.isValidCoordinates(0, -Infinity)).toBe(false);
    });

    it('should reject NaN coordinates', () => {
      expect(PointValidator.isValidCoordinates(NaN, 0)).toBe(false);
      expect(PointValidator.isValidCoordinates(0, NaN)).toBe(false);
    });
  });
});

describe('Point3DValidator', () => {
  describe('isValidCoordinates', () => {
    it('should validate finite 3D coordinates', () => {
      expect(Point3DValidator.isValidCoordinates(0, 0, 0)).toBe(true);
      expect(Point3DValidator.isValidCoordinates(1.5, -2.5, 3)).toBe(true);
    });

    it('should reject infinite or NaN coordinates', () => {
      expect(Point3DValidator.isValidCoordinates(Infinity, 0, 0)).toBe(false);
      expect(Point3DValidator.isValidCoordinates(0, NaN, 0)).toBe(false);
      expect(Point3DValidator.isValidCoordinates(0, 0, -Infinity)).toBe(false);
    });
  });
});

describe('TriangleValidator', () => {
  describe('validateLine', () => {
    it('should validate correct triangle line', () => {
      const result = TriangleValidator.validateLine('0 0 3 0 0 4');

      expect(result.coordinates).toHaveLength(6);
      expect(result.coordinates).toEqual([0, 0, 3, 0, 0, 4]);
    });

    it('should throw error for empty line', () => {
      expect(() => TriangleValidator.validateLine('')).toThrow();
    });

    it('should throw error for insufficient coordinates', () => {
      expect(() => TriangleValidator.validateLine('1 2 3')).toThrow();
    });

    it('should throw error for invalid numeric format', () => {
      expect(() => TriangleValidator.validateLine('1a 2 3 4 5 6')).toThrow();
    });

    it('should handle extra coordinates (ignore them)', () => {
      const result = TriangleValidator.validateLine('0 0 3 0 0 4 100 200');

      expect(result.coordinates).toHaveLength(6);
    });
  });

  describe('isValidTriangle', () => {
    it('should validate non-collinear points', () => {
      expect(TriangleValidator.isValidTriangle(0, 0, 3, 0, 0, 4)).toBe(true);
      expect(TriangleValidator.isValidTriangle(0, 0, 2, 0, 1, 2)).toBe(true);
    });

    it('should reject collinear points', () => {
      expect(TriangleValidator.isValidTriangle(0, 0, 1, 1, 2, 2)).toBe(false);
      expect(TriangleValidator.isValidTriangle(0, 0, 2, 0, 4, 0)).toBe(false);
    });
  });
});

describe('PyramidValidator', () => {
  describe('validateLine', () => {
    it('should validate correct pyramid line', () => {
      const result = PyramidValidator.validateLine('0 0 0 3 0 0 3 4 0 0 4 0 1.5 2 5');

      expect(result.coordinates).toHaveLength(15);
    });

    it('should throw error for insufficient coordinates', () => {
      expect(() => PyramidValidator.validateLine('1 2 3 4 5 6')).toThrow();
    });

    it('should throw error for invalid numeric format', () => {
      expect(() => PyramidValidator.validateLine('1a 2 3 4 5 6 7 8 9 10 11 12 13 14 15')).toThrow();
    });
  });

  describe('isValidRectangularBase', () => {
    it('should validate rectangular base', () => {
      expect(PyramidValidator.isValidRectangularBase(0, 0, 3, 0, 3, 4, 0, 4)).toBe(true);
      expect(PyramidValidator.isValidRectangularBase(0, 0, 2, 0, 2, 2, 0, 2)).toBe(true);
    });

    it('should reject non-rectangular base', () => {
      expect(PyramidValidator.isValidRectangularBase(0, 0, 3, 1, 3, 4, 0, 4)).toBe(false);
    });
  });

  describe('isValidPyramidHeight', () => {
    it('should validate different heights', () => {
      expect(PyramidValidator.isValidPyramidHeight(0, 5)).toBe(true);
      expect(PyramidValidator.isValidPyramidHeight(5, 0)).toBe(true);
      expect(PyramidValidator.isValidPyramidHeight(-1, 1)).toBe(true);
    });

    it('should reject same height', () => {
      expect(PyramidValidator.isValidPyramidHeight(0, 0)).toBe(false);
      expect(PyramidValidator.isValidPyramidHeight(5, 5)).toBe(false);
    });
  });
});
