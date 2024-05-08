import {
  Account,
  Chain,
  PublicClient,
  Transport,
  WalletClient,
  Address,
  parseEventLogs,
  toHex,
  getContract,
  GetContractReturnType,
  ParseEventLogsReturnType,
} from 'viem'
import { abi } from './abi';
import { multiVaultAddress } from './constants';

export class Multivault {

  private contract: GetContractReturnType<typeof abi, WalletClient<Transport, Chain, Account>, Address>

  constructor(
    private client: {
      public: PublicClient<Transport, Chain>,
      wallet: WalletClient<Transport, Chain, Account>,
    },
    address?: Address
  ) {
    this.contract = getContract({
      abi,
      client,
      address: address || multiVaultAddress
    });
  }

  /**
   * Returns the cost of creating an atom
   */
  public async getAtomCost() {
    return await this.contract.read.getAtomCost();
  }

  /**
   * Returns the cost of creating a triple
   */
  public async getTripleCost() {
    return await this.contract.read.getTripleCost();
  }

  /**
   * Create an atom and return its vault id
   * @param atomUri atom data to create atom with
   */
  public async createAtom(atomUri: string): Promise<{ vaultId: bigint, events: ParseEventLogsReturnType }> {

    const atomCost = await this.getAtomCost();

    const hash = await this.contract.write.createAtom(
      [toHex(atomUri)],
      { value: atomCost }
    );

    const { logs } = await this.client.public.waitForTransactionReceipt({ hash });

    const atomCreatedEvents = parseEventLogs({
      abi,
      logs,
      eventName: 'AtomCreated',
    })

    const vaultId = atomCreatedEvents[0].args.vaultID

    return { vaultId, events: parseEventLogs({ abi, logs }) }
  }

  /**
  * Create a triple and return its vault id
  * @param subjectId vault id of the subject atom
  * @param predicateId vault id of the predicate atom
  * @param objectId vault id of the object atom
  */
  public async createTriple(subjectId: bigint, predicateId: bigint, objectId: bigint) {
    const tripleCost = await this.getTripleCost();

    const hash = await this.contract.write.createTriple(
      [subjectId, predicateId, objectId],
      { value: tripleCost }
    );

    const { logs } = await this.client.public.waitForTransactionReceipt({ hash });

    const tripleCreatedEvents = parseEventLogs({
      abi,
      logs,
      eventName: 'TripleCreated',
    });

    const vaultId = tripleCreatedEvents[0].args.vaultID;

    return { vaultId, events: parseEventLogs({ abi, logs }) }

  }

}
