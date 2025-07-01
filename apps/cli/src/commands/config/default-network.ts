import { Args, Command } from '@oclif/core'
import chalk from 'chalk'

import { setDefaultNetwork } from '../../config.js'
import { getNetworkByName } from '../../networks.js'

export default class ConfigDefaultNetwork extends Command {
  static override args = {
    network: Args.string({ description: 'Network to set as default (base or base-sepolia)', required: true }),
  }
  static override description = 'Set or show the default network (base or base-sepolia). Default is base.'
  static override examples = [
    '<%= config.bin %> <%= command.id %> --network base',
    '<%= config.bin %> <%= command.id %> --network base-sepolia',
    '<%= config.bin %> <%= command.id %>'
  ]

  public async run(): Promise<void> {
    const { args } = await this.parse(ConfigDefaultNetwork)
    const network = args.network || 'base'
    const valid = getNetworkByName(network)
    if (!valid) {
      this.log(chalk.red('❌ Invalid network. Must be "base" or "base-sepolia".'))
      return
    }

    setDefaultNetwork(network)
    this.log(chalk.green(`✅ Default network set to: ${network}`))
  }
}
