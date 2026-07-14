# Development Instruction Guidelines

This instruction guide outlines the workflows and patterns to be followed throughout the development of the Active E-commerce platform.

---

## 1. Architectural Patterns

### Shared Contracts
All API requests, response shapes, database schema interfaces, and domain enums MUST be defined in the shared `@repo/types` package. Do not duplicate these types in `apps/api` or `apps/web`.

### API Framework (NestJS)
- Keep controllers thin and route business logic into services.
- Always use `ValidationPipe` for incoming payload validation (using `class-validator`).
- Secure routes utilizing Passport JWT strategies and custom RBAC guards.

### Frontend Framework (Next.js 15)
- Utilize App Router for layouts, loading states, and page structures.
- Group components under semantic folders (e.g. `src/components/ui`, `src/components/auth`).
- Use Tailwind CSS variables for uniform color palettes and styling rules.

### Prisma Database Layer
- Wrap critical transaction workflows (such as order checkout, payouts) inside atomic transaction blocks (`prisma.$transaction`).
- Keep database schema clean with explicit foreign key relationships and index structures.

---

## 2. Iterative Planning & Approval Workflow

For any new phase or major feature:
1. **Research & Plan**: Create a detailed `implementation_plan.md` documenting the technical steps, changes, schema updates, and test strategies.
2. **Review & Approve**: Wait for user review and explicit approval of the plan.
3. **Execute & Document**: Create a `task.md` check-list, execute code changes, verify compilations, and output results in `walkthrough.md`.
