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
- Vitest is set up for route and component tests
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
npm test
```

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
- `npm run prisma:generate` regenerates the Prisma client
- `npm test` runs the test suite once
- `npm run test:watch` runs Vitest in watch mode

## Testing

Current automated coverage includes:

- health route test
- homepage component render test
- tanks page component render test

Testing tools in use:

- Vitest
- React Testing Library
- `jest-dom`
- `jsdom`

## Prisma

Prisma is configured with:

- schema file at `prisma/schema.prisma`
- Prisma 7 config at `prisma.config.ts`
- generated client output at `prisma/generated/`
- migration history at `prisma/migrations/`

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
