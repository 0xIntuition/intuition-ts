import { isHex, keccak256, parseEther, toHex, type Address } from 'viem'
import { beforeAll, describe, expect, it } from 'vitest'

import {
  multiVaultCreateAtoms,
  multiVaultCreateTriples,
  multiVaultCreateTriplesEncode,
  multiVaultGetTriple,
  multiVaultGetTripleCost,
} from '../src'
import { calculateAtomId, calculateTripleId } from './helpers/calculate'
import { deployAndInit } from './helpers/deploy-multivault'
import { publicClient, walletClient } from './helpers/utils'

let address: Address

beforeAll(async () => {
  address = await deployAndInit()
}, 30000)

describe('Triples', () => {
  describe('multiVaultCreateTriples', () => {
    it('should create a new triple with valid atoms', async () => {
      const value = parseEther('100')

      const subjectData = toHex(`subject atom for triple ${Math.random()}`)
      const predicateData = toHex(`predicate atom for triple ${Math.random()}`)
      const objectData = toHex(`object atom for triple ${Math.random()}`)

      const subjectAtomId = calculateAtomId(subjectData)
      const predicateAtomId = calculateAtomId(predicateData)
      const objectAtomId = calculateAtomId(objectData)

      const atomTxHash = await multiVaultCreateAtoms(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [
            [subjectData, predicateData, objectData],
            [value, value, value],
          ],
          value: parseEther('300'),
        },
      )
      await publicClient.waitForTransactionReceipt({ hash: atomTxHash })

      const txHash = await multiVaultCreateTriples(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [[subjectAtomId], [predicateAtomId], [objectAtomId], [value]],
          value: parseEther('100'),
        },
      )
      await publicClient.waitForTransactionReceipt({ hash: txHash })

      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })

    it('should create multiple triples in single transaction', async () => {
      const value1 = parseEther('100')
      const value2 = parseEther('150')

      const subjectData1 = toHex(`subject atom for triple12 ${Math.random()}`)
      const predicateData1 = toHex(
        `predicate atom for triple12 ${Math.random()}`,
      )
      const objectData1 = toHex(`object atom for triple12 ${Math.random()}`)
      const subjectAtomId1 = calculateAtomId(subjectData1)
      const predicateAtomId1 = calculateAtomId(predicateData1)
      const objectAtomId1 = calculateAtomId(objectData1)

      const subjectData2 = toHex(`subject atom for triple22 ${Math.random()}`)
      const predicateData2 = toHex(
        `predicate atom for triple22 ${Math.random()}`,
      )
      const objectData2 = toHex(`object atom for triple22 ${Math.random()}`)
      const subjectAtomId2 = calculateAtomId(subjectData2)
      const predicateAtomId2 = calculateAtomId(predicateData2)
      const objectAtomId2 = calculateAtomId(objectData2)

      const atomTxHash = await multiVaultCreateAtoms(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [
            [
              subjectData1,
              predicateData1,
              objectData1,
              subjectData2,
              predicateData2,
              objectData2,
            ],
            [value1, value1, value1, value2, value2, value2],
          ],
          value: parseEther('750'),
        },
      )
      await publicClient.waitForTransactionReceipt({ hash: atomTxHash })

      const txHash = await multiVaultCreateTriples(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [
            [subjectAtomId1, subjectAtomId2],
            [predicateAtomId1, predicateAtomId2],
            [objectAtomId1, objectAtomId2],
            [value1, value2],
          ],
          value: parseEther('250'),
        },
      )
      await publicClient.waitForTransactionReceipt({ hash: txHash })

      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })

    it('should throw error on mismatched subject/predicate array lengths', async () => {
      const value = parseEther('100')
      const subjectAtomId = keccak256(toHex(`subject ${Math.random()}`))
      const predicateAtomId = keccak256(toHex(`predicate ${Math.random()}`))
      const objectAtomId = keccak256(toHex(`object ${Math.random()}`))

      await expect(
        multiVaultCreateTriples(
          {
            walletClient,
            publicClient,
            address: address,
          },
          {
            args: [
              [subjectAtomId, subjectAtomId], // 2 subjects
              [predicateAtomId], // 1 predicate - mismatch!
              [objectAtomId],
              [value],
            ],
            value: parseEther('100'),
          },
        ),
      ).rejects.toThrow()
    })

    it('should throw error on mismatched object array length', async () => {
      const value = parseEther('100')
      const subjectAtomId = keccak256(toHex(`subject ${Math.random()}`))
      const predicateAtomId = keccak256(toHex(`predicate ${Math.random()}`))
      const objectAtomId = keccak256(toHex(`object ${Math.random()}`))

      await expect(
        multiVaultCreateTriples(
          {
            walletClient,
            publicClient,
            address: address,
          },
          {
            args: [
              [subjectAtomId],
              [predicateAtomId],
              [objectAtomId, objectAtomId], // 2 objects - mismatch!
              [value],
            ],
            value: parseEther('100'),
          },
        ),
      ).rejects.toThrow()
    })

    it('should throw error on mismatched assets array length', async () => {
      const value = parseEther('100')
      const subjectAtomId = keccak256(toHex(`subject ${Math.random()}`))
      const predicateAtomId = keccak256(toHex(`predicate ${Math.random()}`))
      const objectAtomId = keccak256(toHex(`object ${Math.random()}`))

      await expect(
        multiVaultCreateTriples(
          {
            walletClient,
            publicClient,
            address: address,
          },
          {
            args: [
              [subjectAtomId],
              [predicateAtomId],
              [objectAtomId],
              [value, value], // 2 values - mismatch!
            ],
            value: parseEther('200'),
          },
        ),
      ).rejects.toThrow()
    })
  })

  describe('multiVaultCreateTriplesEncode', () => {
    it('should encode single triple creation', () => {
      const value = parseEther('100')
      const subjectAtomId = keccak256(toHex(`subject ${Math.random()}`))
      const predicateAtomId = keccak256(toHex(`predicate ${Math.random()}`))
      const objectAtomId = keccak256(toHex(`object ${Math.random()}`))

      const encoded = multiVaultCreateTriplesEncode(
        [subjectAtomId],
        [predicateAtomId],
        [objectAtomId],
        [value],
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
      expect(encoded.startsWith('0x')).toBe(true)
    })

    it('should encode multiple triples creation', () => {
      const value1 = parseEther('100')
      const value2 = parseEther('200')
      const value3 = parseEther('300')
      const subjectAtomId = keccak256(toHex(`subject ${Math.random()}`))
      const predicateAtomId = keccak256(toHex(`predicate ${Math.random()}`))
      const objectAtomId = keccak256(toHex(`object ${Math.random()}`))

      const encoded = multiVaultCreateTriplesEncode(
        [subjectAtomId, subjectAtomId, subjectAtomId],
        [predicateAtomId, predicateAtomId, predicateAtomId],
        [objectAtomId, objectAtomId, objectAtomId],
        [value1, value2, value3],
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
      expect(encoded.length).toBeGreaterThan(10)
    })

    it('should encode empty arrays', () => {
      const encoded = multiVaultCreateTriplesEncode([], [], [], [])

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })
  })

  describe('multiVaultGetTriple', () => {
    it('should retrieve created triple by ID', async () => {
      // First create a triple
      const value = parseEther('100')
      const subjectData = toHex(`subject atom for triple ${Math.random()}`)
      const predicateData = toHex(`predicate atom for triple ${Math.random()}`)
      const objectData = toHex(`object atom for triple ${Math.random()}`)

      const subjectAtomId = calculateAtomId(subjectData)
      const predicateAtomId = calculateAtomId(predicateData)
      const objectAtomId = calculateAtomId(objectData)

      const atomTxHash = await multiVaultCreateAtoms(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [
            [subjectData, predicateData, objectData],
            [value, value, value],
          ],
          value: parseEther('300'),
        },
      )
      await publicClient.waitForTransactionReceipt({ hash: atomTxHash })

      const txHash = await multiVaultCreateTriples(
        {
          walletClient,
          publicClient,
          address: address,
        },
        {
          args: [[subjectAtomId], [predicateAtomId], [objectAtomId], [value]],
          value: parseEther('100'),
        },
      )
      await publicClient.waitForTransactionReceipt({ hash: txHash })

      // Calculate triple ID
      const tripleId = calculateTripleId(
        subjectAtomId,
        predicateAtomId,
        objectAtomId,
      )

      // Now retrieve it
      const triple = await multiVaultGetTriple(
        {
          publicClient,
          address: address,
        },
        {
          args: [tripleId],
        },
      )

      expect(triple).toBeDefined()
      expect(Array.isArray(triple)).toBe(true)
    })

    it('should handle non-existent triple ID', async () => {
      const nonExistentId = keccak256(toHex('non existent triple xyz123'))

      await expect(
        multiVaultGetTriple(
          {
            publicClient,
            address: address,
          },
          {
            args: [nonExistentId],
          },
        ),
      ).rejects.toThrow()
    })
  })

  describe('multiVaultGetTripleCost', () => {
    it('should retrieve current triple creation cost', async () => {
      const cost = await multiVaultGetTripleCost({
        publicClient,
        address: address,
      })

      expect(cost).toBeDefined()
      expect(typeof cost).toBe('bigint')
      expect(cost).toBeGreaterThan(0n)
    })

    it('should return consistent cost across multiple calls', async () => {
      const cost1 = await multiVaultGetTripleCost({
        publicClient,
        address: address,
      })

      const cost2 = await multiVaultGetTripleCost({
        publicClient,
        address: address,
      })

      expect(cost1).toBe(cost2)
    })
  })
})
