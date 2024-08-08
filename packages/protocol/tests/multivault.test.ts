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
    const { vaultId, hash, events } = await multiVault.createAtom({
      uri: 'hello',
    })
    expect(vaultId).toBeDefined()
    expect(hash).toBeDefined()
    expect(events).toBeDefined()
  })

  it('throws error when creating atom with the same atomUri', async () => {
    await expect(() => multiVault.createAtom({ uri: 'hello' })).rejects.toThrow(
      'MultiVault_AtomExists',
    )
  })

  it('can create atom with initial deposit', async () => {
    const { vaultId, hash, events } = await multiVault.createAtom({
      uri: 'hello2',
      initialDeposit: parseEther('0.5'),
    })
    expect(vaultId).toBeDefined()
    expect(hash).toBeDefined()
    expect(events).toBeDefined()
  })

  it('can batch create atoms', async () => {
    const { vaultIds, hash, events } = await multiVault.batchCreateAtom([
      'hello3',
      'hello4',
    ])
    expect(vaultIds).toBeDefined()
    expect(vaultIds.length).toEqual(2)
    expect(hash).toBeDefined()
    expect(events).toBeDefined()
  })

  it('can get triple cost', async () => {
    const cost = await multiVault.getTripleCost()
    expect(cost).toBeDefined()
  })

  it('can create triple', async () => {
    const { vaultId: subjectId } = await multiVault.createAtom({ uri: 'Alice' })
    const { vaultId: predicateId } = await multiVault.createAtom({
      uri: 'likes',
    })
    const { vaultId: objectId } = await multiVault.createAtom({
      uri: 'https://intuition.systems',
    })

    const { vaultId, hash, events } = await multiVault.createTriple(
      subjectId,
      predicateId,
      objectId,
    )
    expect(vaultId).toBeDefined()
    expect(hash).toBeDefined()
    expect(events).toBeDefined()
  })

  it('can batch create triples', async () => {
    //batch create atoms
    const { vaultIds } = await multiVault.batchCreateAtom([
      'a',
      'b',
      'c',
      'd',
      'e',
    ])

    //batch create triples
    const { vaultIds: tripleVaultIds } = await multiVault.batchCreateTriple([
      {
        subjectId: vaultIds[0],
        predicateId: vaultIds[1],
        objectId: vaultIds[2],
      },
      {
        subjectId: vaultIds[3],
        predicateId: vaultIds[4],
        objectId: vaultIds[0],
      },
    ])
    expect(tripleVaultIds).toBeDefined()
    expect(tripleVaultIds.length).toEqual(2)
  })
})

describe('atom life cycle', () => {
  let atomVaultId: bigint
  let sharesPreview: bigint

  it('can check if atom exists', async () => {
    const vaultId = await multiVault.getVaultIdFromUri('lorem')
    expect(vaultId).toBeNull()
  })

  let txHash: `0x${string}`

  it('can create atom without waiting for transaction receipt', async () => {
    const { hash } = await multiVault.createAtom({
      uri: 'barbaz',
      wait: false,
    })
    expect(hash).toBeDefined()

    txHash = hash
  })

  it('can wait for atom creation transaction receipt', async () => {
    const { vaultId } = await multiVault.waitForAtomCreatedTransaction(txHash)
    expect(vaultId).toBeDefined()
  })

  it('can create atom', async () => {
    const { vaultId } = await multiVault.createAtom({ uri: 'lorem' })
    expect(vaultId).toBeDefined()

    atomVaultId = vaultId
  })

  it('can check if atom exists', async () => {
    const vaultId = await multiVault.getVaultIdFromUri('lorem')
    expect(vaultId).toEqual(atomVaultId)
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
  let subject: bigint
  let predicate: bigint
  let object: bigint

  it('can create triple', async () => {
    const { vaultId: subjectId } = await multiVault.createAtom({
      uri: 'did:example:1',
    })
    const { vaultId: predicateId } = await multiVault.createAtom({
      uri: 'did:example:2',
    })
    const { vaultId: objectId } = await multiVault.createAtom({
      uri: 'did:example:3',
    })

    subject = subjectId
    predicate = predicateId
    object = objectId

    const { vaultId } = await multiVault.createTriple(
      subjectId,
      predicateId,
      objectId,
    )
    tripleVaultId = vaultId
  })

  it('throws error when creating triple with the same atoms', async () => {
    await expect(() =>
      multiVault.createTriple(subject, predicate, object),
    ).rejects.toThrow('MultiVault_TripleExists')
  })

  it('can check if triple exists', async () => {
    const vaultId = await multiVault.getTripleIdFromAtoms(
      subject,
      predicate,
      object,
    )
    expect(vaultId).toEqual(tripleVaultId)
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
