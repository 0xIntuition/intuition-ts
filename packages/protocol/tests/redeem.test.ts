import { isHex, keccak256, parseEther, toHex, type Address } from 'viem'
import { beforeAll, describe, expect, it } from 'vitest'

import {
  multiVaultCreateAtoms,
  multiVaultDeposit,
  multiVaultPreviewRedeem,
  multiVaultRedeem,
  multiVaultRedeemBatch,
  multiVaultRedeemBatchEncode,
  multiVaultRedeemEncode,
} from '../src'
import { calculateAtomId } from './helpers/calculate'
import { deployAndInit } from './helpers/deploy-multivault'
import { publicClient, walletClient } from './helpers/utils'

let address: Address
const curveId = BigInt(1)

beforeAll(async () => {
  address = await deployAndInit()
}, 30000)

describe('Redeems', () => {
  describe('multiVaultPreviewRedeem', () => {
    it('should preview redemption for given shares', async () => {
      const sharesToRedeem = parseEther('10')
      const value = parseEther('100')
      const atomData = toHex(`multiVaultRedeem test atoms ${Math.random()}`)
      const atomId = calculateAtomId(atomData)

      await multiVaultCreateAtoms(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [[atomData], [value]],
          value: parseEther('100'),
        },
      )

      // Make a multiVaultDeposit to have shares to multiVaultRedeem later
      const multiVaultDepositAmount = parseEther('200')
      await multiVaultDeposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId, curveId, 0n],
          value: multiVaultDepositAmount,
        },
      )

      const [assetsAfterFees, sharesUsed] = await multiVaultPreviewRedeem(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [atomId, curveId, sharesToRedeem],
        },
      )
      expect(sharesUsed).toBeDefined()
      expect(assetsAfterFees).toBeDefined()
    })

    it('should preview with different share amounts', async () => {
      const smallShares = parseEther('1')
      const largeShares = parseEther('50')
      const value = parseEther('100')
      const atomData = toHex(`multiVaultRedeem test atom ${Math.random()}`)
      const atomId = calculateAtomId(atomData)

      await multiVaultCreateAtoms(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [[atomData], [value]],
          value: parseEther('100'),
        },
      )

      const multiVaultDepositAmount = parseEther('200')
      await multiVaultDeposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId, curveId, 0n],
          value: multiVaultDepositAmount,
        },
      )

      const [smallAssets] = await multiVaultPreviewRedeem(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [atomId, curveId, smallShares],
        },
      )

      const [largeAssets] = await multiVaultPreviewRedeem(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [atomId, curveId, largeShares],
        },
      )

      expect(largeAssets).toBeGreaterThan(smallAssets)
    })

    it('should preview with zero shares', async () => {
      const zeroShares = 0n
      const value = parseEther('100')
      const atomData = toHex(`multiVaultRedeem test atom ${Math.random()}`)
      const atomId = calculateAtomId(atomData)

      await multiVaultCreateAtoms(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [[atomData], [value]],
          value: parseEther('100'),
        },
      )

      const [assets, assetsAfterFees] = await multiVaultPreviewRedeem(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [atomId, curveId, zeroShares],
        },
      )

      expect(assets).toBe(0n)
      expect(assetsAfterFees).toBe(0n)
    })
  })

  describe('multiVaultRedeem', () => {
    it('should multiVaultRedeem shares from vault successfully', async () => {
      const sharesToRedeem = parseEther('5')
      const minAssets = 0n
      const value = parseEther('100')
      const atomData = toHex(`multiVaultRedeem test atom ${Math.random()}`)
      const atomId = calculateAtomId(atomData)

      await multiVaultCreateAtoms(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [[atomData], [value]],
          value: parseEther('100'),
        },
      )

      const multiVaultDepositAmount = parseEther('200')
      await multiVaultDeposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId, curveId, 0n],
          value: multiVaultDepositAmount,
        },
      )

      const txHash = await multiVaultRedeem(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [
            walletClient.account.address,
            atomId,
            curveId,
            sharesToRedeem,
            minAssets,
          ],
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })

    it('should multiVaultRedeem with minimum assets requirement', async () => {
      const sharesToRedeem = parseEther('10')
      const minAssets = parseEther('1')
      const value = parseEther('100')
      const atomData = toHex(`multiVaultRedeem test atom ${Math.random()}`)
      const atomId = calculateAtomId(atomData)

      await multiVaultCreateAtoms(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [[atomData], [value]],
          value: parseEther('100'),
        },
      )

      const multiVaultDepositAmount = parseEther('200')
      await multiVaultDeposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId, curveId, 0n],
          value: multiVaultDepositAmount,
        },
      )

      const txHash = await multiVaultRedeem(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [
            walletClient.account.address,
            atomId,
            curveId,
            sharesToRedeem,
            minAssets,
          ],
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })
  })

  describe('multiVaultRedeemEncode', () => {
    it('should encode multiVaultRedeem with all parameters', () => {
      const receiverAddress = walletClient.account.address
      const sharesToRedeem = parseEther('10')
      const minAssets = parseEther('1')
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = multiVaultRedeemEncode(
        receiverAddress,
        atomId,
        curveId,
        sharesToRedeem,
        minAssets,
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
      expect(encoded.startsWith('0x')).toBe(true)
    })

    it('should encode with different receiver address', () => {
      const receiverAddress =
        '0x0000000000000000000000000000000000000001' as Address
      const sharesToRedeem = parseEther('5')
      const minAssets = 0n
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = multiVaultRedeemEncode(
        receiverAddress,
        atomId,
        curveId,
        sharesToRedeem,
        minAssets,
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })

    it('should encode with zero minAssets', () => {
      const receiverAddress = walletClient.account.address
      const sharesToRedeem = parseEther('10')
      const minAssets = 0n
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = multiVaultRedeemEncode(
        receiverAddress,
        atomId,
        curveId,
        sharesToRedeem,
        minAssets,
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })
  })

  describe('multiVaultRedeemBatch', () => {
    it('should multiVaultRedeem from multiple vaults in single transaction', async () => {
      // Create additional atoms and multiVaultDeposit into them
      const value1 = parseEther('100')
      const value2 = parseEther('100')
      const atomData1 = toHex(`batch multiVaultRedeem atom 1 ${Math.random()}`)
      const atomData2 = toHex(`batch multiVaultRedeem atom 2 ${Math.random()}`)

      await multiVaultCreateAtoms(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [
            [atomData1, atomData2],
            [value1, value2],
          ],
          value: parseEther('200'),
        },
      )

      const atomId1 = calculateAtomId(atomData1)
      const atomId2 = calculateAtomId(atomData2)

      // Deposit into both atoms
      const multiVaultDepositAmount1 = parseEther('100')
      const multiVaultDepositAmount2 = parseEther('150')

      await multiVaultDeposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId1, curveId, 0n],
          value: multiVaultDepositAmount1,
        },
      )

      await multiVaultDeposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId2, curveId, 0n],
          value: multiVaultDepositAmount2,
        },
      )

      // Now multiVaultRedeem from both
      const sharesToRedeem1 = parseEther('10')
      const sharesToRedeem2 = parseEther('15')

      const txHash = await multiVaultRedeemBatch(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [
            walletClient.account.address,
            [atomId1, atomId2],
            [curveId, curveId],
            [sharesToRedeem1, sharesToRedeem2],
            [0n, 0n],
          ],
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })

    it('should multiVaultRedeem from single vault using batch function', async () => {
      const sharesToRedeem = parseEther('5')
      const value = parseEther('100')
      const atomData = toHex(`batch multiVaultRedeem atom ${Math.random()}`)
      const atomId = calculateAtomId(atomData)

      await multiVaultCreateAtoms(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [[atomData], [value]],
          value: parseEther('100'),
        },
      )

      const multiVaultDepositAmount = parseEther('100')
      await multiVaultDeposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId, curveId, 0n],
          value: multiVaultDepositAmount,
        },
      )

      const txHash = await multiVaultRedeemBatch(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [
            walletClient.account.address,
            [atomId],
            [curveId],
            [sharesToRedeem],
            [0n],
          ],
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })
  })

  describe('multiVaultRedeemBatchEncode', () => {
    it('should encode batch multiVaultRedeem with multiple vaults', () => {
      const receiverAddress = walletClient.account.address
      const atomId1 = calculateAtomId(toHex(`encode atom 1 ${Math.random()}`))
      const atomId2 = calculateAtomId(toHex(`encode atom 2 ${Math.random()}`))
      const sharesToRedeem1 = parseEther('10')
      const sharesToRedeem2 = parseEther('15')

      const encoded = multiVaultRedeemBatchEncode(
        receiverAddress,
        [atomId1, atomId2],
        [curveId, curveId],
        [sharesToRedeem1, sharesToRedeem2],
        [0n, 0n],
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
      expect(encoded.length).toBeGreaterThan(10)
    })

    it('should encode batch multiVaultRedeem with single vault', () => {
      const receiverAddress = walletClient.account.address
      const sharesToRedeem = parseEther('10')
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = multiVaultRedeemBatchEncode(
        receiverAddress,
        [atomId],
        [curveId],
        [sharesToRedeem],
        [0n],
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })

    it('should encode empty batch multiVaultRedeem', () => {
      const receiverAddress = walletClient.account.address

      const encoded = multiVaultRedeemBatchEncode(
        receiverAddress,
        [],
        [],
        [],
        [],
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })
  })
})
