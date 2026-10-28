# PrepCast

An explainable morning spot-and-prep advisor for rotating food-truck owner-operators. This prototype combines a demo spot’s sales history, venue economics, and adjustable weather to produce a **GO / PIVOT / SKIP** call, prep units, expected gross, and contribution estimate.

**Demo:** https://drgonzo79.github.io/prepcast-20261028/ · **Source report:** https://www.ideabrowser.com/hub/ideas/today

> All product data is fictional. The static demo has no live weather, AI, SMS, persistence, or deployed backend. The FastAPI domain operation is tested source only.

## Run

Requirements: Node 26.12.1 and Python 3.12+ with `uv`.

```bash
npm ci
npm run typecheck && npm run build
npx playwright install chromium && npm run test:e2e
uv sync --project api --locked --dev
uv run --project api pytest api/tests
uv run --project api uvicorn api.main:app --reload
```

Frontend exports statically for a repository base path. To preview that build: `PAGES_BASE_PATH=/prepcast-20261028 npm run build`.

## What works

- Choose one of three fictional rotating spots and adjust rain/temperature.
- Generate an auditable spot call with prep, gross, profit, and reasons.
- Validate and log a demo actual-gross outcome in local component state.
- Run the same real scoring operation through `POST /brief` in FastAPI.
- Test happy, invalid-input, unknown-spot, weather-regression, and responsive paths.

See [product plan](docs/PRODUCT.md), [architecture](docs/ARCHITECTURE.md), [Office Hours diagnostic](docs/OFFICE_HOURS.md), and [CEO review](docs/CEO_REVIEW.md).
