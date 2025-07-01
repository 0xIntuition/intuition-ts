import { Command, Flags } from '@oclif/core'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

import { addAccount, getAccounts, setDefaultAccount } from '../../config.js'

export default class AccountGenerate extends Command {
  static args = {}
  static description = 'Generate a new account.'
  static examples = [
    `<%= config.bin %> <%= command.id %> --name mywallet --default`,
  ]
  static flags = {
    default: Flags.boolean({ char: 'd', description: 'Set as default account', required: false }),
    name: Flags.string({ char: 'n', description: 'Name of the account to generate', required: false }),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(AccountGenerate)
    const accounts = getAccounts()
    let { default: setAsDefault, name } = flags

    // Generate a default name if not provided
    if (!name) {
      let idx = 1
      let candidate: string | undefined
      do {
        candidate = `Wallet ${idx++}`
      } while (accounts.some(acc => acc.name === candidate))
      name = candidate
    }

    // Generate private key and account
    const privateKey = generatePrivateKey()
    const account = privateKeyToAccount(privateKey)

    // Save to config, now including address
    addAccount({ address: account.address, name, privateKey })

    // Set as default if first account or --default flag is passed
    if (accounts.length === 0 || setAsDefault) {
      setDefaultAccount(account.address)
      this.log('This account is set as the default account.')
    }

    this.log(`Account generated!`)
    this.log(`Name: ${name}`)
    this.log(`Address: ${account.address}`)
  }
}
