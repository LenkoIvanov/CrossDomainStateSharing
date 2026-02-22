import logger from './src/singletons/logger.js';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { PORT_NUMBER } from './src/helpers/serverConfigs.js';

logger.info('Server has started!');

const server = express();
server.use(cors());
server.use(express.json());

server.post('/cartInfo', (req: Request, resp: Response) => {
  const { id, cartData } = req.body;

  if (!id || !cartData) {
    return resp.status(400).json({ message: 'Invalid request' });
  }

  logger.info(`Data received id: ${id} ${cartData}`);

  return resp.status(200);
});

server.listen(PORT_NUMBER, () => {
  logger.info('Server started listening on port 3001');
});
