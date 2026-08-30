# Scalable E-Commerce Platform (Microservices Architecture)

An enterprise-grade, scalable e-commerce backend built with **Node.js, Express, MongoDB (Mongoose), and Docker**.

---

## 🏛 Architecture Overview

Each microservice is an independent application with its own database, configuration, and runtime environment:

```
[ Client / Web App ]
         │
         ▼
 ┌────────────────┐
 │  API Gateway   │  (Port 8000)
 └───────┬────────┘
         │
 ┌───────┴────────┬────────────────┬────────────────┬────────────────┬────────────────┐
 │                │                │                │                │                │
 ▼                ▼                ▼                ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ User Service │ │Product Service││ Cart Service │ │Order Service │ │Payment Serv. │ │Notification  │
│  Port: 5001  │ │  Port: 5002  │ │  Port: 5003  │ │  Port: 5004  │ │  Port: 5005  │ │  Port: 5006  │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │                │                │                │
       ▼                ▼                ▼                ▼                ▼                ▼
   MongoDB          MongoDB          MongoDB          MongoDB          MongoDB          MongoDB
   (users_db)       (products_db)    (carts_db)       (orders_db)      (payments_db)    (notifs_db)
```

---

## 🚀 Services & Port Mapping

| Service | Port | Description | Database |
| :--- | :--- | :--- | :--- |
| **API Gateway** | `8000` | Entry point, routing, auth delegation | N/A |
| **User Service** | `5001` | Auth (JWT), registration, profiles | `mongodb://localhost:27017/ecommerce_user_db` |
| **Product Service** | `5002` | Catalog, inventory, categories | `mongodb://localhost:27017/ecommerce_product_db` |
| **Cart Service** | `5003` | User shopping carts | `mongodb://localhost:27017/ecommerce_cart_db` |
| **Order Service** | `5004` | Checkout, order tracking, history | `mongodb://localhost:27017/ecommerce_order_db` |
| **Payment Service** | `5005` | Payment processing & webhooks | `mongodb://localhost:27017/ecommerce_payment_db` |
| **Notification Service** | `5006` | Email & SMS notifications | `mongodb://localhost:27017/ecommerce_notification_db` |

---

## 🛠 Project Rules & Principles

1. **Service Independence**: Treat each service like its own company. It has its own `package.json`, `.env`, database, and tests.
2. **Strict Network Isolation**: No service may `require()` or import another service's files directly. Communication occurs exclusively over HTTP (REST) or message queues.
3. **Build Order**:
   - Phase 0: Project Foundation (Current)
   - Phase 1: User Service
   - Phase 2: Product Catalog Service
   - Phase 3: Shopping Cart Service
   - Phase 4: Order Service
   - Phase 5: Payment Service
   - Phase 6: Notification Service & API Gateway

---

## 💻 Running the Services

### Option 1: Using Docker Compose
```bash
# Start all microservices and databases
docker-compose up --build
```

### Option 2: Running Individual Services Locally
Navigate into any service folder:
```bash
cd services/user-service
cp .env.example .env
npm install
npm run dev
```
