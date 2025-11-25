/**
 * Custom exception for invalid point coordinates
 */
export class InvalidPointError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPointError';
    Object.setPrototypeOf(this, InvalidPointError.prototype);
  }
}
