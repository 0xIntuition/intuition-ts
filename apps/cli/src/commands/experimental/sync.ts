import {intuitionDeployments, sync} from '@0xintuition/sdk'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {createWalletClient, http} from 'viem'
import {privateKeyToAccount} from 'viem/accounts'

import {getAccounts, getDefaultAccount, getDefaultNetwork} from '../../config.js'
import {getNetworkByName, intuitionTestnet} from '../../networks.js'

export default class Sync extends Command {
  static override args = {
    input: Args.file({
      default: 'data.json',
      description: 'File containing input data',
      required: true,
    }),
  }
  static override description = 'Sync data to intuition'
  static override flags = {
    'batch-size': Flags.integer({
      default: 50,
      description: 'Number of items to process in each batch',
      required: false,
    }),
    network: Flags.string({
      description: 'Target network (intuition, intuition-testnet)',
      required: false,
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Sync)
    const {input} = args
    try {
      // Determine network
      const networkName = flags.network || getDefaultNetwork() || 'intuition-testnet'
      const network = getNetworkByName(networkName)
      if (!network) {
        this.log(chalk.red(`❌ Unsupported network: ${networkName}`))
        this.log(chalk.gray('Supported: intuition, intuition-testnet'))
        return
      }

      this.log(chalk.blue(`🌐 Using network: ${network.name}`))

      // Get default account
      const defaultAccountAddress = getDefaultAccount()
      const accounts = getAccounts()
      const defaultAccount = accounts.find(
        (acc) => acc.address.toLowerCase() === (defaultAccountAddress || '').toLowerCase(),
      )
      if (!defaultAccount) {
        this.log(chalk.red('❌ No default account found.'))
        this.log(chalk.gray('Set a default account: intuition account set-default <address>'))
        this.log(chalk.gray('Or import an account: intuition account import <private-key>'))
        return
      }

      // Create public and wallet clients
      const account = privateKeyToAccount(defaultAccount.privateKey as `0x${string}`)
      const chain = network.id === 13_579 ? intuitionTestnet : intuitionTestnet
      const walletClient = createWalletClient({
        account,
        chain,
        transport: http(),
      })
      // Use viem's createPublicClient for publicClient
      const {createPublicClient} = await import('viem')
      const publicClient = createPublicClient({
        chain,
        transport: http(),
      })

      // Get contract address
      const chainId = network.id
      const contractAddress = intuitionDeployments.MultiVault?.[chainId]
      if (!contractAddress) {
        this.log(chalk.red(`❌ No contract deployment found for network: ${network.name}`))
        return
      }

      this.log(chalk.gray(`🔧 Chain ID: ${chainId}`))
      this.log(chalk.gray(`📍 Contract address: ${contractAddress}`))

      const config = {
        address: contractAddress,
        batchSize: flags['batch-size'],
        logger: this.log.bind(this),
        publicClient,
        walletClient,
      }
      // Read file contents
      const fs = await import('node:fs/promises')
      const contents = await fs.readFile(input, 'utf8')
      const data = JSON.parse(contents)

      this.log(chalk.gray(`📄 Data loaded: ${Object.keys(data).length} subjects`))

      await sync(config, data)
    } catch (error: unknown) {
      this.error(error as Error)
    }
  }
}
