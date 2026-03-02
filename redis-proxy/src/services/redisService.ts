import { localRedisClient } from '../redis_clients/localRedisClient.js';
import logger from '../singletons/logger.js';

class RedisService {
  async saveEntryInCache(sessionId: string, contents: any) {
    await localRedisClient.set(`session:${sessionId}`, JSON.stringify(contents), { EX: 3000 });

    await this.publishCacheUpdate(sessionId, 'refresh');
  }

  async fetchEntryFromCache(sessionId: string) {
    const data = await localRedisClient.get(`session:${sessionId}`);
    return data ? JSON.parse(data) : null;
  }

  async publishCacheUpdate(sessionId: string, message: string) {
    const channel = `cart-update:${sessionId}`;
    await localRedisClient.publish(channel, message);
    logger.info(`Broadcasted update for session: ${sessionId}`);
  }

  async subscribeToCacheUpdates(sessionId: string, onMessage: (msg: string) => void) {
    const channel = `cart-update:${sessionId}`;

    const subscriber = localRedisClient.duplicate();
    await subscriber.connect();

    await subscriber.subscribe(channel, (message) => {
      onMessage(message);
    });

    return async () => {
      await subscriber.unsubscribe(channel);
      await subscriber.quit();
      logger.info(`Cleaned up Redis subscriber for session: ${sessionId}`);
    };
  }
}

export const redisService = new RedisService();
