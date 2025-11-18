import pino, { Logger as PinoLogger, Level } from 'pino';
import fs from 'fs';
import path from 'path';


const LOGS_DIRECTORY = path.join(process.cwd(), 'logs');
const LOG_FILE_PATH = path.join(LOGS_DIRECTORY, 'application.log');
const LOG_LEVEL: Level = 'info'; // Уровень логирования по умолчанию


export class Logger {
    private static instance: Logger;
    private readonly pinoLogger: PinoLogger;

    private constructor() {
        if (!fs.existsSync(LOGS_DIRECTORY)) {
            fs.mkdirSync(LOGS_DIRECTORY, { recursive: true });
        }

        // Поток для записи в файл
        const fileStream = pino.destination(LOG_FILE_PATH);

        this.pinoLogger = pino({
            level: LOG_LEVEL,
            base: { pid: process.pid }, 
            transport: {
                targets: [
                    {
                        target: 'pino/file',
                        options: { destination: LOG_FILE_PATH, mkdir: true },
                        level: LOG_LEVEL
                    },
                    {
                        target: 'pino-pretty', 
                        options: { destination: 1, colorize: true, translateTime: 'SYS:standard' },
                        level: LOG_LEVEL
                    }
                ]
            }
        });
        
        this.pinoLogger.info('--- Logger initialized. Logs will be written to console and file: %s ---', LOG_FILE_PATH);
    }


    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public getLogger(): PinoLogger {
        return this.pinoLogger;
    }
}

export const AppLogger = Logger.getInstance().getLogger();