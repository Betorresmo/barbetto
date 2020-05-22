import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return `hash${payload}`;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return `hash${payload}` === hashed;
  }
}

export default FakeHashProvider;
