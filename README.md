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
- All form submissions (Enquiries, Demo Classes, Referrals, Education Loans)
- Testimonials (Create / Edit / Delete, photo up to 10MB or video up to 40MB)

When editing a testimonial, use **Photo or Video** to attach JPEG, PNG, WebP, GIF (max 10MB), or MP4/WebM (max 40MB). Cards on **Success Stories** and the home page carousel show the media when present.

---

## Media Storage (S3 / Local)

Testimonial images and videos are stored via `backend/app/services/storage.py`:

| Environment | Behaviour (`STORAGE_BACKEND=auto`) |
|-------------|-----------------------------------|
| Local dev | Files saved under `backend/uploads/` and served at `/uploads/...` |
| EC2 production | Files uploaded to **AWS S3** when `AWS_S3_BUCKET` is set |

Set in `backend/.env`:

```env
STORAGE_BACKEND=auto          # auto | local | s3
LOCAL_UPLOAD_DIR=uploads
UPLOAD_MAX_BYTES=10485760         # 10MB images
UPLOAD_MAX_VIDEO_BYTES=41943040   # 40MB videos

AWS_S3_BUCKET=your-bucket-name
AWS_S3_REGION=ap-south-1
AWS_S3_PUBLIC_BASE_URL=         # optional CDN/custom domain
AWS_ACCESS_KEY_ID=                # optional on EC2 if using IAM role
AWS_SECRET_ACCESS_KEY=
```

**EC2 checklist**
1. Create an S3 bucket (e.g. `vision-website-media`) with public read on `testimonials/*` or use CloudFront.
2. Attach an IAM role to the EC2 instance with `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject` on that bucket.
3. Set `AWS_S3_BUCKET` (and region) in the backend `.env` on the server.
4. Restart the backend: `systemctl restart vision`

Check active storage: `GET /api/health` → `storage_backend` is `"local"` or `"s3"`.

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
| POST | `/api/admin/testimonials/{id}/media` | Upload photo (10MB) or video (40MB) |
| DELETE | `/api/admin/testimonials/{id}/media` | Remove testimonial media |

---

## Environment Variables

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/visionwebsite
ADMIN_SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:5173

STORAGE_BACKEND=auto
AWS_S3_BUCKET=
AWS_S3_REGION=ap-south-1
```

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=   # leave empty in dev (uses Vite proxy)
```
