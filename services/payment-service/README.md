# Payment Service (Phase 5)

Handles payment processing, external payment provider integrations (e.g. Stripe, PayPal mock), and transaction logs.

## 🎯 Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/payments/process` | Process a payment for an order |
| `GET` | `/api/payments/:id` | Get transaction details |
| `POST` | `/api/payments/webhook` | Webhook receiver for payment gateways |
