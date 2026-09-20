import Order from '../models/Order.js';

/**
 * OrderRepository Class
 *
 * OOP Principle: Encapsulation & Single Responsibility Principle (SRP)
 * - Encapsulation: This class completely encapsulates Mongoose model interactions
 *   and database queries. No other layer knows the underlying DB technology.
 * - Single Responsibility: Dedicated solely to data persistence and retrieval.
 */
export class OrderRepository {
  constructor(model = Order) {
    this.model = model;
  }

  /**
   * Safely escapes regex special characters
   * @param {string} str
   * @returns {string}
   */
  _escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Retrieves all orders sorted by creation date descending
   * @returns {Promise<Array>}
   */
  async findAll() {
    return await this.model.find({}).sort({ createdAt: -1 }).lean();
  }

  /**
   * Finds orders by Order ID using case-insensitive regex
   * @param {string} value
   * @returns {Promise<Array>}
   */
  async findByOrderId(value) {
    const safeRegex = new RegExp(this._escapeRegex(value), 'i');
    return await this.model.find({ orderId: safeRegex }).lean();
  }

  /**
   * Finds orders by Buyer Mobile Number using case-insensitive regex
   * @param {string} value
   * @returns {Promise<Array>}
   */
  async findByMobile(value) {
    const safeRegex = new RegExp(this._escapeRegex(value), 'i');
    return await this.model.find({ 'buyer.phone': safeRegex }).lean();
  }

  /**
   * Finds orders by Buyer Name using case-insensitive regex
   * @param {string} value
   * @returns {Promise<Array>}
   */
  async findByName(value) {
    const safeRegex = new RegExp(this._escapeRegex(value), 'i');
    return await this.model.find({ 'buyer.name': safeRegex }).lean();
  }

  /**
   * Finds orders by Buyer Email using case-insensitive regex
   * @param {string} value
   * @returns {Promise<Array>}
   */
  async findByEmail(value) {
    const safeRegex = new RegExp(this._escapeRegex(value), 'i');
    return await this.model.find({ 'buyer.email': safeRegex }).lean();
  }

  /**
   * Creates and persists a new order document in MongoDB
   * @param {Object} orderData
   * @returns {Promise<Object>}
   */
  async create(orderData) {
    const order = new this.model(orderData);
    const saved = await order.save();
    return saved.toObject();
  }

  /**
   * Counts total documents (data access utility)
   * @returns {Promise<number>}
   */
  async count() {
    return await this.model.countDocuments();
  }
}

export default OrderRepository;
