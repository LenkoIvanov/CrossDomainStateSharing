import { type Request, type Response } from 'express';
import logger from '../singletons/logger.js';
import { payloadSchema } from '../schemas/payloadSchema.js';
import { redisService } from '../services/redisService.js';

export const postController = async (req: Request, resp: Response) => {
  try {
    const payload = payloadSchema.parse(req.body);

    logger.info(`Successfully received data for ${payload.sessionId}`);

    await redisService.saveEntryInCache(payload.sessionId, payload.cartData);

    return resp.status(200).json({ message: `Cache for ${payload.sessionId} successful.` });
  } catch (err) {
    logger.error('An error was encountered during data validation.');
    return resp.status(400).json({ message: 'Invalid body parameters.' });
  }
};
