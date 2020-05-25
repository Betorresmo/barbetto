import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: '123456',
    });

    const avatarFilename = 'georgeAvatar.jpg';

    await updateUserAvatar.run({
      user_id: user.id,
      avatarFilename,
    });

    expect(user.avatar).toBe(avatarFilename);
  });

  it('should not be able to update avatar of non-existent user', async () => {
    await expect(
      updateUserAvatar.run({
        user_id: 'non-existent id',
        avatarFilename: 'file.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete current avatar when user uploads a new one', async () => {
    const deleteFileSpy = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: '123456',
    });

    const avatarFilename = 'georgeAvatar.jpg';

    await updateUserAvatar.run({
      user_id: user.id,
      avatarFilename,
    });

    const newAvatarFilename = 'newGeorgeAvatar.jpg';

    await updateUserAvatar.run({
      user_id: user.id,
      avatarFilename: newAvatarFilename,
    });

    expect(deleteFileSpy).toHaveBeenCalledWith(avatarFilename);
    expect(user.avatar).toBe(newAvatarFilename);
  });
});
