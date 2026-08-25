# SRS — core

Module: `core`
Last updated: 2025-08-14
Design: [View the approved design](http://localhost:8080/design/3bc0c280-2cf0-40fa-a861-1bd6acf201c4)
Design system: `design/design-system.md`

> One file per module, at `docs/{module}/SRS.md`. It covers only the functions
> that belong to this module. Never write `docs/SRS.md`.

## 1. Purpose

Core exists to prove the full delivery path works end to end: browser, API, and database. It serves one public greeting page and loses its only purpose if the greeting is hardcoded or the page is not driven from stored data.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| Guest | Any browser user with no sign-in | Open the greeting page and see the stored greeting text |

## 3. Scope

**In scope** — the functions specified below, by their plan titles:

- Serve centered greeting page

**Out of scope** — name what a reader would reasonably expect here and say where it lives instead.

- Admin editing of greeting text — not built in this project.
- Multiple pages, navigation, or animations — deliberately not built; project is a single static greeting screen.

## 4. Functional requirements

### 4.1 Serve centered greeting page

**Requirement CORE-001 — Show stored greeting**

*As a* Guest, *I want to* see the greeting stored for this project, *so that* the page proves content comes from backend data.

Behaviour:

1. Guest opens the page.
2. The page requests the greeting through the backend API.
3. The API returns the greeting value stored in PostgreSQL.
4. The page renders that returned text in the center of the screen.

**Requirement CORE-002 — Keep greeting not hardcoded in frontend**

*As a* Guest, *I want to* see the greeting value supplied by data flow, *so that* the frontend stays decoupled from the literal text.

Behaviour:

1. Guest opens the page after the stored greeting row is changed in the database.
2. The page shows the current stored value.
3. The rendered text matches the database value, not a frontend literal.

**Requirement CORE-003 — Match plain static presentation**

*As a* Guest, *I want to* see a plain centered screen, *so that* the page stays as simple as the design.

Behaviour:

1. Guest opens the page.
2. The page shows one line of greeting text on white background.
3. Text is black, centered horizontally and vertically, with no animation.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/core/test-cases/serve-centered-greeting-page.md`. Given/When/Then, no compound conditions: one behaviour per criterion.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | greeting value stored in DB is `Hello Word` | guest opens page | page shows `Hello Word` |
| AC-2 | stored greeting value changes to another text | guest opens page | page shows current stored text, not a frontend literal |
| AC-3 | page loads normally | guest views screen | greeting is centered horizontally and vertically on white background with black text and no animation |

**Failure, boundary and permission behaviour** — the part most often skipped and most often the source of bugs.

| Case | Condition | Expected behaviour |
|---|---|---|
| Not applicable | Guest-only public page, no writes, no permission split, no design-approved error or empty state | Not applicable: approved design shows one default screen only; API error handling belongs in service contract, not in screen states |

**Data touched** — the fields this function reads and writes, in product terms.

| Field | Type | Required | Rule |
|---|---|---|---|
| Greeting text | text | yes | One stored value, rendered exactly as returned by API |

## 5. Screens

The design is the source of truth for appearance; this section maps functions onto it so nothing in the design is unaccounted for and nothing specified here is missing from the design.

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Greeting screen | Greeting screen | CORE-001, CORE-002, CORE-003 | default |

## 6. Non-functional requirements

Only what is real for this module. Delete rows that do not apply rather than inventing a number nobody will check.

| Area | Requirement |
|---|---|
| Performance | Greeting page loads and shows stored text on first render |
| Accessibility | Greeting text remains readable with 4.5:1 contrast on white background |
| Responsive | Screen fills viewport from 320px width upward with no horizontal scroll |
| Localisation | Copy remains exactly `Hello Word` unless stored value changes |

## 7. Dependencies and assumptions

- **Depends on:** Backend API, for reading greeting text.
- **Depends on:** PostgreSQL, for storing one greeting row.
- **Assumption:** One stored greeting value exists for the page; if that changes, the page shows the current stored value.

| Open question | Proposed default | Who decides |
|---|---|---|
| None | None | Stakeholder |

## 8. Traceability

| Plan item | Requirement ids | Test cases |
|---|---|---|
| Serve centered greeting page | CORE-001, CORE-002, CORE-003 | `test-cases/serve-centered-greeting-page.md` |

## 9. Design

Approved design: [View Design](http://localhost:8080/design/3bc0c280-2cf0-40fa-a861-1bd6acf201c4)

Palette from `design.spec`:
- #FFFFFF — background
- #000000 — text

Screen mapping:
- Greeting screen — single centered "Hello Word" on white background, black text, no animation.
