import fs from 'fs';
import path from 'path';
import { ShapeFactory } from '../factories';
import { FileReadError } from '../exceptions';
import logger from '../utils/logger';
import { Triangle, Pyramid } from '../entities';

interface ParseResult {
  triangles: Triangle[];
  pyramids: Pyramid[];
  errors: Array<{ lineNumber: number; content: string; error: string }>;
}

/**
 * Service for reading and parsing shape data from files
 */
export class ShapeFileReaderService {
  /**
   * Read triangles from file
   */
  static readTrianglesFromFile(filePath: string): ParseResult {
    const triangles: Triangle[] = [];
    const pyramids: Pyramid[] = [];
    const errors: Array<{ lineNumber: number; content: string; error: string }> = [];

    try {
      const absolutePath = path.resolve(process.cwd(), filePath);

      if (!fs.existsSync(absolutePath)) {
        throw new FileReadError(`File not found: ${absolutePath}`);
      }

      const content = fs.readFileSync(absolutePath, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        const lineNumber = index + 1;
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith('#')) {
          return; // Skip empty lines and comments
        }

        try {
          const parts = trimmedLine.split(/\s+/);
          const shapeType = parts[0].toUpperCase();
          const coordinatesLine = parts.slice(1).join(' ');

          if (shapeType === 'TRIANGLE') {
            const id = `triangle_${index}`;
            const triangle = ShapeFactory.createTriangle(id, coordinatesLine);
            triangles.push(triangle);
            logger.info(`Successfully parsed triangle at line ${lineNumber}`);
          } else if (shapeType === 'PYRAMID') {
            const id = `pyramid_${index}`;
            const pyramid = ShapeFactory.createPyramid(id, coordinatesLine);
            pyramids.push(pyramid);
            logger.info(`Successfully parsed pyramid at line ${lineNumber}`);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          errors.push({
            lineNumber,
            content: trimmedLine,
            error: errorMessage,
          });
          logger.warn(`Skipped invalid line ${lineNumber}: ${errorMessage}`);
        }
      });

      logger.info(`Finished parsing file: ${triangles.length} triangles, ${pyramids.length} pyramids`);

      return { triangles, pyramids, errors };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new FileReadError(`Failed to read file: ${errorMessage}`);
    }
  }
}
