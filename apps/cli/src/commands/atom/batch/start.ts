/* eslint-disable max-depth */
/* eslint-disable complexity */
import { batchCreateAtomsFromThings, batchCreateTripleStatements, intuitionDeployments } from '@0xintuition/sdk'
import select from '@inquirer/select'
import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import csv from 'csv-parser'
import { createObjectCsvWriter } from 'csv-writer'
import fs from 'node:fs'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { getAccounts, getDefaultAccount, getDefaultNetwork } from '../../../config.js'
import { base, baseSepolia, getNetworkByName } from '../../../networks.js'

export default class BatchStart extends Command {

  static override description = 'Batch create atoms using a CSV file'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  static override flags = {
    count: Flags.string({char: 'c', default: "50", description: 'Amount to batch together. Default is 50'}),
    list: Flags.string({char: 'l', description: 'Add atoms to a list.'}),
    name: Flags.string({char: 'n', description: 'Filename to load. Default is intuition-data.csv'}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(BatchStart)

    // Determine network
    const networkName: string = flags.network || getDefaultNetwork() || 'base'
    const network = getNetworkByName(networkName)
    if (!network) {
      this.log(chalk.red(`❌ Unsupported network: ${networkName}`))
      this.log(chalk.gray('Supported: base, base-sepolia'))
      return
    }

    this.log(chalk.blue(`🌐 Using network: ${network.name}`))

    // Get default account
    const defaultAccountAddress: string | undefined = getDefaultAccount()
    const accounts: any[] = getAccounts()
    const defaultAccount = accounts.find(acc => acc.address.toLowerCase() === (defaultAccountAddress || '').toLowerCase())
    if (!defaultAccount) {
      this.log(chalk.red('❌ No default account found.'))
      this.log(chalk.gray('Set a default account: intuition account set-default <address>'))
      this.log(chalk.gray('Or import an account: intuition account import <private-key>'))
      return
    }

    // Create public and wallet clients
    const account = privateKeyToAccount(defaultAccount.privateKey as `0x${string}`)
    const chain = network.id === 8453 ? base : baseSepolia
    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(),
    })
    
    const publicClient = createPublicClient({
      chain,
      transport: http(),
    })

    // Get contract address
    const chainId = network.id
    const contractAddress = intuitionDeployments.EthMultiVault?.[chainId]
    if (!contractAddress) {
      this.log(chalk.red(`❌ No contract deployment found for network: ${network.name}`))
      return
    }

    const atomConfig = {
      address: contractAddress,
      publicClient,
      walletClient,
    }

    const fileName: string = flags.name ?? 'intuition-data.csv'
    const count: number = Number.parseInt(flags.count, 10)

    // Prompt for atom type
    const atomType: string = await select({
      choices: [
        { description: 'Batch create atoms from Things', name: 'Thing', value: 'thing' },
        { description: 'Batch create atoms from Ethereum addresses', name: 'Ethereum Account', value: 'ethereum-account' },
        { description: 'Batch create atoms from IPFS URIs (coming soon)', disabled: true, name: 'IPFS URI', value: 'ipfs-uri' },
      ],
      message: 'Select atom type to batch create:',
    })

    this.log(chalk.green(`✅ Selected: ${atomType.replace('-', ' ')}`))

    // Read CSV into memory (stream for large files)
    const rows: Record<string, string>[] = []
    const headers: string[] = []
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(fileName as string)
        .pipe(csv())
        .on('headers', (hdrs: string[]) => {
          headers.push(...hdrs)
        })
        .on('data', (data: Record<string, string>) => rows.push(data))
        .on('end', () => resolve())
        .on('error', (err: Error) => reject(err))
    })

    // Find the txHash column (case-insensitive)
    const vaultIdCol: string = headers.find(h => h.toLowerCase().includes('vaultid')) || 'vaultId'

    // Filter out already-processed rows (txHash not empty)
    const unprocessedRows: Record<string, string>[] = rows.filter(row => !row[vaultIdCol] || row[vaultIdCol].trim() === '')
    if (unprocessedRows.length === 0) {
      this.log(chalk.yellow('All rows have already been processed.'))
      return
    }

    this.log(chalk.blue(`📄 ${rows.length} rows loaded, ${unprocessedRows.length} to process.`))

    // Batch processing
    let processedCount: number = 0
    for (let i = 0; i < unprocessedRows.length; i += count) {
      const batch: Record<string, string>[] = unprocessedRows.slice(i, i + count)
      this.log(chalk.blue(`🚀 Processing batch ${Math.floor(i/count)+1} (${batch.length} atoms)...`))
      try {
        if (atomType === 'ethereum-account') {
          // Prepare input for batchCreateEthereumAccount
          // const batchInput: { address: string }[] = batch.map(row => ({ address: row.address }))
          // // @ts-expect-error We expect an error.  
          // const result = await batchCreateEthereumAccount(atomConfig, batchInput)
          // // Update txHash for this batch
          // const txHash: string = result.transactionHash
          // for (const row of batch) {
          //   // Find the original row in rows and update txHash
          //   const orig: Record<string, string> | undefined = rows.find(r => r.address === row.address && (!r[txHashCol] || r[txHashCol].trim() === ''))
          //   if (orig) orig[txHashCol] = txHash
          // }

          // this.log(chalk.green(`✅ Batch processed. TxHash: ${txHash}`))
        } else if(atomType ==="thing") {
          // Prepare input for batchCreateAtomsFromThings
          const batchInput: { description: string, image: string, name: string, url: string }[] = batch.map(row => ({ description: row.description, image: row.image, name: row.name, url: row.url }))
          // @ts-expect-error We expect an error.
          const result = await batchCreateAtomsFromThings(atomConfig, batchInput)

          if(flags.list) {
            const listIds = flags.list.split(",").map(id => id.trim()).filter(Boolean);
            const vaultIds = result.state.map(i => i.vaultId);
            const hasTagId = Array.from({ length: vaultIds.length }).fill('3');

            for (const listIdValue of listIds) {
              if (!Object.prototype.hasOwnProperty.call(listIds, listIds.indexOf(listIdValue))) continue;
              const listIdArr = Array.from({ length: vaultIds.length }).fill(listIdValue);
              // @ts-expect-error We expect an error.
              await batchCreateTripleStatements(atomConfig, [vaultIds, hasTagId, listIdArr]);
              this.log(chalk.green(`✅ New atoms have been tagged in list ${listIdValue}`));
            }
          }

          // Ensure vaultId column exists
          const vaultIdCol: string = headers.find(h => h.toLowerCase() === 'vaultid') || 'vaultId';
          if (!headers.includes(vaultIdCol)) {
            headers.push(vaultIdCol);
            // Add vaultId property to all rows for consistency
            for (const row of rows) {
              if (!(vaultIdCol in row)) row[vaultIdCol] = '';
            }
          }

          // Update vaultId and ipfsUri for this batch
          const { state, uris } = result;
          let idx = 0;
          for (let j = 0; j < rows.length && idx < batch.length; j++) {
            const row = rows[j];
            // Find the next unprocessed row (no vaultId or empty vaultId)
            if (!row[vaultIdCol] || row[vaultIdCol].trim() === '') {
              // Set vaultId from result.state[idx]
              row[vaultIdCol] = state[idx]?.vaultId?.toString?.() || '';
              // Optionally update ipfsUri if present in both row and uris
              if ('ipfsUri' in row && uris[idx]) {
                row.ipfsUri = uris[idx];
              }

              idx++;
            }
          }

          this.log(chalk.green(`✅ Batch processed. VaultIds: ${state.map(s => s.vaultId).join(', ')}`));
        } 
        
        else {
          this.log(chalk.yellow('This atom type is not yet supported for batch creation.'))
        }
      } catch (error) {
        this.log(chalk.red(`❌ Error processing batch: ${error instanceof Error ? error.message : String(error)}`))
        // Optionally: break or continue
        break
      }

      processedCount += batch.length
      // Write progress to CSV after each batch
      const csvWriter = createObjectCsvWriter({
        alwaysQuote: true,
        header: headers.map(h => ({ id: h, title: h })),
        path: fileName,
      })
      await csvWriter.writeRecords(rows)
      this.log(chalk.gray(`Progress saved to ${fileName}`))
    }

    this.log(chalk.green(`🎉 Done! ${processedCount} atoms processed and CSV updated.`))
  }
}
