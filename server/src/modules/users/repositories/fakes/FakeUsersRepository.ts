import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(userItem => userItem.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(userItem => userItem.email === email);

    return user;
  }

  public async findAll({ except_user_id }: IFindAllUsersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = users.filter(user => user.id !== except_user_id);
    }

    return users;
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
