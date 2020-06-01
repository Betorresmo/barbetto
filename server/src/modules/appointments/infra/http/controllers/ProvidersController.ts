import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllProvidersService from '@modules/appointments/services/ListAllProvidersService';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listAllProviders = container.resolve(ListAllProvidersService);

    const providers = await listAllProviders.run({
      user_id,
    });

    return response.status(200).json(providers);
  }
}

export default ProvidersController;
