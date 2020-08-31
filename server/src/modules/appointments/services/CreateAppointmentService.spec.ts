import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create an appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 5, 1, 11, 0, 0).getTime());

    const appointment = await createAppointment.run({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 5, 1, 12, 0, 0),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments in conflicting hours', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 5, 1, 11, 0, 0).getTime());

    const appointmentDate = new Date(2020, 5, 1, 12, 0, 0);

    await createAppointment.run({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: appointmentDate,
    });

    await expect(
      createAppointment.run({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments in the past', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 5, 1, 11, 0, 0).getTime());

    await expect(
      createAppointment.run({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2020, 5, 1, 10, 0, 0),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with user and provider being the same', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 5, 1, 11, 0, 0).getTime());

    await expect(
      createAppointment.run({
        provider_id: 'same-id',
        user_id: 'same-id',
        date: new Date(2020, 5, 1, 12, 0, 0),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments before 8 a.m. and after 5 p.m.', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 5, 1, 11, 0, 0).getTime());

    await expect(
      createAppointment.run({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2020, 5, 1, 7, 0, 0),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.run({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2020, 5, 1, 18, 0, 0),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
