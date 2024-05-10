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
} from 'viem'
import { abi } from './abi'
import { multiVaultAddress } from './constants'

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
    this.contract = getContract({
      abi,
      client,
      address: address || multiVaultAddress,
    })
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

  public async previewDeposit(assets: bigint, id: bigint) {
    return await this.contract.read.previewDeposit([assets, id])
  }

  /**
   * Create an atom and return its vault id
   * @param atomUri atom data to create atom with
   * @param initialDeposit Optional initial deposit
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
   * @param subjectId vault id of the subject atom
   * @param predicateId vault id of the predicate atom
   * @param objectId vault id of the object atom
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

  public async depositAtom(id: bigint, assets: bigint, receiver?: Address) {
    const address = receiver || this.client.wallet.account.address

    const hash = await this.contract.write.depositAtom([address, id], {
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

    return { hash, shares, events: parseEventLogs({ abi, logs }) }
  }
}
