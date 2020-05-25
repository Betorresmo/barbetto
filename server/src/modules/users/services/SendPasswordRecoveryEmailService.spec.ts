import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendPasswordRecoveryEmailService from '@modules/users/services/SendPasswordRecoveryEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let sendPasswordRecoveryEmail: SendPasswordRecoveryEmailService;

describe('SendPasswordRecoveryEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    sendPasswordRecoveryEmail = new SendPasswordRecoveryEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );
  });

  it('should be able to send password recovery email', async () => {
    const sendMailSpy = jest.spyOn(fakeMailProvider, 'sendMail');

    const email = 'carlos@email.com';

    await fakeUsersRepository.create({
      name: 'Carlos',
      email,
      password: '123456',
    });

    await sendPasswordRecoveryEmail.run({
      email,
    });

    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to send recovery email of a non-existent user', async () => {
    await expect(
      sendPasswordRecoveryEmail.run({
        email: 'carlos@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
