# Vision Backend (FastAPI + PostgreSQL)

## Setup

### 1. Create PostgreSQL database

```sql
CREATE DATABASE visionwebsite;
```

### 2. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Configure environment

Copy `.env.example` to `.env` and update values:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/visionwebsite
ADMIN_SECRET_KEY=your-strong-secret-key-here
CORS_ORIGINS=http://localhost:5173
```

### 4. Run server

```bash
uvicorn app.main:app --reload --port 8000
```

Or from project root: `npm run dev:backend`

API docs: http://localhost:8000/docs

---

## Public API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/enquiry` | Submit counselling enquiry |
| POST | `/api/demo-class` | Book IELTS/PTE demo class |
| POST | `/api/referral` | Submit referral associate application |
| GET | `/api/testimonials` | Get active testimonials |

---

## Admin Panel

**URL:** `http://localhost:8000/admin/{ADMIN_SECRET_KEY}`

Example: `http://localhost:8000/admin/vision-admin-secret-2026`

Features:
- View all enquiry submissions
- View demo class bookings
- View referral applications
- Create / Edit / Delete testimonials

---

## Admin API (requires header `X-Admin-Secret`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/enquiries` | List all enquiries |
| GET | `/api/admin/demo-classes` | List demo bookings |
| GET | `/api/admin/referrals` | List referral applications |
| GET | `/api/admin/testimonials` | List all testimonials |
| POST | `/api/admin/testimonials` | Create testimonial |
| PUT | `/api/admin/testimonials/{id}` | Update testimonial |
| DELETE | `/api/admin/testimonials/{id}` | Delete testimonial |

---

## Database Tables

- `enquiries` — Contact/counselling form submissions
- `demo_class_bookings` — IELTS/PTE demo class requests
- `referral_applications` — Refer & Earn registrations
- `testimonials` — Student success stories (admin managed)

Tables are auto-created on first startup. Default testimonials are seeded if the table is empty.
