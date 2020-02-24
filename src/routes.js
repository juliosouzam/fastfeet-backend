import { Router } from 'express';

import LoginController from './app/controllers/LoginController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', LoginController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipient_id', RecipientController.update);

export default routes;
