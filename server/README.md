# Talentele Backend API Server

Production-ready Node.js, Express & TypeScript backend server for the Talentele education & training platform.

## Architecture & Directory Structure

```
server/
├── .env                  # Active environment variables
├── .env.example          # Environment blueprint
├── package.json          # Server dependencies & scripts
├── tsconfig.json         # TypeScript compiler configuration
├── data_storage/         # Persistent JSON file storage (out-of-the-box DB)
└── src/
    ├── app.ts            # Express application with security & CORS
    ├── server.ts         # Server entrypoint and graceful shutdown
    ├── config/
    │   └── env.ts        # Centralized configuration
    ├── types/
    │   └── index.ts      # TypeScript interfaces & DTOs
    ├── models/
    │   ├── store.ts      # Atomic file persistence & initial seed data
    │   ├── lead.model.ts # Lead CRM data access
    │   ├── cohort.model.ts # Training cohorts data access
    │   ├── course.model.ts # Courses catalog data access
    │   ├── placement.model.ts # Placements data access
    │   └── user.model.ts # Administrator authentication
    ├── middlewares/
    │   ├── auth.middleware.ts       # JWT Bearer token authentication
    │   ├── errorHandler.middleware.ts # Structured error responses
    │   └── validate.middleware.ts   # Zod request validation
    ├── controllers/
    │   ├── auth.controller.ts       # Admin login & profile
    │   ├── leads.controller.ts      # Lead CRM CRUD & CSV export
    │   ├── cohorts.controller.ts    # Batch scheduling
    │   ├── courses.controller.ts    # Course listings
    │   ├── placements.controller.ts # Placements and alumni
    │   └── analytics.controller.ts  # KPI metrics & conversion stats
    ├── routes/
    │   ├── auth.routes.ts           # /api/v1/auth
    │   ├── leads.routes.ts          # /api/v1/leads
    │   ├── cohorts.routes.ts        # /api/v1/cohorts
    │   ├── courses.routes.ts        # /api/v1/courses
    │   ├── placements.routes.ts     # /api/v1/placements
    │   ├── analytics.routes.ts      # /api/v1/analytics
    │   └── index.ts                 # Master router
    └── utils/
        ├── apiResponse.ts           # Unified response envelope
        └── csvExporter.ts           # CSV generation utility
```

---

## Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure MongoDB in `.env`
Open `server/.env` and specify your MongoDB URI (local or MongoDB Atlas cluster):

```env
# Local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/talentele

# Or MongoDB Atlas Cloud Cluster
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/talentele?retryWrites=true&w=majority
```

*Note: If MongoDB is offline during local development, the server automatically activates a resilient local storage fallback so you can continue testing without interruptions.*

### 3. Run in Development Mode (with hot reloading)
```bash
npm run dev
```

### 4. Build & Run in Production Mode
```bash
npm run build
npm start
```

---

## API Endpoints Reference

Base URL: `http://localhost:5000/api/v1`

### 1. Health & Status
- **`GET /api/v1/health`** — Server heartbeat and uptime status.

### 2. Admin Authentication
- **`POST /api/v1/auth/login`** — Admin login. Returns JWT token.
  - Body: `{ "email": "admin@talentele.com", "password": "TalenteleAdmin@2026" }`
- **`GET /api/v1/auth/me`** — Get authenticated admin profile (`Authorization: Bearer <token>`).

### 3. Leads & Enquiries CRM
- **`GET /api/v1/leads`** — List all candidate enquiries (supports `?search=`, `?status=`, `?course=`, `?page=`, `?limit=`).
- **`GET /api/v1/leads/:id`** — Get full enquiry details by ID.
- **`POST /api/v1/leads`** — Submit candidate enquiry (from website forms or admin).
  - Body: `{ "name": "...", "phone": "...", "email": "...", "course": "data-analytics", "message": "..." }`
- **`PATCH /api/v1/leads/:id`** — Update lead status (`new`, `contacted`, `follow-up`, `enrolled`, `closed`) or add counsellor notes.
- **`DELETE /api/v1/leads/:id`** — Remove lead record.
- **`GET /api/v1/leads/export`** — Download all filtered leads directly as a CSV spreadsheet.

### 4. Cohorts & Batches
- **`GET /api/v1/cohorts`** — List upcoming training batches with start dates and seat progress.
- **`GET /api/v1/cohorts/:id`** — Get batch details.
- **`POST /api/v1/cohorts`** — Schedule a new training cohort.
- **`PATCH /api/v1/cohorts/:id`** — Update batch schedule, enrolled seat count, or status.
- **`DELETE /api/v1/cohorts/:id`** — Remove a cohort batch.

### 5. Courses
- **`GET /api/v1/courses`** — List courses (filter by `?category=analytics|ai|core`).
- **`GET /api/v1/courses/:slug`** — Retrieve curriculum details by course slug.

### 6. Placements & Alumni
- **`GET /api/v1/placements`** — Verified hiring records, salary hikes, and employer names.
- **`POST /api/v1/placements`** — Add new alumni placement story.

### 7. Analytics & KPIs
- **`GET /api/v1/analytics/stats`** — Dashboard overview stats: total enquiries, conversion rate %, status breakdown, course demand distribution, recent activity stream.
