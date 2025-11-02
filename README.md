# HomeMatch Fix Pack

Run `npm i` at root, then `npm run dev`. Web on 3000, API on 4000.

## API health endpoint

The API exposes a simple health endpoint at the root:

GET http://localhost:4000/

It returns a small JSON payload with name, version, status and available endpoints. Useful for quick checks and local monitoring.


## Secrets & environment files

This repository must not contain secrets or production credentials. I found a committed environment file for the API (`apps/api/.env`) and a `.env.example` at the repo root. Please do the following to remove sensitive info from the repository and keep the repo safe:

- Remove the committed environment file from the index and commit that change (keeps the local file but removes it from git tracking). Example (run locally):

	git rm --cached apps/api/.env && git commit -m "chore: remove committed env file"

- Rotate any keys that may have been exposed (Stripe, DB user/password, third-party tokens).

- Use `.env.example` as the template for required variables and keep real secrets out of the repository.

I added a root `.gitignore` that includes common ignores and `.env` to reduce the chance of re-committing secrets.
