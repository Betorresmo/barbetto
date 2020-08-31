import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async store(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async retrieve<T>(key: string): Promise<T | null> {
    const value = this.cache[key];

    if (!value) {
      return null;
    }

    const parsedValue = JSON.parse(value) as T;

    return parsedValue;
  }

  public async invalidateOne(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidateMultiple(keyPrefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${keyPrefix}:`),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}

export default FakeCacheProvider;
