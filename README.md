# Royal Wow Meal & Bar

A premium, full-stack web application for a combined Restaurant and Bar business. This project features a sophisticated landing page, separate menus for the restaurant and bar, booking systems, and a comprehensive admin management dashboard.

## 🚀 Features

### Public Frontend
- **Dual-Themed Landing Page**: Seamlessly switch between the Restaurant and Bar sections.
- **Restaurant Section**:
  - Interactive Menu with categories.
  - "About Us" and Story sections.
  - Contact information and location.
  - Integrated Checkout flow.
- **Bar Section**:
  - Specialized Bar Menu (Cocktails, Spirits, etc.).
  - Events management and display.
  - Table Booking/Reservation system.
  - Contact and Location details for the Bar.

### Admin Dashboard
- **Real-time Analytics**: Monitor sales, orders, and reservations.
- **Order Management**: Track and update restaurant orders.
- **Menu Management**: CRUD operations for menu items across both sections.
- **Category Management**: Organize menu items by customizable categories.
- **Reservation Management**: View and manage bar table bookings.
- **Event Management**: Schedule and promote bar events.
- **Message Center**: View and respond to customer inquiries from contact forms.
- **Coupon System**: Create and manage promotional coupons for customers.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **UI Components**: Radix UI, Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router 7
- **Charts**: Recharts

### Backend
- **Server**: Fastify (TypeScript)
- **Database**: MongoDB with Mongoose
- **Documentation**: Swagger UI (available at `/api/docs`)
- **Authentication**: JWT & Bcrypt
- **File Handling**: @fastify/multipart (for menu/event images)

## 📦 Project Structure

```text
.
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route-level components (Restaurant, Bar, Admin)
│   │   ├── services/   # API communication (Axios)
│   │   └── store/      # Zustand state management
│   └── ...
└── server/             # Fastify API
    ├── src/
    │   ├── routes/     # API endpoints
    │   ├── models/     # Mongoose schemas
    │   ├── services/   # Business logic
    │   └── app.ts      # Fastify application setup
    └── ...
```

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository** (if applicable)
2. **Install Server Dependencies**:
   ```bash
   cd server
   npm install
   ```
3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

The server reads its settings from environment variables (a `server/.env` file is loaded automatically). Copy the example and set a secret:

```bash
cd server
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `JWT_SECRET` | **Yes** | Secret used to sign and verify admin JWTs. The server refuses to start without it. Generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`. |
| `MONGODB_URI` | No | MongoDB connection string (default `mongodb://127.0.0.1:27017/royal-wow`). |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | No | Your full-access admin login. Created on first start if missing; a restart never resets it. |
| `DEMO_EMAIL`, `DEMO_PASSWORD` | No | The public read-only demo login (default `demo@royalwow.com` / `royalwow-demo`). The API answers every change from it with 403. |
| `PORT` | No | Server port (default `3001`). |
| `FRONTEND_DIST` | No | Path to the built frontend. When set, the server also serves the React app, as in the Docker image. |

### Running Locally

You will need to run both the server and the frontend simultaneously.

1. **Start the Backend**:
   ```bash
   cd server
   npm run dev
   ```
   *The server will run on `http://localhost:3001`*

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`*

### Authentication
Admin endpoints (menu/category/event/coupon writes, menu import/export, order/reservation/contact listing and status updates, and analytics) require an `Authorization: Bearer <token>` header. Get a token from `POST /api/admin/login`; the admin dashboard sends it automatically after login. Public endpoints stay open: menu, category and event GETs, placing an order, booking a reservation, sending a contact message, and validating a coupon.

### Read-only demo
The login page is prefilled with the demo account. It can open every admin page and read all data, but any create, update or delete returns `403` and nothing changes.

### Docker
The root `Dockerfile` builds the frontend and the API into one image that serves both on port 3001:
```bash
docker build -t royal-wow .
docker run -p 3001:3001 -e JWT_SECRET=... -e MONGODB_URI=... royal-wow
# sample data, once: docker run --rm -e MONGODB_URI=... royal-wow node dist/seed.js
```

### API Documentation
Once the server is running, you can access the Swagger UI documentation at:
`http://localhost:3001/api/docs`

## 🧪 Seeding Data
To populate the database with initial sample data (Admin account, Menu items, etc.), run:
```bash
cd server
npm run seed
```

## 📄 License
This project is licensed under the ISC License.
