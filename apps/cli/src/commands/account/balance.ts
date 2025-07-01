import { Args, Command } from '@oclif/core'
import { createPublicClient, formatEther, http } from 'viem'

import { getDefaultAccount } from '../../config.js'
import { supportedNetworks } from '../../networks.js'

export default class AccountBalance extends Command {
  static override args = {
    address: Args.string({ description: 'Address to check balance for', required: false }),
  }
  static override description = 'Show the balance of an account on Base and Base Sepolia.'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> 0x1234...abcd',
  ]
  static override flags = {}

  public async run(): Promise<void> {
    const { args } = await this.parse(AccountBalance)
    let { address } = args

    if (!address) {
      // Use default account if no address is provided
      const defaultAddress = getDefaultAccount()
      if (!defaultAddress) {
        this.log('No default account set. Please set a default account or provide an address.')
        return
      }
      
      address = defaultAddress
    }

    this.log(`Fetching balances for: ${address}`)

    await Promise.all(supportedNetworks.map(async (network) => {
      const client = createPublicClient({
        chain: network,
        transport: http(),
      })
      try {
        const balance = await client.getBalance({ address: address as `0x${string}` })
        this.log(`${network.name}: ${formatEther(balance)} ETH`)
      } catch (error) {
        this.log(`${network.name}: Error fetching balance (${error})`)
      }
    }))
  }
}
