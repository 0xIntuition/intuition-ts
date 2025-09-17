/* eslint-disable max-params */
/* eslint-disable no-await-in-loop */

import {
  batchCreateAtomsFromEthereumAccounts,
  batchCreateAtomsFromIpfsUris,
  batchCreateAtomsFromSmartContracts,
  batchCreateAtomsFromThings,
  batchCreateTripleStatements,
  intuitionDeployments,
} from '@0xintuition/sdk'
import select from '@inquirer/select'
import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import csv from 'csv-parser'
import {createObjectCsvWriter} from 'csv-writer'
import fs from 'node:fs'
import {createPublicClient, createWalletClient, getAddress, http, type PublicClient, type WalletClient} from 'viem'
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

type CreateAtomConfig = {
  address: `0x${string}`
  publicClient: PublicClient
  walletClient: WalletClient
}

export default class BatchStart extends Command {
  static override description = 'Batch create atoms using a CSV file'
  static override examples = ['<%= config.bin %> <%= command.id %> --name my-batch.csv']
  static override flags = {
    count: Flags.string({
      char: 'c',
      default: '50',
      description: 'Amount to batch together. Default is 50',
    }),
    list: Flags.string({char: 'l', description: 'Add atoms to a list.'}),
    name: Flags.string({
      char: 'n',
      description: 'Filename to load. Default is intuition-data.csv',
    }),
    network: Flags.string({description: 'Network to use.'}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(BatchStart)

    // 1. Setup clients
    const clientSetup = await this.setupClients(flags.network)
    if (!clientSetup) return
    const {contractAddress, publicClient, walletClient} = clientSetup

    // 2. Select atom type
    const atomType = await this.getAtomType()

    // 3. Load and prepare CSV data
    const fileName = flags.name ?? 'intuition-data.csv'
    const {headers, rows: allRows} = await this.loadCsv(fileName)

    const vaultIdCol = headers.find((h) => h.toLowerCase().includes('vaultid')) || 'vaultId'
    const unprocessedRows = allRows.filter((row) => !row[vaultIdCol] || row[vaultIdCol].trim() === '')

    if (unprocessedRows.length === 0) {
      this.log(chalk.yellow('All rows have already been processed.'))
      return
    }

    this.log(chalk.blue(`📄 ${allRows.length} rows loaded, ${unprocessedRows.length} to process.`))

    // 4. Process batches
    const atomConfig = {
      address: contractAddress as `0x${string}`,
      publicClient,
      walletClient,
    }
    const processedCount = await this.processBatches({allRows, headers, unprocessedRows}, {atomConfig, atomType, flags})

    this.log(chalk.green(`🎉 Done! ${processedCount} atoms processed and CSV updated.`))
  }

  private async batchTagAtomsInList(atomConfig: CreateAtomConfig, vaultIds: string[], listFlag: string) {
    const listIds = listFlag
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)
    const hasTagIdFromNetwork = '0x49487b1d5bf2734d497d6d9cfcd72cdfbaefb4d4f03ddc310398b24639173c9d'
    const hasTagId = Array.from({length: vaultIds.length}).fill(hasTagIdFromNetwork)

    for (const listIdValue of listIds) {
      const listIdArr = Array.from({length: vaultIds.length}).fill(listIdValue)
      // @ts-expect-error SDK types need to be updated
      await batchCreateTripleStatements(atomConfig, [vaultIds, hasTagId, listIdArr])
      this.log(chalk.green(`✅ New atoms have been tagged in list ${listIdValue}`))
    }
  }

  private async getAtomType(): Promise<string> {
    const atomType = await select({
      choices: [
        {
          description: 'Batch create atoms from Things',
          name: 'Thing',
          value: 'thing',
        },
        {
          description: 'Batch create atoms from Ethereum addresses',
          name: 'Ethereum Account',
          value: 'ethereum-account',
        },
        {
          description: 'Batch create atoms from IPFS URIs',
          name: 'IPFS URI',
          value: 'ipfs-uri',
        },
        {
          description: 'Batch create atoms from Smart Contracts',
          name: 'Smart Contract',
          value: 'smart-contract',
        },
      ],
      message: 'Select atom type to batch create:',
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

  private async processBatches(
    {allRows, headers, unprocessedRows}: {allRows: CsvRow[]; headers: string[]; unprocessedRows: CsvRow[]},
    {
      atomConfig,
      atomType,
      flags,
    }: {
      atomConfig: CreateAtomConfig
      atomType: string
      flags: Record<string, unknown>
    },
  ) {
    const {count, list, name: fileName} = flags as {count: string; list?: string; name?: string}
    const batchSize = Number.parseInt(count, 10)
    let processedCount = 0

    for (let i = 0; i < unprocessedRows.length; i += batchSize) {
      const batch = unprocessedRows.slice(i, i + batchSize)
      this.log(chalk.blue(`🚀 Processing batch ${Math.floor(i / batchSize) + 1} (${batch.length} atoms)...`))

      try {
        switch (atomType) {
          case 'ethereum-account': {
            await this.processEthereumAccountBatch(batch, allRows, headers, atomConfig, list as string | undefined)
            break
          }

          case 'ipfs-uri': {
            await this.processIpfsUriBatch(batch, allRows, headers, atomConfig, list as string | undefined)
            break
          }

          case 'smart-contract': {
            await this.processSmartContractBatch(batch, allRows, headers, atomConfig, list as string | undefined)
            break
          }

          case 'thing': {
            await this.processThingBatch(batch, allRows, headers, atomConfig, list as string | undefined)
            break
          }

          default: {
            this.log(chalk.yellow('This atom type is not yet supported for batch creation.'))
          }
        }
      } catch (error) {
        this.log(chalk.red(`❌ Error processing batch: ${error instanceof Error ? error.message : String(error)}`))
        break // Exit on error
      }

      processedCount += batch.length
      // Write progress to CSV after each batch
      const csvWriter = createObjectCsvWriter({
        alwaysQuote: true,
        header: headers.map((h) => ({id: h, title: h})),
        path: fileName ?? 'intuition-data.csv',
      })
      await csvWriter.writeRecords(allRows)
      this.log(chalk.gray(`Progress saved to ${fileName ?? 'intuition-data.csv'}`))
    }

    return processedCount
  }

  private async processEthereumAccountBatch(
    batch: CsvRow[],
    allRows: CsvRow[],
    headers: string[],
    atomConfig: CreateAtomConfig,
    listFlag?: string,
  ) {
    // 1. Ensure required columns
    const requiredCols = ['vaultId']
    for (const col of requiredCols) {
      if (!headers.includes(col)) {
        headers.push(col)
        for (const row of allRows) {
          if (!(col in row)) row[col] = ''
        }
      }
    }

    // 2. Prepare batch input
    const batchInput = batch.map((row) => getAddress(row.address))

    // 3. Call SDK batch function
    const result = await batchCreateAtomsFromEthereumAccounts(atomConfig, batchInput)
    const {state} = result

    // 4. Update allRows and collect vaultIds
    let idx = 0
    const vaultIds: string[] = []
    for (let j = 0; j < allRows.length && idx < batch.length; j++) {
      const row = allRows[j]
      if ((!row.vaultId || row.vaultId.trim() === '') && row.address && batchInput.includes(getAddress(row.address))) {
        row.vaultId = state[idx]?.termId?.toString?.() || ''
        vaultIds.push(row.vaultId)
        this.log(chalk.green(`✅ Created atom for address: ${row.address} (VaultId: ${row.vaultId})`))
        idx++
      }
    }

    // 5. Tag list if needed
    if (listFlag && vaultIds.length > 0) {
      await this.batchTagAtomsInList(atomConfig, vaultIds, listFlag)
    }
  }

  private async processIpfsUriBatch(
    batch: CsvRow[],
    allRows: CsvRow[],
    headers: string[],
    atomConfig: CreateAtomConfig,
    listFlag?: string,
  ) {
    // 1. Ensure required columns
    const requiredCols = ['vaultId']
    for (const col of requiredCols) {
      if (!headers.includes(col)) {
        headers.push(col)
        for (const row of allRows) {
          if (!(col in row)) row[col] = ''
        }
      }
    }

    // 2. Prepare batch input
    const batchInput = batch.map((row) => row.ipfsUri)

    // 3. Call SDK batch function
    const result = await batchCreateAtomsFromIpfsUris(atomConfig, batchInput)
    const {state} = result

    // 4. Update allRows and collect vaultIds
    let idx = 0
    const vaultIds: string[] = []
    for (let j = 0; j < allRows.length && idx < batch.length; j++) {
      const row = allRows[j]
      if ((!row.vaultId || row.vaultId.trim() === '') && row.ipfsUri && batchInput.includes(row.ipfsUri)) {
        row.vaultId = state[idx]?.termId?.toString?.() || ''
        vaultIds.push(row.vaultId)
        this.log(chalk.green(`✅ Created atom for IPFS URI: ${row.ipfsUri} (VaultId: ${row.vaultId})`))
        idx++
      }
    }

    // 5. Tag list if needed
    if (listFlag && vaultIds.length > 0) {
      await this.batchTagAtomsInList(atomConfig, vaultIds, listFlag)
    }
  }

  private async processSmartContractBatch(
    batch: CsvRow[],
    allRows: CsvRow[],
    headers: string[],
    atomConfig: CreateAtomConfig,
    listFlag?: string,
  ) {
    // 1. Ensure required columns
    const requiredCols = ['vaultId']
    for (const col of requiredCols) {
      if (!headers.includes(col)) {
        headers.push(col)
        for (const row of allRows) {
          if (!(col in row)) row[col] = ''
        }
      }
    }

    // 2. Prepare batch input
    const batchInput = batch.map((row) => ({
      address: getAddress(row.address),
      chainId: Number(row.chainId),
    }))

    // 3. Call SDK batch function
    const result = await batchCreateAtomsFromSmartContracts(atomConfig, batchInput)
    const {state} = result

    // 4. Update allRows and collect vaultIds
    let idx = 0
    const vaultIds: string[] = []
    for (let j = 0; j < allRows.length && idx < batch.length; j++) {
      const row = allRows[j]
      if (
        (!row.vaultId || row.vaultId.trim() === '') &&
        row.address &&
        row.chainId &&
        batchInput.some((input) => input.address === getAddress(row.address) && input.chainId === Number(row.chainId))
      ) {
        row.vaultId = state[idx]?.termId?.toString?.() || ''
        vaultIds.push(row.vaultId)
        this.log(
          chalk.green(
            `✅ Created atom for smart contract: ${row.address} (ChainId: ${row.chainId}, VaultId: ${row.vaultId})`,
          ),
        )
        idx++
      }
    }

    // 5. Tag list if needed
    if (listFlag && vaultIds.length > 0) {
      await this.batchTagAtomsInList(atomConfig, vaultIds, listFlag)
    }
  }

  private async processThingBatch(
    batch: CsvRow[],
    allRows: CsvRow[],
    headers: string[],
    atomConfig: CreateAtomConfig,
    listFlag?: string,
  ) {
    // 1. Ensure required columns
    const requiredCols = ['vaultId', 'ipfsUri']
    for (const col of requiredCols) {
      if (!headers.includes(col)) {
        headers.push(col)
        for (const row of allRows) {
          if (!(col in row)) row[col] = ''
        }
      }
    }

    // 2. Prepare batch input
    const batchInput = batch.map((row) => ({
      description: row.description,
      image: row.image,
      name: row.name,
      url: row.url,
    }))

    // 3. Call SDK batch function
    const result = await batchCreateAtomsFromThings(atomConfig, batchInput)
    const {state, uris} = result

    // 4. Update allRows and collect vaultIds
    let idx = 0
    const vaultIds: string[] = []
    for (let j = 0; j < allRows.length && idx < batch.length; j++) {
      const row = allRows[j]
      if (
        (!row.vaultId || row.vaultId.trim() === '') &&
        row.name &&
        batchInput.some((input) => input.name === row.name)
      ) {
        row.vaultId = state[idx]?.termId?.toString?.() || ''
        if ('ipfsUri' in row && uris && uris[idx]) {
          row.ipfsUri = uris[idx]
        }

        vaultIds.push(row.vaultId)
        this.log(chalk.green(`✅ Created atom for thing: ${row.name} (VaultId: ${row.vaultId})`))
        idx++
      }
    }

    // 5. Tag list if needed
    if (listFlag && vaultIds.length > 0) {
      await this.batchTagAtomsInList(atomConfig, vaultIds, listFlag)
    }
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
