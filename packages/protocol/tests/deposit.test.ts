import { isHex, parseEther, toHex, type Address } from 'viem'
import { beforeAll, describe, expect, it } from 'vitest'

import {
  multiVaultCreateAtoms,
  multiVaultDeposit,
  multiVaultDepositBatch,
  multiVaultDepositBatchEncode,
  multiVaultDepositEncode,
} from '../src'
import { calculateAtomId } from './helpers/calculate'
import { deployAndInit } from './helpers/deploy-multivault'
import { publicClient, walletClient } from './helpers/utils'

let address: Address
const curveId = BigInt(1)

beforeAll(async () => {
  address = await deployAndInit()
}, 30000)

describe('Deposits', () => {
  describe('multiVaultDeposit', () => {
    it('should multiVaultDeposit to atom vault successfully', async () => {
      const multiVaultDepositAmount = parseEther('50')
      const minShares = 0n
      const value = parseEther('100')
      const atomData = toHex(`multiVaultDeposit test atom ${Math.random()}`)
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

      const txHash = await multiVaultDeposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId, curveId, minShares],
          value: multiVaultDepositAmount,
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })

    it('should multiVaultDeposit with minimum shares requirement', async () => {
      const multiVaultDepositAmount = parseEther('100')
      const minShares = parseEther('1')
      const value = parseEther('100')
      const atomData = toHex(`multiVaultDeposit test atom ${Math.random()}`)
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

      const txHash = await multiVaultDeposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId, curveId, minShares],
          value: multiVaultDepositAmount,
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })
  })

  describe('multiVaultDepositEncode', () => {
    it('should encode multiVaultDeposit with all parameters', () => {
      const receiverAddress = walletClient.account.address
      const minShares = parseEther('1')
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = multiVaultDepositEncode(
        receiverAddress,
        atomId,
        curveId,
        minShares,
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
      expect(encoded.startsWith('0x')).toBe(true)
    })

    it('should encode with different receiver address', () => {
      const receiverAddress =
        '0x0000000000000000000000000000000000000001' as Address
      const minShares = 0n
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = multiVaultDepositEncode(
        receiverAddress,
        atomId,
        curveId,
        minShares,
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })

    it('should encode with zero minShares', () => {
      const receiverAddress = walletClient.account.address
      const minShares = 0n
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = multiVaultDepositEncode(
        receiverAddress,
        atomId,
        curveId,
        minShares,
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })
  })

  describe('multiVaultDepositBatch', () => {
    it('should multiVaultDeposit to multiple vaults in single transaction', async () => {
      // Create additional atoms for batch multiVaultDeposit
      const value1 = parseEther('100')
      const value2 = parseEther('100')
      const atomData1 = toHex(`batch multiVaultDeposit atom 1 ${Math.random()}`)
      const atomData2 = toHex(`batch multiVaultDeposit atom 2 ${Math.random()}`)

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

      const multiVaultDepositAmount1 = parseEther('50')
      const multiVaultDepositAmount2 = parseEther('75')
      const totalValue = multiVaultDepositAmount1 + multiVaultDepositAmount2

      const txHash = await multiVaultDepositBatch(
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
            [multiVaultDepositAmount1, multiVaultDepositAmount2],
            [0n, 0n],
          ],
          value: totalValue,
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })

    it('should multiVaultDeposit to single vault using batch function', async () => {
      const multiVaultDepositAmount = parseEther('50')
      const value = parseEther('100')
      const atomData = toHex(`batch multiVaultDeposit atom ${Math.random()}`)
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

      const txHash = await multiVaultDepositBatch(
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
            [multiVaultDepositAmount],
            [0n],
          ],
          value: multiVaultDepositAmount,
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })
  })

  describe('multiVaultDepositBatchEncode', () => {
    it('should encode batch multiVaultDeposit with multiple vaults', () => {
      const receiverAddress = walletClient.account.address
      const atomId1 = calculateAtomId(toHex(`encode atom 1 ${Math.random()}`))
      const atomId2 = calculateAtomId(toHex(`encode atom 2 ${Math.random()}`))
      const multiVaultDepositAmount1 = parseEther('50')
      const multiVaultDepositAmount2 = parseEther('75')

      const encoded = multiVaultDepositBatchEncode(
        receiverAddress,
        [atomId1, atomId2],
        [curveId, curveId],
        [multiVaultDepositAmount1, multiVaultDepositAmount2],
        [0n, 0n],
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
      expect(encoded.length).toBeGreaterThan(10)
    })

    it('should encode batch multiVaultDeposit with single vault', () => {
      const receiverAddress = walletClient.account.address
      const multiVaultDepositAmount = parseEther('50')
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = multiVaultDepositBatchEncode(
        receiverAddress,
        [atomId],
        [curveId],
        [multiVaultDepositAmount],
        [0n],
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })

    it('should encode empty batch multiVaultDeposit', () => {
      const receiverAddress = walletClient.account.address

      const encoded = multiVaultDepositBatchEncode(
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
