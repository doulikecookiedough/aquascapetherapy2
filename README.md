# aquascapetherapy2

A full-stack TypeScript project for documenting aquarium contest entries, teaching aquarium keeping, and building a production-quality portfolio app.

This project is being built incrementally with Codex as a collaborative coding and learning assistant, with an emphasis on understanding the stack rather than only generating code quickly.

## Goals

- Learn TypeScript deeply through a real project
- Build a public aquarium portfolio site
- Build a logged-in aquarium tracking app
- Create a ChatGPT-like aquascaping assistant grounded in my design philosophy and approach to aquascaping
- Practice full-stack development with a modern TypeScript stack
- Deploy the project when the core features are complete
- Build with a documented, incremental workflow that can be reviewed through git history

## Planned Stack

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS
- Docker for local PostgreSQL
- Vitest + Testing Library

## Project Status

Current baseline:

- Next.js app scaffolded
- Local PostgreSQL runs through Docker Compose
- Prisma 7 configured with an initial `Tank` model
- First database migration applied
- A shared Prisma client wrapper and first tank query module are in place
- Vitest is set up for route, component, and database integration tests
- Integration tests use a dedicated Prisma test schema so test data stays separate from development data
- Development is being done incrementally with Codex, with each step reviewed and explained before moving forward

## Build From Scratch

### 1. Install application dependencies

```bash
npm install
```

### 2. Create your environment file

Copy `.env.example` to `.env`.

### 3. Start PostgreSQL with Docker

```bash
docker compose up -d
```

This starts a local PostgreSQL database on `localhost:5432`.

### 4. Apply the Prisma migrations

```bash
npm run prisma:migrate
```

This creates or updates the database schema from the migration history in `prisma/migrations/`.

### 5. Generate the Prisma client

```bash
npm run prisma:generate
```

Prisma Client is generated into `prisma/generated/`.

### 6. Run the test suite

```bash
npm run prisma:migrate:test
npm test
```

The local PostgreSQL container must be running before the test suite will pass, because the suite now includes a Prisma-backed integration test for tank queries.

The test suite uses the same PostgreSQL instance as local development, but points Prisma at a separate `test` schema so integration test data does not affect the main development schema.

For watch mode during development:

```bash
npm run test:watch
```

### 7. Start the Next.js app

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 8. Verify the app is running

Open these URLs in your browser:

- `http://localhost:3000`
- `http://localhost:3000/api/health`

The health route should return:

```json
{"ok":true,"service":"aquascape-therapy"}
```

### 9. Lint the codebase

```bash
npm run lint
```

### 10. Stop PostgreSQL

```bash
docker compose down
```

### 11. Remove PostgreSQL data volume

```bash
docker compose down -v
```

## Available Scripts

- `npm run dev` starts the Next.js development server
- `npm run build` builds the app for production
- `npm run start` runs the production build
- `npm run lint` runs ESLint
- `npm run prisma:migrate` applies local Prisma migrations in development
- `npm run prisma:migrate:test` applies the same Prisma migrations to the test schema
- `npm run prisma:generate` regenerates the Prisma client
- `npm test` runs the test suite once
- `npm run test:watch` runs Vitest in watch mode

## Testing

Current automated coverage includes:

- health route test
- homepage component render test
- tanks page component render test
- tank query integration test

Testing tools in use:

- Vitest
- React Testing Library
- `jest-dom`
- `jsdom`

The integration test suite expects:

- `.env` to exist with `DATABASE_URL`
- `.env.test` to exist with a Prisma test-schema `DATABASE_URL`
- local PostgreSQL to be running
- Prisma migrations to have been applied to both the development schema and the test schema

Integration test data is isolated by using:

- development schema: `public`
- test schema: `test`

## Prisma

Prisma is configured with:

- schema file at `prisma/schema.prisma`
- Prisma 7 config at `prisma.config.ts`
- shared Prisma client wrapper at `lib/db.ts`
- first server query module at `server/queries/tanks.ts`
- generated client output at `prisma/generated/`
- migration history at `prisma/migrations/`

Test database support includes:

- `.env.test` and `.env.test.example`
- a dedicated test-schema migration command
- integration tests that run against the `test` schema instead of `public`

The initial model is:

- `Tank`

The first migration creates the `Tank` table with:

- `id`
- `name`
- `volumeLiters`
- `description`
- `createdAt`
- `updatedAt`

## Project Direction

This project will combine two connected areas:

- A public-facing aquarium and personal portfolio website
- A logged-in aquarium management app for tanks, water tests, maintenance logs, and journal entries

## Development Approach

- Build the project incrementally rather than scaffolding everything at once
- Use Codex as a coding partner to explain architecture, TypeScript, testing, Prisma, and full-stack concepts along the way
- Keep changes small and commit-friendly so the repository history reflects the learning process
