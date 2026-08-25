package migrations

import "embed"

// Files contains SQL migration files.
//go:embed *.sql
var Files embed.FS
