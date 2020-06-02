import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month, day } = request.body;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailability,
    );

    const availability = await listProviderDayAvailability.run({
      provider_id,
      year,
      month,
      day,
    });

    return response.status(200).json(availability);
  }
}

export default ProviderDayAvailabilityController;
