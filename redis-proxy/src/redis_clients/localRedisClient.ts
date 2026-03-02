import { createClient } from 'redis';
import logger from '../singletons/logger.js';

const maxDelayInMs = 3000;
const delayMultiplierInMs = 100;
export const localRedisClient = createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379,
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        logger.error('Redis: Max retries reached. Stopping reconnection.');
        return new Error('Redis connection lost');
      }
      const delay = Math.min(retries * delayMultiplierInMs, maxDelayInMs);
      logger.warn(`Redis: Reconnection attempt #${retries} in ${delay}ms`);
      return delay;
    },
  },
});
