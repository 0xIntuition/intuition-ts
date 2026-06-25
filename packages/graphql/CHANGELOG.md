# @0xintuition/graphql

## 3.0.0

### Major Changes

- 1c88db3: Route generated pinning and upload mutation requests through the public gated Intuition pinning endpoint and require an explicit pinning API key.

  Add GraphQL pinning configuration and a `requestPinThing` helper, and add SDK-level `configureSdk` plus per-call pinning options for `pinThing`, `createAtomFromThing`, and `batchCreateAtomsFromThings`.

  The public gated mutation set includes `pinThing`, `pinPerson`, `pinOrganization`, `uploadJsonToIpfs`, `uploadImage`, and `uploadImageFromUrl`.

  `pinThing` now throws on pinning failure instead of returning `null`; replace `null` guards with `try/catch`.

  Caller-provided `apikey` headers are only used for pinning operations and are stripped from non-pinning read requests.

  CLI Thing batch creation now requires an Intuition pinning API key via `--pin-api-key` or `INTUITION_PIN_API_KEY`.

### Notes

- Historical correction: the published `2.0.2` GraphQL changelog entry describes protocol-package TrustBonding/WrappedTrust changes. The GraphQL package change in that release was generated types for `uploadJsonToIpfs`, `uploadImage`, and `uploadImageFromUrl`.

## 2.0.2

### Patch Changes

- Added TrustBonding and WrappedTrust read methods to the protocol package.

## 2.0.1

### Patch Changes

- 68a7d43: Added new smart contract reads and writes to the protocol and sdk packages.

## 0.2.0 (2024-06-04)

### Features

- **1ui:** update tsconfig styles path to ui-styles

### Fixes

- **1ui:** remove build command

- **1ui:** modify build command

- **1ui:** workspace root remove

### ❤️ Thank You

- Alexander Mann
- Rahul

## 0.1.0 (2024-05-28)

Initial release!

### ❤️ Thank You

- 0xjojikun
- alexander-mann
- Rahul
