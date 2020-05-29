import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: '123456',
    });

    const userProfile = await showProfile.execute({
      user_id: user.id,
    });

    expect(userProfile.name).toBe('George');
    expect(userProfile.email).toBe('george@email.com');
    expect(userProfile.password).toBe('123456');
  });

  it('should be not able to show the profile of a non-existent user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
