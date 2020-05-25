import { isEqual } from 'date-fns';
import { uuid } from 'uuidv4';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(appointmentItem =>
      isEqual(appointmentItem.date, date),
    );

    return appointment;
  }

  public async create(
    appointmentData: ICreateAppointmentDTO,
  ): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid() }, appointmentData);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
