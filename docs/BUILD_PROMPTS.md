# Phased build prompts

1. **Concierge instrumentation:** add outcome and override-reason capture, version every formula, export a per-truck decision log, and test empty/sparse history without adding AI.
2. **Live brief:** integrate Open-Meteo behind a cached adapter; show source timestamp/confidence; block stale sends; add idempotent SMS delivery and inbound gross replies.
3. **Trustworthy learning:** after 30+ outcomes per truck, train an interpretable baseline with backtests and confidence bands; keep deterministic fallback and human override.
4. **Commercial hardening:** add tenant isolation, one POS importer, billing, consent/retention controls, operations dashboards, alerting, and incident runbooks.
