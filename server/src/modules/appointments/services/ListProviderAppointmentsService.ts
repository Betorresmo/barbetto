import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointmentsInCache = await this.cacheProvider.retrieve<
      Appointment[]
    >(`appointments-list:${year}-${month}-${day}:${provider_id}`);

    if (appointmentsInCache) {
      return appointmentsInCache;
    }

    const appointments = await this.appointmentsRepository.findByProviderAndDay(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    await this.cacheProvider.store(
      `appointments-list:${year}-${month}-${day}:${provider_id}`,
      appointments,
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;
