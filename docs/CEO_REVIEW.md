# CEO review

**Mode:** scope reduction. The report proposes a four-step product ladder and eventual advisor; the build contract demands a small complete vertical slice, and paid demand is unproven.

## Nuclear challenge and alternatives

The actual outcome is avoiding one bad prep/location decision—not “using AI.” Doing nothing preserves a recurring, financially visible loss, but owners may still prefer gut feel. Existing weather, POS, and event tools solve inputs; PrepCast must own the cross-input decision and learning loop.

- **Minimal concierge:** manual 6am call; S effort, low build risk, high founder labor. Best validation.
- **Explainable scorecard (selected):** deterministic self-serve decision plus outcome logging; M effort, medium trust risk. Reuses free forecasts and owner history.
- **Integrated advisor:** POS + weather + events + SMS + learned model; XL effort, high integration and sparse-data risk. Ideal only after demand.

`Gut decision → explainable scorecard → outcome corpus → trusted daily operating system` is the coherent 12-month path.

## Eleven-section review

1. **Architecture:** keep scoring deterministic and separate from copy generation. Shared fixtures reduce demo drift; production requires API authority and formula versioning.
2. **Errors:** name invalid weather (422), unknown spot (404), stale forecast (suppressed send), no history (labeled baseline), failed SMS (retry queue), and failed outcome write (visible unsynced state).
3. **Security:** sales are sensitive business data. Require tenant authorization, encrypted provider tokens, minimal retention, audit logs, bounded inputs, and no secrets in the client.
4. **Data/interaction:** cover nil/empty/wrong-range inputs, double submission, stale calculations, navigation before save, forecast timeout, duplicate SMS, and conflicting replies. Demo now validates gross and recalculates only on submit.
5. **Code quality:** one compact domain function is appropriate. Do not add provider abstractions before a live integration exists.
6. **Tests:** API covers happy path, invalid input, missing spot, and storm regression. Browser tests cover generation, error/success outcome paths, and mobile overflow. Production still needs frontend/API contract vectors, stale forecast, retry, and accessibility automation.
7. **Observability:** future dashboards need brief-created, send-success, reply-rate, followed-call rate, forecast age, prediction error, avoided-waste estimate, and error queue age.
8. **State:** static demo is ephemeral by design. Production uses append-only briefs/outcomes, unique send keys, tenant indexes, and no silent overwrites.
9. **API:** `/brief` has bounded typed input and explicit 404/422. Add auth, versioning, request IDs, rate limits, and formula version before clients depend on it.
10. **Scale:** 100× volume is operationally small; provider rate limits and scheduled send spikes dominate. Batch weather by geohash and queue SMS.
11. **UX:** the call, prep quantity, profit, and reasons lead. Demo labeling is persistent; empty/error/success states exist; controls are keyboard-labeled; mobile stacks without overflow.

## Decisions

- **Accepted:** three demo spots, adjustable weather, transparent recommendation, outcome validation/logging, real tested API operation.
- **Deferred:** live weather, SMS, persistence, POS import, accounts, ML, billing, and public backend hosting.
- **Not in scope:** food-safety advice or autonomous purchasing.

**Strongest challenges:** no payment proof, cold-start trust, and an incumbent able to bundle the feature. **Recommended path:** use this scorecard inside a two-week concierge; do not expand until owners follow calls and agree to pay.

**Status:** DONE_WITH_CONCERNS—implementation scope is sound; business demand remains unvalidated.
