# Testing

## Current strategy

The project uses two main test layers:

- unit/component tests for rendering and interaction behavior
- integration tests for Prisma-backed query and mutation behavior

This helps isolate failures:

- unit failures usually point to rendering or interaction logic
- integration failures usually point to query, mutation, or database behavior

## Tooling

- Vitest
- React Testing Library
- `jest-dom`
- `jsdom`

## Current coverage

- homepage rendering
- aquarium collection rendering and latest-aquascape previews
- tank detail rendering and navigation
- aquascape detail rendering and navigation
- no-image fallback states
- invalid tank and invalid aquascape not-found behavior
- tank query integration tests
- aquascape detail query integration tests
- tank mutation integration tests

## Running tests

```bash
npm test
```

Focused commands:

```bash
npm run test:unit
npm run test:integration
npm run test:unit:watch
npm run test:integration:watch
```

## CI

GitHub Actions runs on:

- `push`
- `pull_request`

The workflow:

- provisions PostgreSQL
- creates development and test databases
- generates the Prisma client
- applies migrations
- runs ESLint
- runs the test suite
