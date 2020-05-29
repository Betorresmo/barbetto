import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordController {
  public async create(reqyest: Request, response: Response): Promise<Response> {
    const { token, password } = reqyest.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.run({
      token,
      password,
    });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
