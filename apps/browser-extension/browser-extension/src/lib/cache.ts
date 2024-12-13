interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class Cache<T> {
  private static instances: Map<string, Cache<any>> = new Map();
  private cache: Map<string, CacheItem<T>>;
  private readonly TTL: number;
  private requestCount: number = 0;
  private lastResetTime: number;
  private readonly rateLimit: number = 20; // 20 requests per minute (free tier)
  private readonly rateLimitWindow: number = 60000; // 1 minute in milliseconds

  private constructor(ttl: number = 3600000) { // Default TTL: 1 hour
    this.cache = new Map();
    this.TTL = ttl;
    this.lastResetTime = Date.now();
  }

  static getInstance<T>(key: string = 'default', ttl?: number): Cache<T> {
    if (!Cache.instances.has(key)) {
      Cache.instances.set(key, new Cache<T>(ttl));
    }
    return Cache.instances.get(key) as Cache<T>;
  }

  private async resetRateLimitIfNeeded(): Promise<void> {
    const now = Date.now();
    const timeSinceReset = now - this.lastResetTime;
    if (timeSinceReset >= this.rateLimitWindow) {
      this.requestCount = 0;
      this.lastResetTime = now;
    }
  }

  async checkRateLimit(): Promise<void> {
    await this.resetRateLimitIfNeeded();

    if (this.requestCount >= this.rateLimit) {
      const waitTime = this.rateLimitWindow - (Date.now() - this.lastResetTime);
      throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
    }

    this.requestCount++;
  }

  set(key: string, value: T): void {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now()
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  async getStats(): Promise<{ size: number; requestCount: number; timeUntilReset: number }> {
    await this.resetRateLimitIfNeeded();
    const timeUntilReset = Math.max(0, this.rateLimitWindow - (Date.now() - this.lastResetTime));

    return {
      size: this.cache.size,
      requestCount: this.requestCount,
      timeUntilReset
    };
  }

  // For testing purposes only
  _resetState(): void {
    this.requestCount = 0;
    this.lastResetTime = Date.now();
    this.cache.clear();
  }
}
