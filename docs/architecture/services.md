# Services

## Shared conventions
- Backend serves versioned paths without `/api` prefix.
- Content type: `application/json`.
- Success responses use HTTP 2xx.
- Errors use envelope: `{ "error": { "code": "STRING_CODE", "message": "Human readable message" } }`.
- Public read-only API; no auth headers.

## Endpoints

### `GET /healthz`
Checks process, migrations, and database reachability.

Request body: none.

Responses:
- `200 OK`: `{ "status": "ok" }`
- `503 Service Unavailable`: `{ "error": { "code": "SERVICE_UNAVAILABLE", "message": "Service unavailable" } }`

### `GET /v1/greeting`
Returns stored greeting text.

Request body: none.

Responses:
- `200 OK`: `{ "text": "Hello Word" }`
- `404 Not Found`: `{ "error": { "code": "GREETING_NOT_FOUND", "message": "Greeting not found" } }`
- `500 Internal Server Error`: `{ "error": { "code": "INTERNAL_ERROR", "message": "Internal server error" } }`

## Frontend contract
Frontend reads base URL from `NEXT_PUBLIC_API_URL` and calls `GET /v1/greeting`. It must render returned `text` exactly and must not store fallback copy equal to product greeting.
