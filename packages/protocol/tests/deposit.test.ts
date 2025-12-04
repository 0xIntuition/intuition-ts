import { isHex, keccak256, parseEther, toHex, type Address } from 'viem'
import { beforeAll, describe, expect, it } from 'vitest'

import {
  createAtoms,
  deposit,
  depositBatch,
  depositBatchEncode,
  depositEncode,
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
  describe('deposit', () => {
    it('should deposit to atom vault successfully', async () => {
      const depositAmount = parseEther('50')
      const minShares = 0n
      const value = parseEther('100')
      const atomData = toHex(`deposit test atom ${Math.random()}`)
      const atomId = calculateAtomId(atomData)

      await createAtoms(
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

      const txHash = await deposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId, curveId, minShares],
          value: depositAmount,
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })

    it('should deposit with minimum shares requirement', async () => {
      const depositAmount = parseEther('100')
      const minShares = parseEther('1')
      const value = parseEther('100')
      const atomData = toHex(`deposit test atom ${Math.random()}`)
      const atomId = calculateAtomId(atomData)

      await createAtoms(
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

      const txHash = await deposit(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [walletClient.account.address, atomId, curveId, minShares],
          value: depositAmount,
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })
  })

  describe('depositEncode', () => {
    it('should encode deposit with all parameters', () => {
      const receiverAddress = walletClient.account.address
      const minShares = parseEther('1')
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = depositEncode(receiverAddress, atomId, curveId, minShares)

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
      expect(encoded.startsWith('0x')).toBe(true)
    })

    it('should encode with different receiver address', () => {
      const receiverAddress =
        '0x0000000000000000000000000000000000000001' as Address
      const minShares = 0n
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = depositEncode(receiverAddress, atomId, curveId, minShares)

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })

    it('should encode with zero minShares', () => {
      const receiverAddress = walletClient.account.address
      const minShares = 0n
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = depositEncode(receiverAddress, atomId, curveId, minShares)

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })
  })

  describe('depositBatch', () => {
    it('should deposit to multiple vaults in single transaction', async () => {
      // Create additional atoms for batch deposit
      const value1 = parseEther('100')
      const value2 = parseEther('100')
      const atomData1 = toHex(`batch deposit atom 1 ${Math.random()}`)
      const atomData2 = toHex(`batch deposit atom 2 ${Math.random()}`)

      await createAtoms(
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

      const depositAmount1 = parseEther('50')
      const depositAmount2 = parseEther('75')
      const totalValue = depositAmount1 + depositAmount2

      const txHash = await depositBatch(
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
            [depositAmount1, depositAmount2],
            [0n, 0n],
          ],
          value: totalValue,
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })

    it('should deposit to single vault using batch function', async () => {
      const depositAmount = parseEther('50')
      const value = parseEther('100')
      const atomData = toHex(`batch deposit atom ${Math.random()}`)
      const atomId = calculateAtomId(atomData)

      await createAtoms(
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

      const txHash = await depositBatch(
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
            [depositAmount],
            [0n],
          ],
          value: depositAmount,
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })
  })

  describe('depositBatchEncode', () => {
    it('should encode batch deposit with multiple vaults', () => {
      const receiverAddress = walletClient.account.address
      const atomId1 = calculateAtomId(toHex(`encode atom 1 ${Math.random()}`))
      const atomId2 = calculateAtomId(toHex(`encode atom 2 ${Math.random()}`))
      const depositAmount1 = parseEther('50')
      const depositAmount2 = parseEther('75')

      const encoded = depositBatchEncode(
        receiverAddress,
        [atomId1, atomId2],
        [curveId, curveId],
        [depositAmount1, depositAmount2],
        [0n, 0n],
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
      expect(encoded.length).toBeGreaterThan(10)
    })

    it('should encode batch deposit with single vault', () => {
      const receiverAddress = walletClient.account.address
      const depositAmount = parseEther('50')
      const atomId = calculateAtomId(toHex(`atom ${Math.random()}`))

      const encoded = depositBatchEncode(
        receiverAddress,
        [atomId],
        [curveId],
        [depositAmount],
        [0n],
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })

    it('should encode empty batch deposit', () => {
      const receiverAddress = walletClient.account.address

      const encoded = depositBatchEncode(receiverAddress, [], [], [], [])

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })
  })
})
