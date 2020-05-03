import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/et', (req, res) => res.send({ message: 'Hello there 👽' }));

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
