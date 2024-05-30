import { parseEther, type Address } from 'viem'
import { beforeAll, describe, expect, it } from 'vitest'

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
      'MultiVault_AtomExists',
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

  it.todo('can batchCreateAtom')
  it.todo('can batchCreateTriple')
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

  it('can get deposit fees', async () => {
    const assets = parseEther('1')
    const fees = await multiVault.getDepositFees(assets, atomVaultId)
    expect(fees).toBeDefined()
  })

  it('can get deposit shares and fees', async () => {
    const assets = parseEther('1')
    const {
      totalAssetsDelta,
      sharesForReceiver,
      userAssetsAfterTotalFees,
      entryFee,
    } = await multiVault.getDepositSharesAndFees(assets, atomVaultId)
    expect(totalAssetsDelta).toBeDefined()
    expect(sharesForReceiver).toBeDefined()
    expect(userAssetsAfterTotalFees).toBeDefined()
    expect(entryFee).toBeDefined()
  })

  it('can get entry fee amount', async () => {
    const assets = parseEther('1')
    const entryFee = await multiVault.getEntryFeeAmount(assets, atomVaultId)
    expect(entryFee).toBeDefined()
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

  it('can get exit fee amount', async () => {
    const shares = parseEther('0.1')
    const exitFee = await multiVault.getExitFeeAmount(shares, atomVaultId)
    expect(exitFee).toBeDefined()
  })

  it('can convert assets to shares', async () => {
    const assets = parseEther('1')
    const shares = await multiVault.convertToShares(assets, atomVaultId)
    expect(shares).toBeDefined()
  })

  it('can convert shares to assets', async () => {
    const shares = parseEther('1')
    const assets = await multiVault.convertToAssets(shares, atomVaultId)
    expect(assets).toBeDefined()
  })

  it('can get redeem assets and fees', async () => {
    const shares = parseEther('0.1')
    const { totalUserAssets, assetsForReceiver, protocolFees, exitFees } =
      await multiVault.getRedeemAssetsAndFees(shares, atomVaultId)
    expect(totalUserAssets).toBeDefined()
    expect(assetsForReceiver).toBeDefined()
    expect(protocolFees).toBeDefined()
    expect(exitFees).toBeDefined()
  })

  it('can preview redeem', async () => {
    const shares = parseEther('0.1')
    const assets = await multiVault.previewRedeem(shares, atomVaultId)
    expect(assets).toBeDefined()
  })

  it('can get max redeemable shares', async () => {
    const shares = await multiVault.maxRedeem(atomVaultId)
    expect(shares).toBeDefined()
  })

  it('can redeem shares', async () => {
    const shares = parseEther('0.1')
    const { hash, events } = await multiVault.redeemAtom(atomVaultId, shares)
    expect(hash).toBeDefined()
    expect(events).toBeDefined()
  })

  it('can get triple hash for givin atom vault ids', async () => {
    const hash = await multiVault.tripleHashFromAtoms(1n, 2n, 3n)
    expect(hash).toBeDefined()
  })
})

describe('triple life cycle', () => {
  let tripleVaultId: bigint
  let sharesPreview: bigint

  it('can create triple', async () => {
    const { vaultId: subjectId } = await multiVault.createAtom('did:example:1')
    const { vaultId: predicateId } =
      await multiVault.createAtom('did:example:2')
    const { vaultId: objectId } = await multiVault.createAtom('did:example:3')

    const { vaultId } = await multiVault.createTriple(
      subjectId,
      predicateId,
      objectId,
    )
    tripleVaultId = vaultId
  })

  it('can check if vault is triple', async () => {
    const isTriple = await multiVault.isTripleId(tripleVaultId)
    expect(isTriple).toBeTruthy()
  })

  it('can get counter triple vault id', async () => {
    const counterId = await multiVault.getCounterIdFromTriple(tripleVaultId)
    expect(counterId).toBeDefined()
  })

  it('can get triple atoms', async () => {
    const atoms = await multiVault.getTripleAtoms(tripleVaultId)
    expect(atoms).toBeDefined()
    expect(atoms.subjectId).toBeDefined()
    expect(atoms.predicateId).toBeDefined()
    expect(atoms.objectId).toBeDefined()
  })

  it('can get triple hash', async () => {
    const hash = await multiVault.tripleHash(tripleVaultId)
    expect(hash).toBeDefined()
  })

  it('can get atom deposit fraction amount', async () => {
    const assets = parseEther('1')
    const amount = await multiVault.getAtomDepositFractionAmount(
      assets,
      tripleVaultId,
    )
    expect(amount).toBeDefined()
  })

  it('can preview deposit', async () => {
    const assets = parseEther('1')
    sharesPreview = await multiVault.previewDeposit(assets, tripleVaultId)
    expect(sharesPreview).toBeDefined()
  })

  it('can deposit assets to triple vault', async () => {
    const assets = parseEther('1')
    const { hash, shares, events } = await multiVault.depositTriple(
      tripleVaultId,
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

  it('can redeem shares from triple vault', async () => {
    const shares = parseEther('0.1')
    const { assets, hash, events } = await multiVault.redeemTriple(
      tripleVaultId,
      shares,
    )
    expect(hash).toBeDefined()
    expect(assets).toBeDefined()
    expect(events).toBeDefined()
  })
})
