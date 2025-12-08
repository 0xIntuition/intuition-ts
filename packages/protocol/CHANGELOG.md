## 2.1.3 (2025-10-30)

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

## 2.0.1

### Patch Changes

- 68a7d43: Added new smart contract reads and writes to the protocol and sdk packages.

### Overview

- **_apps/cli_** Upgrade to use Intuition V2 contracts
- **_packages/protocol_** Upgrade to use Intuition V2 contracts
  - Update contract smart contract ABIs
  - Update testnet deployment addresses
- **_packages/sdk_** Upgrade to use Intuition V2 contracts
  - Add new event parsers for Multivault events
  - Update smart contract read/write functions
  - Add atom, triple and counter triple ID hashing functions

## 0.1.2 (2024-06-04)

### Fixes

- **1ui:** remove build command
- **1ui:** modify build command
- **1ui:** workspace root remove

## 0.1.0 (2024-05-28)

Initial release!
