import express from 'express';

require('dotenv-safe').config();

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
