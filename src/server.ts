import express from 'express';
import 'dotenv-safe/config';

const app = express();

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
