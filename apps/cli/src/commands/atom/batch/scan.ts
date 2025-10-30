import {intuitionDeployments} from '@0xintuition/sdk'
import select from '@inquirer/select'
import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import csv from 'csv-parser'
import fs from 'node:fs'
import {createPublicClient, createWalletClient, http, type PublicClient, type WalletClient} from 'viem'
import {privateKeyToAccount} from 'viem/accounts'

import {getAccounts, getDefaultAccount, getDefaultNetwork} from '../../../config.js'
import {getNetworkByName, intuitionTestnet} from '../../../networks.js'

// Define types for clarity
type CsvRow = Record<string, string>
type Network = ReturnType<typeof getNetworkByName>

type Account = ReturnType<typeof privateKeyToAccount>

// Define a type for the setup result
type ClientSetup = {
  account: Account
  contractAddress: `0x${string}`
  network: Network
  publicClient: PublicClient
  walletClient: WalletClient
}

export default class AtomBatchScan extends Command {
  static override description = 'Scan CSV file to check if atoms exist on chain'
  static override examples = ['<%= config.bin %> <%= command.id %> --name my-data.csv']
  static override flags = {
    name: Flags.string({
      char: 'n',
      description: 'Filename to scan. Default is intuition-data.csv',
    }),
    network: Flags.string({description: 'Network to use.'}),
    output: Flags.string({
      char: 'o',
      description: "Output filename for scan results. Default adds '_scan_results' to input filename",
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(AtomBatchScan)

    // 1. Setup clients
    const clientSetup = await this.setupClients(flags.network)
    if (!clientSetup) return

    // 2. Select atom type
    const atomType = await this.getAtomType()

    // 3. Load and prepare CSV data
    const fileName = flags.name ?? 'intuition-data.csv'
    const {rows: allRows} = await this.loadCsv(fileName)

    this.log(chalk.blue(`📄 ${allRows.length} rows loaded for scanning.`))

    // 4. Scanning logic will be implemented in the next update
    this.log(chalk.yellow(`🔍 Ready to scan ${allRows.length} rows for atom type: ${atomType}`))
    this.log(chalk.gray('Scanning logic will be implemented in the next update...'))

    // 5. Prepare output filename
    const outputFileName = flags.output ?? this.generateOutputFileName(fileName)
    this.log(chalk.blue(`📝 Scan results will be saved to: ${outputFileName}`))
  }

  private generateOutputFileName(inputFileName: string): string {
    const lastDotIndex = inputFileName.lastIndexOf('.')
    if (lastDotIndex === -1) {
      return `${inputFileName}_scan_results.csv`
    }

    const nameWithoutExt = inputFileName.slice(0, lastDotIndex)
    const extension = inputFileName.slice(lastDotIndex)
    return `${nameWithoutExt}_scan_results${extension}`
  }

  private async getAtomType(): Promise<string> {
    const atomType = await select({
      choices: [
        {
          description: 'Scan atoms from Things',
          name: 'Thing',
          value: 'thing',
        },
        {
          description: 'Scan atoms from Ethereum addresses',
          name: 'Ethereum Account',
          value: 'ethereum-account',
        },
        {
          description: 'Scan atoms from IPFS URIs',
          name: 'IPFS URI',
          value: 'ipfs-uri',
        },
        {
          description: 'Scan atoms from Smart Contracts',
          name: 'Smart Contract',
          value: 'smart-contract',
        },
      ],
      message: 'Select atom type to scan:',
    })
    this.log(chalk.green(`✅ Selected: ${atomType.replace('-', ' ')}`))
    return atomType
  }

  private async loadCsv(fileName: string): Promise<{headers: string[]; rows: CsvRow[]}> {
    const rows: CsvRow[] = []
    const headers: string[] = []
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(fileName)
        .on('error', reject)
        .pipe(csv())
        .on('headers', (hdrs: string[]) => headers.push(...hdrs))
        .on('data', (data: CsvRow) => rows.push(data))
        .on('end', resolve)
        .on('error', reject)
    })
    return {headers, rows}
  }

  // #region Private Helper Methods
  private async setupClients(networkFlag?: string): Promise<ClientSetup | undefined> {
    // 1. Determine and validate network
    const networkName = networkFlag || getDefaultNetwork() || 'intuition-testnet'
    const network = getNetworkByName(networkName)
    if (!network) {
      this.log(chalk.red(`❌ Unsupported network: ${networkName}`))
      this.log(chalk.gray('Supported: intuition, intuition-testnet'))
      return
    }

    this.log(chalk.blue(`🌐 Using network: ${network.name}`))

    // 2. Get default account
    const defaultAccountAddress = getDefaultAccount()
    const accounts = getAccounts()
    const defaultAccount = accounts.find(
      (acc) => acc.address.toLowerCase() === (defaultAccountAddress || '').toLowerCase(),
    )
    if (!defaultAccount) {
      this.log(chalk.red('❌ No default account found.'))
      this.log(chalk.gray('Set a default account: intuition account set-default <address>'))
      this.log(chalk.gray('Or import an account: intuition account import <private-key>'))
      return
    }

    // 3. Create Viem clients
    const account = privateKeyToAccount(defaultAccount.privateKey as `0x${string}`)
    // FIXME after mainnet launch
    const chain = network.id === intuitionTestnet.id ? intuitionTestnet : intuitionTestnet
    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(),
    })
    const publicClient = createPublicClient({chain, transport: http()})

    // 4. Get contract address
    const contractAddress = intuitionDeployments.MultiVault?.[network.id]
    if (!contractAddress) {
      this.log(chalk.red(`❌ No contract deployment found for network: ${network.name}`))
      return
    }

    return {account, contractAddress, network, publicClient, walletClient}
  }
}
