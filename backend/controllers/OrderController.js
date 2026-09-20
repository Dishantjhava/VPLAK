import OrderService from '../services/OrderService.js';

/**
 * OrderController Class
 *
 * OOP Principles Demonstrated:
 * - Single Responsibility Principle (SRP): Solely responsible for handling HTTP transport,
 *   request parameter extraction, status codes, and JSON response formatting.
 * - Abstraction: Consumes the high-level interface provided by OrderService. It has zero
 *   knowledge of MongoDB, Mongoose queries, or persistence schemas.
 * - Dependency Injection (DI): Receives an OrderService instance via constructor, promoting
 *   loose coupling and testability.
 */
export class OrderController {
  /**
   * Constructor with Dependency Injection
   * @param {OrderService} [orderService=new OrderService()]
   */
  constructor(orderService = new OrderService()) {
    this.orderService = orderService;

    // Explicit method binding to preserve 'this' context when passed to Express route handlers
    this.searchOrders = this.searchOrders.bind(this);
    this.getAllOrders = this.getAllOrders.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  /**
   * HTTP Handler for POST /api/orders
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createOrder(req, res) {
    try {
      const orderData = req.body;
      const data = await this.orderService.createOrder(orderData);

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Error occurred while creating order',
      });
    }
  }

  /**
   * HTTP Handler for GET /api/orders/search?type=...&value=...
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async searchOrders(req, res) {
    try {
      const { type, value } = req.query;

      // Delegate business search logic to OrderService
      const data = await this.orderService.search(type, value);

      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Error occurred while searching orders',
      });
    }
  }

  /**
   * HTTP Handler for GET /api/orders
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getAllOrders(req, res) {
    try {
      const data = await this.orderService.getAllOrders();
      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Error occurred while fetching orders',
      });
    }
  }
}

export default OrderController;
