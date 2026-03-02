import { type Request, type Response } from 'express';
import { redisService } from '../services/redisService.js';
import logger from '../singletons/logger.js';

export const streamController = async (req: Request, resp: Response) => {
  const { sessionId } = req.params;

  if (typeof sessionId !== 'string') {
    return resp.status(400).json({ message: 'Invalid parameter supplied' });
  }

  try {
    resp.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });

    const cleanupSubscription = await redisService.subscribeToCacheUpdates(sessionId, (message) =>
      resp.write(`data: ${message}\n\n`)
    );

    const heartbeat = setInterval(() => {
      resp.write(': heartbeat\n\n');
    }, 30000);

    req.on('close', async () => {
      clearInterval(heartbeat);
      try {
        await cleanupSubscription();
        logger.info('Subscriber cleanup successful');
      } catch (err) {
        logger.error('An error during SSE cleanup was encountered');
      }

      resp.end();
    });

    return;
  } catch (err) {
    logger.error('SSE Stream Error', err);
    return resp.status(500).json({ error: 'Internal Server Error' });
  }
};
