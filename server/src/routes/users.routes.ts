import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();

    const user = await createUser.run({
      name,
      email,
      password,
    });

    delete user.password;

    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

export default usersRouter;
