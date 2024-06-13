import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import httpRedirect from './middleware/httpRedirect';

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
const httpLogCombinedStream = fs.createWriteStream(path.join(__dirname, 'logs/httprequests_combined.log'), {
  flags: 'a',
});
const httpErrorLogStream = fs.createWriteStream(path.join(__dirname, 'logs/httprequests_error.log'), { flags: 'a' });
app.use(morgan('common', { stream: httpLogCombinedStream }));
app.use(
  morgan('common', {
    skip: (req, res) => res.statusCode < 400,
    stream: httpErrorLogStream,
  }),
);
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Default endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
