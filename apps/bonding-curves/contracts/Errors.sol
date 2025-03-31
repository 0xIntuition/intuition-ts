// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.21;

/// @title  Errors Library
/// @author 0xIntuition
/// @notice Library containing all custom errors detailing cases where the Intuition Protocol may revert.
library Errors {
    ////////////// ETHMULTIVAULT ERRORS /////////////////////////////////////////////////////

    error EthMultiVault_AdminOnly();
    error EthMultiVault_ArraysNotSameLength();
    error EthMultiVault_AtomDoesNotExist(uint256 atomId);
    error EthMultiVault_AtomExists(bytes atomUri, uint256 atomId);
    error EthMultiVault_AtomUriTooLong();
    error EthMultiVault_BurnFromZeroAddress();
    error EthMultiVault_BurnInsufficientBalance();
    error EthMultiVault_CannotApproveOrRevokeSelf();
    error EthMultiVault_DeployAccountFailed();
    error EthMultiVault_DepositOrWithdrawZeroShares();
    error EthMultiVault_DepositExceedsMaxAssets();
    error EthMultiVault_HasCounterStake();
    error EthMultiVault_InsufficientBalance();
    error EthMultiVault_InsufficientDepositAmountToCoverFees();
    error EthMultiVault_InsufficientRemainingSharesInVault(uint256 remainingShares);
    error EthMultiVault_InsufficientSharesInVault();
    error EthMultiVault_InvalidAtomDepositFractionForTriple();
    error EthMultiVault_InvalidEntryFee();
    error EthMultiVault_InvalidExitFee();
    error EthMultiVault_InvalidProtocolFee();
    error EthMultiVault_MinimumDeposit();
    error EthMultiVault_OperationAlreadyExecuted();
    error EthMultiVault_OperationAlreadyScheduled();
    error EthMultiVault_OperationNotScheduled();
    error EthMultiVault_ReceiveNotAllowed();
    error EthMultiVault_SenderNotApproved();
    error EthMultiVault_RedeemerNotApproved();
    error EthMultiVault_TimelockNotExpired();
    error EthMultiVault_TransferFailed();
    error EthMultiVault_TripleExists(uint256 subjectId, uint256 predicateId, uint256 objectId);
    error EthMultiVault_VaultDoesNotExist();
    error EthMultiVault_VaultIsTriple(uint256 vaultId);
    error EthMultiVault_VaultNotAtom();
    error EthMultiVault_VaultNotTriple();

    ///////// ATOMWALLET ERRORS /////////////////////////////////////////////////////////////

    error AtomWallet_InvalidCallDataLength();
    error AtomWallet_InvalidSignature();
    error AtomWallet_InvalidSignatureLength(uint256 length);
    error AtomWallet_InvalidSignatureS(bytes32 s);
    error AtomWallet_OnlyOwner();
    error AtomWallet_OnlyOwnerOrEntryPoint();
    error AtomWallet_WrongArrayLengths();

    ///////// CUSTOMMULTICALL3 ERRORS /////////////////////////////////////////////////////////////

    error CustomMulticall3_InsufficientValue();
    error CustomMulticall3_InvalidAtomIdsLength();
    error CustomMulticall3_InvalidAtomUrisLength();
    error CustomMulticall3_InvalidEthMultiVaultAddress();
    error CustomMulticall3_InvalidValue();
    error CustomMulticall3_InvalidValuesLength();
    error CustomMulticall3_ZeroLengthArray();

    ///////// ATTESTOOR ERRORS ////////////////////////////////////////////////////////////////////

    error Attestoor_DeployAttestoorFailed();
    error Attestoor_EmptyAttestorsArray();
    error Attestoor_InsufficientValue();
    error Attestoor_InvalidEthMultiVaultAddress();
    error Attestoor_NotAWhitelistedAttestor();
    error Attestoor_SharesCannotBeRedeeemed();
    error Attestoor_WrongArrayLengths();

    ///////// BONDING CURVE REGISTRY ERRORS /////////////////////////////////////////////////////////////

    error BondingCurveRegistry_CurveAlreadyExists();
    error BondingCurveRegistry_CurveNameNotUnique();
    error BondingCurveRegistry_OnlyOwner();
    error BondingCurveRegistry_RequiresOwner();

    ///////// BASE CURVE ERRORS /////////////////////////////////////////////////////////////////////////

    error BaseCurve_EmptyStringNotAllowed();
}
