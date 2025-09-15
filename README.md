# Mental Health Backend (Express + MongoDB)

## Quick start
1. Copy `.env.example` to `.env` and fill environment variables.
2. Install dependencies:
   ```
   npm install
   ```
3. Run:
   ```
   npm run dev
   ```
4. The server runs on `http://localhost:4000/api`

## What is included
- Auth with JWT: `/api/auth/*`
- Emotion logging: `/api/emotion/*`
- Support recommendations & matching: `/api/support/*`
- Chat (basic routes + socket.io): `/api/chat/*`
- Content management: `/api/content/*`
- Analytics (admin): `/api/analytics/*`
- Notifications (cron + nodemailer): `/api/notify/*`
- Compliance/Consent: `/api/compliance/*`

The structure follows a simple MVC-style layout with `models`, `routes`, and `middleware`.
