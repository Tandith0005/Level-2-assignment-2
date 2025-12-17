# 🚗 Vehicle Rental System (Backend API)

A production-ready backend API built with **Node.js**, **TypeScript**, **Express**, and **PostgreSQL**, designed for managing vehicles, customers, and rental bookings.
---

## Features
- JWT-based login system
- Password hashing using bcrypt
- Role-based authorization for both admin and customer users
- CRUD operations for *vehicles*, *users* and *rental bookings*
- Users(customer) can book vehicles with automatic price calculation
- Cancel bookings (customer)
- Mark bookings as returned (admin)
- Auto-return logic:
  - System marks bookings as *returned* when rental period ends
  - Automatically frees up the vehicle

---

## 🛠️ Technology Stack

| Category | Technology |
|---------|------------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| Auth | JSON Web Tokens |
| Encryption | npm bcrypt |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```sh
git clone https://github.com/Tandith0005/Level-2-assignment-2.git
cd vehicle-rental-system
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Create a .env file
```sh
PORT=5000
DATABASE_URL=url
JWT_SECRET=your_jwt_secret
```


### 4️⃣ Start the server
```sh
npm run dev
```

---

## Usage Instructions

### Authentication
- Signup → /api/v1/auth/signup
- Signin → /api/v1/auth/signin
- jwt token comes like: Authorization: Bearer <token>

### Vehicles
- Admin can creates/updates/deletes vehicles
- Customers can view vehicles

### Bookings
- Customers can create/cancel their bookings
- Admin can update anyone's booking
- Code auto-updates booking status when rental ends
