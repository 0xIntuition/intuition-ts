import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import { Cache } from '../cache';
import { realDateNow } from '../../../jest.setup';

describe('Cache', () => {
  let cache: Cache<string>;
  let mockNow: number;

  beforeEach(() => {
    // Start with a fixed timestamp
    mockNow = 1000000;
    const mockDateNow = jest.fn(() => mockNow);
    global.Date.now = mockDateNow;

    // Clear any existing cache instances
    // @ts-ignore - accessing private static field for testing
    Cache.instances = new Map();

    // Create new cache instance with mocked time
    cache = Cache.getInstance<string>('test-cache');
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.Date.now = realDateNow;
  });

  test('singleton instance', () => {
    const instance1 = Cache.getInstance<string>('test-instance');
    const instance2 = Cache.getInstance<string>('test-instance');
    const instance3 = Cache.getInstance<string>('different-instance');
    expect(instance1).toBe(instance2);
    expect(instance1).not.toBe(instance3);
  });

  test('set and get', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  test('cache expiration', () => {
    cache.set('key2', 'value2');
    const dateNowStub = jest.fn(() => realDateNow() + 3600001); // Just over 1 hour
    global.Date.now = dateNowStub;
    expect(cache.get('key2')).toBeNull();
  });

  test('rate limiting', async () => {
    // Should allow 20 requests
    for (let i = 0; i < 20; i++) {
      await cache.checkRateLimit();
    }
    // 21st request should throw
    await expect(cache.checkRateLimit()).rejects.toThrow('Rate limit exceeded');
  });

  test('rate limit reset', async () => {
    // Make 19 requests
    for (let i = 0; i < 19; i++) {
      await cache.checkRateLimit();
    }

    // Make the 20th request (should succeed)
    await cache.checkRateLimit();

    // Try 21st request (should fail)
    await expect(cache.checkRateLimit()).rejects.toThrow('Rate limit exceeded');

    // Advance time by exactly one minute
    mockNow += 60000;

    // Should allow new requests after reset
    await cache.checkRateLimit();
    const stats = await cache.getStats();
    expect(stats.requestCount).toBe(1);
  });

  test('cache stats', async () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');

    // Make one request
    await cache.checkRateLimit();

    const stats = await cache.getStats();
    expect(stats.size).toBe(2);
    expect(stats.requestCount).toBe(1);
    expect(stats.timeUntilReset).toBe(60000);
  });
});
