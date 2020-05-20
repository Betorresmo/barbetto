import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async run({ email, password }: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordIsCorrect = compare(password, user.password);
    if (!passwordIsCorrect) {
      throw new AppError('Incorrect email/passowrd combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
