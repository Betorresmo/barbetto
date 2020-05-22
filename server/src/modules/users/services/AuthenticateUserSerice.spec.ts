import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate an user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const [email, password] = ['george@email.com', '123456'];

    const user = await createUser.run({
      name: 'George',
      email,
      password,
    });

    const response = await authenticateUser.run({
      email,
      password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should be not able to authenticate a non-existent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const [email, password] = ['george@email.com', '123456'];

    expect(
      authenticateUser.run({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to authenticate an user with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const [email, password] = ['george@email.com', '123456'];

    await createUser.run({
      name: 'George',
      email,
      password,
    });

    expect(
      authenticateUser.run({
        email,
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
