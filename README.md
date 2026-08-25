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
