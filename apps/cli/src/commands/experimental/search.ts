import {search} from '@0xintuition/sdk'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {getAddress} from 'viem'

import {getAccounts, getDefaultAccount, getDefaultNetwork} from '../../config.js'
import {getNetworkByName} from '../../networks.js'

export default class Sync extends Command {
  static override args = {
    input: Args.file({
      default: 'query.json',
      description: 'File containing search query data. JSON array of {"key":"value"} pairs',
      required: true,
    }),
  }
  static override description = 'Search for synced data'
  static override flags = {
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

      // Read file contents
      const fs = await import('node:fs/promises')
      const contents = await fs.readFile(input, 'utf8')
      const data = JSON.parse(contents)

      this.log(chalk.gray(`📄 Data loaded: ${Object.keys(data).length} subjects`))

      const result = await search(data, [getAddress(defaultAccount.address)])
      this.log('Result:')
      this.log(JSON.stringify(result, null, 2))
    } catch (error: unknown) {
      this.error(error as Error)
    }
  }
}
