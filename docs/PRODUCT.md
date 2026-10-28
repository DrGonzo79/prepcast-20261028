# Product plan

## ICP and job

**ICP:** a one-truck owner-operator rotating among 3–8 events, breweries, and markets, preparing perishables before demand is visible. **JTBD:** “Before I buy and prep tomorrow’s food, tell me which booked spot is worth running and how much to prep, with math I can challenge.”

## MVP and data model

The first paid slice is one daily decision—not an AI copilot. Inputs are `Spot` (fee type/value, historical gross, baseline units, unit price/cost), `Forecast` (rain, service temperature), and later `Outcome` (actual gross, waste, followed-call flag). Output is an immutable `Brief` (call, score, prep units, expected gross/profit, confidence, reasons).

This demo uses shared JSON fixtures. Production adds tenant-scoped Postgres tables (`trucks`, `spots`, `visits`, `forecasts`, `briefs`, `outcomes`) with append-only briefs so recommendations can be audited.

## Architecture and AI strategy

Next.js owns input and explanation; FastAPI owns deterministic scoring. In production a scheduled worker reads weather and recent outcomes, writes a brief, and sends SMS. A statistical baseline comes before ML. Only after 30+ outcomes per truck should a pooled hierarchical model adjust demand; an LLM may phrase the brief but must never invent the numeric decision.

## Economics

Offer ladder: free waste calculator → $19 scorecard → $29/mo daily brief → $79/mo prep/pivot tier. Report napkin math reaches about 60 core users and ~$2.34K MRR at month 12, but conversion and 85% monthly retention are unproven. Gross margin should exceed 80% after weather/SMS; founder hand-selling is the actual constraint. The product must document >$100 monthly avoided waste to justify $29.

## Validation and moat

Run a 14-day concierge with five operators and 50 decisions. Primary metric: followed recommendations with paired expected/actual gross and waste. CTA: “Send tomorrow’s spot plus three prior sales; get a free 6am call.” Pass with ≥3 explicit $29/mo YES responses and one >$100 avoided loss. Kill or reframe if owners will not enter outcomes or ignore ≥70% of briefs.

The only plausible moat is permissioned, normalized truck × spot × weather × outcome history plus lot/operator distribution. Generic forecasts and AI prose are commodities; Goodfynd can copy them.

## Risks

Sparse data creates false precision; Goodfynd bundles the wedge; forecasts fail locally; self-reported sales are biased; owners may not trust a model before it has local history; food safety cannot be inferred from demand. Recommendations need confidence, provenance, override reasons, and explicit non-safety scope.

## Roadmap

- **0–30 days:** concierge, CSV/manual history, deterministic score, 50 observed decisions, paid CTA.
- **31–60:** five design partners, weather ingestion, SMS delivery/replies, outcome capture, confidence bands, audit log.
- **61–90:** 20 paid trucks, POS import for one provider, spot comparison, retention cohort, documented savings; only then test learned calibration.
