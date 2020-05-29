import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const generateHashSpy = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: await fakeHashProvider.generateHash('123456'),
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'George Johnson',
      email: 'george.johnson@email.com',
      password: '123456',
      newPassword: '654321',
    });

    expect(updatedUser.name).toBe('George Johnson');
    expect(updatedUser.email).toBe('george.johnson@email.com');
    expect(generateHashSpy).toHaveBeenCalledWith('654321');
    expect(updatedUser.password).toBe('hash654321');
  });

  it('should be able to update the profile name individually without password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'George Johnson',
    });

    expect(updatedUser.name).toBe('George Johnson');
  });

  it('should be able to update the profile email individually', async () => {
    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: await fakeHashProvider.generateHash('123456'),
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'george.johnson@email.com',
      password: '123456',
    });

    expect(updatedUser.email).toBe('george.johnson@email.com');
  });

  it('should be able to update the profile password individually', async () => {
    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: await fakeHashProvider.generateHash('123456'),
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      password: '123456',
      newPassword: '654321',
    });

    expect(updatedUser.password).toBe('hash654321');
  });

  it('should not be able to update the profile of a non-existent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existent',
        name: 'George Johnson',
        email: 'george.johnson@email.com',
        password: '123456',
        newPassword: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile if no data is sent', async () => {
    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile if email is already in use', async () => {
    await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: await fakeHashProvider.generateHash('123456'),
    });

    const user = await fakeUsersRepository.create({
      name: 'Another George',
      email: 'another.george@email.com',
      password: await fakeHashProvider.generateHash('123456'),
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'george@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile without providing the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: await fakeHashProvider.generateHash('123456'),
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'George Johnson',
        email: 'george.johnson@email.com',
        newPassword: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile by providing the wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: await fakeHashProvider.generateHash('123456'),
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'George Johnson',
        email: 'george.johnson@email.com',
        password: 'wrong',
        newPassword: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
