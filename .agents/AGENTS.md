# Workspace Rules & Instructions

These instructions govern all agent actions in the `active-ecommerce` workspace. Every time a task is run, the agent must adhere strictly to these principles.

---

## 1. Monorepo Project Structure & Guidelines
- **Workspace Layout**:
  - `apps/api`: NestJS backend.
  - `apps/web`: Next.js 15 App Router frontend.
  - `packages/types`: Shared TypeScript typings (interfaces, enums).
- **TypeScript**: Always use strict typing. Avoid using `any` or disabling lint checks. Keep all shared interfaces in `@repo/types` and import them in the respective packages.
- **Dependency Management**: Use `pnpm` workspace commands for all packages (e.g. `pnpm --filter api <cmd>`).

---

## 2. Database & ORM Workflow (Prisma)
- Prisma schema is located at `apps/api/prisma/schema.prisma`.
- **Never run raw SQL queries** unless explicitly requested by the user. Use Prisma transactions (`prisma.$transaction`) for compound atomic operations.
- Always run `pnpm --filter api exec prisma generate` after schema updates.
- Use migrations (`prisma migrate dev`) for development database changes.

---

## 3. Git & Branching Strategy
- Align with the **Git Flow** pattern documented in the README:
  - Development is based on the `develop` branch.
  - Features are developed on `feature/[name]` branches.
  - Production releases target `main`.

---

## 4. Execution Workflow
1. **Planning**: Before executing any code changes, create/update `implementation_plan.md` outlining target files, modifications, and open questions.
2. **Approval**: Wait for the user's explicit approval on the plan before editing code.
3. **Execution**: Mark tasks in `task.md` as in-progress `[/]` and completed `[x]`.
4. **Verification**: Run build and validation checks across both apps. Show output in `walkthrough.md`.
