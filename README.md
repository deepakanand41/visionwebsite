# Vision Overseas Education Website

Monorepo for the Vision International overseas education consultancy platform.

## Project Structure

```
VisionWebsite/
├── frontend/          # React + Vite + Tailwind CSS UI
├── backend/           # FastAPI + PostgreSQL REST API
│   ├── app/
│   ├── venv/          # Python virtual environment
│   └── requirements.txt
└── package.json       # Root scripts
```

## Getting Started

### 1. PostgreSQL database

```sql
CREATE DATABASE visionwebsite;
```

### 2. Install dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
cp .env.example .env   # update DATABASE_URL and ADMIN_SECRET_KEY
```

### 3. Run backend

```bash
npm run dev:backend
```

Backend: http://localhost:8000  
API docs: http://localhost:8000/docs

### 4. Run frontend

```bash
npm run dev
```

Frontend: http://localhost:5173 (proxies `/api/*` to backend)

---

## Admin Panel

**URL:** `http://localhost:8000/admin/{ADMIN_SECRET_KEY}`

Default key (change in `backend/.env`): `vision-admin-secret-2026`

Example: http://localhost:8000/admin/vision-admin-secret-2026

Manage:
- All form submissions (Enquiries, Demo Classes, Referrals)
- Testimonials (Create / Edit / Delete)

---

## API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enquiry` | Counselling enquiry form |
| POST | `/api/demo-class` | IELTS/PTE demo class booking |
| POST | `/api/referral` | Referral associate application |
| GET | `/api/testimonials` | Active testimonials |

### Admin (header: `X-Admin-Secret`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/enquiries` | List enquiries |
| GET | `/api/admin/demo-classes` | List demo bookings |
| GET | `/api/admin/referrals` | List referrals |
| GET/POST/PUT/DELETE | `/api/admin/testimonials` | Testimonial CRUD |

---

## Environment Variables

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/visionwebsite
ADMIN_SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=   # leave empty in dev (uses Vite proxy)
```
