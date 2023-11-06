import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv-safe').config();

const app = express();

app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
