// logger.js
const winston = require('winston');
const { createLogger, format, transports } = winston;

// Define the log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

// Create and export the logger
const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({
      filename: 'logs/' + new Date().toISOString().slice(0, 10) + '-app.log',
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
});

module.exports = logger;
