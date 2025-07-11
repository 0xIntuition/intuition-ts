import {Args, Command} from '@oclif/core'

import {getAccounts, getDefaultAccount, setDefaultAccount} from '../../config.js'

export default class AccountSetDefault extends Command {
  static args = {
    address: Args.string({
      description: 'Address of the account to set as default',
    }),
  }
  static description = 'Get or set the default account by address.'
  static examples = ['<%= config.bin %> <%= command.id %>', '<%= config.bin %> <%= command.id %> 0x1234...abcd']
  static flags = {}

  async run(): Promise<void> {
    const {args} = await this.parse(AccountSetDefault)
    const {address} = args

    if (address) {
      const accounts = getAccounts()
      const found = accounts.find((acc) => acc.address.toLowerCase() === address.toLowerCase())

      if (!found) {
        this.log(`No account found with address: ${address}`)
        return
      }

      setDefaultAccount(found.address)
      this.log(`Default account set to: ${found.address}`)
    } else {
      const defaultAccount = getDefaultAccount()
      this.log(`Default account set to: ${defaultAccount}`)
    }
  }
}
