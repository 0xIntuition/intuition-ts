import {intuitionDeployments} from '@0xintuition/protocol'
import {createAtomFromEthereumAccount, createAtomFromIpfsUri} from '@0xintuition/sdk'
import input from '@inquirer/input'
import select from '@inquirer/select'
import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {type Address, createWalletClient, http} from 'viem'
import {privateKeyToAccount} from 'viem/accounts'
import {z} from 'zod'

import {getAccounts, getDefaultAccount, getDefaultNetwork} from '../../config.js'
import {base, baseSepolia, getNetworkByName} from '../../networks.js'

const AddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address format')
const IpfsUriSchema = z.string().regex(/^ipfs:\/\/[a-zA-Z0-9]+/, 'Invalid IPFS URI format (must start with ipfs://)')

export default class AtomCreate extends Command {
  static override description = 'Create a new atom on the blockchain.'
  static override examples = ['<%= config.bin %> <%= command.id %> --network base --deposit 0.01']
  static override flags = {
    deposit: Flags.string({
      description: 'Deposit amount in ETH (optional)',
      required: false,
    }),
    network: Flags.string({
      description: 'Target network (base, base-sepolia)',
      required: false,
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(AtomCreate)
    try {
      // Determine network
      const networkName = flags.network || getDefaultNetwork() || 'base'
      const network = getNetworkByName(networkName)
      if (!network) {
        this.log(chalk.red(`❌ Unsupported network: ${networkName}`))
        this.log(chalk.gray('Supported: base, base-sepolia'))
        return
      }

      this.log(chalk.blue(`🌐 Using network: ${network.name}`))

      // Get default account
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

      // Create public and wallet clients
      const account = privateKeyToAccount(defaultAccount.privateKey as `0x${string}`)
      const chain = network.id === 8453 ? base : baseSepolia
      const walletClient = createWalletClient({
        account,
        chain,
        transport: http(),
      })
      // Use viem's createPublicClient for publicClient
      const {createPublicClient} = await import('viem')
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

      // Parse deposit
      let depositAmount: bigint | undefined
      if (flags.deposit) {
        const deposit = Number.parseFloat(flags.deposit)
        if (Number.isNaN(deposit) || deposit < 0) {
          this.log(chalk.red('❌ Invalid deposit amount'))
          return
        }

        depositAmount = BigInt(Math.floor(deposit * 10 ** 18))
      }

      // Prompt for atom type
      const atomType = await select({
        choices: [
          {
            description: 'Create an atom from an Ethereum address',
            name: 'Ethereum Account',
            value: 'ethereum-account',
          },
          {
            description: 'Create an atom from an IPFS URI',
            name: 'IPFS URI',
            value: 'ipfs-uri',
          },
        ],
        message: 'Select atom type to create:',
      })

      if (atomType === 'ethereum-account') {
        this.log(chalk.green('✅ Selected: Ethereum Account'))
        const address = await input({
          message: 'Enter Ethereum address:',

          validate(value) {
            const result = AddressSchema.safeParse(value)
            return result.success ? true : result.error.issues[0].message
          },
        })

        this.log(chalk.blue(`📝 Creating atom for address: ${address}`))
        this.log(chalk.yellow('⚠️  This will create an atom on the blockchain'))

        const result = await createAtomFromEthereumAccount(atomConfig, address as Address, depositAmount)
        this.log(chalk.green('✅ Atom created successfully!'))
        this.log(chalk.cyan(`Transaction Hash: ${result.transactionHash}`))
        this.log(chalk.cyan(`URI: ${result.uri}`))
        if (result.state) {
          this.log(chalk.cyan(`Term ID: ${result.state.termId}`))
        }
      } else if (atomType === 'ipfs-uri') {
        this.log(chalk.green('✅ Selected: IPFS URI'))
        const ipfsUri = await input({
          message: 'Enter IPFS URI (e.g., ipfs://Qm...):',
          validate(value) {
            const result = IpfsUriSchema.safeParse(value)
            return result.success ? true : result.error.issues[0].message
          },
        })

        this.log(chalk.blue(`📝 Creating atom for IPFS URI: ${ipfsUri}`))
        this.log(chalk.yellow('⚠️  This will create an atom on the blockchain'))

        const result = await createAtomFromIpfsUri(atomConfig, ipfsUri as `ipfs://${string}`, depositAmount)
        this.log(chalk.green('✅ Atom created successfully!'))
        this.log(chalk.cyan(`Transaction Hash: ${result.transactionHash}`))
        this.log(chalk.cyan(`URI: ${result.uri}`))
        if (result.state) {
          this.log(chalk.cyan(`Vault ID: ${result.state.termId}`))
        }
      }
    } catch (error) {
      this.log(chalk.red(`❌ Error: ${error instanceof Error ? error.message : String(error)}`))
    }
  }
}
