# AGENT.md

This document describes how to work within this project.

## Working Agreement

- Propose changes before implementing them.
- Keep proposals concrete and small enough to evaluate quickly.
- Wait for agreement before making non-trivial code changes.
- Prefer incremental changes over broad refactors.
- Keep commits small, focused, and easy to review.

## Change Proposal Expectations

Before implementation, provide a short proposal that covers:

- what will change
- why the change is needed
- which files or areas are likely to be touched
- main risks, tradeoffs, or open questions

For straightforward changes, a short paragraph is enough. For larger changes, break the work into small steps so approval can happen at the right level of detail.

## Explanation Expectations

This project is also a learning environment. When introducing code that may be advanced for the language, framework, or domain, explain it clearly.

Clarify:

- advanced or less common syntax
- framework-specific patterns and why they are used
- data-model or architecture concepts that are not obvious
- important tradeoffs behind implementation choices

Prefer plain language first, then technical detail. If a simpler alternative was possible, note why it was or was not chosen.

## Historical Context

When making or proposing changes, include useful historical context when it improves understanding.

Examples:

- why a pattern exists in this codebase
- what older or simpler approach this replaces
- whether a feature was added for correctness, scale, testing, or UX reasons
- how the current approach fits the project roadmap

The goal is not to write long retrospectives. The goal is to help future readers understand how the code got here and why the current approach is reasonable.

## Commit Discipline

- Make small, incremental commits.
- One logical change per commit whenever practical.
- Avoid mixing refactors, behavior changes, and documentation updates unless they are tightly coupled.
- Preserve a reviewable history that can be bisected or reverted safely.

If a task is too large for one clean commit, split it into a sequence of small commits with clear intent.

## Project Context

This repository is a full-stack TypeScript application for documenting aquariums and aquascapes, presenting a public portfolio, and supporting future private tracking workflows.

Core technologies:

- Next.js
- React
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS
- Vitest and Testing Library

## Practical Defaults

- Read existing code and docs before proposing changes.
- Preserve established patterns unless there is a clear reason to improve them.
- Prefer clear, maintainable code over clever code.
- Add or update tests when behavior changes.
- Keep documentation aligned with implementation changes.
