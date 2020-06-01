import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindByProviderAndMonthDTO from '@modules/appointments/dtos/IFindByProviderAndMonthDTO';
import IFindByProviderAndDayDTO from '@modules/appointments/dtos/IFindByProviderAndDayDTO';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByProviderAndMonth(
    data: IFindByProviderAndMonthDTO,
  ): Promise<Appointment[]>;
  findByProviderAndDay(data: IFindByProviderAndDayDTO): Promise<Appointment[]>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
