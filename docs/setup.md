# Setup

## Prerequisites

- Node.js
- npm
- Docker

## Local development

```bash
npm install
docker compose up -d
npm run prisma:migrate
npm run prisma:migrate:test
npm run prisma:generate
npm run prisma:seed
npm run dev
```

This project uses:

- development database: `aquascapetherapy`
- test database: `aquascapetherapy_test`

## Local verification

Open:

- `http://localhost:3000`
- `http://localhost:3000/tanks`
- `http://localhost:3000/api/health`

Current read flow:

- homepage with portfolio preview content
- aquarium collection at `/tanks`
- tank history pages at `/tanks/[tankId]`
- aquascape journal pages at `/aquascapes/[slug]`

Current write flow:

- create tanks from `/tanks`
- create aquascapes from `/tanks/[tankId]`
- add images, facts, equipment, plants, and fauna from `/aquascapes/[slug]`
- delete tanks from `/tanks`

## Useful scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run prisma:migrate`
- `npm run prisma:migrate:test`
- `npm run prisma:generate`
- `npm run prisma:seed`
- `npm test`
- `npm run test:unit`
- `npm run test:integration`
