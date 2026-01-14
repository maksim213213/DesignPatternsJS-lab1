import { SecureFileService, User, Permission, FileService } from './FileService';
import { RealFileService } from './RealFileService';
import logger from '../utils/logger';

export class FileServiceProxy implements SecureFileService {
  private realService: FileService;
  private permissions: Map<string, Permission> = new Map();

  constructor() {
    this.realService = new RealFileService();
    this.initializeDefaultPermissions();
  }

  private initializeDefaultPermissions(): void {
    // Default permissions for demo
    this.permissions.set('admin-data.txt', {
      userId: 'admin',
      filePath: 'data.txt',
      canRead: true,
      canWrite: true,
      canDelete: true
    });

    this.permissions.set('user-data.txt', {
      userId: 'user',
      filePath: 'data.txt',
      canRead: true,
      canWrite: true,
      canDelete: false
    });

    this.permissions.set('guest-data.txt', {
      userId: 'guest',
      filePath: 'data.txt',
      canRead: true,
      canWrite: false,
      canDelete: false
    });
  }

  setPermission(permission: Permission): void {
    const key = `${permission.userId}-${permission.filePath}`;
    this.permissions.set(key, permission);
    logger.info(`Permission set for user ${permission.userId} on file ${permission.filePath}`);
  }

  private checkPermission(user: User, filePath: string, action: 'read' | 'write' | 'delete'): boolean {
    const key = `${user.id}-${filePath}`;
    const permission = this.permissions.get(key);

    if (!permission) {
      logger.warn(`No permission found for user ${user.id} on file ${filePath}`);
      return false;
    }

    let hasPermission = false;
    switch (action) {
      case 'read':
        hasPermission = permission.canRead;
        break;
      case 'write':
        hasPermission = permission.canWrite;
        break;
      case 'delete':
        hasPermission = permission.canDelete;
        break;
    }

    if (!hasPermission) {
      logger.warn(`Access denied: User ${user.id} cannot ${action} file ${filePath}`);
    }

    return hasPermission;
  }

  readFile(filePath: string, user: User): string {
    if (!this.checkPermission(user, filePath, 'read')) {
      throw new Error(`Access denied: User ${user.id} cannot read file ${filePath}`);
    }
    return this.realService.readFile(filePath);
  }

  writeFile(filePath: string, content: string, user: User): void {
    if (!this.checkPermission(user, filePath, 'write')) {
      throw new Error(`Access denied: User ${user.id} cannot write to file ${filePath}`);
    }
    this.realService.writeFile(filePath, content);
  }

  deleteFile(filePath: string, user: User): void {
    if (!this.checkPermission(user, filePath, 'delete')) {
      throw new Error(`Access denied: User ${user.id} cannot delete file ${filePath}`);
    }
    this.realService.deleteFile(filePath);
  }
}