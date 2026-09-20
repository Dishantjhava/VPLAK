import mongoose from 'mongoose';

/**
 * Order Schema definition
 * Represents customer orders in the VPLAK portal.
 */
const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    orderDate: {
      type: String,
      required: true,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    buyer: {
      name: { type: String, required: true, trim: true },
      state: { type: String, trim: true },
      email: { type: String, trim: true, index: true },
      phone: { type: String, trim: true, index: true },
    },
    product: {
      name: { type: String, trim: true },
      title: { type: String, trim: true },
      model: { type: String, trim: true },
      price: { type: String, trim: true },
      date: { type: String, trim: true },
      time: { type: String, trim: true },
      image: { type: String, trim: true },
      qty: { type: String, trim: true },
      deliveryCharges: { type: String, trim: true },
      discount: { type: String, trim: true },
      status: { type: String, trim: true },
    },
    total: {
      type: String,
      required: true,
      trim: true,
    },
    trackStatus: {
      type: String,
      default: 'In Transit',
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Fallback: ensure title and name are synchronized for frontend compatibility
OrderSchema.pre('save', function (next) {
  if (this.product) {
    if (!this.product.name && this.product.title) {
      this.product.name = this.product.title;
    }
    if (!this.product.title && this.product.name) {
      this.product.title = this.product.name;
    }
  }
  next();
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
