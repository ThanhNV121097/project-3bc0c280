# Serve centered greeting page

## User story
As a Guest, I want to see the greeting stored for this project, so that the page proves content comes from backend data.

## In scope
- Public greeting screen only.
- Frontend reads greeting text from backend API.
- Backend returns greeting value stored in PostgreSQL.
- Greeting renders centered horizontally and vertically on plain white background with black text.
- Greeting text stays data-driven, not hardcoded in frontend.

## Out of scope
- Admin editing of greeting text.
- Multiple pages or navigation.
- Animation, loading states, error states, or empty states beyond the approved default screen.
- Any auth or permissions.

## UI scope
- One screen only: Greeting screen from approved design.
- Default state only.
- Full-viewport plain white page with one centered `h1` greeting in black.
- No interactive controls.

## Acceptance criteria
1. Given greeting value stored in DB is `Hello Word`, when Guest opens page, then page shows `Hello Word`.
2. Given stored greeting value changes to another text, when Guest opens page, then page shows current stored text, not a frontend literal.
3. Given page loads normally, when Guest views screen, then greeting is centered horizontally and vertically on white background with black text and no animation.

## Dependencies
- Backend API for reading greeting text.
- PostgreSQL row containing the greeting value.
- Approved design and design system for static presentation.
