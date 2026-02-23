import { localRedisClient } from '../redis_clients/localRedisClient.js';

class RedisService {
  async saveEntryInCache(sessionId: string, contents: any) {
    return await localRedisClient.set(`session: ${sessionId}`, JSON.stringify(contents), { EX: 3000 });
  }
  async fetchEntryFromCache(sessionId: string) {
    const data = await localRedisClient.get(`session:${sessionId}`);
    return data ? JSON.parse(data) : null;
  }
}

export const redisService = new RedisService();
