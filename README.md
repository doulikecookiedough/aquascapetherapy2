# aquascapetherapy2

A full-stack TypeScript project for documenting aquarium contest entries, teaching aquarium keeping, and building a production-quality portfolio app.

## Goals

- Learn TypeScript deeply through a real project
- Build a public aquarium portfolio site
- Build a logged-in aquarium tracking app
- Practice full-stack development with a modern TypeScript stack
- Deploy the project when the core features are complete

## Planned Stack

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS
- Docker for local PostgreSQL

## Local Development

### 1. Create your environment file

Copy `.env.example` to `.env`.

### 2. Start PostgreSQL with Docker

```bash
docker compose up -d
```

This starts a local PostgreSQL database on `localhost:5432`.

### 3. Stop PostgreSQL

```bash
docker compose down
```

### 4. Remove PostgreSQL data volume

```bash
docker compose down -v
```

## Current Milestone

Set up the local PostgreSQL development environment, then scaffold the Next.js app and initial Prisma schema.

## Project Direction

This project will combine two connected areas:

- A public-facing aquarium and personal portfolio website
- A logged-in aquarium management app for tanks, water tests, maintenance logs, and journal entries
