import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './backend/models/Order.js';

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://dishantjava06690_db_user:99Iksg52tqVsYtwy@vplak.nrisjs9.mongodb.net/vplak?retryWrites=true&w=majority&appName=VPLAK';

const initialSeedOrders = [
  {
    orderId: '78369274',
    orderDate: '30-08-2017 03:29:17',
    paymentMethod: 'cod',
    buyer: {
      name: 'dummy',
      state: 'Delhi',
      email: 'dummy@test.com',
      phone: '9876543210',
    },
    total: '799',
    trackStatus: 'Delivered',
    product: {
      title: 'Blue Vivo Mobile Phone',
      name: 'Blue Vivo Mobile Phone',
      model: 'Y11',
      price: '799',
      date: '30-08-2017',
      time: '03:29:17',
      discount: '0',
      qty: '1',
      deliveryCharges: '0',
      status: 'fulfilled',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC1WhepZFmhPsCY2hTJ3Zd-Dqnqy6FNgbG_t5nMgIiqTY69JWM9vxrFqrEL5-TukX7GOrVbdJoENov4Hs_SYVtSyrnvPeRfz5ITXvtsbCpBGcKVoj3opJdQacjIHylKWwFaiSE7VtiOehVUOR5Rh4t15kYNt4vBJxqi6o17rpaRf0f_R_6CuO-0tqkTcAi03cUxUjADTUFJt2GYL4C-1Vh2AXG-KKJGfcSMea1wWymne1wSL3NCUBDEpA',
    },
  },
  {
    orderId: '88451236',
    orderDate: '15-01-2024 11:45:32',
    paymentMethod: 'Credit Card',
    buyer: {
      name: 'jainendra',
      state: 'M.P',
      email: 'jainendra@123',
      phone: '9123456780',
    },
    total: '2568',
    trackStatus: 'In Transit',
    product: {
      title: 'Round Timex Analog Men',
      name: 'Round Timex Analog Men',
      model: 'W23',
      price: '1299',
      date: '15-01-2024',
      time: '11:45:32',
      discount: '80',
      qty: '2',
      deliveryCharges: '50',
      status: 'Shipped',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCb6S5QxoKEBQjh3W5iuLUwSvOSikfZqhdO12T0l9UhqhnCk367Nh0atPPqlylTNm9NG6c5Rs96SFpmU7hb6ZOQHgf5jm1PHFTqG0jqIEClLQVJHeDIy9qxLVzQofLlM2Crr1uGdvXVTSfesBdDIHQhmuOzJ1Hbn_Bjv8WA6D4OEioq_d6W3yIifYZO9fOYXqPG4oVUEaw8knRtvEnl7rQOe6k4lgN1ReqxzP-nr8TbS8fg5yKcwlbl4Q',
    },
  },
];

async function seedDatabase() {
  try {
    console.log(`[Seed] Connecting to MongoDB at ${MONGO_URI}...`);
    await mongoose.connect(MONGO_URI);
    console.log('[Seed] Connected successfully.');

    // Clear existing orders
    const deletedCount = await Order.deleteMany({});
    console.log(`[Seed] Cleared existing orders: ${deletedCount.deletedCount} removed.`);

    const inserted = await Order.insertMany(initialSeedOrders);
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
