import { Router } from 'express';
import OrderController from '../controllers/OrderController.js';

/**
 * Creates and configures Express router for order endpoints
 * @param {OrderController} [controller=new OrderController()]
 * @returns {Router}
 */
export function createOrderRouter(controller = new OrderController()) {
  const router = Router();

  // Search orders route: GET /api/orders/search?type=name&value=dummy
  router.get('/search', controller.searchOrders);

  // Create order route: POST /api/orders
  router.post('/', controller.createOrder);

  // Default list route: GET /api/orders
  router.get('/', controller.getAllOrders);

  return router;
}

export default createOrderRouter();
