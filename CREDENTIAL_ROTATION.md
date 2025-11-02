# Credential rotation runbook

If any secret (DB credentials, Stripe keys, webhooks) was committed or possibly exposed, rotate them immediately. This file lists step-by-step actions and verification checks.

1) Inventory secrets
- Files to check: `apps/api/.env`, `.env.example`, CI/Secrets stores.
- Record any keys found (DB user, DB password, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, API tokens).

2) Rotate database credentials (Postgres example)
- Create a new DB role + password, update service env(s).

  # connect as admin on the DB host
  psql -U postgres -h localhost -c "CREATE ROLE homematch_new WITH LOGIN PASSWORD 'NEW_SUPER_SECRET';"
  # grant privileges similar to existing user (adjust as needed)
  psql -U postgres -h localhost -c "GRANT ALL PRIVILEGES ON DATABASE homematch TO homematch_new;"

- Update deployed environment variables to reference the new credentials.
- Restart services that use the DB. Verify connectivity in staging first.

3) Rotate Stripe keys
- In Stripe dashboard: create new secret key (Standard). Replace `STRIPE_SECRET_KEY` in staging, then switch production after verification.
- For webhooks, create a new endpoint or rotate the signing secret and update `STRIPE_WEBHOOK_SECRET` in your app and webhook receiver.

4) Rotate other API keys and tokens
- For any third-party keys, use provider consoles to create new keys, update deployment secrets and CI secrets.

5) Revoke old keys
- After verifying new keys work in staging and production, revoke old keys via provider consoles.

6) CI and deployment
- Update secrets in CI (GitHub/GitLab/other) and in any secrets managers (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault).
- Ensure `.env` files are not committed and that `.gitignore` contains `.env`.

7) Verification
- Run application tests and smoke tests:

  npm run test
  curl -fsS http://localhost:4000/  # health

- Check logs for authentication/DB errors after rotation.

8) Post-rotation checklist
- Document rotated keys and rotation time.
- Inform teammates and update runbooks.

Notes
- Some clouds/databases require zero-downtime rotation (add new user, migrate connections, then remove old user). Follow your platform's best practices.
- If secrets were pushed to a public repo, consider full history purge and treat secrets as compromised; rotate immediately.
