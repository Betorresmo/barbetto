import { isEqual, getYear, getMonth, getDate } from 'date-fns';
import { uuid } from 'uuidv4';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IFindByProviderAndMonthDTO from '@modules/appointments/dtos/IFindByProviderAndMonthDTO';
import IFindByProviderAndDayDTO from '@modules/appointments/dtos/IFindByProviderAndDayDTO';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(appointmentItem =>
      isEqual(appointmentItem.date, date),
    );

    return appointment;
  }

  public async findByProviderAndMonth({
    provider_id,
    year,
    month,
  }: IFindByProviderAndMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month,
    );

    return appointments;
  }

  public async findByProviderAndDay({
    provider_id,
    year,
    month,
    day,
  }: IFindByProviderAndDayDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month &&
        getDate(appointment.date) === day,
    );

    return appointments;
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
