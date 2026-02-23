import { type Request, type Response } from 'express';
import logger from '../singletons/logger.js';
import { payloadSchema } from '../schemas/payloadSchema.js';
import { redisService } from '../services/redisService.js';

export const postController = async (req: Request, resp: Response) => {
  try {
    const payload = payloadSchema.parse(req.body);

    logger.info(`Successfully received data for ${payload.sessionId}`);

    const postResponse = await redisService.saveEntryInCache(payload.sessionId, payload.cartData);
    // eslint-disable-next-line no-console
    console.log('Cache set response: ', postResponse);

    return resp.status(200).json({ message: `Cache for ${payload.sessionId} successful.` });
  } catch (err) {
    logger.error('Error encountered during data validation.');
    return resp.status(400).json({ message: 'Invalid body parameters.' });
  }
};
