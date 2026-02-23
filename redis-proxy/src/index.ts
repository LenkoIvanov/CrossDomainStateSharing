import logger from './singletons/logger.js';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { PORT_NUMBER } from './helpers/serverConfigs.js';
import { postController } from './controllers/postController.js';
import { getController } from './controllers/getController.js';
import { localRedisClient } from './redis_clients/localRedisClient.js';

logger.info('Server has started!');

const server = express();
server.use(cors());
server.use(express.json());

server.post('/cartInfo', (req: Request, resp: Response) => postController(req, resp));

server.get('/cartInfo/:sessionId', (req: Request, resp: Response) => getController(req, resp));

async function startServer() {
  try {
    await localRedisClient.connect();

    server.listen(PORT_NUMBER, () => {
      logger.info('Server started listening on port 3001.');
    });
  } catch (error) {
    logger.error('A fatal error occurred during server startup.');
    process.exit(1);
  }
}

startServer();
