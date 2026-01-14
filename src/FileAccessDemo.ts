import { FileServiceProxy, User, Permission } from './services';
import { ReadFileCommand, WriteFileCommand, DeleteFileCommand, CommandInvoker } from './commands';
import logger from './utils/logger';

function demonstrateProxyAndCommand(): void {
  logger.info('=== Proxy and Command Pattern Demonstration ===');

  // Create file service proxy
  const fileService = new FileServiceProxy();

  // Create users
  const admin: User = { id: 'admin', role: 'admin' };
  const user: User = { id: 'user', role: 'user' };
  const guest: User = { id: 'guest', role: 'guest' };

  // Set custom permissions for test file
  const testFile = './test_file.txt';
  fileService.setPermission({
    userId: 'admin',
    filePath: testFile,
    canRead: true,
    canWrite: true,
    canDelete: true
  });

  fileService.setPermission({
    userId: 'user',
    filePath: testFile,
    canRead: true,
    canWrite: true,
    canDelete: false
  });

  fileService.setPermission({
    userId: 'guest',
    filePath: testFile,
    canRead: false,
    canWrite: false,
    canDelete: false
  });

  // Create command invoker
  const invoker = new CommandInvoker();

  logger.info('--- Testing Write Operations ---');

  // Admin writes to file
  const writeCommand1 = new WriteFileCommand(fileService, testFile, 'Hello from admin!', admin);
  invoker.executeCommand(writeCommand1);

  // User tries to write (should succeed)
  const writeCommand2 = new WriteFileCommand(fileService, testFile, 'Hello from user!', user);
  invoker.executeCommand(writeCommand2);

  // Guest tries to write (should fail)
  try {
    const writeCommand3 = new WriteFileCommand(fileService, testFile, 'Hello from guest!', guest);
    invoker.executeCommand(writeCommand3);
  } catch (error) {
    logger.warn(`Expected error: ${error}`);
  }

  logger.info('--- Testing Read Operations ---');

  // Admin reads file
  const readCommand1 = new ReadFileCommand(fileService, testFile, admin);
  invoker.executeCommand(readCommand1);

  // User reads file
  const readCommand2 = new ReadFileCommand(fileService, testFile, user);
  invoker.executeCommand(readCommand2);

  // Guest tries to read (should fail)
  try {
    const readCommand3 = new ReadFileCommand(fileService, testFile, guest);
    invoker.executeCommand(readCommand3);
  } catch (error) {
    logger.warn(`Expected error: ${error}`);
  }

  logger.info('--- Testing Delete Operations ---');

  // User tries to delete (should fail)
  try {
    const deleteCommand1 = new DeleteFileCommand(fileService, testFile, user);
    invoker.executeCommand(deleteCommand1);
  } catch (error) {
    logger.warn(`Expected error: ${error}`);
  }

  // Admin deletes file
  const deleteCommand2 = new DeleteFileCommand(fileService, testFile, admin);
  invoker.executeCommand(deleteCommand2);

  logger.info('--- Testing Undo Operations ---');

  // Undo the delete (should restore the file)
  invoker.undoLastCommand();

  // Verify file is restored by reading it
  const readCommand4 = new ReadFileCommand(fileService, testFile, admin);
  invoker.executeCommand(readCommand4);

  // Undo the last write (should revert to previous content)
  invoker.undoLastCommand();

  // Read again to verify undo
  const readCommand5 = new ReadFileCommand(fileService, testFile, admin);
  invoker.executeCommand(readCommand5);

  logger.info(`Command history length: ${invoker.getHistory().length}`);

  logger.info('=== Demonstration Complete ===');
}

// Export for use in main if needed
export { demonstrateProxyAndCommand };