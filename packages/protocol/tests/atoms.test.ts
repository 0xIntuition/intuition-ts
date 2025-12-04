import { isHex, keccak256, parseEther, toHex, type Address } from 'viem'
import { beforeAll, describe, expect, it } from 'vitest'

import {
  createAtoms,
  createAtomsEncode,
  getAtom,
  getAtomCost,
  previewAtomCreate,
} from '../src'
import { calculateAtomId } from './helpers/calculate'
import { deployAndInit } from './helpers/deploy-multivault'
import { publicClient, walletClient } from './helpers/utils'

let address: Address

beforeAll(async () => {
  address = await deployAndInit()
}, 30000)

describe('Atoms', () => {
  describe('previewAtomCreate', () => {
    it('should calculate atom create cost with valid value', async () => {
      const value = parseEther('100')
      const [shares, assetsAfterFixedFees, assetsAfterFees] =
        await previewAtomCreate(
          {
            walletClient,
            publicClient,
            address: address,
          },
          {
            args: [
              keccak256(toHex(`preview test atom ${Math.random()}`)),
              value,
            ],
          },
        )
      expect(shares).toBeDefined()
      expect(typeof shares).toBe('bigint')
      expect(shares).toBeGreaterThan(0n)
      expect(assetsAfterFixedFees).toBeDefined()
      expect(typeof assetsAfterFixedFees).toBe('bigint')
      expect(assetsAfterFees).toBeDefined()
      expect(typeof assetsAfterFees).toBe('bigint')
    })

    it('should calculate with minimum value', async () => {
      const value = parseEther('1')
      const [shares, assetsAfterFixedFees, assetsAfterFees] =
        await previewAtomCreate(
          {
            walletClient,
            publicClient,
            address: address,
          },
          {
            args: [
              keccak256(toHex(`minimum value atom ${Math.random()}`)),
              value,
            ],
          },
        )
      expect(shares).toBeGreaterThanOrEqual(0n)
      expect(assetsAfterFixedFees).toBeGreaterThanOrEqual(0n)
      expect(assetsAfterFees).toBeGreaterThanOrEqual(0n)
    })

    it('should calculate with large value', async () => {
      const value = parseEther('10000')
      const [shares, assetsAfterFixedFees, assetsAfterFees] =
        await previewAtomCreate(
          {
            walletClient,
            publicClient,
            address: address,
          },
          {
            args: [
              keccak256(toHex(`large value atom ${Math.random()}`)),
              value,
            ],
          },
        )
      expect(shares).toBeGreaterThan(0n)
      expect(assetsAfterFixedFees).toBeLessThanOrEqual(value)
      expect(assetsAfterFees).toBeLessThanOrEqual(assetsAfterFixedFees)
    })
  })

  describe('createAtoms', () => {
    it('should create a new atom', async () => {
      const value = parseEther('100')
      const atomData = toHex(`test atom creation ${Math.random()}`)

      const txHash = await createAtoms(
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
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })

    it('should create multiple atoms in single transaction', async () => {
      const value1 = parseEther('100')
      const value2 = parseEther('150')
      const atomData1 = toHex(`multi atom 1 ${Math.random()}`)
      const atomData2 = toHex(`multi atom 2 ${Math.random()}`)

      const txHash = await createAtoms(
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
          value: parseEther('250'),
        },
      )
      expect(txHash).toBeDefined()
      expect(isHex(txHash)).toBe(true)
    })

    it('should handle error with insufficient value', async () => {
      const value = parseEther('100')
      const atomData = toHex(`insufficient value atom ${Math.random()}`)

      await expect(
        createAtoms(
          {
            walletClient,
            publicClient,
            address: address,
          },
          {
            args: [[atomData], [value]],
            value: parseEther('50'), // Insufficient value
          },
        ),
      ).rejects.toThrow()
    })
  })

  describe('createAtomsEncode', () => {
    it('should encode single atom creation', () => {
      const atomData = toHex(`encode test atom ${Math.random()}`)
      const value = parseEther('100')

      const encoded = createAtomsEncode([atomData], [value])

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
      expect(encoded.startsWith('0x')).toBe(true)
    })

    it('should encode multiple atoms creation', () => {
      const atomData1 = toHex(`encode atom 1 ${Math.random()}`)
      const atomData2 = toHex(`encode atom 2 ${Math.random()}`)
      const atomData3 = toHex(`encode atom 3 ${Math.random()}`)
      const value1 = parseEther('100')
      const value2 = parseEther('200')
      const value3 = parseEther('300')

      const encoded = createAtomsEncode(
        [atomData1, atomData2, atomData3],
        [value1, value2, value3],
      )

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
      expect(encoded.length).toBeGreaterThan(10)
    })

    it('should encode empty arrays', () => {
      const encoded = createAtomsEncode([], [])

      expect(encoded).toBeDefined()
      expect(isHex(encoded)).toBe(true)
    })
  })

  describe('getAtom', () => {
    it('should retrieve created atom by ID', async () => {
      // First create an atom
      const value = parseEther('100')
      const atomData = toHex(`retrievable atom ${Math.random()}`)

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

      const atomId = calculateAtomId(atomData)

      // Now retrieve it
      const atom = await getAtom(
        {
          publicClient,
          address: address,
        },
        {
          args: [atomId],
        },
      )

      expect(atom).toBeDefined()
    })

    it('should handle non-existent atom ID', async () => {
      const nonExistentId = keccak256(toHex('non existent atom xyz123'))

      await expect(
        getAtom(
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

  describe('getAtomCost', () => {
    it('should retrieve current atom creation cost', async () => {
      const cost = await getAtomCost({
        publicClient,
        address: address,
      })

      expect(cost).toBeDefined()
      expect(typeof cost).toBe('bigint')
      expect(cost).toBeGreaterThan(0n)
    })

    it('should return consistent cost across multiple calls', async () => {
      const cost1 = await getAtomCost({
        publicClient,
        address: address,
      })

      const cost2 = await getAtomCost({
        publicClient,
        address: address,
      })

      expect(cost1).toBe(cost2)
    })
  })
})
