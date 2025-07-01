import { batchCreateEthereumAccount, intuitionDeployments } from '@0xintuition/sdk'
import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import csv from 'csv-parser'
import fs from 'node:fs'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { getAccounts, getDefaultAccount, getDefaultNetwork } from '../../config'
import { base, baseSepolia, getNetworkByName } from '../../networks'

export default class BatchStart extends Command {

  static override description = 'Batch create atoms using a CSV file'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  static override flags = {
    limit: Flags.string({char: 'l', description: 'Amount to batch together.'}),
    name: Flags.string({char: 'n', description: 'Filename to load. Default is intuition-data.csv'}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(BatchStart)

    // Determine network
    const networkName = flags.network || getDefaultNetwork() || 'base'
    const network = getNetworkByName(networkName)
    if (!network) {
      this.log(chalk.red(`❌ Unsupported network: ${networkName}`))
      this.log(chalk.gray('Supported: base, base-sepolia'))
      return
    }

    this.log(chalk.blue(`🌐 Using network: ${network.name}`))

    // Get default account
    const defaultAccountAddress = getDefaultAccount()
    const accounts = getAccounts()
    const defaultAccount = accounts.find(acc => acc.address.toLowerCase() === (defaultAccountAddress || '').toLowerCase())
    if (!defaultAccount) {
      this.log(chalk.red('❌ No default account found.'))
      this.log(chalk.gray('Set a default account: intuition account set-default <address>'))
      this.log(chalk.gray('Or import an account: intuition account import <private-key>'))
      return
    }

    // Create public and wallet clients
    const account = privateKeyToAccount(defaultAccount.privateKey as `0x${string}`)

    const chain = network.id === 8453 ? base : baseSepolia
      const walletClient = createWalletClient({
        account,
        chain,
        transport: http(),
      })
      // Use viem's createPublicClient for publicClient
      const { createPublicClient } = await import('viem')
      const publicClient = createPublicClient({
        chain,
        transport: http(),
      })

      // Get contract address
      const chainId = network.id
      const contractAddress = intuitionDeployments.EthMultiVault?.[chainId]
      if (!contractAddress) {
        this.log(chalk.red(`❌ No contract deployment found for network: ${network.name}`))
        return
      }

      const atomConfig = {
        address: contractAddress,
        publicClient,
        walletClient,
      }

    const fileName = flags.name ?? "intuition-data.csv"

    const results: any[] =[]
    fs.createReadStream(fileName)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log(results);
      const limit = flags.limit ?? 10
      const batch = results.slice(0, limit).map((result) => ({
          address: result.address
        }))
      console.log(batch)
      const tx = await batchCreateEthereumAccount(atomConfig,batch)

      
    });
  }
}
