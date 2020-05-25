import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create an user', async () => {
    const password = '123456';

    const user = await createUser.run({
      name: 'George',
      email: 'george@email.com',
      password,
    });

    expect(user).toHaveProperty('id');
    expect(user.password).toBe(`hash${password}`);
  });

  it('should not be able to create users with the same email', async () => {
    const email = 'george@email.com';

    await createUser.run({
      name: 'George',
      email,
      password: '123456',
    });

    await expect(
      createUser.run({
        name: 'anotherGeorge',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
