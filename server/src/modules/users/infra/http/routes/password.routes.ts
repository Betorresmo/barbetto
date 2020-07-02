import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PasswordRecoveryController from '@modules/users/infra/http/controllers/PasswordRecoveryController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const passwordRouter = Router();
const passwordRecoveryController = new PasswordRecoveryController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  passwordRecoveryController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }),
  }),
  resetPasswordController.create,
);

export default passwordRouter;
