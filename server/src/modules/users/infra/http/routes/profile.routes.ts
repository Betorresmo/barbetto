import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.get('/', profileController.show);
profileRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        new_password: Joi.string(),
      })
      .with('email', 'password')
      .with('new_password', 'password'),
  }),
  profileController.update,
);

export default profileRouter;
