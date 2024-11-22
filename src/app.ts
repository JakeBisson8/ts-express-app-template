import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import httpRedirect from './middleware/httpRedirect';
import { httpDevLogger, httpErrorLogger, httpLogger } from './config/httplogger';

require('dotenv-safe').config();

const { NODE_ENV, HTTPS, HSTS_MAX_AGE, HSTS_INCLUDE_SUBDOMAINS, HSTS_PRELOAD } = process.env;
const hstsMaxAge = parseInt(HSTS_MAX_AGE as string, 10);
const hstsIncludeSubdomains = parseInt(HSTS_INCLUDE_SUBDOMAINS as string, 10);
const hstsPreload = parseInt(HSTS_PRELOAD as string, 10);
const usingHttps = !!parseInt(HTTPS as string, 10);

const app = express();

app.use(
  helmet({
    strictTransportSecurity: usingHttps
      ? {
          maxAge: parseInt(HSTS_MAX_AGE as string, 10),
          includeSubDomains: !!parseInt(HSTS_INCLUDE_SUBDOMAINS as string, 10),
          preload: !!(hstsPreload && hstsIncludeSubdomains && hstsMaxAge >= 31536000),
        }
      : false,
  }),
);
app.use(cors());
app.use(express.json());

if (usingHttps) {
  app.use(httpRedirect);
}

// create log directory
const directory = path.join(__dirname, 'logs/');
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

// Morgan setup
app.use(httpLogger);
app.use(httpErrorLogger);
if (NODE_ENV === 'development') {
  app.use(httpDevLogger);
}

// re-direct HTTP to HTTPS
if (usingHttps && NODE_ENV !== 'test') {
  app.use(httpRedirect);
}

// Default endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
