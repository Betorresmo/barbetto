export default interface ICacheProvider {
  store(key: string, value: any): Promise<void>;
  retrieve<T>(key: string): Promise<T | null>;
  invalidateOne(key: string): Promise<void>;
  invalidateMultiple(keyPrefix: string): Promise<void>;
}
