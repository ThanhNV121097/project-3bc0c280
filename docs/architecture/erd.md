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
