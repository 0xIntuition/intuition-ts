import { Command } from '@oclif/core'

import { getAccounts, getDefaultAccount } from '../../config.js'

export default class AccountList extends Command {
  static args = {}
  static description = 'List active accounts.'
  static examples = [
    `<%= config.bin %> <%= command.id %>
hello world! (./src/commands/hello/world.ts)
`,
  ]
  static flags = {}

  async run(): Promise<void> {
    const accounts = getAccounts()
    const defaultAccount = getDefaultAccount()
    if (accounts.length === 0) {
      this.log('No accounts found.')
      this.log('Use `intuition account generate` or `intuition account import` to add a new account.')
      return
    }

    this.log('Saved accounts:')
    let idx = 1;
    for (const acc of accounts) {
      const { address, name } = acc as { address: string; name: string }
      const isDefault = address === defaultAccount
      this.log(`${idx++}. ${name} - ${address}${isDefault ? ' (default)' : ''}`)
    }

    if (!defaultAccount) {
      this.log('\nNo default account set. Use `intuition account set-default <address>` to set one.')
    }
  }
}
