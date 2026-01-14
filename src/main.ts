import { ShapeFileReaderService, Warehouse } from './services';
import { TriangleCalculationService, PyramidCalculationService } from './services';
import { ShapeRepository } from './repositories';
import {
  ShapeByNameSpecification,
  ShapeInFirstQuadrantSpecification,
  ShapeAreaInRangeSpecification,
  ShapeDistanceFromOriginInRangeSpecification
} from './specifications';
import { ShapeIdComparator, ShapeNameComparator } from './utils';
import { demonstrateProxyAndCommand } from './FileAccessDemo';
import logger from './utils/logger';

async function main(): Promise<void> {
  try {
    logger.info('Application started');

    const repository = new ShapeRepository();
    const warehouse = Warehouse.getInstance();
    repository.attach(warehouse);

    const result = ShapeFileReaderService.readTrianglesFromFile('./data/shapes.txt');

    logger.info(`Loaded ${result.triangles.length} triangles and ${result.pyramids.length} pyramids`);

    // Add shapes to repository
    result.triangles.forEach(triangle => repository.add(triangle));
    result.pyramids.forEach(pyramid => repository.add(pyramid));

    // Demonstrate searching
    const triangles = repository.findBySpecification(new ShapeByNameSpecification('Triangle'));
    logger.info(`Found ${triangles.length} triangles`);

    const firstQuadrantShapes = repository.findBySpecification(new ShapeInFirstQuadrantSpecification());
    logger.info(`Found ${firstQuadrantShapes.length} shapes in first quadrant`);

    const areaRangeShapes = repository.findBySpecification(new ShapeAreaInRangeSpecification(1, 10));
    logger.info(`Found ${areaRangeShapes.length} shapes with area between 1 and 10`);

    const distanceRangeShapes = repository.findBySpecification(new ShapeDistanceFromOriginInRangeSpecification(0, 5));
    logger.info(`Found ${distanceRangeShapes.length} shapes within distance 0-5 from origin`);

    // Demonstrate sorting
    const sortedById = repository.sort(new ShapeIdComparator());
    logger.info(`Sorted shapes by ID: ${sortedById.map(s => s.id).join(', ')}`);

    const sortedByName = repository.sort(new ShapeNameComparator());
    logger.info(`Sorted shapes by name: ${sortedByName.map(s => s.name).join(', ')}`);

    // Display warehouse metrics
    const allMetrics = warehouse.getAllMetrics();
    logger.info(`Warehouse has metrics for ${allMetrics.length} shapes`);

    // Demonstrate Proxy and Command patterns
    demonstrateProxyAndCommand();

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
