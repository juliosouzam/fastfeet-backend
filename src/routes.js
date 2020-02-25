import { Router } from 'express';
import multer from 'multer';

import LoginController from './app/controllers/LoginController';
import RecipientController from './app/controllers/RecipientController';
import CourierController from './app/controllers/CourierController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/login', LoginController.store);

// Store Files
routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipient_id', RecipientController.update);

// Manager Couriers
routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.get('/couriers/:courier_id', CourierController.show);
routes.put('/couriers/:courier_id', CourierController.update);
routes.delete('/couriers/:courier_id', CourierController.destroy);

export default routes;
