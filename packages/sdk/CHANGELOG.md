# @0xintuition/sdk

## Unreleased

### Breaking Changes

- **BREAKING:** `createAtomFromThing` now requires `pinataApiJWT` in the config parameter. The function signature has changed from `config: WriteConfig` to `config: CreateAtomConfigWithIpfs` (which extends `WriteConfig` with `pinataApiJWT: string`).
- **BREAKING:** `batchCreateAtomsFromThings` now requires `pinataApiJWT` in the config parameter. The function signature has changed from `config: WriteConfig` to `config: CreateAtomConfigWithIpfs`.

### Deprecations

- **DEPRECATED:** The `pinThing` function is now deprecated. Use `uploadJsonToPinata` for direct Pinata uploads instead. The SDK now supports client-side IPFS pinning without requiring backend mediation.

### Improvements

- Both `createAtomFromThing` and `batchCreateAtomsFromThings` now use direct Pinata uploads via `uploadJsonToPinata` instead of the backend-mediated GraphQL API, providing better performance and reliability.
- Updated documentation and examples to reflect the new Pinata JWT requirement.

## 2.0.2

### Patch Changes

- The core MultiVault functions were renamed to handle similar function calls. The alpha version of the protocol package did not use the `multiVault` prefix, but this was changed in the production release.
  - `createAtoms` -> `multiVaultCreateAtoms`
  - `createTriples` -> `multiVaultCreateTriples`
  - `deposit` -> `multiVaultDeposit`
  - `redeem` -> `multiVaultRedeem`
- Added TrustBonding read/write methods to the protocol package.
  - trustBondingCurrentEpoch
  - trustBondingEmissionsForEpoch
  - trustBondingEpochAtTimestamp
  - trustBondingEpochLength
  - trustBondingTimestampEnd
  - trustBondingLength
  - trustBondingTimestampEnd
  - trustBondingPerYear
  - trustBondingPersonalUtilizationRatio
  - trustBondingSystemApy
  - trustBondingSystemUtilizationRatio
  - trustBondingUnclaimedRewardsForEpoch
  - trustBondingUserApy
  - trustBondingUserCurrentClaimableRewardsForEpoch
  - trustBondingUserInfo
  - trustBondingUserRewardsForEpoch
  - trustBondingHasClaimedRewardsForEpoch
  - trustBondingPreviousEpoch
  - trustBondingTotalBondedBalanceAtEpochEnd
  - trustBondingBondedBalance
  - trustBondingTotalLocked
  - trustBondingUserBondedBalanceAtEpochEnd
  - trustBondingUserEligibleRewardsforEpoch
- Added WrappedTrust read/write methods to the protocol package.
  - wrappedTrustDeposit
  - wrappedTrustWithdraw
- Updated dependencies
  - @0xintuition/protocol@2.0.2
  - @0xintuition/graphql@2.0.2

## 2.0.1

### Patch Changes

- 68a7d43: Added new smart contract reads and writes to the protocol and sdk packages.
- Updated dependencies [68a7d43]
  - @0xintuition/protocol@2.0.1
  - @0xintuition/graphql@2.0.1
