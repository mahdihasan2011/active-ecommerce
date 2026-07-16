# Active E-commerce

A modern, feature-rich e-commerce platform built with Next.js, TypeScript, and NestJS.

## Tech Stack

### Frontend (Web)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: TanStack Query

### Backend (API)
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma

## Project Structure

```
active-ecommerce/
├── apps/
│   ├── api/           # NestJS backend API
│   ├── admin/         # Next.js admin dashboard
│   ├── vendor/        # Next.js vendor dashboard
│   └── delivery/      # Next.js delivery/rider dashboard
├── packages/
│   ├── types/         # Shared TypeScript typings (interfaces, enums)
│   └── tsconfig/      # Shared TypeScript configurations
├── tsconfig.base.json
└── package.json
```

## Prerequisites

- Node.js (LTS version)
- PostgreSQL database
- pnpm (package manager)

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vivacom-bd/active-ecommerce.git
   cd active-ecommerce
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

## Backend & Database Setup

Make sure your PostgreSQL database is running.

1. **Configure environment variables**
   Navigate to the API directory and copy the `.env.example`:
   ```bash
   cd apps/api
   cp .env.example .env
   ```
   Fill in your database credentials in `apps/api/.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
   PORT=3001
   ```

2. **Run database migrations (From the root directory)**
   ```bash
   cd ../../
   pnpm run migrate
   ```

3. **Generate Prisma client**
   ```bash
   pnpm run prisma:generate
   ```

## Dashboards Setup

1. **Configure environment variables**
   Each dashboard app (`admin`, `vendor`, `delivery`) uses a Next.js frontend that communicates with the API backend. Create `.env` files for each:
   ```bash
   # From root directory:
   cp apps/admin/.env.example apps/admin/.env
   cp apps/vendor/.env.example apps/vendor/.env
   cp apps/delivery/.env.example apps/delivery/.env
   ```
   Fill in the backend API URL in each `.env`:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3001/api"
   ```

## Development

### Running the Stack

Because this project is a monorepo powered by Turborepo, you can start the backend and all operational dashboards simultaneously directly from the root directory:

```bash
pnpm run dev
```

The apps will be available at:
- **API Backend**: `http://localhost:3001`
- **Admin Dashboard**: `http://localhost:3000` (or the next available port)
- **Vendor Dashboard**: Next available port
- **Delivery Portal**: Next available port

### Root Available Scripts

Run these from the root directory:

- `pnpm run dev`: Start backend API and all dashboard development servers simultaneously via Turbo
- `pnpm run build`: Build the entire workspace (all apps and packages)
- `pnpm run lint`: Run ESLint across the workspace
- `pnpm run migrate`: Run Prisma database migrations for the API backend
- `pnpm run prisma:generate`: Generate the Prisma client for the API backend
- `pnpm run prisma:studio`: Open Prisma Studio to manage the database

## Branch Management

We use Git Flow for branch management:

- **main**: Production-ready code
- **develop**: Development branch
- **feature/[name]**: Feature branches
- **bugfix/[name]**: Bugfix branches
- **release/[version]**: Release branches
- **hotfix/[name]**: Hotfix branches

## License

MIT
