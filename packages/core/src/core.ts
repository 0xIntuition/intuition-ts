import { Account, Chain, PublicClient, Transport, WalletClient, toHex, Address, parseEventLogs, Client } from 'viem'
import { abi } from './abi';

export class Intuition {
  private client: {
    public: PublicClient;
    wallet: WalletClient<Transport, Chain, Account>
  }

  private address: Address

  constructor(client: {
    public: Client<Transport, Chain>,
    wallet: Client<Transport, Chain, Account>,
  }, address: Address = '0x5fbdb2315678afecb367f032d93f642f64180aa3') {
    this.client = client;
    this.address = address;
  }

  public async getAtomCost() {
    return await this.client.public.readContract({
      address: this.address,
      abi,
      functionName: 'getAtomCost',
    })
  }
  public async createAtom(data: string) {

    const atomCost = await this.getAtomCost();
    console.log(`Atom cost is ${atomCost}`);

    const txHash = await this.client.wallet.writeContract({
      address: this.address,
      abi,
      functionName: 'createAtom',
      args: [toHex(data)],
      value: atomCost,
    });
    const receipt = await this.client.public.waitForTransactionReceipt({ hash: txHash });

    console.log(`Atom created with receipt ${receipt}`);
    const events = parseEventLogs({
      abi,
      logs: receipt.logs,
      eventName: 'AtomCreated',
    })

    const vaultId = events[0].args.vaultID
    console.log(`Atom created with vaultId ${vaultId}`);
    return vaultId
  }

  public async createTriple(id1: bigint, id2: bigint, id3: bigint) {
    return 123
  }

}
