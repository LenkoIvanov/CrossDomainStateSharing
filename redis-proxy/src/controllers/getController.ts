import { type Request, type Response } from 'express';
import logger from '../singletons/logger.js';

export const getController = (req: Request, resp: Response) => {
  try {
    const { sessionId } = req.params;

    if (typeof sessionId !== 'string') {
      return resp.status(400).json({ message: 'Invalid parameter supplied' });
    }

    logger.info(`Fetching data for ${sessionId}.`);

    // redis service logic

    return resp.status(200).json({ message: `Cached data for ${sessionId}` });
  } catch (err) {
    return resp.status(500).json({ message: 'An error occured during cache retriebal' });
  }
};
