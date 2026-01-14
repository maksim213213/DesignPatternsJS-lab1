import { FileService } from './FileService';
import * as fs from 'fs';
import * as path from 'path';
import logger from '../utils/logger';

export class RealFileService implements FileService {
  readFile(filePath: string): string {
    try {
      const fullPath = path.resolve(filePath);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      const content = fs.readFileSync(fullPath, 'utf-8');
      logger.info(`File read successfully: ${filePath}`);
      return content;
    } catch (error) {
      logger.error(`Failed to read file ${filePath}: ${error}`);
      throw error;
    }
  }

  writeFile(filePath: string, content: string): void {
    try {
      const fullPath = path.resolve(filePath);
      const dir = path.dirname(fullPath);

      // Ensure directory exists
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(fullPath, content, 'utf-8');
      logger.info(`File written successfully: ${filePath}`);
    } catch (error) {
      logger.error(`Failed to write file ${filePath}: ${error}`);
      throw error;
    }
  }

  deleteFile(filePath: string): void {
    try {
      const fullPath = path.resolve(filePath);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      fs.unlinkSync(fullPath);
      logger.info(`File deleted successfully: ${filePath}`);
    } catch (error) {
      logger.error(`Failed to delete file ${filePath}: ${error}`);
      throw error;
    }
  }
}