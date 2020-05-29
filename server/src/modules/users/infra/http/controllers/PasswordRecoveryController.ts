import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendPasswordRecoveryEmailService from '@modules/users/services/SendPasswordRecoveryEmailService';

class PasswordRecoveryController {
  public async create(reqyest: Request, response: Response): Promise<Response> {
    const { email } = reqyest.body;
    const sendPasswordRecoveryEmail = container.resolve(
      SendPasswordRecoveryEmailService,
    );

    await sendPasswordRecoveryEmail.run({
      email,
    });

    return response.status(204).json();
  }
}

export default PasswordRecoveryController;
