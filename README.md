# aquascapetherapy2

A full-stack TypeScript application for documenting aquariums and aquascapes, presenting a public portfolio, and supporting future private tracking workflows.

## What It Does

- Public homepage with featured aquarium content
- Aquarium collection page with latest-aquascape previews
- Tank detail pages with the current aquascape and aquascape history
- Aquascape journal pages with images, equipment, plants, fauna, and facts
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

- deploy the portfolio-facing read flow
- improve authoring workflows, starting with aquascape creation from the tank detail page
- continue refining the public UI without losing test coverage or incremental history

## Quick Start

```bash
npm install
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

- homepage rendering
- aquarium collection rendering and latest-aquascape previews
- tank detail and aquascape detail rendering
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
