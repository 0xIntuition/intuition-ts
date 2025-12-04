import {Args, Command} from '@oclif/core'
import chalk from 'chalk'

import {getDefaultNetwork, setDefaultNetwork} from '../../config.js'
import {getNetworkByEnvironment} from '../../networks.js'

export default class ConfigDefaultNetwork extends Command {
  static override args = {
    network: Args.string({
      description: 'Network to set as default (intuition or testnet)',
    }),
  }
  static override description =
    'Set or show the default network (intuition or intuition-testnet). Default is intuition.'
  static override examples = ['<%= config.bin %> <%= command.id %>', '<%= config.bin %> <%= command.id %> intuition']

  public async run(): Promise<void> {
    const {args} = await this.parse(ConfigDefaultNetwork)
    const {network} = args

    if (network) {
      const valid = getNetworkByEnvironment(network)
      if (!valid) {
        this.log(chalk.red('❌ Invalid network. Must be "intuition" or "testnet".'))
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
