import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create an appointment', async () => {
    const appointment = await createAppointment.run({
      provider_id: 'coolProviderId',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments in conflicting hours', async () => {
    const appointmentDate = new Date();

    await createAppointment.run({
      provider_id: 'testProviderId',
      date: appointmentDate,
    });

    await expect(
      createAppointment.run({
        provider_id: 'testProviderId',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
