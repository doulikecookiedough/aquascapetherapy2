# Data Model

## Core entities

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

## Current direction

- a `User` can own many `Tank`s
- a `Tank` is a physical aquarium with dimensions and visibility
- a `Tank` can have many `Aquascape`s over time
- an `Aquascape` represents a layout and has structured support for images, equipment, plants, fauna, and facts
- plants and fauna are reusable catalog entities connected through join tables
- facts use reusable `FactType` records plus per-aquascape values
- aquascapes have workflow state through `AquascapeStatus`
- equipment categories are constrained through `EquipmentCategory`

## Current read flow

- list aquariums for the portfolio owner
- view one tank and its aquascape history
- view one aquascape by slug as a journal/detail page

## Current write flow

- create tanks
- delete tanks
- create aquascapes from the tank detail page
- add aquascape images from the aquascape journal page
- add aquascape facts from the aquascape journal page
- add aquascape equipment from the aquascape journal page
- link plants to aquascapes from the aquascape journal page
- link fauna to aquascapes from the aquascape journal page

## Current modeling notes

- `FactType` supports repeatable fact types through `isRepeatable`
- `Hardscape` and `Substrate` are modeled as repeatable fact types
- repeatable facts are numbered at render time instead of encoding numbers into the fact type name
- plants and fauna are selected from reusable catalog tables and attached through join records
- image, plant, fauna, fact, and equipment writes all use owner-scoped mutation paths

## Seeded portfolio content

Current local seed content includes:

- `ADA 120P`
- `ADA 150P`
- `Pacific Northwest`
- `School Garden`
- `Giant Pebbles`
- `Nana's Pass`
- `Scalare Summit`
