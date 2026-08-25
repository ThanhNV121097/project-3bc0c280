# Test Cases — Serve centered greeting page

Risk level: low. Single public read-only page, one data flow, no permissions, no writes.

## Scenario: Show stored greeting text
**Given** PostgreSQL has one greeting row with text `Hello Word`, backend `GET /v1/greeting` returns `200 OK` with `{ "text": "Hello Word" }`, and frontend loads page with API base URL set
**When** guest opens greeting page
**Then** page displays `Hello Word` exactly
**Check:** render_url

## Scenario: Show current stored text, not frontend literal
**Given** PostgreSQL greeting row is changed to `Hello Again`, backend `GET /v1/greeting` returns `200 OK` with `{ "text": "Hello Again" }`, and frontend build has no fallback copy equal to `Hello Word`
**When** guest opens greeting page
**Then** page displays `Hello Again` exactly and does not display `Hello Word`
**Check:** render_url

## Scenario: Plain centered presentation
**Given** page loads normally from successful API response
**When** guest views screen
**Then** browser computed style shows white background, black text, greeting centered horizontally and vertically within viewport, and no animation runs
**Check:** measure_styles

## Scenario: Backend returns greeting success shape
**Given** backend has greeting row stored in PostgreSQL
**When** client sends `GET /v1/greeting`
**Then** response is `200 OK` with JSON body `{ "text": "Hello Word" }` and no extra fields required by contract
**Check:** fetch_url

## Scenario: Backend returns not-found error envelope
**Given** no greeting row exists in PostgreSQL
**When** client sends `GET /v1/greeting`
**Then** response is `404 Not Found` with body `{ "error": { "code": "GREETING_NOT_FOUND", "message": "Greeting not found" } }`
**Check:** fetch_url

## Scenario: Backend returns internal-error envelope
**Given** database lookup fails during `GET /v1/greeting`
**When** client sends `GET /v1/greeting`
**Then** response is `500 Internal Server Error` with body `{ "error": { "code": "INTERNAL_ERROR", "message": "Internal server error" } }`
**Check:** fetch_url
