import { SecureFileService, User } from '../services/FileService';

export interface Command {
  execute(): void;
  undo(): void;
}

export class ReadFileCommand implements Command {
  private content: string = '';

  constructor(
    private fileService: SecureFileService,
    private filePath: string,
    private user: User
  ) {}

  execute(): void {
    this.content = this.fileService.readFile(this.filePath, this.user);
    console.log(`Read file ${this.filePath}: ${this.content}`);
  }

  undo(): void {
    // Reading doesn't modify, so undo is a no-op
    console.log(`Undo read operation on ${this.filePath}`);
  }

  getContent(): string {
    return this.content;
  }
}

export class WriteFileCommand implements Command {
  private previousContent: string = '';

  constructor(
    private fileService: SecureFileService,
    private filePath: string,
    private content: string,
    private user: User
  ) {}

  execute(): void {
    try {
      // Try to read existing content for undo
      this.previousContent = this.fileService.readFile(this.filePath, this.user);
    } catch {
      // File doesn't exist, previous content is empty
      this.previousContent = '';
    }

    this.fileService.writeFile(this.filePath, this.content, this.user);
    console.log(`Wrote to file ${this.filePath}`);
  }

  undo(): void {
    this.fileService.writeFile(this.filePath, this.previousContent, this.user);
    console.log(`Undid write operation on ${this.filePath}`);
  }
}

export class DeleteFileCommand implements Command {
  private fileContent: string = '';

  constructor(
    private fileService: SecureFileService,
    private filePath: string,
    private user: User
  ) {}

  execute(): void {
    this.fileContent = this.fileService.readFile(this.filePath, this.user);
    this.fileService.deleteFile(this.filePath, this.user);
    console.log(`Deleted file ${this.filePath}`);
  }

  undo(): void {
    this.fileService.writeFile(this.filePath, this.fileContent, this.user);
    console.log(`Restored file ${this.filePath}`);
  }
}

export class CommandInvoker {
  private commands: Command[] = [];
  private history: Command[] = [];

  executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  undoLastCommand(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
    } else {
      console.log('No commands to undo');
    }
  }

  getHistory(): Command[] {
    return [...this.history];
  }
}