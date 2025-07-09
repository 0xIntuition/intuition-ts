import {Command} from '@oclif/core'
import inquirer from 'inquirer'

import {clearAccounts} from '../../config.js'

export default class AccountReset extends Command {
  static override args = {}
  static override description = 'Remove all existing accounts after confirmation.'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {}

  public async run(): Promise<void> {
    this.log('This will remove ALL accounts and cannot be undone!')
    const response = await inquirer.prompt([
      {
        message: 'Type "confirm" to proceed:',
        name: 'confirm',
        type: 'input',
      },
    ])
    if (response.confirm !== 'confirm') {
      this.log('Aborted. No accounts were deleted.')
      return
    }

    clearAccounts()
    this.log('All accounts have been deleted.')
  }
}
