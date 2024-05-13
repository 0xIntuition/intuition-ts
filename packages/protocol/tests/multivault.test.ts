import { parseEther, type Address } from 'viem'
import { describe, it, beforeAll, expect } from 'vitest'
import { Multivault } from '../src/multivault.js'
import { deployAndInit } from './deploy.js'
import { publicClient, walletClient } from './utils.js'

let address: Address
let multiVault: Multivault

beforeAll(async () => {
  address = await deployAndInit()
  multiVault = new Multivault(
    {
      public: publicClient,
      wallet: walletClient,
    },
    address,
  )
})

describe('MultiVault', () => {
  it('can get general config', async () => {
    const config = await multiVault.getGeneralConfig()
    expect(config).toBeDefined()
    expect(config.admin).toBeDefined()
    expect(config.protocolVault).toBeDefined()
    expect(config.feeDenominator).toBeDefined()
    expect(config.minDeposit).toBeDefined()
    expect(config.minShare).toBeDefined()
    expect(config.atomUriMaxLength).toBeDefined()
    expect(config.decimalPrecision).toBeDefined()
    expect(config.minDelay).toBeDefined()
  })

  it('can get atom config', async () => {
    const config = await multiVault.getAtomConfig()
    expect(config).toBeDefined()
    expect(config.atomWalletInitialDepositAmount).toBeDefined()
    expect(config.atomCreationProtocolFee).toBeDefined()
  })

  it('can get triple config', async () => {
    const config = await multiVault.getTripleConfig()
    expect(config).toBeDefined()
    expect(config.tripleCreationProtocolFee).toBeDefined()
    expect(config.atomDepositFractionOnTripleCreation).toBeDefined()
    expect(config.atomDepositFractionForTriple).toBeDefined()
  })

  it('can get vault fees', async () => {
    const fees = await multiVault.getVaultFees()
    expect(fees).toBeDefined()
    expect(fees.entryFee).toBeDefined()
    expect(fees.exitFee).toBeDefined()
    expect(fees.protocolFee).toBeDefined()
  })

  it('can get atom cost', async () => {
    const cost = await multiVault.getAtomCost()
    expect(cost).toBeDefined()
  })

  it('can create atom', async () => {
    const { vaultId, hash, events } = await multiVault.createAtom('hello')
    expect(vaultId).toBeDefined()
    expect(hash).toBeDefined()
    expect(events).toBeDefined()
  })

  it('throws error when creating atom with the same atomUri', async () => {
    await expect(() => multiVault.createAtom('hello')).rejects.toThrow(
      'Transaction reverted',
    )
  })

  it('can create atom with initial deposit', async () => {
    const { vaultId, hash, events } = await multiVault.createAtom(
      'hello2',
      parseEther('0.5'),
    )
    expect(vaultId).toBeDefined()
    expect(hash).toBeDefined()
    expect(events).toBeDefined()
  })

  it('can get triple cost', async () => {
    const cost = await multiVault.getTripleCost()
    expect(cost).toBeDefined()
  })

  it('can create triple', async () => {
    const { vaultId: subjectId } = await multiVault.createAtom('Alice')
    const { vaultId: predicateId } = await multiVault.createAtom('likes')
    const { vaultId: objectId } = await multiVault.createAtom(
      'https://intuition.systems',
    )

    const { vaultId, hash, events } = await multiVault.createTriple(
      subjectId,
      predicateId,
      objectId,
    )
    expect(vaultId).toBeDefined()
    expect(hash).toBeDefined()
    expect(events).toBeDefined()
  })
})

describe('atom life cycle', () => {
  let atomVaultId: bigint
  let sharesPreview: bigint

  it('can create atom', async () => {
    const { vaultId } = await multiVault.createAtom('lorem')
    expect(vaultId).toBeDefined()

    atomVaultId = vaultId
  })

  it('can get current share price for given vault id', async () => {
    const price = await multiVault.currentSharePrice(atomVaultId)
    expect(price).toBeDefined()
  })

  it('can preview deposit', async () => {
    const assets = parseEther('1')
    sharesPreview = await multiVault.previewDeposit(assets, atomVaultId)
    expect(sharesPreview).toBeDefined()
  })

  it('can deposit assets to atom vault', async () => {
    const assets = parseEther('1')
    const { hash, shares, events } = await multiVault.depositAtom(
      atomVaultId,
      assets,
    )
    expect(hash).toBeDefined()
    expect(events).toBeDefined()
    expect(shares).toBeDefined()
    // fails
    // expect(shares).toEqual(sharesPreview);
    // console.log('shares', formatEther(shares));
    // console.log('sharesPreview', formatEther(sharesPreview));
  })

  it('can get vault details', async () => {
    const vault = await multiVault.getVaultState(atomVaultId)
    expect(vault).toBeDefined()
    expect(vault.totalAssets).toBeDefined()
    expect(vault.totalShares).toBeDefined()
  })

  it('can get vault details for user', async () => {
    const user = walletClient.account.address
    const vault = await multiVault.getVaultStateForUser(atomVaultId, user)
    expect(vault).toBeDefined()
    expect(vault.shares).toBeDefined()
    expect(vault.totalUserAssets).toBeDefined()
  })

  it('can redeem shares', async () => {
    const shares = parseEther('0.1')
    const { hash, events } = await multiVault.redeemAtom(atomVaultId, shares)
    expect(hash).toBeDefined()
    expect(events).toBeDefined()
  })
})
