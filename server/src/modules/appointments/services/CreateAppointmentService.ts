import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async run({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const appointmentDate = startOfHour(date);

    const appointmentConflict = await appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (appointmentConflict) {
      throw new AppError('There is already an appointment at this time', 409);
    }

    const validProviderID = await usersRepository.findOne(provider_id);
    if (!validProviderID) {
      throw new AppError('No user with this ID.');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
