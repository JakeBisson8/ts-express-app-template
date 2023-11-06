import app from './app';
import logger from './config/logger';

const { PORT } = process.env;
app.listen(PORT, () => {
  logger.info(`Server is listening on port: ${PORT}`);
});
