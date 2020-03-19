import { Router } from 'express';
import multer from 'multer';

import LoginController from './app/controllers/LoginController';
import RecipientController from './app/controllers/RecipientController';
import CourierController from './app/controllers/CourierController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import DeliveryController from './app/controllers/DeliveryController';
import OrderStartController from './app/controllers/OrderStartController';
import OrderEndController from './app/controllers/OrderEndController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemController from './app/controllers/ProblemController';

import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.json({ ok: true }));

routes.post('/login', LoginController.store);

// Store Files
routes.post('/files', upload.single('file'), FileController.store);

// Manager Status Delivery
routes.put(
  '/couriers/:courier_id/deliveries/:order_id/start_at',
  OrderStartController.update
);
routes.put(
  '/couriers/:courier_id/deliveries/:order_id/end_at',
  OrderEndController.update
);

// Manager Deliveries
routes.get('/couriers/:courier_id/deliveries', DeliveryController.index);

// Manager Problems
routes.post('/orders/:order_id/problems', ProblemController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipient_id', RecipientController.update);

// Manager Couriers
routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.get('/couriers/:courier_id', CourierController.show);
routes.put('/couriers/:courier_id', CourierController.update);
routes.delete('/couriers/:courier_id', CourierController.destroy);

// Manager Orders
routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.get('/orders/:order_id', OrderController.show);
routes.put('/orders/:order_id', OrderController.update);
routes.delete('/orders/:order_id', OrderController.destroy);

routes.get('/orders-problems', DeliveryProblemController.index);
routes.get('/orders/:order_id/problems', DeliveryProblemController.show);

export default routes;
