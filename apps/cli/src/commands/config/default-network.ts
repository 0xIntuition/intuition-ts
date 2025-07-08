import {Args, Command} from '@oclif/core'
import chalk from 'chalk'

import {getDefaultNetwork, setDefaultNetwork} from '../../config.js'
import {getNetworkByName} from '../../networks.js'

export default class ConfigDefaultNetwork extends Command {
  static override args = {
    network: Args.string({description: 'Network to set as default (base or base-sepolia)'}),
  }
  static override description = 'Set or show the default network (base or base-sepolia). Default is base.'
  static override examples = ['<%= config.bin %> <%= command.id %>', '<%= config.bin %> <%= command.id %> base']

  public async run(): Promise<void> {
    const {args} = await this.parse(ConfigDefaultNetwork)
    const {network} = args

    if (network) {
      const valid = getNetworkByName(network)
      if (!valid) {
        this.log(chalk.red('❌ Invalid network. Must be "base" or "base-sepolia".'))
        return
      }

      setDefaultNetwork(network)
      this.log(chalk.green(`✅ Default network set to: ${network}`))
    } else {
      const _network = getDefaultNetwork()
      this.log(chalk.green(`✅ Default network set to: ${_network}`))
    }
  }
}
