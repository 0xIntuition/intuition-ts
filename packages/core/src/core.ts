import { Account, Chain, PublicClient, Transport, WalletClient, toHex, Address, parseEventLogs } from 'viem'
import { abi } from './abi';
import { multiVaultAddress } from './constants';

export class Intuition {

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

  public async createAtom(data: string) {

    const atomCost = await this.getAtomCost();

    const hash = await this.client.wallet.writeContract({
      address: this.address,
      abi,
      functionName: 'createAtom',
      args: [toHex(data)],
      value: atomCost,
    });

    const receipt = await this.client.public.waitForTransactionReceipt({ hash });

    const events = parseEventLogs({
      abi,
      logs: receipt.logs,
      eventName: 'AtomCreated',
    })

    const vaultId = events[0].args.vaultID
    return vaultId
  }

  public async createTriple(id1: bigint, id2: bigint, id3: bigint) {
    const tripleCost = await this.getTripleCost();

    const hash = await this.client.wallet.writeContract({
      address: this.address,
      abi,
      functionName: 'createTriple',
      args: [id1, id2, id3],
      value: tripleCost,
    });
    const receipt = await this.client.public.waitForTransactionReceipt({ hash });

    const events = parseEventLogs({
      abi,
      logs: receipt.logs,
      eventName: 'TripleCreated',
    })

    const tripleId = events[0].args.vaultID
    return tripleId

  }

}
