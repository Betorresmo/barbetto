import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const userWithId = this.users.find(user => user.id === id);

    return userWithId;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userWithEmail = this.users.find(user => user.email === email);

    return userWithEmail;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const currentUserIndex = this.users.findIndex(
      currentUser => currentUser.id === user.id,
    );

    this.users.splice(currentUserIndex, 1, user);

    return user;
  }
}

export default FakeUsersRepository;
