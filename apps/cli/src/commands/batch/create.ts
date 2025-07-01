import select from '@inquirer/select'
import { Args, Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
  const SAMPLES = [
    {
      description: 'Template for Ethereum account data',
      file: 'ethereum-accounts.csv',
      name: 'Ethereum Accounts',
      value: 'ethereum-accounts',
    },
    {
      description: 'Template for IPFS URI data',
      file: 'ipfs-uri.csv',
      name: 'IPFS URI',
      value: 'ipfs-uri',
    },
    {
      description: 'Template for "Things" data',
      file: 'things.csv',
      name: 'Things',
      value: 'things',
    },
  ]
export default class BatchCreate extends Command {
  static override args = {
    file: Args.string({description: 'file to read'}),
  }
  static override description = 'describe the command here'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  static override flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
  }


  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BatchCreate)

    const choice = await select({
      choices: SAMPLES.map((s) => ({
        description: s.description,
        name: s.name,
        value: s.value,
      })),
      message: 'Select a template to use:',
    })
    const selected = SAMPLES.find((s) => s.value === choice)
    if (!selected) {
      console.log(chalk.red('Invalid template selection.'))
      return
    }

    const srcPath = path.resolve(__dirname, 'samples', selected.file)
    const destPath = path.resolve(process.cwd(), 'intuition-data.csv')
    try {
      await fs.copyFile(srcPath, destPath)
      console.log(chalk.green(`Created intuition-data.csv from ${selected.file}`))
    } catch (error) {
      console.log(chalk.red('Failed to create intuition-data.csv:'), error)
    }
  }
}
