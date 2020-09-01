import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import AppError from '@shared/errors/AppError';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
  enableOfflineQueue: false,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rate-limiter',
  points: 10,
  duration: 1,
});

const rateLimiter = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await limiter.consume(request.ip);

    next();
  } catch (err) {
    throw new AppError('Too Many Requests', 429);
  }
};

export default rateLimiter;
