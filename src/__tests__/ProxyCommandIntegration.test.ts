import { FileServiceProxy, User } from '../services';
import { ReadFileCommand, WriteFileCommand, DeleteFileCommand, CommandInvoker } from '../commands';

describe('Proxy and Command Integration Demo', () => {
  let proxy: FileServiceProxy;
  let admin: User;
  let user: User;
  let guest: User;
  let testFile: string;
  let invoker: CommandInvoker;

  beforeEach(() => {
    proxy = new FileServiceProxy();
    admin = { id: 'admin', role: 'admin' };
    user = { id: 'user', role: 'user' };
    guest = { id: 'guest', role: 'guest' };
    testFile = './integration_test.txt';
    invoker = new CommandInvoker();

    // Setup permissions
    proxy.setPermission({
      userId: 'admin',
      filePath: testFile,
      canRead: true,
      canWrite: true,
      canDelete: true
    });

    proxy.setPermission({
      userId: 'user',
      filePath: testFile,
      canRead: true,
      canWrite: true,
      canDelete: false
    });

    proxy.setPermission({
      userId: 'guest',
      filePath: testFile,
      canRead: false,
      canWrite: false,
      canDelete: false
    });
  });

  it('should demonstrate proxy access control', () => {
    // Admin can do everything
    expect(() => {
      proxy.writeFile(testFile, 'admin content', admin);
      const content = proxy.readFile(testFile, admin);
      expect(content).toBe('admin content');
      proxy.deleteFile(testFile, admin);
    }).not.toThrow();

    // User can read and write but not delete
    expect(() => {
      proxy.writeFile(testFile, 'user content', user);
      const content = proxy.readFile(testFile, user);
      expect(content).toBe('user content');
    }).not.toThrow();

    expect(() => {
      proxy.deleteFile(testFile, user);
    }).toThrow('Access denied');

    // Guest cannot do anything
    expect(() => proxy.readFile(testFile, guest)).toThrow('Access denied');
    expect(() => proxy.writeFile(testFile, 'content', guest)).toThrow('Access denied');
    expect(() => proxy.deleteFile(testFile, guest)).toThrow('Access denied');
  });

  it('should demonstrate command pattern with undo', () => {
    // Execute write command
    const writeCmd = new WriteFileCommand(proxy, testFile, 'original content', admin);
    invoker.executeCommand(writeCmd);

    // Verify content (execute read directly, not through invoker)
    const content1 = proxy.readFile(testFile, admin);
    expect(content1).toBe('original content');

    // Execute another write command
    const writeCmd2 = new WriteFileCommand(proxy, testFile, 'modified content', admin);
    invoker.executeCommand(writeCmd2);

    // Verify modified content (execute read directly, not through invoker)
    const content2 = proxy.readFile(testFile, admin);
    expect(content2).toBe('modified content');

    // Undo last write
    invoker.undoLastCommand();

    // Verify content is back to original (execute read directly, not through invoker)
    const content3 = proxy.readFile(testFile, admin);
    expect(content3).toBe('original content');

    // Execute delete command
    const deleteCmd = new DeleteFileCommand(proxy, testFile, admin);
    invoker.executeCommand(deleteCmd);

    // Verify file is deleted
    expect(() => proxy.readFile(testFile, admin)).toThrow();

    // Undo delete
    invoker.undoLastCommand();

    // Verify file is restored
    const content4 = proxy.readFile(testFile, admin);
    expect(content4).toBe('original content');
  });

  it('should maintain command history', () => {
    const writeCmd = new WriteFileCommand(proxy, testFile, 'test', admin);
    const deleteCmd = new DeleteFileCommand(proxy, testFile, admin);

    invoker.executeCommand(writeCmd);
    expect(invoker.getHistory()).toHaveLength(1);

    invoker.executeCommand(deleteCmd);
    expect(invoker.getHistory()).toHaveLength(2);

    invoker.undoLastCommand();
    expect(invoker.getHistory()).toHaveLength(1);

    invoker.undoLastCommand();
    expect(invoker.getHistory()).toHaveLength(0);
  });
});