---
'@0xintuition/graphql': major
'@0xintuition/sdk': major
'intuition-cli': major
---

Route generated pinning and upload mutation requests through the public gated Intuition pinning endpoint and require an explicit pinning API key.

Add GraphQL pinning configuration and a `requestPinThing` helper, and add SDK-level `configureSdk` plus per-call pinning options for `pinThing`, `createAtomFromThing`, and `batchCreateAtomsFromThings`.

The public gated mutation set includes `pinThing`, `pinPerson`, `pinOrganization`, `uploadJsonToIpfs`, `uploadImage`, and `uploadImageFromUrl`.

CLI Thing batch creation now requires an Intuition pinning API key via `--pin-api-key` or `INTUITION_PIN_API_KEY`.
