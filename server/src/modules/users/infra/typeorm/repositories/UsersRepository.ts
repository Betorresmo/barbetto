import { EntityRepository, Repository } from 'typeorm';

import User from '../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | null> {
    const userWithEmail = await this.findOne({ where: { email } });

    return userWithEmail || null;
  }
}

export default UsersRepository;
