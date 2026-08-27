# Limited Edition Sneaker Drop System

A real-time, high-concurrency E-Commerce backend system designed for limited-edition sneaker drops. Built with **Node.js, Express, TypeScript, PostgreSQL (Sequelize ORM), and Socket.io**, this system prevents overselling, handles race conditions gracefully, automatically manages 60-second item reservation holds, and streams live stock counts and recent purchase feeds to all connected clients.

---

## Getting Started & How to Run

### Prerequisites
* **Node.js** (v22 or higher)
* **PostgreSQL** (Neon DB)
* **npm** or **yarn**

### 1. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/fahadhossain24/Assesment-Real-Time-Inventory-Server.git
cd Assesment-Real-Time-Inventory-Server
npm install
```

### 2. Configuration
Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials and other configuration values.

### 3. Database Schema Setup & Migrations 
Run Sequelize migrations to set up the relational schema, constraints, and tables

```bash
npx sequelize-cli db:migrate
```
(Optional) to undo or reset migrations:

```bash
npx sequelize-cli db:migrate:undo:all
```

### 4. Start the Server
Run the following command to start the server:

```bash
npm run dev
```

For production build & start:

```bash
npm run build
npm start
```

The server will start on the port defined in the `.env` file.

### Technical Architecture Explanations

#### 1. How 60-second item reservation hold works:
   To manage the 60-second item hold window without blocking client execution or over-complicating infrastructure, the system utilizes a Hybrid State & Server-Side Recovery Worker Pattern:

   - **Immediate Hold Creation**: When a user reserves an item, a row is created in the reservations table with status = 'pending' and an expiresAt timestamp set to NOW() + 60 seconds.

   - **Asynchronous Timeout Scheduled**: A lightweight server-side timer (setTimeout) is scheduled for 60 seconds. When triggered, an isolated database transaction verifies if the reservation is still pending. If so:

   - **Marks the reservation status as cancelled(expired)**:

   - **Increments availableStock back by +1 unit**:

   - **Broadcasts stock_updated and reservation_expired Socket.io events to update all open client tabs in real-time**:


#### 2. Concurrency control & preventing overselling
When hundreds of users attempt to reserve or purchase the final unit (availableStock = 1) simultaneously, traditional read-then-write operations risk race conditions resulting in unexpected inventory.

This system prevents overselling using Database-Level Pessimistic Locking (Row-Level Locking):

- **Row-Level Locking (LOCK.UPDATE)**: During reservation requests, the drop record is queried inside a managed database transaction using Sequelize’s lock: transaction.LOCK.UPDATE. This forces incoming concurrent requests for the same drop ID into an atomic queue. Subsequent requests must wait until the active reservation transaction commits or rolls back.

- **Atomic Stock Decrement**: Stock reduction occurs inside the locked transaction block if only availableStock > 0.


#### 3. Socket.IO Real-Time Updates
The backend exposes real-time Socket.IO events to keep the client UI and activity feed synchronized without page reloads:

- stock_updated - Emitted when stock is temporarily reserved or restored
- reservation_expired - Emitted when a reservation expires due to timeout
- purchase_completed - Emitted when a purchase is successfully completed and the purchasor becomes displayed on UI

### Backend API Endpoints:
- GET /api/v1/drop/retrieve/all - Get all drops
- POST /api/v1/reservation/reserve-item - Reserve item
- POST /api/v1/purchase/purchase-item - Purchase item
- POST /api/v1/drop/create - Create merch drop
- POST /api/v1/user/create - Keep user record

### Socket.IO Events:
- stock_updated
- reservation_expired
- purchase_completed

### API Documentation

Full API documentation is available here
[API Documentation](https://documenter.getpostman.com/view/39205428/2sBYAuQqYu)

### Backend Deployed URL

The backend is deployed and accessible at:
[Backend Deployed URL](https://assesment-real-time-inventory-server.onrender.com/)



