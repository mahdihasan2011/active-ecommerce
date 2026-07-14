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

## Backend Setup

1. **Navigate to API directory**
   ```bash
   cd apps/api
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   Copy `.env.example` to `.env` and fill in your database credentials:
   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   PORT=3001
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

6. **Seed the database**
   ```bash
   npx prisma db seed
   ```

7. **Start the server**
   ```bash
   pnpm run start:dev
   ```
   The API will be available at `http://localhost:3001`

## Frontend Setup

1. **Navigate to Web directory**
   ```bash
   cd ../web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   Copy `.env.example` to `.env` and fill in your API URL:
   ```bash
   NEXT_PUBLIC_API_URL="http://localhost:3001/api"
   ```

4. **Start the development server**
   ```bash
   pnpm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## Development

### Running Both Simultaneously

Use the `concurrently` package to run both the frontend and backend:

```bash
pnpm run dev:all
```

### Available Scripts

**API:**
- `pnpm run dev`: Start development server
- `pnpm run build`: Build the project
- `pnpm run start`: Run the built project
- `pnpm run migrate`: Run migrations
- `pnpm run prisma:generate`: Generate Prisma client
- `pnpm run prisma:studio`: Open Prisma Studio

**Web:**
- `pnpm run dev`: Start development server
- `pnpm run build`: Build the project
- `pnpm run start`: Run the built project
- `pnpm run lint`: Run ESLint

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
