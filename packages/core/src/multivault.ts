import { Account, Chain, PublicClient, Transport, WalletClient, toHex, Address, parseEventLogs } from 'viem'
import { abi } from './abi';
import { multiVaultAddress } from './constants';

export class Multivault {

  private client: {
    public: PublicClient;
    wallet: WalletClient<Transport, Chain, Account>
  }

  private address: Address

  constructor(client: {
    public: PublicClient<Transport, Chain>,
    wallet: WalletClient<Transport, Chain, Account>,
  }, address?: Address) {
    this.client = client;
    this.address = address || multiVaultAddress;
  }

  public async getAtomCost() {
    return await this.client.public.readContract({
      address: this.address,
      abi,
      functionName: 'getAtomCost',
    })
  }

  public async getTripleCost() {
    return await this.client.public.readContract({
      address: this.address,
      abi,
      functionName: 'getTripleCost',
    })
  }

  public async createAtom(atomUri: string) {

    const atomCost = await this.getAtomCost();

    const hash = await this.client.wallet.writeContract({
      address: this.address,
      abi,
      functionName: 'createAtom',
      args: [toHex(atomUri)],
      value: atomCost,
    });

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

    const hash = await this.client.wallet.writeContract({
      address: this.address,
      abi,
      functionName: 'createTriple',
      args: [subjectId, predicateId, objectId],
      value: tripleCost,
    });

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
