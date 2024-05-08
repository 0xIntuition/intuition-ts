import { Account, Chain, PublicClient, Transport, WalletClient, toHex, Address, parseEventLogs, GetContractReturnType, getContract } from 'viem'
import { abi } from './abi';
import { multiVaultAddress } from './constants';

export class Multivault {

  private client: {
    public: PublicClient;
    wallet: WalletClient<Transport, Chain, Account>
  }

  private contract: GetContractReturnType<typeof abi, WalletClient<Transport, Chain, Account>, Address>

  constructor(client: {
    public: PublicClient<Transport, Chain>,
    wallet: WalletClient<Transport, Chain, Account>,
  }, address?: Address) {
    this.client = client;
    this.contract = getContract({
      abi,
      client,
      address: address || multiVaultAddress
    });
  }

  public async getAtomCost() {
    return await this.contract.read.getAtomCost();
  }

  public async getTripleCost() {
    return await this.contract.read.getTripleCost();
  }

  public async createAtom(atomUri: string) {

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
