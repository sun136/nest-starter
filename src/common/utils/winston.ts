import { createLogger, format, transports } from 'winston';

const Logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
  },
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      ),
    }),
    new transports.File({
      maxFiles: 5,
      maxsize: 1024 * 1024 * 2,
      dirname: './logs',
      level: 'error',
      filename: 'error.log',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.align(),
        format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      ),
    }),
    new transports.File({
      maxFiles: 5,
      maxsize: 1024 * 1024 * 5,
      dirname: './logs',
      level: 'info',
      filename: 'combined.log',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.align(),
        format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      ),
    }),
  ],
});

export default Logger;
