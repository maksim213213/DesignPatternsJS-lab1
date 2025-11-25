/**
 * Custom exception for file reading operations
 */
export class FileReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileReadError';
    Object.setPrototypeOf(this, FileReadError.prototype);
  }
}
