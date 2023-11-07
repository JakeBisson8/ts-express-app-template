import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

require('dotenv-safe').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

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
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Default endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
