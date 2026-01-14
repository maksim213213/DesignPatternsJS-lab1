import { FileServiceProxy, User, Permission } from '../services';
import { ReadFileCommand, WriteFileCommand, DeleteFileCommand, CommandInvoker } from '../commands/FileCommands';
import * as fs from 'fs';
import * as path from 'path';

describe('FileServiceProxy', () => {
  let proxy: FileServiceProxy;
  let admin: User;
  let user: User;
  let guest: User;
  let testFile: string;

  beforeEach(() => {
    proxy = new FileServiceProxy();
    admin = { id: 'admin', role: 'admin' };
    user = { id: 'user', role: 'user' };
    guest = { id: 'guest', role: 'guest' };
    testFile = './test_file.txt';

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

  it('should allow admin to read, write, and delete', () => {
    proxy.setPermission({
      userId: 'admin',
      filePath: testFile,
      canRead: true,
      canWrite: true,
      canDelete: true
    });

    // Write
    proxy.writeFile(testFile, 'test content', admin);

    // Read
    const content = proxy.readFile(testFile, admin);
    expect(content).toBe('test content');

    // Delete
    proxy.deleteFile(testFile, admin);
    expect(() => proxy.readFile(testFile, admin)).toThrow();
  });

  it('should deny guest access', () => {
    proxy.setPermission({
      userId: 'guest',
      filePath: testFile,
      canRead: false,
      canWrite: false,
      canDelete: false
    });

    expect(() => proxy.writeFile(testFile, 'content', guest)).toThrow('Access denied');
    expect(() => proxy.readFile(testFile, guest)).toThrow('Access denied');
    expect(() => proxy.deleteFile(testFile, guest)).toThrow('Access denied');
  });

  it('should allow user to read and write but not delete', () => {
    proxy.setPermission({
      userId: 'user',
      filePath: testFile,
      canRead: true,
      canWrite: true,
      canDelete: false
    });

    // Write should work
    proxy.writeFile(testFile, 'user content', user);

    // Read should work
    const content = proxy.readFile(testFile, user);
    expect(content).toBe('user content');

    // Delete should fail
    expect(() => proxy.deleteFile(testFile, user)).toThrow('Access denied');
  });
});