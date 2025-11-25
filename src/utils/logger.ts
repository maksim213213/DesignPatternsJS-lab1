import pino from 'pino';
import path from 'path';

const logDir = path.join(process.cwd(), 'logs');

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.transport({
    targets: [
      {
        level: 'info',
        target: 'pino/file',
        options: {
          destination: path.join(logDir, 'app.log'),
        },
      },
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: false,
          levelFirst: true,
          ignore: 'pid,hostname',
        },
      },
    ],
  }),
);

export default logger;
