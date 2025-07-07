import select from '@inquirer/select';
import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  static override description = 'Create a new CSV file to handle batch uploads.'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  static override flags = {
    name: Flags.string({char: 'n', default: "intuition-data.csv", description: 'Name of file to create. Default is intuition-data.csv'}),
  }


  public async run(): Promise<void> {
    const {flags} = await this.parse(BatchCreate)

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
    const destPath = path.resolve(process.cwd(), flags.name)
    try {
      await fs.copyFile(srcPath, destPath)
      console.log(chalk.green(`Created ${flags.name} from ${selected.file}`))
    } catch (error) {
      console.log(chalk.red(`Failed to create ${flags.name}:`), error)
    }
  }
}
