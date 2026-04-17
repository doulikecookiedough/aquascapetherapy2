# aquascapetherapy2

A full-stack TypeScript application for documenting aquariums and aquascapes, presenting a public portfolio, and supporting future private tracking workflows.

## What It Does

- Public homepage with portfolio positioning and preview entry point
- Aquarium collection page with latest-aquascape previews
- Tank detail pages with the current aquascape and aquascape history
- Aquascape journal pages with images, equipment, plants, fauna, and facts
- Aquascape authoring from the tank detail page plus structured journal authoring on the aquascape page
- Seeded portfolio content for real ADA 120P and ADA 150P layouts
- Unit and integration test coverage with GitHub Actions CI

## Stack

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS
- Vitest + Testing Library
- Docker for local PostgreSQL
- GitHub Actions

## Current Status

Current focus:

- structured aquascape authoring is now in place on the aquascape journal page
- prepare the app for first production deployment
- refine aquascape authoring UX now that structured editing is in place
- continue improving the visual presentation without losing test coverage or incremental history

## Quick Start

```bash
npm install
cp .env.example .env
cp .env.test.example .env.test
docker compose up -d
npm run prisma:migrate
npm run prisma:migrate:test
npm run prisma:generate
npm run prisma:seed
npm run dev
```

Then open:

- `http://localhost:3000`
- `http://localhost:3000/tanks`
- `http://localhost:3000/api/health`

## Testing

Current coverage includes:

- shared navigation and homepage rendering
- homepage rendering
- aquarium collection rendering and latest-aquascape previews
- tank detail and aquascape detail rendering
- aquascape authoring entry from the tank detail page
- image, fact, equipment, plant, and fauna authoring flows on the aquascape detail page
- health route and validation coverage
- empty-image and not-found behavior
- Prisma-backed query and mutation integration tests
- GitHub Actions CI validation

Run everything:

```bash
npm test
```

## Documentation

Detailed project documentation lives in `docs/`:

- [Setup](/Users/doumok/Code/aquascapetherapy2/docs/setup.md)
- [Testing](/Users/doumok/Code/aquascapetherapy2/docs/testing.md)
- [Data Model](/Users/doumok/Code/aquascapetherapy2/docs/data-model.md)
- [Roadmap](/Users/doumok/Code/aquascapetherapy2/docs/roadmap.md)
- [Agent Guide](/Users/doumok/Code/aquascapetherapy2/AGENT.md)
