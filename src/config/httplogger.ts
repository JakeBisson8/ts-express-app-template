import morgan from 'morgan';
import path from 'path';

const rfs = require('rotating-file-system');

const httpCombinedStream = rfs.createStream('http_combined.log', {
  interval: '1d',
  path: path.join(__dirname, '../logs'),
});

const httpErrorStream = rfs.createStream('http_error.log', {
  interval: '1d',
  path: path.join(__dirname, '../logs'),
});

export const httpLogger = morgan('common', { stream: httpCombinedStream });
export const httpErrorLogger = morgan('common', {
  skip: (req, res) => res.statusCode < 400,
  stream: httpErrorStream,
});
export const httpDevLogger = morgan('dev');
