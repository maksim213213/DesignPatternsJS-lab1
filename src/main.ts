import { ShapeFileReaderService } from './services';
import { TriangleCalculationService, PyramidCalculationService } from './services';
import logger from './utils/logger';

async function main(): Promise<void> {
  try {
    logger.info('Application started');

    // Read shapes from file
    const result = ShapeFileReaderService.readTrianglesFromFile('./data/shapes.txt');

    logger.info(`Loaded ${result.triangles.length} triangles and ${result.pyramids.length} pyramids`);

    // Process triangles
    result.triangles.forEach((triangle) => {
      const area = TriangleCalculationService.calculateArea(triangle);
      const perimeter = TriangleCalculationService.calculatePerimeter(triangle);
      const isRight = TriangleCalculationService.isRightAngled(triangle);
      const isIsosceles = TriangleCalculationService.isIsosceles(triangle);
      const isEquilateral = TriangleCalculationService.isEquilateral(triangle);
      const isAcute = TriangleCalculationService.isAcute(triangle);
      const isObtuse = TriangleCalculationService.isObtuse(triangle);

      logger.info(`Triangle ${triangle.id}:`);
      logger.info(`  Area: ${area.toFixed(2)}`);
      logger.info(`  Perimeter: ${perimeter.toFixed(2)}`);
      const typeInfo = `Right=${isRight}, Iso=${isIsosceles}, Eq=${isEquilateral}, Ac=${isAcute}, Obt=${isObtuse}`;
      logger.info(`  Type: ${typeInfo}`);
    });

    // Process pyramids
    result.pyramids.forEach((pyramid) => {
      const volume = PyramidCalculationService.calculateVolume(pyramid);
      const surfaceArea = PyramidCalculationService.calculateSurfaceArea(pyramid);
      const baseOnPlane = PyramidCalculationService.isBaseOnCoordinatePlane(pyramid);
      const ratioXY = PyramidCalculationService.calculateVolumeRatioAfterCut(pyramid, 'XY', pyramid.point1.z + 1);

      logger.info(`Pyramid ${pyramid.id}:`);
      logger.info(`  Volume: ${volume.toFixed(2)}`);
      logger.info(`  Surface Area: ${surfaceArea.toFixed(2)}`);
      logger.info(`  Base on plane: ${baseOnPlane}`);
      logger.info(`  Volume ratio: ${ratioXY.toFixed(4)}`);
    });

    // Log errors
    if (result.errors.length > 0) {
      logger.warn(`Found ${result.errors.length} invalid lines:`);
      result.errors.forEach((err) => {
        logger.warn(`  Line ${err.lineNumber}: ${err.error}`);
      });
    }

    logger.info('Application finished successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Application error: ${errorMessage}`);
    process.exit(1);
  }
}

main();
