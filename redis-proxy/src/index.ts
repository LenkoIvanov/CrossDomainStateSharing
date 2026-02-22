import logger from './singletons/logger.js';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { PORT_NUMBER } from './helpers/serverConfigs.js';
import { postController } from './controllers/postController.js';
import { getController } from './controllers/getController.js';

logger.info('Server has started!');

const server = express();
server.use(cors());
server.use(express.json());

server.post('/cartInfo', (req: Request, resp: Response) => postController(req, resp));

server.get('/cartInfo/:sessionId', (req: Request, resp: Response) => getController(req, resp));

server.listen(PORT_NUMBER, () => {
  logger.info('Server started listening on port 3001');
});
