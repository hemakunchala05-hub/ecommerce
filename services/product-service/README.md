# Product Catalog Service (Phase 2)

Handles product listings, categorization, pricing, and stock management.

## 🎯 Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Get list of all products (with pagination/filters) |
| `GET` | `/api/products/:id` | Get details for a single product |
| `POST` | `/api/products` | Create a new product (Admin) |
| `PUT` | `/api/products/:id` | Update product details or stock |
| `DELETE` | `/api/products/:id` | Remove a product |
