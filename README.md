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
│   ├── web/         # Next.js frontend
│   └── api/         # NestJS backend
├── packages/
│   └── ui/          # Shared UI components
├── packages/tsconfig  # Shared TypeScript configurations
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

## Frontend Setup

1. **Configure environment variables**
   Navigate to the Web directory:
   ```bash
   cd apps/web
   cp .env.example .env
   ```
   Fill in your API URL in `apps/web/.env`:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3001/api"
   ```

## Development

### Running the Stack

Because this project is a monorepo powered by Turborepo, you can start both the frontend and backend simultaneously directly from the root directory:

```bash
pnpm run dev
```

The frontend will be available at `http://localhost:3000`
The API will be available at `http://localhost:3001`

### Root Available Scripts

Run these from the root directory:

- `pnpm run dev`: Start both frontend and backend development servers simultaneously via Turbo
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
