import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Define formats
const developmentFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`),
);
const productionFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

// Initialize logger
const logger = winston.createLogger({
  level: 'info',
  format: process.env.NODE_ENV !== 'development' ? productionFormat : developmentFormat,
});

// Configure production transports
if (process.env.NODE_ENV === 'production') {
  const errorTransportProd = new DailyRotateFile({
    dirname: path.join(__dirname, '../logs'),
    filename: 'error-%DATE%.log',
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '14d',
  });
  const combinedTransportProd = new DailyRotateFile({
    dirname: path.join(__dirname, '../logs'),
    filename: 'combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '14d',
  });
  logger.add(errorTransportProd);
  logger.add(combinedTransportProd);
}

// Configure logger for development environment
if (process.env.NODE_ENV === 'development') {
  const errorTransportDev = new winston.transports.File({
    dirname: path.join(__dirname, '../logs'),
    level: 'error',
    filename: 'error.dev.log',
  });
  const combinedTransportDev = new winston.transports.File({
    dirname: path.join(__dirname, '../logs'),
    filename: 'combined.dev.log',
  });
  const consoleTransportDev = new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), developmentFormat),
  });
  logger.add(errorTransportDev);
  logger.add(combinedTransportDev);
  logger.add(consoleTransportDev);
}

// Configure logger for test environment
if (process.env.NODE_ENV === 'test') {
  const combinedTransportTest = new winston.transports.File({
    dirname: path.join(__dirname, '../logs'),
    filename: 'combined.test.log',
  });
  logger.add(combinedTransportTest);
}

export default logger;
