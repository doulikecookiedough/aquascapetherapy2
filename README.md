# aquascapetherapy2

A full-stack TypeScript application for documenting aquariums and aquascapes, presenting a public portfolio, and supporting future private tracking workflows.

## Goals

- Build a public aquarium portfolio site
- Build a logged-in aquarium tracking app
- Create a ChatGPT-like aquascaping assistant grounded in my design philosophy and approach to aquascaping
- Deploy a polished product for aquascapers to present and document their work
- Build with a documented, incremental workflow that produces a clear, reviewable history

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
- The public homepage now uses real seeded collection data to feature an aquarium and latest aquascape preview
- The `/tanks` page now reads as an aquarium collection view with a real read/create/delete flow for physical tanks and latest-aquascape previews
- Development uses a dedicated local database and integration tests use a separate local test database
- Permanent portfolio seed data is available for the local development database, including the first structured aquascape entry
- Vitest is split into unit/component and database integration suites for faster feedback
- Integration tests run against a separate PostgreSQL database so destructive cleanup does not touch seeded development data
- GitHub Actions CI validates lint, migrations, and tests on pushes and pull requests
- The initial legacy-site audit has been translated into the first portfolio-facing typography, copy, and homepage framing updates
- The next major phase is designing the gallery MVP and public aquascape detail pages
- Development is being done incrementally with small, reviewable changes across schema, tests, seed data, and UI

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

You should see:

- a portfolio-style homepage with a featured aquarium preview at `/`
- the seeded aquarium collection on `/tanks`

### 11. Lint the codebase

```bash
npm run lint
```

### 12. Understand CI validation

GitHub Actions runs the main validation workflow on:

- `push`
- `pull_request`

The workflow provisions PostgreSQL, creates both project databases, applies Prisma migrations, and then runs lint plus the full test suite.

### 13. Stop PostgreSQL

```bash
docker compose down
```

### 14. Remove PostgreSQL data volume

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
- homepage component render test with featured aquarium preview
- tanks page component render test with gallery preview, create-panel toggle, and empty-image state
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

Continuous integration uses GitHub Actions to:

- start PostgreSQL in the CI runner
- create the development and test databases
- generate the Prisma client
- apply migrations to both databases
- run ESLint
- run the full test suite

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
- preview the latest aquascape with a primary image or explicit unavailable-image state
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
- A future AI assistant for aquascaping guidance grounded in the portfolio content and design philosophy

## Roadmap

Current near-term direction:

- define the first gallery MVP around seeded tanks and aquascapes
- improve the public-facing UI so the structured aquascape data is actually visible and feels portfolio-ready
- build shareable public aquascape detail pages using slugs
- document and later enforce publishing rules for public aquascapes
- add authentication so users can eventually manage and submit their own aquascapes

Longer-term direction:

- expand portfolio seed content with additional real aquascapes
- evolve the app into a fuller aquarium management workflow
- build an aquascaping AI assistant grounded in your design philosophy and content

## Development Approach

- Build the project incrementally rather than scaffolding everything at once
- Keep changes small and commit-friendly so the repository history reflects architectural and product decisions clearly
- Prioritize real domain modeling, seeded content, and test coverage before expanding the UI surface
- Treat the public-facing portfolio and the private tracking product as parts of the same long-term system
