# Architecture Overview

## Scope
`hello-word-A` is fullstack: Next.js page, Go API, PostgreSQL. One feature reads one stored greeting row and renders it centered. No auth, admin UI, analytics, or editing flow.

## Stack
- Frontend: Next.js 15 App Router, TypeScript, Tailwind v3, ESLint.
- Backend: Go 1.22 HTTP server, PostgreSQL via `pgx`.
- Database: PostgreSQL 16, migrations applied by backend at startup.
- Local run: `docker compose --profile local up --build` from repo root.

## Repository layout
- `code/frontend/`: App Router app. `app/page.tsx` stays composition root; story UI belongs in `components/`.
- `code/backend/`: one Go module, one `main` package at `cmd/api`.
- `code/backend/migrations/`: timestamped `.up.sql` / `.down.sql` files, applied in filename order.
- `docs/architecture/`: shared architecture, ERD, and service contracts.

## Runtime flow
1. Browser loads frontend.
2. Frontend calls backend base URL from `NEXT_PUBLIC_API_URL`.
3. Backend reads `DATABASE_URL`, applies migrations, validates DB with `SELECT 1`, then serves.
4. `/healthz` returns 200 only after migrations and DB ping succeed.

## Env vars
Root compose `.env.example` lists local defaults. Service examples list what code reads.
- Backend: `DATABASE_URL`, `PORT`, `APP_PORT`.
- Frontend: `NEXT_PUBLIC_API_URL`.
- Compose only: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, port and memory limit overrides.

## Naming and code conventions
- API paths are versioned `/v1/...`; no `/api` prefix.
- JSON responses use camelCase.
- Error envelope: `{ "error": { "code": string, "message": string } }`.
- React component files use `export default function ComponentName()`.
- Shared CSS tokens live in `app/globals.css`; CSS modules may only use tokens, no hardcoded visual values.
- No frontend hardcoding of greeting text. Seed data belongs in DB migration.

## Decisions
| Decision | Rejected alternative | Tradeoff |
|---|---|---|
| Backend self-migrates on boot | Separate manual migration step | Fewer moving parts for empty runtime DB; startup owns schema errors. |
| Use `pgx` directly | ORM/query builder | Tiny schema does not need abstraction; SQL stays visible. |
| One `greetings` row seeded by migration | Hardcode text in frontend or API | Proves database path; row can change without frontend rebuild. |
| Server-render page composition root | Client-heavy root | Keeps App Router simple; interactive code, if any, isolated later. |
| Docker compose uses existing committed shape | Custom orchestration | Matches deploy/CI expectations; less flexibility. |

## Failure handling and observability
- Startup fails fast if `DATABASE_URL` missing, migrations fail, or listener cannot start.
- API returns generic JSON errors; logs keep internal error details.
- Health check proves database reachability, not just process liveness.

## Security constraints
- No secrets committed. `.env.example` contains comments and placeholder defaults only.
- Public read-only API. No auth because no protected action exists.
- Database access uses parameterized queries in feature code.

## How to run
1. Copy `.env.example` to `.env` if overriding defaults.
2. Run `docker compose --profile local up --build`.
3. Open frontend at `http://localhost:3000`.
4. Backend health: `http://localhost:8080/healthz`.

## Checks
- Backend: `cd code/backend && go build ./... && go vet ./... && go test ./...`.
- Frontend: `cd code/frontend && npm ci && npm run lint && npm run build && npm test --if-present`.
- CI gate: `.github/workflows/ci.yml` plus container workflows already committed.
