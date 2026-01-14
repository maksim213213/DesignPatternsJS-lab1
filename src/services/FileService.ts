export interface FileService {
  readFile(filePath: string): string;
  writeFile(filePath: string, content: string): void;
  deleteFile(filePath: string): void;
}

export interface SecureFileService {
  readFile(filePath: string, user: User): string;
  writeFile(filePath: string, content: string, user: User): void;
  deleteFile(filePath: string, user: User): void;
}

export interface User {
  id: string;
  role: 'admin' | 'user' | 'guest';
}

export interface Permission {
  userId: string;
  filePath: string;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}