import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import cacheConfig from '@config/cache';

class RedisCacheProvider implements ICacheProvider {
  private redisClient: RedisClient;

  constructor() {
    this.redisClient = new Redis(cacheConfig.config.redis);
  }

  public async store(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  public async retrieve<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);

    if (!value) {
      return null;
    }

    const parsedValue = JSON.parse(value) as T;

    return parsedValue;
  }

  public async invalidateOne(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  public async invalidateMultiple(keyPrefix: string): Promise<void> {
    const keys = await this.redisClient.keys(`${keyPrefix}:*`);

    const pipeline = this.redisClient.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export default RedisCacheProvider;
