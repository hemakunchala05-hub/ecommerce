# API Gateway

The single ingress point for all incoming client traffic. It routes requests to the corresponding downstream microservices.

## ⚙️ Ports & Routing

- **Default Port**: `8000`
- Routes:
  - `/api/users` -> `User Service` (`http://localhost:5001/api/users`)
  - `/api/products` -> `Product Service` (`http://localhost:5002/api/products`)
  - `/api/cart` -> `Cart Service` (`http://localhost:5003/api/cart`)
  - `/api/orders` -> `Order Service` (`http://localhost:5004/api/orders`)
  - `/api/payments` -> `Payment Service` (`http://localhost:5005/api/payments`)
  - `/api/notifications` -> `Notification Service` (`http://localhost:5006/api/notifications`)
