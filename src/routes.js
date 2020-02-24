import { Router } from 'express';

import LoginController from './app/controllers/LoginController';

const routes = new Router();

routes.post('/login', LoginController.store);

export default routes;
