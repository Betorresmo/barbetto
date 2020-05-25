import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the user password', async () => {
    const generateHashSpy = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const newPassword = '654321';

    await resetPassword.run({
      token,
      password: newPassword,
    });

    const updatedPasswordUser = await fakeUsersRepository.findById(user.id);

    expect(generateHashSpy).toHaveBeenCalledWith(newPassword);
    expect(updatedPasswordUser?.password).toBe(`hash${newPassword}`);
  });

  it('should not be able to reset the password with non-existent token', async () => {
    await expect(
      resetPassword.run({
        token: 'non-existent token',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password of non-existent user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existent user',
    );

    await expect(
      resetPassword.run({
        token,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with expired tokens', async () => {
    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.run({
        token,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
