# @0xintuition/sdk

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
