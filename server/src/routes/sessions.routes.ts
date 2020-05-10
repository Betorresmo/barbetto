import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.run({
    email,
    password,
  });

  delete user.password;

  return res.status(200).json({ user, token });
});

export default sessionsRouter;