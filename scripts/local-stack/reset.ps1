$ErrorActionPreference = "Stop"

docker compose exec -T postgres sh -ec 'psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" --file /docker-entrypoint-initdb.d/10-schema.sql && psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" --file /local-stack/reset.sql && psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" --file /local-stack/seed.sql'
if ($LASTEXITCODE -ne 0) {
    throw "Local PostgreSQL reset failed with exit code $LASTEXITCODE."
}
