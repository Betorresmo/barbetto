import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

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
