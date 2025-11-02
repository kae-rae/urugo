#!/usr/bin/env bash
set -euo pipefail

# rotate_credentials.sh
# Helper script to guide and partially automate rotation of local secrets.
# This script does NOT interact with external provider dashboards. Use it as a
# local operator aid and then run provider-specific rotation in the cloud UI or API.

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
API_ENV_FILE="$ROOT_DIR/apps/api/.env"
BACKUP="$API_ENV_FILE.bak.$(date +%s)"

echo "Credential rotation helper"
echo "Backing up current API env to: $BACKUP"
cp "$API_ENV_FILE" "$BACKUP" || true

read -rp "New DATABASE_URL (postgresql://user:pass@host:port/dbname) : " NEW_DB
if [ -n "$NEW_DB" ]; then
  # Replace DATABASE_URL line in apps/api/.env
  if grep -q '^DATABASE_URL=' "$API_ENV_FILE"; then
    sed -i.bak -E "s#^DATABASE_URL=.*#DATABASE_URL=${NEW_DB}#" "$API_ENV_FILE"
  else
    echo "DATABASE_URL=${NEW_DB}" >> "$API_ENV_FILE"
  fi
  echo "Updated $API_ENV_FILE with new DATABASE_URL (local file only)."
else
  echo "No new DATABASE_URL provided; skipping local update."
fi

read -rp "New STRIPE_SECRET_KEY (sk_... ) [leave blank to skip]: " NEW_STRIPE
if [ -n "$NEW_STRIPE" ]; then
  if grep -q '^STRIPE_SECRET_KEY=' "$API_ENV_FILE"; then
    sed -i.bak -E "s#^STRIPE_SECRET_KEY=.*#STRIPE_SECRET_KEY=${NEW_STRIPE}#" "$API_ENV_FILE"
  else
    echo "STRIPE_SECRET_KEY=${NEW_STRIPE}" >> "$API_ENV_FILE"
  fi
  echo "Updated $API_ENV_FILE with new STRIPE_SECRET_KEY (local file only)."
else
  echo "No new STRIPE key provided; skipping local update."
fi

echo
echo "Local .env updated. Next steps (manual):"
echo "  1) In your DB, create/update the user or rotate password. Example (Postgres):"
echo "     psql -U postgres -c \"ALTER USER <user> WITH PASSWORD '<newpass>';\""
echo "     or create a new user and grant privileges, then update DATABASE_URL accordingly."
echo
echo "  2) In Stripe dashboard: create a new secret key and webhook signing secret."
echo "     Update CI/CD secrets and your deployment environment with the new keys."
echo
echo "  3) Update CI secrets (example using GitHub CLI):"
echo "     gh secret set STRIPE_SECRET_KEY --body '<new_key>' --repo <org/repo>"
echo "     gh secret set DATABASE_URL --body '<new_database_url>' --repo <org/repo>"
echo
echo "  4) Redeploy staging, verify, then rotate production keys and redeploy."
echo
echo "Important: If secrets were pushed to a public repository, consider those keys compromised and rotate immediately."

echo "Done. Local backup: $BACKUP"
