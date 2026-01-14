import { FileServiceProxy, User } from '../services';
import { ReadFileCommand, WriteFileCommand, DeleteFileCommand, CommandInvoker } from '../commands/FileCommands';
import * as fs from 'fs';
import * as path from 'path';

describe('FileCommands', () => {
  let proxy: FileServiceProxy;
  let admin: User;
  let testFile: string;
  let invoker: CommandInvoker;

  beforeEach(() => {
    proxy = new FileServiceProxy();
    admin = { id: 'admin', role: 'admin' };
    testFile = './test_command_file.txt';
    invoker = new CommandInvoker();

    proxy.setPermission({
      userId: 'admin',
      filePath: testFile,
      canRead: true,
      canWrite: true,
      canDelete: true
    });

    // Clean up any existing test file
    try {
      fs.unlinkSync(path.resolve(testFile));
    } catch {}
  });

  afterEach(() => {
    // Clean up test file
    try {
      fs.unlinkSync(path.resolve(testFile));
    } catch {}
  });

  describe('WriteFileCommand', () => {
    it('should execute write command', () => {
      const command = new WriteFileCommand(proxy, testFile, 'test content', admin);
      invoker.executeCommand(command);

      const content = proxy.readFile(testFile, admin);
      expect(content).toBe('test content');
    });

    it('should undo write command', () => {
      // Write initial content
      proxy.writeFile(testFile, 'initial content', admin);

      // Execute write command
      const command = new WriteFileCommand(proxy, testFile, 'new content', admin);
      invoker.executeCommand(command);

      // Verify new content
      let content = proxy.readFile(testFile, admin);
      expect(content).toBe('new content');

      // Undo
      invoker.undoLastCommand();

      // Verify restored content
      content = proxy.readFile(testFile, admin);
      expect(content).toBe('initial content');
    });
  });

  describe('ReadFileCommand', () => {
    it('should execute read command', () => {
      proxy.writeFile(testFile, 'read test content', admin);

      const command = new ReadFileCommand(proxy, testFile, admin);
      invoker.executeCommand(command);

      expect(command.getContent()).toBe('read test content');
    });

    it('should undo read command (no-op)', () => {
      proxy.writeFile(testFile, 'content', admin);

      const command = new ReadFileCommand(proxy, testFile, admin);
      invoker.executeCommand(command);
      invoker.undoLastCommand(); // Should not throw

      // File should still exist and have same content
      const content = proxy.readFile(testFile, admin);
      expect(content).toBe('content');
    });
  });

  describe('DeleteFileCommand', () => {
    it('should execute delete command', () => {
      proxy.writeFile(testFile, 'content to delete', admin);

      const command = new DeleteFileCommand(proxy, testFile, admin);
      invoker.executeCommand(command);

      expect(() => proxy.readFile(testFile, admin)).toThrow();
    });

    it('should undo delete command', () => {
      proxy.writeFile(testFile, 'content to restore', admin);

      const command = new DeleteFileCommand(proxy, testFile, admin);
      invoker.executeCommand(command);

      // File should be deleted
      expect(() => proxy.readFile(testFile, admin)).toThrow();

      // Undo should restore
      invoker.undoLastCommand();

      // File should be restored
      const content = proxy.readFile(testFile, admin);
      expect(content).toBe('content to restore');
    });
  });

  describe('CommandInvoker', () => {
    it('should maintain command history', () => {
      const writeCmd = new WriteFileCommand(proxy, testFile, 'test', admin);
      const readCmd = new ReadFileCommand(proxy, testFile, admin);

      invoker.executeCommand(writeCmd);
      invoker.executeCommand(readCmd);

      expect(invoker.getHistory()).toHaveLength(2);
    });

    it('should handle undo when no commands', () => {
      expect(() => invoker.undoLastCommand()).not.toThrow();
    });
  });
});