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

Auth: none.

Request body: none.

Responses:
- `200 OK`: `{ "text": "Hello Word" }`
- `404 Not Found`: `{ "error": { "code": "GREETING_NOT_FOUND", "message": "Greeting not found" } }`
- `500 Internal Server Error`: `{ "error": { "code": "INTERNAL_ERROR", "message": "Internal server error" } }`

Query:

```sql
SELECT text FROM greetings WHERE id = 1;
```

Response contract matches approved UI mock exactly:

```ts
export type GreetingResponse = {
  text: string;
};
```

No pagination. Endpoint returns one singleton resource.

## Error catalog

| Code | HTTP status | Meaning |
|---|---:|---|
| `SERVICE_UNAVAILABLE` | 503 | Health check cannot reach required dependency or migrations are not applied. |
| `GREETING_NOT_FOUND` | 404 | Singleton greeting row `id = 1` is missing. |
| `INTERNAL_ERROR` | 500 | Unexpected backend failure while reading greeting. |

## Frontend contract
Frontend reads base URL from `NEXT_PUBLIC_API_URL` and calls `GET /v1/greeting`. It must render returned `text` exactly and must not store fallback copy equal to product greeting.

Frontend UI PR mock module shape is binding for backend response:

```ts
export const greetingResponse: GreetingResponse = {
  text: 'Hello Word',
};
```

Backend may return any non-empty `text` currently stored in PostgreSQL; `Hello Word` is seed value only.

## Migration plan

### Forward
1. Apply initial database migration that creates `schema_migrations` if missing.
2. Apply initial greeting migration that creates `greetings` and seeds `(1, 'Hello Word')`.
3. Backend startup verifies migration record before serving `/healthz` as healthy.

Safety on populated table: safe. Existing `greetings` row is not overwritten.

### Backward
1. Drop `greetings`.
2. Remove applied migration record if rollback mechanism supports it.

Safety on populated table: destructive for greeting data. No alternate preservation needed because project has no write path and seeded value can be recreated by forward migration.
