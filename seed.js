import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './backend/models/Order.js';
import { initialOrders } from './src/data/mockOrders.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vplak';

async function seedDatabase() {
  try {
    console.log(`[Seed] Connecting to MongoDB at ${MONGO_URI}...`);
    await mongoose.connect(MONGO_URI);
    console.log('[Seed] Connected successfully.');

    // Clear existing orders
    const deletedCount = await Order.deleteMany({});
    console.log(`[Seed] Cleared existing orders: ${deletedCount.deletedCount} removed.`);

    // Prepare orders with both title and name for full schema and component compatibility
    const ordersToInsert = initialOrders.map((order) => ({
      orderId: order.orderId,
      orderDate: order.orderDate,
      paymentMethod: order.paymentMethod,
      buyer: {
        name: order.buyer.name,
        state: order.buyer.state,
        email: order.buyer.email,
        phone: order.buyer.phone,
      },
      product: {
        title: order.product.title,
        name: order.product.title,
        model: order.product.model,
        price: order.product.price,
        date: order.product.date,
        time: order.product.time,
        image: order.product.image,
        qty: order.product.qty,
        deliveryCharges: order.product.deliveryCharges,
        discount: order.product.discount,
        status: order.product.status,
      },
      total: order.total,
      trackStatus: order.product.status === 'fulfilled' ? 'Delivered' : 'In Transit',
    }));

    const inserted = await Order.insertMany(ordersToInsert);
    console.log(`[Seed] Successfully inserted ${inserted.length} sample orders:`);
    inserted.forEach((item, index) => {
      console.log(`  ${index + 1}. Order ID: ${item.orderId} | Buyer: ${item.buyer.name} | Total: ${item.total}`);
    });

    await mongoose.disconnect();
    console.log('[Seed] Database disconnected. Seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
