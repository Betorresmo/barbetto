import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendPasswordRecoveryEmailService from '@modules/users/services/SendPasswordRecoveryEmailService';

class PasswordRecoveryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendPasswordRecoveryEmail = container.resolve(
      SendPasswordRecoveryEmailService,
    );

    await sendPasswordRecoveryEmail.run(email);

    return res.status(204).json();
  }
}

export default PasswordRecoveryController;
