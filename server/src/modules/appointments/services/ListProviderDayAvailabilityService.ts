import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async run({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findByProviderAndDay(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hoursDayArray = Array.from({ length: 10 }, (_, index) => index + 8);

    const currentDate = new Date(Date.now());

    const availability = hoursDayArray.map(hour => {
      const appointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const appointmentDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !appointmentInHour && isAfter(appointmentDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
