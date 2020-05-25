import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
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
    const [email, password] = ['george@email.com', '123456'];

    expect(
      authenticateUser.run({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to authenticate an user with wrong password', async () => {
    const [email, password] = ['george@email.com', '123456'];

    await createUser.run({
      name: 'George',
      email,
      password,
    });

    await expect(
      authenticateUser.run({
        email,
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
