import {
  Account,
  Address,
  BaseError,
  Chain,
  ContractFunctionRevertedError,
  getContract,
  GetContractReturnType,
  parseEventLogs,
  ParseEventLogsReturnType,
  PublicClient,
  toHex,
  Transport,
  WalletClient,
  keccak256,
} from 'viem'

import { abi } from './abi'
import { deployments } from './deployments'

export class Multivault {
  public readonly contract: GetContractReturnType<
    typeof abi,
    WalletClient<Transport, Chain, Account>,
    Address
  >

  constructor(
    private client: {
      public: PublicClient<Transport, Chain>
      wallet: WalletClient<Transport, Chain, Account>
    },
    address?: Address,
  ) {
    const deployment = deployments[this.client.public.chain.id]

    if (address === undefined && deployment === undefined) {
      throw new Error(
        `Multivault not deployed on chain: ${this.client.public.chain.id}`,
      )
    }
    this.contract = getContract({
      abi,
      client,
      address: address || deployment,
    })
  }

  private _throwRevertedError(err: BaseError) {
    if (err instanceof BaseError) {
      const revertError = err.walk(
        (err) => err instanceof ContractFunctionRevertedError,
      )
      if (revertError instanceof ContractFunctionRevertedError) {
        const errorName = revertError.data?.errorName ?? ''
        throw new Error(errorName)
      }
    }
  }

  /**
   * Returns the general configuration of the multivault
   */
  public async getGeneralConfig() {
    const [
      admin,
      protocolVault,
      feeDenominator,
      minDeposit,
      minShare,
      atomUriMaxLength,
      decimalPrecision,
      minDelay,
    ] = await this.contract.read.generalConfig()
    return {
      admin,
      protocolVault,
      feeDenominator,
      minDeposit,
      minShare,
      atomUriMaxLength,
      decimalPrecision,
      minDelay,
    }
  }

  public async getVaultIdFromUri(uri: string) {
    const vaultId = await this.contract.read.atomsByHash([
      keccak256(toHex(uri)),
    ])
    if (vaultId === 0n) {
      return null
    }
    return vaultId
  }

  /**
   * Returns the fees of the multivault
   */
  public async getVaultFees() {
    const [entryFee, exitFee, protocolFee] = await this.contract.read.vaultFees(
      [0n],
    )
    return { entryFee, exitFee, protocolFee }
  }

  /**
   * Returns the atom configuration of the multivault
   */
  public async getAtomConfig() {
    const [atomWalletInitialDepositAmount, atomCreationProtocolFee] =
      await this.contract.read.atomConfig()
    return {
      atomWalletInitialDepositAmount,
      atomCreationProtocolFee,
    }
  }

  /**
   * Returns the triple configuration of the multivault
   */
  public async getTripleConfig() {
    const [
      tripleCreationProtocolFee,
      atomDepositFractionOnTripleCreation,
      atomDepositFractionForTriple,
    ] = await this.contract.read.tripleConfig()
    return {
      tripleCreationProtocolFee,
      atomDepositFractionOnTripleCreation,
      atomDepositFractionForTriple,
    }
  }

  /**
   * Returns the state of the vault with the given id
   *
   * @param vaultId - vault id to get state for
   * @returns total assets and total shares for the given vault id
   * @throws if the vault id does not exist
   */
  public async getVaultState(vaultId: bigint) {
    const [totalAssets, totalShares] = await this.contract.read.vaults([
      vaultId,
    ])
    return { totalAssets, totalShares }
  }

  /**
   * Returns the state of the vault with the given id for the given user
   *
   * @param vaultId - vault id to get state for
   * @param user - user to get state for
   * @returns shares and total user assets for the given vault id and user
   */
  public async getVaultStateForUser(vaultId: bigint, user: Address) {
    const [shares, totalUserAssets] =
      await this.contract.read.getVaultStateForUser([vaultId, user])
    return { shares, totalUserAssets }
  }

  /**
   * Returns the cost of creating an atom
   */
  public async getAtomCost() {
    return await this.contract.read.getAtomCost()
  }

  /**
   * Returns the cost of creating a triple
   */
  public async getTripleCost() {
    return await this.contract.read.getTripleCost()
  }

  /**
   * Returns the current share price for the given vault id
   */
  public async currentSharePrice(id: bigint) {
    return await this.contract.read.currentSharePrice([id])
  }

  /**
   * Returns the preview of depositing assets to the given vault id
   */
  public async previewDeposit(assets: bigint, id: bigint) {
    return await this.contract.read.previewDeposit([assets, id])
  }

  /**
   * Simulates the effects of the redemption of `shares` and returns the estimated
   * amount of assets estimated to be returned to the receiver of the redeem
   *
   * @param shares amount of shares to calculate assets on
   * @param id vault id to get corresponding assets for
   * @return amount of assets estimated to be returned to the receiver
   */
  public async previewRedeem(shares: bigint, id: bigint) {
    return await this.contract.read.previewRedeem([shares, id])
  }

  /**
   * Returns max amount of shares that can be redeemed from the 'owner' balance through a redeem call
   * @param vaultId vault id to get corresponding shares for
   * @param owner owner to get corresponding shares for
   */
  public async maxRedeem(vaultId: bigint, owner?: Address) {
    const address = owner || this.client.wallet.account.address
    return await this.contract.read.maxRedeem([address, vaultId])
  }

  /**
   * Returns amount of assets that would be charged by a vault
   * on protocol fee given amount of 'assets' provided
   */
  public async getProtocolFeeAmount(assets: bigint, vaultId: bigint) {
    return await this.contract.read.protocolFeeAmount([assets, vaultId])
  }

  /**
   * Returns the total fees that would be charged for depositing 'assets' into a vault
   *
   * @param assets - amount of `assets` to calculate fees on
   * @param vaultId - vault id to get corresponding fees for
   * @return totalFees total fees that would be charged for depositing 'assets' into a vault
   */
  public async getDepositFees(assets: bigint, vaultId: bigint) {
    return await this.contract.read.getDepositFees([assets, vaultId])
  }

  /**
   * Returns the shares for recipient and other important values when depositing 'assets' into a vault
   *
   * @param assets - amount of `assets` to calculate shares and fees on
   * @param vaultId - vault id to get corresponding shares and fees for
   * @return totalAssetsDelta, sharesForReceiver, userAssetsAfterTotalFees, entryFee
   */
  public async getDepositSharesAndFees(assets: bigint, vaultId: bigint) {
    const [
      totalAssetsDelta,
      sharesForReceiver,
      userAssetsAfterTotalFees,
      entryFee,
    ] = await this.contract.read.getDepositSharesAndFees([assets, vaultId])
    return {
      totalAssetsDelta,
      sharesForReceiver,
      userAssetsAfterTotalFees,
      entryFee,
    }
  }

  /**
   * Returns the assets for receiver and other important values when redeeming 'shares' from a vault
   *
   * @param shares amount of `shares` to calculate fees on
   * @param vaultId vault id to get corresponding fees for
   * @return totalUserAssets, assetsForReceiver, protocolFees, exitFees
   */
  public async getRedeemAssetsAndFees(shares: bigint, vaultId: bigint) {
    const [totalUserAssets, assetsForReceiver, protocolFees, exitFees] =
      await this.contract.read.getRedeemAssetsAndFees([shares, vaultId])
    return { totalUserAssets, assetsForReceiver, protocolFees, exitFees }
  }

  /**
   * Returns amount of assets that would be charged for the entry fee given an amount of 'assets' provided
   * @param assets amount of assets to calculate fee on
   * @param vaultId vault id to get corresponding fee for
   * @return amount of assets that would be charged for the entry fee
   */
  public async getEntryFeeAmount(assets: bigint, vaultId: bigint) {
    return await this.contract.read.entryFeeAmount([assets, vaultId])
  }

  /**
   * Returns amount of assets that would be charged for the exit fee given an amount of 'assets' provided
   * @param assets amount of assets to calculate fee on
   * @param vaultId vault id to get corresponding fee for
   * @return amount of assets that would be charged for the exit fee
   */
  public async getExitFeeAmount(assets: bigint, vaultId: bigint) {
    return await this.contract.read.exitFeeAmount([assets, vaultId])
  }

  /**
   * Returns atom deposit fraction given amount of 'assets' provided
   *
   * @param assets amount of assets to calculate fraction on
   * @param vaultId vault id to get corresponding fraction for
   * @return amount of assets that would be used as atom deposit fraction
   */
  public async getAtomDepositFractionAmount(assets: bigint, vaultId: bigint) {
    return await this.contract.read.atomDepositFractionAmount([assets, vaultId])
  }

  /**
   * Returns amount of shares that would be exchanged by vault given amount of 'assets' provided
   * @param assets amount of assets to calculate shares on
   * @param vaultId vault id to get corresponding shares for
   * @return shares amount of shares that would be exchanged by vault given amount of 'assets' provided
   */
  public async convertToShares(assets: bigint, vaultId: bigint) {
    return await this.contract.read.convertToShares([assets, vaultId])
  }

  /**
   * Returns amount of assets that would be exchanged by vault given amount of 'shares' provided
   * @param shares amount of shares to calculate assets on
   * @param vaultId vault id to get corresponding assets for
   * @return amount of assets that would be exchanged by vault given amount of 'shares' provided
   */
  public async convertToAssets(shares: bigint, vaultId: bigint) {
    return await this.contract.read.convertToAssets([shares, vaultId])
  }

  /**
   * Returns the corresponding hash for the given RDF triple, given the atoms that make up the triple
   *
   * @param subjectId - vault id of the subject atom
   * @param predicateId - vault id of the predicate atom
   * @param objectId - vault id of the object atom
   * @returns hash of the triple
   */
  public async tripleHashFromAtoms(
    subjectId: bigint,
    predicateId: bigint,
    objectId: bigint,
  ) {
    return await this.contract.read.tripleHashFromAtoms([
      subjectId,
      predicateId,
      objectId,
    ])
  }

  /**
   * Returns the corresponding hash for the given RDF triple, given the triple vault id
   *
   * @param vaultId - vault id of the triple
   * @returns hash the corresponding hash for the given RDF triple
   */
  public async tripleHash(vaultId: bigint) {
    return await this.contract.read.tripleHash([vaultId])
  }

  /**
   * Returns whether the supplied vault id is a triple
   *
   * @param vaultId - vault id to check
   * @returns whether the supplied vault id is a triple
   */
  public async isTripleId(vaultId: bigint) {
    return await this.contract.read.isTripleId([vaultId])
  }

  /**
   * Returns the atoms that make up a triple/counter-triple
   *
   * @param vaultId - vault id of the triple
   * @returns subjectId, predicateId, objectId
   */
  public async getTripleAtoms(vaultId: bigint) {
    const [subjectId, predicateId, objectId] =
      await this.contract.read.getTripleAtoms([vaultId])
    return { subjectId, predicateId, objectId }
  }

  /**
   * Returns the counter id from the given triple id
   *
   * @param vaultId - vault id of the triple
   * @returns counter id of the triple
   */
  public async getCounterIdFromTriple(vaultId: bigint) {
    return await this.contract.read.getCounterIdFromTriple([vaultId])
  }

  /**
   * Create an atom and return its vault id
   *
   * @param atomUri - atom data to create atom with
   * @param initialDeposit - Optional initial deposit
   * @returns vault id of the atom, transaction hash, and events
   */
  public async createAtom(
    atomUri: string,
    initialDeposit?: bigint,
  ): Promise<{
    vaultId: bigint
    hash: `0x${string}`
    events: ParseEventLogsReturnType
  }> {
    const costWithDeposit = (await this.getAtomCost()) + (initialDeposit || 0n)

    try {
      await this.contract.simulate.createAtom([toHex(atomUri)], {
        value: costWithDeposit,
        account: this.client.wallet.account.address,
      })
    } catch (e) {
      this._throwRevertedError(e as BaseError)
    }

    const hash = await this.contract.write.createAtom([toHex(atomUri)], {
      value: costWithDeposit,
    })

    const { logs, status } = await this.client.public.waitForTransactionReceipt(
      { hash },
    )

    if (status === 'reverted') {
      throw new Error('Transaction reverted')
    }

    const atomCreatedEvents = parseEventLogs({
      abi,
      logs,
      eventName: 'AtomCreated',
    })

    const vaultId = atomCreatedEvents[0].args.vaultID

    return { vaultId, hash, events: parseEventLogs({ abi, logs }) }
  }

  /**
   * Create a triple and return its vault id
   *
   * @param subjectId - vault id of the subject atom
   * @param predicateId - vault id of the predicate atom
   * @param objectId - vault id of the object atom
   * @returns vault id of the triple, transaction hash, and events
   */
  public async createTriple(
    subjectId: bigint,
    predicateId: bigint,
    objectId: bigint,
  ): Promise<{
    vaultId: bigint
    hash: `0x${string}`
    events: ParseEventLogsReturnType
  }> {
    const cost = await this.getTripleCost()

    try {
      await this.contract.simulate.createTriple(
        [subjectId, predicateId, objectId],
        {
          value: cost,
          account: this.client.wallet.account.address,
        },
      )
    } catch (e) {
      this._throwRevertedError(e as BaseError)
    }

    const hash = await this.contract.write.createTriple(
      [subjectId, predicateId, objectId],
      { value: cost },
    )

    const { logs, status } = await this.client.public.waitForTransactionReceipt(
      { hash },
    )

    if (status === 'reverted') {
      throw new Error('Transaction reverted')
    }

    const tripleCreatedEvents = parseEventLogs({
      abi,
      logs,
      eventName: 'TripleCreated',
    })

    const vaultId = tripleCreatedEvents[0].args.vaultID

    return { vaultId, hash, events: parseEventLogs({ abi, logs }) }
  }

  /**
   * Deposit assets into a vault
   *
   * @param vaultId - vault id of the atom
   * @param assets - amount of assets to deposit
   * @param receiver - optional address to receive shares
   * @returns transaction hash, shares received, and events
   */
  public async depositAtom(
    vaultId: bigint,
    assets: bigint,
    receiver?: Address,
  ) {
    const address = receiver || this.client.wallet.account.address

    try {
      await this.contract.simulate.depositAtom([address, vaultId], {
        value: assets,
        account: this.client.wallet.account.address,
      })
    } catch (e) {
      this._throwRevertedError(e as BaseError)
    }

    const hash = await this.contract.write.depositAtom([address, vaultId], {
      value: assets,
    })

    const { logs, status } = await this.client.public.waitForTransactionReceipt(
      { hash },
    )

    if (status === 'reverted') {
      throw new Error('Transaction reverted')
    }

    const depositedEvents = parseEventLogs({
      abi,
      logs,
      eventName: 'Deposited',
    })

    const shares = depositedEvents[0].args.sharesForReceiver

    return { shares, hash, events: parseEventLogs({ abi, logs }) }
  }

  /**
   * Redeem assets from a vault
   *
   * @param vaultId - vault id of the atom
   * @param shares - amount of shares to withdraw
   * @param receiver - optional address to receive assets
   * @returns transaction assets, transaction hash and events
   */
  public async redeemAtom(vaultId: bigint, shares: bigint, receiver?: Address) {
    const address = receiver || this.client.wallet.account.address

    try {
      await this.contract.simulate.redeemAtom([shares, address, vaultId], {
        account: this.client.wallet.account.address,
      })
    } catch (e) {
      this._throwRevertedError(e as BaseError)
    }

    const hash = await this.contract.write.redeemAtom([
      shares,
      address,
      vaultId,
    ])

    const { logs, status } = await this.client.public.waitForTransactionReceipt(
      { hash },
    )

    if (status === 'reverted') {
      throw new Error('Transaction reverted')
    }

    const redeemedEvents = parseEventLogs({
      abi,
      logs,
      eventName: 'Redeemed',
    })

    const assets = redeemedEvents[0].args.assetsForReceiver

    return { assets, hash, events: parseEventLogs({ abi, logs }) }
  }

  /**
   * Deposits assets of underlying tokens into a triple vault and grants ownership of 'shares' to 'receiver'
   *
   * @param vaultId - vault id of the triple
   * @param assets - amount of assets to deposit
   * @param receiver - optional address to receive shares
   * @returns transaction hash, shares received, and events
   */
  public async depositTriple(
    vaultId: bigint,
    assets: bigint,
    receiver?: Address,
  ) {
    const address = receiver || this.client.wallet.account.address

    try {
      await this.contract.simulate.depositTriple([address, vaultId], {
        value: assets,
        account: this.client.wallet.account.address,
      })
    } catch (e) {
      this._throwRevertedError(e as BaseError)
    }

    const hash = await this.contract.write.depositTriple([address, vaultId], {
      value: assets,
    })

    const { logs, status } = await this.client.public.waitForTransactionReceipt(
      { hash },
    )

    if (status === 'reverted') {
      throw new Error('Transaction reverted')
    }

    const depositedEvents = parseEventLogs({
      abi,
      logs,
      eventName: 'Deposited',
    })

    const shares = depositedEvents[0].args.sharesForReceiver

    return { shares, hash, events: parseEventLogs({ abi, logs }) }
  }

  /**
   * Redeem assets from a triple vault
   *
   * @param vaultId - vault id of the triple
   * @param shares - amount of shares to withdraw
   * @param receiver - optional address to receive assets
   * @returns transaction assets, transaction hash and events
   */
  public async redeemTriple(
    vaultId: bigint,
    shares: bigint,
    receiver?: Address,
  ) {
    const address = receiver || this.client.wallet.account.address

    try {
      await this.contract.simulate.redeemTriple([shares, address, vaultId], {
        account: this.client.wallet.account.address,
      })
    } catch (e) {
      this._throwRevertedError(e as BaseError)
    }

    const hash = await this.contract.write.redeemTriple([
      shares,
      address,
      vaultId,
    ])

    const { logs, status } = await this.client.public.waitForTransactionReceipt(
      { hash },
    )

    if (status === 'reverted') {
      throw new Error('Transaction reverted')
    }

    const redeemedEvents = parseEventLogs({
      abi,
      logs,
      eventName: 'Redeemed',
    })

    const assets = redeemedEvents[0].args.assetsForReceiver

    return { assets, hash, events: parseEventLogs({ abi, logs }) }
  }
}
