import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments of a provider in a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: new Date(2020, 5, 1, 10, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: new Date(2020, 5, 1, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider-id',
      year: 2020,
      month: 6,
      day: 1,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });

  it('should be able to get the appointments list from cache without triggering a database query', async () => {
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: new Date(2020, 5, 1, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      provider_id: 'provider-id',
      date: new Date(2020, 5, 1, 15, 0, 0),
    });

    await listProviderAppointments.execute({
      provider_id: 'provider-id',
      year: 2020,
      month: 6,
      day: 1,
    });

    const repositorySpy = jest.spyOn(
      fakeAppointmentsRepository,
      'findByProviderAndDay',
    );

    await listProviderAppointments.execute({
      provider_id: 'provider-id',
      year: 2020,
      month: 6,
      day: 1,
    });

    expect(repositorySpy).not.toHaveBeenCalled();
  });
});
