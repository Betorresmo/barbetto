import { Router } from 'express';

import PasswordRecoveryController from '@modules/users/infra/http/controllers/PasswordRecoveryController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const passwordRouter = Router();
const passwordRecoveryController = new PasswordRecoveryController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', passwordRecoveryController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
