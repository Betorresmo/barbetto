import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name?: string;
  email?: string;
  password?: string;
  new_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    new_password,
  }: IRequest): Promise<User> {
    if (!name && !email && !password && !new_password) {
      throw new AppError('No data to execute update.', 400);
    }

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }

    if (name) {
      user.name = name;
    }

    if (email || new_password) {
      if (!password) {
        throw new AppError('Password required.', 403);
      }

      const passwordIsCorrect = await this.hashProvider.compareHash(
        password,
        user.password,
      );
      if (!passwordIsCorrect) {
        throw new AppError('Incorrect password', 403);
      }

      if (email) {
        const emailConflict = await this.usersRepository.findByEmail(email);
        if (emailConflict) {
          throw new AppError('Email already in use.', 409);
        }
        user.email = email;
      }

      if (new_password) {
        user.password = await this.hashProvider.generateHash(new_password);
      }
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
