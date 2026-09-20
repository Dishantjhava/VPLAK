# VPLAK Search Order Admin Panel

A full-stack order management and search portal designed in Google Stitch and developed with **React + Vite + Tailwind CSS** on the frontend, and a strongly architected **Node.js + Express + MongoDB (Mongoose)** backend demonstrating core **Object-Oriented Programming (OOP)** principles.

---

## 📸 Overview & Design System

The application replicates the custom Stitch design with high fidelity:
- **Brand Aesthetic**: Classic dark teal backdrop (`#005c53`), top navigation bar (`#000000`), and vintage portal styling.
- **Search Pill Component**: Rounded fieldset with floating legend, live search type selection, and glossy green gradient CTA button.
- **Order Cards**: Dual-section responsive cards displaying order date, buyer details, payment mode badges, live order tracking, and itemized product breakdown.

---

## 🏛️ Backend Architecture & OOP Principles

The backend is built following a clean, layered class-based architecture:
```
Routes ──► Controller ──► Service ──► Repository ──► Mongoose Model ──► MongoDB
```

### Key OOP Principles Demonstrated:
1. **Encapsulation**:
   - `OrderRepository` encapsulates all database operations, Mongoose queries, and regex sanitization. No other layer touches Mongoose or knows the database query syntax.
2. **Single Responsibility Principle (SRP)**:
   - `OrderRepository`: Dedicated solely to data access and query execution.
   - `OrderService`: Dedicated strictly to business rules, validation, and strategy delegation.
   - `OrderController`: Handles HTTP transport, query extraction, and status code responses.
3. **Abstraction**:
   - High-level layers interact via clean method abstractions (`service.search(type, value)`) without needing to understand underlying storage or query mechanisms.
4. **Constructor-Based Dependency Injection (DI)**:
   - `OrderService` accepts an `OrderRepository` instance in its constructor (`constructor(orderRepository = new OrderRepository())`).
   - `OrderController` accepts an `OrderService` instance in its constructor (`constructor(orderService = new OrderService())`).
   - Promotes loose coupling and simplifies unit testing with mocks.
5. **Polymorphism / Strategy Pattern**:
   - The `search(type, value)` method avoids long `if/else` or `switch` statements. It dispatches calls polymorphically through a dictionary map of search strategies (`orderid`, `mobile`, `name`, `email`).

---

## 📁 Project Structure

```
VPLAK/
├── backend/
│   ├── controllers/
│   │   └── OrderController.js      # HTTP request handling & status codes (DI)
│   ├── models/
│   │   └── Order.js                # Mongoose schema for orders & products
│   ├── repositories/
│   │   └── OrderRepository.js      # Data access layer (Encapsulated queries)
│   ├── routes/
│   │   └── orderRoutes.js          # Express route bindings
│   └── services/
│       └── OrderService.js          # Business logic & Strategy Pattern search
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Main header & navigation bar
│   │   ├── OrderCard.jsx           # Order details card with specs & actions
│   │   └── SearchOrder.jsx         # Search filter fieldset & glossy button
│   ├── data/
│   │   └── mockOrders.js           # Reference mock data
│   ├── App.jsx                     # Main application linking UI to backend API
│   ├── index.css                   # Custom vintage layout classes & Tailwind
│   └── main.jsx                    # React root render
├── .env.example                    # Environment variable template
├── package.json                    # Project metadata and dependencies
├── seed.js                         # Standalone MongoDB database seeder
├── server.js                       # Express server configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── vite.config.js                  # Vite configuration with API proxy
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) running locally on port 27017

### 2. Installation
```bash
npm install
```

### 3. Configure Environment
Copy `.env.example` to `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/vplak
```

### 4. Seed the Database
Populate MongoDB with the design's initial orders:
```bash
npm run seed
```

### 5. Run the Application
In separate terminal tabs:

**Start Backend Server:**
```bash
npm run server
# Runs on http://localhost:5000
```

**Start Frontend Development Server:**
```bash
npm run dev
# Runs on http://localhost:5173
```

---

## 📡 API Reference

### Search Orders
- **Endpoint**: `GET /api/orders/search`
- **Query Parameters**:
  - `type` (required when searching): `orderid` | `mobile` | `name` | `email`
  - `value` (optional): Search string (case-insensitive regex match)
- **Response**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "orderId": "78369274",
      "orderDate": "30-08-2017 03:29:17",
      "paymentMethod": "cod",
      "buyer": {
        "name": "dummy",
        "state": "Delhi",
        "email": "dummy@test.com",
        "phone": "9876543210"
      },
      "product": {
        "title": "Blue Vivo Mobile Phone",
        "model": "Y11",
        "price": "799",
        "qty": "1",
        "deliveryCharges": "0",
        "discount": "0",
        "status": "fulfilled"
      },
      "total": "799",
      "trackStatus": "Delivered"
    }
  ]
}
```
