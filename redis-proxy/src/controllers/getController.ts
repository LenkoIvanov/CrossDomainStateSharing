import { type Request, type Response } from 'express';
import logger from '../singletons/logger.js';
import { redisService } from '../services/redisService.js';

export const getController = async (req: Request, resp: Response) => {
  try {
    const { sessionId } = req.params;

    if (typeof sessionId !== 'string') {
      return resp.status(400).json({ message: 'Invalid parameter supplied' });
    }

    logger.info(`Fetching data for ${sessionId}.`);

    const cachedEntry = await redisService.fetchEntryFromCache(sessionId);
    // eslint-disable-next-line no-console
    console.log('Cached Redis entry is: ', cachedEntry);

    return resp.status(200).json({ message: `Cached data for ${sessionId}` });
  } catch (err) {
    return resp.status(500).json({ message: 'An error occured during cache retriebal' });
  }
};
