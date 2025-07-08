import {Args, Command, Flags} from '@oclif/core'
import {privateKeyToAccount} from 'viem/accounts'

import {addAccount, getAccounts, setDefaultAccount} from '../../config.js'

export default class AccountImport extends Command {
  static override args = {
    privateKey: Args.string({description: 'Private key to import', required: true}),
  }
  static override description = 'Import an account using a private key.'
  static override examples = ['<%= config.bin %> <%= command.id %> 0xabc123... --name MyWallet --default']
  static override flags = {
    default: Flags.boolean({char: 'd', description: 'Set as default account', required: false}),
    name: Flags.string({char: 'n', description: 'Name of the account to import', required: false}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(AccountImport)
    const accounts = getAccounts()
    let {default: setAsDefault, name} = flags
    const {privateKey} = args

    // Derive address from privateKey
    const account = privateKeyToAccount(privateKey as `0x${string}`)

    // Generate a default name if not provided
    if (!name) {
      let idx = 1
      let candidate: string
      do {
        candidate = `Wallet ${idx++}`
      } while (accounts.some((acc) => acc.name === candidate))

      name = candidate
    }

    // Save to config
    addAccount({address: account.address, name, privateKey})

    // Set as default if first account or --default flag is passed
    if (accounts.length === 0 || setAsDefault) {
      setDefaultAccount(account.address)
      this.log('This account is set as the default account.')
    }

    this.log(`Account imported!`)
    this.log(`Name: ${name}`)
    this.log(`Address: ${account.address}`)
  }
}
