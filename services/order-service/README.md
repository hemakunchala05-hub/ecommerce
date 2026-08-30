# Order Service (Phase 4)

Handles checkout flows, order placement, order status transitions (`PENDING`, `PAID`, `SHIPPED`, `DELIVERED`, `CANCELLED`), and order history.

## 🎯 Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Create an order from user's active cart | Yes |
| `GET` | `/api/orders` | Get order history of authenticated user | Yes |
| `GET` | `/api/orders/:id` | Get details of a specific order | Yes |
| `PUT` | `/api/orders/:id/status` | Update order status | Yes (Admin/Service) |
