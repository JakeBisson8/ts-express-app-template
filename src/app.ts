import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

require('dotenv-safe').config();

const app = express();

app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
