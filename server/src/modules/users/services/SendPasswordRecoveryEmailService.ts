import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendPasswordRecoveryEmail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async run({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email not found.');
    }

    const userToken = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Password recovery body ${userToken.token}`,
    );
  }
}

export default SendPasswordRecoveryEmail;
