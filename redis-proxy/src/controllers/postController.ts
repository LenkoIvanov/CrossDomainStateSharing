import { type Request, type Response } from 'express';
import logger from '../singletons/logger.js';
import { payloadSchema } from '../schemas/payloadSchema.js';

export const postController = (req: Request, resp: Response) => {
  try {
    const payload = payloadSchema.parse(req.body);

    logger.info(`Successfuly received data for ${payload.sessionId}`);

    // redis service logic here

    return resp.status(200).json({ message: `Cache for ${payload.sessionId} successful.` });
  } catch (err) {
    logger.error('Error encountered during data validation.');
    return resp.status(400).json({ message: 'Invalid body parameters.' });
  }
};
