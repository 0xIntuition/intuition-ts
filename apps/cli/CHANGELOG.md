# intuition-cli

## 3.0.1

### Patch Changes

- aebd3d1: Remove public IPFS pinning
- 393dab8: Build and verify package entrypoints before publish so packages include runnable `dist` artifacts.
- Updated dependencies [aebd3d1]
- Updated dependencies [393dab8]
  - @0xintuition/sdk@3.0.1
  - @0xintuition/protocol@2.0.3

## 3.0.0

### Major Changes

- 1c88db3: Route generated pinning and upload mutation requests through the public gated Intuition pinning endpoint and require an explicit pinning API key.

  Add GraphQL pinning configuration and a `requestPinThing` helper, and add SDK-level `configureSdk` plus per-call pinning options for `pinThing`, `createAtomFromThing`, and `batchCreateAtomsFromThings`.

  The public gated mutation set includes `pinThing`, `pinPerson`, `pinOrganization`, `uploadJsonToIpfs`, `uploadImage`, and `uploadImageFromUrl`.

  `pinThing` now throws on pinning failure instead of returning `null`; replace `null` guards with `try/catch`.

  Caller-provided `apikey` headers are only used for pinning operations and are stripped from non-pinning read requests.

  CLI Thing batch creation now requires an Intuition pinning API key via `--pin-api-key` or `INTUITION_PIN_API_KEY`.

### Patch Changes

- Updated dependencies [1c88db3]
  - @0xintuition/sdk@3.0.0

## 2.0.1

### Patch Changes

- 68a7d43: Added new smart contract reads and writes to the protocol and sdk packages.
- Updated dependencies [68a7d43]
  - @0xintuition/protocol@2.0.1
  - @0xintuition/sdk@2.0.1
