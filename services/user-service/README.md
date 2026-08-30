# User Service (Phase 1)

Responsible for user identity, authentication (JWT), password hashing, and profile management.

## 🎯 Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | Register a new user | No |
| `POST` | `/api/users/login` | Authenticate user & issue JWT | No |
| `GET` | `/api/users/profile` | Get current user's profile | Yes (Bearer Token) |
| `PUT` | `/api/users/profile` | Update profile information | Yes (Bearer Token) |
