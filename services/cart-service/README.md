# Shopping Cart Service (Phase 3)

Manages customer shopping carts, item additions/removals, and quantity calculations. Communicates with Product Service over HTTP to check inventory/pricing.

## 🎯 Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Get current user's cart | Yes |
| `POST` | `/api/cart/items` | Add product item to cart | Yes |
| `PUT` | `/api/cart/items/:productId` | Update item quantity in cart | Yes |
| `DELETE` | `/api/cart/items/:productId` | Remove item from cart | Yes |
| `DELETE` | `/api/cart` | Clear entire cart | Yes |
