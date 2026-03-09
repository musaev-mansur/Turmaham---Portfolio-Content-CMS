# Tsugi Portfolio & Content CMS

React frontend and Express API for a portfolio site with flexible content blocks (films, projects, works). Includes an admin panel for managing content and optional image uploads via ImgBB.

## Tech stack

- **Frontend:** React 19, Vite 6, TypeScript, React Router, Framer Motion
- **Backend:** Node.js, Express
- **Database:** PostgreSQL with Prisma ORM

## Features

- **Public pages:** Home, Films, Projects, Works (EN/RU), with detail pages for films
- **Flexible content:** Add and reorder fields per block (titles, descriptions, images, YouTube) in any order
- **Admin panel:** Password-protected content management; upload images to ImgBB or paste URLs

## Prerequisites

- Node.js 18+
- PostgreSQL (local or hosted; see .env.example)

## Run locally

1. **Clone and install**

   ```bash
   git clone <repo-url>
   cd zaur
   npm install
   ```

2. **Environment**

   Copy .env.example to .env and set:

   - DATABASE_URL PostgreSQL connection string (e.g. postgresql://user:password@localhost:5432/zaur)
   - IMGBB_API_KEY (optional) ImgBB API key for image uploads in admin
   - PORT (optional) API port; default is 3001

3. **Database**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Run**

   - **API:** npm run server (or npm run dev:server for watch mode) runs on port 3001
   - **Frontend:** npm run dev runs on port 3000 and proxies /api to the server

   Open http://localhost:3000 . Admin: http://localhost:3000/#/admin (access code in the admin login form hint).

## Scripts

| Command | Description |
|---------|-------------|
| npm run dev | Start Vite dev server |
| npm run build | Build frontend for production |
| npm run preview | Preview production build |
| npm run server | Start Express API |
| npm run dev:server | Start API with file watch |
| npm run prisma:generate | Generate Prisma client |
| npm run prisma:migrate | Run migrations (dev) |
| npm run prisma:studio | Open Prisma Studio |

## Project structure

- App.tsx App shell, routes, cursor toggle
- index.html / index.tsx Entry
- pages/ Route pages (Home, Films, Admin, etc.)
- components/ Shared UI (Header, Footer, FlexibleFieldsRenderer, etc.)
- context/ Language context
- utils/ API client, data transform, YouTube helpers
- server/index.js Express API: /api/blocks, /api/upload-image
- prisma/ ContentBlock model and migrations
- public/ Static assets

## API

- GET /api/blocks?section=films|projects|works list blocks for a section
- GET /api/blocks/:id get one block
- POST /api/blocks create block (body: section, order, type, data)
- PUT /api/blocks/:id update block
- DELETE /api/blocks/:id delete block
- POST /api/upload-image upload image to ImgBB (body: image as base64); returns url. Requires IMGBB_API_KEY on the server.

## Deployment (Render)

To deploy the backend and frontend separately on Render (PostgreSQL + Web Service + Static Site), see DEPLOY_RENDER.md for step-by-step instructions.

## License

Private / All rights reserved.