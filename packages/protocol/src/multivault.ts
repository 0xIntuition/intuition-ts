import {
  Account,
  Address,
  Chain,
  PublicClient,
  Transport,
  WalletClient,
  parseEventLogs,
  toHex,
  getContract,
  GetContractReturnType,
  ParseEventLogsReturnType,
  ContractFunctionRevertedError,
  BaseError,
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
        'Multivault not deployed on chain: ' + this.client.public.chain.id,
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
   * Returns amount of assets that would be charged by a vault
   * on protocol fee given amount of 'assets' provided
   */
  public async getProtocolFeeAmount(assets: bigint, vaultId: bigint) {
    return await this.contract.read.protocolFeeAmount([assets, vaultId])
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
