# Notification Service (Phase 6)

Handles async messaging, emails (order confirmations, shipping notifications, password resets), and SMS alerts.

## 🎯 Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/notifications/send` | Send an email/SMS notification |
| `GET` | `/api/notifications/:userId` | Get notification history for a user |
