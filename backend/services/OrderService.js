import OrderRepository from '../repositories/OrderRepository.js';

/**
 * OrderService Class
 *
 * OOP Principles Demonstrated:
 * - Single Responsibility Principle (SRP): Coordinates business logic, input validation, and search rules.
 * - Abstraction: Exposes high-level domain operations; knows nothing about HTTP or Mongoose internals.
 * - Dependency Injection (DI): Receives an OrderRepository instance in the constructor, allowing loose coupling and testability.
 * - Polymorphism / Strategy Pattern: Replaces conditional branching (if/else / switch) with a strategy map dispatch.
 */
export class OrderService {
  /**
   * Constructor with Dependency Injection
   * @param {OrderRepository} [orderRepository=new OrderRepository()]
   */
  constructor(orderRepository = new OrderRepository()) {
    this.orderRepository = orderRepository;

    // Strategy Pattern Map: maps search criteria types to corresponding repository methods.
    // This allows runtime polymorphic dispatch without if/else or switch ladders.
    this.searchStrategies = {
      orderid: (val) => this.orderRepository.findByOrderId(val),
      mobile: (val) => this.orderRepository.findByMobile(val),
      name: (val) => this.orderRepository.findByName(val),
      email: (val) => this.orderRepository.findByEmail(val),
    };
  }

  /**
   * Executes order search based on the provided strategy type and search value
   * @param {string} type - 'orderid' | 'mobile' | 'name' | 'email'
   * @param {string} [value=''] - Search term
   * @returns {Promise<Array>} List of matching orders
   * @throws {Error} When an unsupported search type is passed
   */
  async search(type, value) {
    const trimmedValue = (value || '').trim();

    // If search term is empty, return all orders by default
    if (!trimmedValue) {
      return await this.orderRepository.findAll();
    }

    if (!type || typeof type !== 'string') {
      throw new Error('Search type is required (allowed: orderid, mobile, name, email)');
    }

    const normalizedType = type.trim().toLowerCase();
    const strategy = this.searchStrategies[normalizedType];

    // Reject unknown search types
    if (!strategy) {
      const validTypes = Object.keys(this.searchStrategies).join(', ');
      throw new Error(
        `Invalid search type: '${type}'. Supported search types are: ${validTypes}`
      );
    }

    // Polymorphic invocation of the strategy
    return await strategy(trimmedValue);
  }

  /**
   * Validates and creates a new order
   * @param {Object} orderData
   * @returns {Promise<Object>}
   * @throws {Error} If any required field is missing
   */
  async createOrder(orderData) {
    if (!orderData || typeof orderData !== 'object') {
      throw new Error('Order data is required');
    }

    const { orderId, buyer, product, total } = orderData;

    if (!orderId || typeof orderId !== 'string' || !orderId.trim()) {
      throw new Error('Field "orderId" is required');
    }

    if (!buyer || typeof buyer !== 'object' || !buyer.name || !buyer.name.trim()) {
      throw new Error('Field "buyer" with at least "name" is required');
    }

    if (!product || typeof product !== 'object' || (!product.title && !product.name)) {
      throw new Error('Field "product" with "title" or "name" is required');
    }

    if (total === undefined || total === null || total.toString().trim() === '') {
      throw new Error('Field "total" is required');
    }

    return await this.orderRepository.create(orderData);
  }

  /**
   * Retrieves all orders
   * @returns {Promise<Array>}
   */
  async getAllOrders() {
    return await this.orderRepository.findAll();
  }
}

export default OrderService;
