# ERD

## Tables

### `greetings`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `smallint` | primary key, `id = 1` | Singleton row for product greeting. |
| `text` | `text` | not null, `length(text) > 0` | Rendered exactly by frontend. |
| `created_at` | `timestamptz` | not null, default `now()` | Audit only. |
| `updated_at` | `timestamptz` | not null, default `now()` | Audit only. |

### `schema_migrations`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| `version` | `text` | primary key | Migration filename without `.up.sql`. |
| `applied_at` | `timestamptz` | not null, default `now()` | Applied by backend startup. |

## Relationships
No foreign keys. `greetings` has exactly one row enforced by `id = 1` check and seeded migration.

## Seed data
Initial migration inserts `greetings(id, text) = (1, 'Hello Word')`.

## Story extensions

### Serve centered greeting page
No new tables, columns, foreign keys, or indexes are required beyond `greetings`.

Data source for `GET /v1/greeting`:

```sql
SELECT text FROM greetings WHERE id = 1;
```

No index added: primary key on `greetings.id` serves singleton lookup.

Mock contract from approved UI PR:

```ts
export type GreetingResponse = {
  text: string;
};
```

Schema supports that contract with `greetings.text text NOT NULL` and `length(text) > 0`.

## Migration plan

### Forward
1. Create `greetings` table if missing:
   - `id smallint PRIMARY KEY CHECK (id = 1)`
   - `text text NOT NULL CHECK (length(text) > 0)`
   - `created_at timestamptz NOT NULL DEFAULT now()`
   - `updated_at timestamptz NOT NULL DEFAULT now()`
2. Seed singleton row: `INSERT INTO greetings (id, text) VALUES (1, 'Hello Word') ON CONFLICT (id) DO NOTHING`.
3. Create `schema_migrations` table if missing before recording migrations.

Safety on populated table: safe. `CREATE TABLE IF NOT EXISTS` is additive. Seed uses `ON CONFLICT DO NOTHING`, so existing greeting text is preserved.

### Backward
1. Drop `greetings` table.
2. Remove matching migration record from `schema_migrations` if rollback tooling tracks down migrations.

Safety on populated table: destructive for greeting data. Acceptable for this project because greeting is seed data only and has no admin editing flow.
