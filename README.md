# 🔐 Authentication & User Management System

A production-ready authentication system built with **Spring Boot** (backend) and **React** (frontend), featuring JWT-based stateless authentication, role-based access control, and secure token management.

---

## ✨ Features

- **User Authentication**: Register, Login, Logout with JWT tokens
- **Token Management**: Access tokens with automatic refresh mechanism
- **Role-Based Access Control**: USER and ADMIN roles with protected routes
- **Admin Panel**: Manage users, enable/disable accounts, assign roles
- **Secure Password Storage**: BCrypt hashing
- **API Documentation**: Swagger/OpenAPI integration
- **Modern UI**: Dark theme with responsive design

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Java 17+ | Programming Language |
| Spring Boot 3.2 | Framework |
| Spring Security | Authentication & Authorization |
| Spring Data JPA | Database Access |
| H2 Database | In-memory Database (dev) |
| JJWT | JWT Token Management |
| Lombok | Boilerplate Reduction |
| SpringDoc | API Documentation |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| TypeScript | Type Safety |
| Vite | Build Tool |
| React Router 6 | Routing |
| Axios | HTTP Client |
| jwt-decode | Token Decoding |

---

## 📁 Project Structure

```
project_1/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/auth/
│       ├── AuthApplication.java         # Entry point
│       ├── config/                       # OpenAPI, DataInitializer
│       ├── controller/                   # REST endpoints
│       ├── dto/                          # Request/Response objects
│       ├── entity/                       # JPA entities
│       ├── exception/                    # Error handling
│       ├── repository/                   # Data access
│       ├── security/                     # JWT, Security config
│       └── service/                      # Business logic
└── frontend/
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── App.tsx                       # Routes
        ├── main.tsx                      # Entry point
        ├── index.css                     # Styles
        ├── components/                   # ProtectedRoute
        ├── context/                      # AuthContext
        ├── pages/                        # UI pages
        ├── services/                     # API calls
        └── types/                        # TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+** - [Download](https://adoptium.net/)
- **Maven** - [Download](https://maven.apache.org/download.cgi)
- **Node.js 18+** - [Download](https://nodejs.org/)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies and run
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start at `http://localhost:5173`

---

## 📖 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get tokens |
| POST | `/api/auth/refresh` | Refresh access token |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user profile |

### Admin (ADMIN role required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all users |
| GET | `/api/admin/users/{id}` | Get user by ID |
| PUT | `/api/admin/users/{id}/disable` | Disable user |
| PUT | `/api/admin/users/{id}/enable` | Enable user |
| PUT | `/api/admin/users/{id}/role` | Assign role |

---

## 🔑 Default Credentials

A default admin account is created on startup:

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | ADMIN |

---

## 📚 API Documentation

Once the backend is running, access Swagger UI at:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/api-docs

---

## 🔒 Security Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Client    │────▶│  JWT Filter  │────▶│  Security Chain │
└─────────────┘     └──────────────┘     └─────────────────┘
                           │                      │
                           ▼                      ▼
                    ┌──────────────┐     ┌─────────────────┐
                    │ JWT Utility  │     │ @PreAuthorize   │
                    │ (Validate)   │     │ (Role Check)    │
                    └──────────────┘     └─────────────────┘
```

**Key Security Features:**
- Stateless JWT authentication
- BCrypt password hashing (strength 10)
- Access token: 15 minutes expiry
- Refresh token: 7 days expiry
- Role-based endpoint protection
- CORS configured for frontend

---

## 🧪 Testing

### Test Authentication Flow
1. Register a new user at `/register`
2. Login with credentials at `/login`
3. Access dashboard (protected route)
4. Token auto-refreshes when expired

### Test Admin Features
1. Login with admin@example.com / admin123
2. Navigate to Admin Panel
3. Try enabling/disabling users
4. Try changing user roles

---

## 📝 License

This project is created for educational purposes as part of the BCA curriculum.

---

## 👨‍💻 Author

Built with ❤️ as a demonstration of production-ready authentication architecture.
