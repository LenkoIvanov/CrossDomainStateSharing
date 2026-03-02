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

    logger.info(`Fetch for ${sessionId} is successful.`);
    return resp.status(200).json({ data: cachedEntry });
  } catch (err) {
    logger.info(`An error was encountered during cache retrieval.`);
    return resp.status(500).json({ message: 'An error occurred during cache retrieval.' });
  }
};
