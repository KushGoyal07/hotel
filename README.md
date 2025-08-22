# BookingHub — React + Express + MongoDB + JWT + Google OAuth (Ready to Deploy)

This is a full-stack hotel booking app based on your UI. It supports:
- Email/password auth + Google OAuth (redirect flow)
- Add hotels (protected)
- List & view hotels
- Book hotels, view/cancel bookings
- Unsplash images (no uploads)

## Folder Structure
```
hotel-booking-app/
  backend/    # Express API + MongoDB + Auth
  frontend/   # React + Vite + Tailwind
```

## 1) Backend Setup

Create a `.env` file inside `backend/` (copy `.env.example` and fill values):

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=super_secret_change_me
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

Install & run:
```bash
cd backend
npm install
npm run dev
```

Seed some demo hotels:
```bash
npm run seed
```

API endpoints (base `/api`):
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (requires Bearer token)
- `GET /auth/google` (redirect to Google)
- `GET /auth/google/callback` (handles Google login, redirects back with `?token=`)
- `GET /hotels` (filters: `q, city, rating, minPrice, maxPrice`)
- `GET /hotels/:id`
- `POST /hotels` (protected) body: { name, city, country, description, pricePerNight, imageUrl?, amenities[] }
- `POST /bookings` (protected) body: { hotelId, checkIn, checkOut, guests }
- `GET /bookings/my` (protected)
- `DELETE /bookings/:id` (protected)

## 2) Frontend Setup

Create a `.env` inside `frontend/` if your backend URL is different:
```
VITE_API_URL=http://localhost:5000
```

Install & run:
```bash
cd frontend
npm install
npm run dev
```

Login options:
- Register an account (email/password) at **Register** page, then login.
- Or click **Login with Google** (needs backend Google env vars configured).

## 3) Production Build (Single Deployment)

Build frontend and copy to backend:
```bash
cd frontend
npm run build
# copy the dist into backend/public
mkdir -p ../backend/public
cp -r dist/* ../backend/public/
```

Start backend in production:
```bash
cd ../backend
npm start
# Server on http://localhost:5000 serving API + React app
```

## 4) Google OAuth Setup (Quick)

1. Go to https://console.cloud.google.com/ → Create Project → OAuth consent screen → External → Publish.
2. Create **OAuth 2.0 Client ID** (type **Web application**).
3. Authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
4. Put **Client ID** and **Client Secret** in `backend/.env`.
5. Restart backend. On frontend, click **Login with Google**.
