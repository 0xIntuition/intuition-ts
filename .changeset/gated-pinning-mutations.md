---
'@0xintuition/graphql': major
'@0xintuition/sdk': major
---

Route generated `pinThing` requests through the gated Intuition pinning endpoint and require an explicit pinning API key.

Add GraphQL pinning configuration and a `requestPinThing` helper, and add SDK-level `configureSdk` plus per-call pinning options for `pinThing`, `createAtomFromThing`, and `batchCreateAtomsFromThings`.
