import http from 'http';
import https, { ServerOptions } from 'https';
import fs from 'fs';
import path from 'path';
import { SecureVersion } from 'tls';
import app from './app';
import logger from './config/logger';

const {
  NODE_ENV,
  HTTP_PORT,
  HTTPS_PORT,
  HTTPS,
  SSL_CERT,
  SSL_KEY,
  SSL_MIN_VERSION,
  SSL_MAX_VERSION,
  SSL_CIPHERS,
  ECDH_CURVES,
  DH_PARAM,
} = process.env;
const usingHttps = !!parseInt(HTTPS as string, 10);

const httpServer = http.createServer(app);
const options: ServerOptions = usingHttps
  ? {
      cert: fs.readFileSync(path.join(__dirname, '..', 'ssl', SSL_CERT as string)),
      key: fs.readFileSync(path.join(__dirname, '..', 'ssl', SSL_KEY as string)),
      minVersion: SSL_MIN_VERSION as SecureVersion,
      maxVersion: SSL_MAX_VERSION as SecureVersion,
      ciphers: SSL_CIPHERS,
      ecdhCurve: ECDH_CURVES,
      dhparam: fs.readFileSync(path.join(__dirname, '..', 'ssl', DH_PARAM as string)),
    }
  : {};
const httpsServer = https.createServer(options, app);

httpServer.listen(HTTP_PORT, () => {
  logger.info(`HTTP server running in ${NODE_ENV} started on ${HTTP_PORT}`);
});

if (usingHttps) {
  httpsServer.listen(HTTPS_PORT, () => {
    logger.info(`HTTPS server running in ${NODE_ENV} started on ${HTTPS_PORT}`);
  });
}

const shutdown = async () => {
  logger.info('Shutting down gracefully...');
  const shutdownHttpServer = new Promise<void>((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        logger.error('Failed to close the HTTP server.');
        reject(err);
      }
      logger.info('HTTP server closed.');
      resolve();
    });
  });

  const shutdownHttpsServer = new Promise<void>((resolve, reject) => {
    if (usingHttps) {
      httpsServer.close((err) => {
        if (err) {
          logger.error('Failed to close the HTTPS server.');
          reject(err);
        }
        logger.info('HTTPS server closed.');
        resolve();
      });
    } else {
      resolve();
    }
  });

  try {
    await Promise.all([shutdownHttpServer, shutdownHttpsServer]);
  } catch (err) {
    logger.error('Error shutting down the servers', err);
  }
  logger.info('Graceful shutdown complete!');
};

process.on('SIGINT', async () => {
  logger.info('Received SIGINT');
  await shutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Received SIGTERM');
  await shutdown();
  process.exit(0);
});

process.on('unhandledRejection', async (reason, promise) => {
  logger.error('Unhandled rejection at:', promise, 'reason:', reason);
  await shutdown();
  process.exit(1);
});

process.on('uncaughtException', async (err) => {
  logger.error('Uncaught exception thrown:', err);
  await shutdown();
  process.exit(1);
});
