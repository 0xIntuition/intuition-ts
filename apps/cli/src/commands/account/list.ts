import {Command, Flags} from '@oclif/core'

import {getAccounts, getDefaultAccount} from '../../config.js'

export default class AccountList extends Command {
  static description = 'List active accounts.'
  static examples = [`<%= config.bin %> <%= command.id %>`, `<%= config.bin %> <%= command.id %> --export`]
  static flags = {
    export: Flags.boolean({
      char: 'e',
      description: 'Show the private key for each account.',
    }),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(AccountList)
    const accounts = getAccounts()
    const defaultAccount = getDefaultAccount()
    if (accounts.length === 0) {
      this.log('No accounts found.')
      this.log('Use `intuition account generate` or `intuition account import` to add a new account.')
      return
    }

    this.log('Saved accounts:')
    let idx = 1
    for (const acc of accounts) {
      const {address, name, privateKey} = acc as {
        address: string
        name: string
        privateKey?: string
      }
      const isDefault = address === defaultAccount
      let line = `${idx++}. ${name} - ${address}${isDefault ? ' (default)' : ''}`
      if (flags.export && privateKey) {
        line += `\n   Private Key: ${privateKey}`
      }

      this.log(line)
    }

    if (!defaultAccount) {
      this.log('\nNo default account set. Use `intuition account set-default <address>` to set one.')
    }
  }
}
