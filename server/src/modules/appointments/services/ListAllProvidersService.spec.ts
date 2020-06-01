import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListAllProvidersService from '@modules/appointments/services/ListAllProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listAllProviders: ListAllProvidersService;

describe('ListAllProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listAllProviders = new ListAllProvidersService(fakeUsersRepository);
  });

  it('should be able to list all providers except the current user', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'User1',
      email: 'user1.email.com',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'User2',
      email: 'user2@email.com',
      password: '123456',
    });
    const currentUser = await fakeUsersRepository.create({
      name: 'George',
      email: 'george@email.com',
      password: '123456',
    });

    const providers = await listAllProviders.run({
      user_id: currentUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
