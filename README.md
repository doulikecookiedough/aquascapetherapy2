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
- Prisma 7 configured with a structured gallery model for users, tanks, aquascapes, images, equipment, plants, fauna, and facts
- A shared Prisma client wrapper and ownership-aware tank query/mutation modules are in place
- The `/tanks` page supports a real read/create/delete flow for physical tanks and previews the latest aquascape
- Development uses a dedicated local database and integration tests use a separate local test database
- Permanent portfolio seed data is available for the local development database, including the first structured aquascape entry
- Vitest is split into unit/component and database integration suites for faster feedback
- Integration tests run against a separate PostgreSQL database so destructive cleanup does not touch seeded development data
- Development is being done incrementally with Codex, with each step reviewed and explained before moving forward

## Build From Scratch

### 1. Install application dependencies

```bash
npm install
```

### 2. Create your environment files

Copy:

- `.env.example` to `.env`
- `.env.test.example` to `.env.test`

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

### 5. Apply the test database migrations

```bash
npm run prisma:migrate:test
```

This applies the same Prisma migration history to the separate local test database.

### 6. Generate the Prisma client

```bash
npm run prisma:generate
```

Prisma Client is generated into `prisma/generated/`.

### 7. Seed the local development database

```bash
npm run prisma:seed
```

This seeds the local development database with the portfolio owner and starter tanks so `/tanks` renders meaningful content immediately.

### 8. Run the test suite

```bash
npm test
```

The local PostgreSQL container must be running before the test suite will pass, because the suite includes Prisma-backed integration tests.

The test suite uses the same PostgreSQL container as local development, but points Prisma at a separate database:

- development database: `aquascapetherapy`
- test database: `aquascapetherapy_test`

That keeps destructive integration test cleanup away from seeded development data.

Helpful test commands during development:

```bash
npm run test:watch
npm run test:unit
npm run test:integration
npm run test:unit:watch
npm run test:integration:watch
```

- `npm test` runs the unit and integration suites concurrently
- `npm run test:watch` watches the unit/component suite
- `npm run test:integration` runs only the database-backed integration suite

### 9. Start the Next.js app

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 10. Verify the app is running

Open these URLs in your browser:

- `http://localhost:3000`
- `http://localhost:3000/tanks`
- `http://localhost:3000/api/health`

The health route should return:

```json
{"ok":true,"service":"aquascape-therapy"}
```

You should see the portfolio seed tanks on `/tanks`.

### 11. Lint the codebase

```bash
npm run lint
```

### 12. Stop PostgreSQL

```bash
docker compose down
```

### 13. Remove PostgreSQL data volume

```bash
docker compose down -v
```

## Available Scripts

- `npm run dev` starts the Next.js development server
- `npm run build` builds the app for production
- `npm run start` runs the production build
- `npm run lint` runs ESLint
- `npm run prisma:migrate` applies local Prisma migrations in development
- `npm run prisma:migrate:test` applies the same Prisma migrations to the separate test database
- `npm run prisma:seed` seeds the local development database with portfolio baseline data
- `npm run prisma:generate` regenerates the Prisma client
- `npm test` runs the unit and integration suites together
- `npm run test:watch` runs the unit/component suite in watch mode
- `npm run test:unit` runs only the unit/component suite
- `npm run test:integration` runs only the database integration suite
- `npm run test:unit:watch` runs the unit/component suite in watch mode
- `npm run test:integration:watch` runs the integration suite in watch mode

## Testing

Current automated coverage includes:

- health route test
- homepage component render test
- tanks page component render test
- tank validation test
- tank query integration test, including latest-aquascape nested gallery relations
- tank mutation integration test for create and delete flows

Testing tools in use:

- Vitest
- React Testing Library
- `jest-dom`
- `jsdom`

The integration test suite expects:

- `.env` to exist with `DATABASE_URL`
- `.env.test` to exist with a separate test-database `DATABASE_URL`
- local PostgreSQL to be running
- Prisma migrations to have been applied to both the development database and the test database

The test suite is split into:

- unit/component tests running in `jsdom`
- integration tests running in `node`

Integration test data is isolated by using:

- development database: `aquascapetherapy`
- test database: `aquascapetherapy_test`

## Prisma

Prisma is configured with:

- schema file at `prisma/schema.prisma`
- Prisma 7 config at `prisma.config.ts`
- shared Prisma client wrapper at `lib/db.ts`
- query module at `server/queries/tanks.ts`
- mutation module at `server/mutations/tanks.ts`
- tank server actions at `app/(app)/tanks/actions.ts`
- temporary portfolio owner bootstrap helper at `server/portfolio-owner.ts`
- permanent portfolio seed data at `data/portfolio-seed.ts`
- Prisma seed script at `scripts/prisma-seed.ts`
- generated client output at `prisma/generated/`
- migration history at `prisma/migrations/`

Test database support includes:

- `.env.test` and `.env.test.example`
- a dedicated test-database migration command
- integration tests that run against `aquascapetherapy_test` instead of the development database

The current data model includes:

- `User`
- `Tank`
- `Aquascape`
- `AquascapeImage`
- `AquascapeEquipment`
- `Plant`
- `AquascapePlant`
- `Fauna`
- `AquascapeFauna`
- `FactType`
- `AquascapeFact`

Current model direction:

- a `User` can own many `Tank`s
- a `Tank` is a physical aquarium with dimensions and visibility
- a `Tank` can have many `Aquascape`s over time
- an `Aquascape` represents the artistic layout and has structured support for images, equipment, plants, fauna, and facts
- plants and fauna are reusable catalog records connected to aquascapes through join tables
- aquascapes now have workflow state through `AquascapeStatus` and equipment categories through `EquipmentCategory`
- public aquascapes are intended to require complete structured content and an approval flow later in the product

Current tank-management flow:

- read tanks for the portfolio owner
- create tanks from the `/tanks` form
- delete tanks from the `/tanks` inventory
- validate incoming form data before persistence
- enforce ownership checks in the mutation layer before deleting

The current local seed data includes:

- a portfolio owner user
- `ADA 150P`
- `ADA 120P`
- the `Pacific Northwest` aquascape on `ADA 120P`
- structured aquascape seed content for:
  - images
  - equipment
  - plants
  - fauna
  - facts

These seeds are intended as local development and portfolio bootstrap content, not as automated test fixtures.

## Project Direction

This project will combine two connected areas:

- A public-facing aquarium and personal portfolio website
- A logged-in aquarium management app for tanks, water tests, maintenance logs, and journal entries

## Development Approach

- Build the project incrementally rather than scaffolding everything at once
- Use Codex as a coding partner to explain architecture, TypeScript, testing, Prisma, and full-stack concepts along the way
- Keep changes small and commit-friendly so the repository history reflects the learning process
