/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import {
  alchemyRpcUrlMap,
  attestorContractsMap,
  multivaultContractsMap,
} from '@lib/utils/chains'
import { encodePacked, Hex, keccak256, toBytes, toHex } from 'viem'
import { base, baseSepolia } from 'viem/chains'

import { callAndConfirm, EVMCallRequest, evmRead } from './evm'
import { getAtomID } from './offchain-store'

const environment = import.meta.env.VITE_DEPLOY_ENV
const rpc =
  environment === 'development'
    ? alchemyRpcUrlMap(baseSepolia.id)
    : alchemyRpcUrlMap(base.id)
const attestorAddress =
  environment === 'development'
    ? attestorContractsMap(baseSepolia.id)
    : attestorContractsMap(base.id)
const multivaultAddress =
  environment === 'development'
    ? multivaultContractsMap(baseSepolia.id) // dev contract address TODO: Duplicate to be cleaned up once everything is pulling from single source of truth
    : multivaultContractsMap(base.id) // prod contract address // TODO: Duplicate to be cleaned up once everything is pulling from single source of truth
const additionalStakeAtom = process.env.ADDITIONAL_STAKE_ATOM
const additionalStakeTriple = process.env.ADDITIONAL_STAKE_TRIPLE

if (
  !rpc ||
  !attestorAddress ||
  !additionalStakeAtom ||
  !multivaultAddress ||
  !additionalStakeTriple
) {
  throw new Error('Missing required environment variables.')
}

const atomCostStr = await getAtomCost()
const tripleCostStr = await getTripleCost()

export const atomValue = (
  BigInt(additionalStakeAtom as string) + BigInt(atomCostStr)
).toString()
export const tripleValue = (
  BigInt(additionalStakeTriple as string) + BigInt(tripleCostStr)
).toString()

console.log('RPC: ', rpc)
console.log('Atom cost: ', atomValue)
console.log('Triple cost: ', tripleValue)

function createAtomRequest(cid: string): EVMCallRequest {
  return {
    RPC: rpc as string,
    address: attestorAddress as `0x${string}`,
    fnDeclaration: [
      'function createAtom(bytes calldata atomUri) external payable returns (uint256)',
    ],
    fnName: 'createAtom',
    args: [toHex(cid)], // Converted to Hex string
    txParams: {
      gasLimit: 500000n,
      value: BigInt(atomValue),
    },
  }
}

export function batchCreateAtomRequest(cids: string[]): EVMCallRequest {
  const batchAtomValue = BigInt(atomValue) * BigInt(cids.length)
  return {
    RPC: rpc as string,
    address: attestorAddress as `0x${string}`,
    fnDeclaration: [
      'function batchCreateAtom(bytes[] calldata atomUris) external payable returns (uint256[])',
    ],
    fnName: 'batchCreateAtom',
    args: [cids.map((cid) => toHex(cid))], // Converted to Hex strings
    txParams: {
      gasLimit: 30000000n,
      value: batchAtomValue,
    },
  }
}

export function batchCreateTripleRequest(
  subjectIds: string[],
  predicateIds: string[],
  objectIds: string[],
): EVMCallRequest {
  const batchTripleValue = BigInt(tripleValue) * BigInt(subjectIds.length)
  return {
    RPC: rpc as string,
    address: attestorAddress as `0x${string}`,
    fnDeclaration: [
      'function batchCreateTriple(uint256[] subjectIds, uint256[] predicateIds, uint256[] objectIds) external payable returns (uint256[])',
    ],
    fnName: 'batchCreateTriple',
    args: [
      subjectIds.map(BigInt),
      predicateIds.map(BigInt),
      objectIds.map(BigInt),
    ],
    txParams: {
      gasLimit: 30000000n,
      value: batchTripleValue,
    },
  }
}

function createTripleRequest(
  subjectId: string,
  predicateId: string,
  objectId: string,
): EVMCallRequest {
  return {
    RPC: rpc as string,
    address: attestorAddress as `0x${string}`,
    fnDeclaration: [
      'function createTriple(uint256 subjectId, uint256 predicateId, uint256 objectId) external payable returns (uint256)',
    ],
    fnName: 'createTriple',
    args: [BigInt(subjectId), BigInt(predicateId), BigInt(objectId)],
    txParams: {
      gasLimit: 1000000n,
      value: BigInt(tripleValue),
    },
  }
}

function hashURI(uri: string): string {
  try {
    return keccak256(toBytes(uri))
  } catch (error) {
    console.error('Error hashing URI:', error)
  }
  return uri
}

export function hashTriple(
  subjectId: string,
  predicateId: string,
  objectId: string,
): string {
  try {
    return keccak256(
      encodePacked(
        ['uint256', 'uint256', 'uint256'],
        [BigInt(subjectId), BigInt(predicateId), BigInt(objectId)],
      ),
    )
  } catch (error) {
    console.error('Error hashing triple:', error)
  }
  return '0'
}

// Do not call this directly, use the wrapper from atom-uri.ts
export async function getAtomIdFromURI(cid: string): Promise<string> {
  const call: EVMCallRequest = {
    RPC: rpc as string,
    address: multivaultAddress as `0x${string}`,
    fnName: 'atomsByHash',
    fnDeclaration: [
      'function atomsByHash(bytes32 atomUri) external view returns (uint256)',
    ],
    args: [hashURI(cid)],
    txParams: {},
  }
  return ((await evmRead(call)) as bigint).toString()
}

// Do not call this directly, use the wrapper from atom-uri.ts
export async function getAtomURIFromID(atomId: string): Promise<string> {
  const call: EVMCallRequest = {
    RPC: rpc as string,
    address: multivaultAddress as `0x${string}`,
    fnName: 'atoms',
    fnDeclaration: [
      'function atoms(uint256 atomId) external view returns (bytes)',
    ],
    args: [BigInt(atomId)],
    txParams: {},
  }
  const result = (await evmRead(call)) as Hex // Viem returns Hex string
  return Buffer.from(result.slice(2), 'hex').toString('utf8') // Decode Hex to string
}

export async function getTripleByHash(hash: string): Promise<string> {
  const call: EVMCallRequest = {
    RPC: rpc as string,
    address: multivaultAddress as `0x${string}`,
    fnName: 'triplesByHash',
    fnDeclaration: [
      'function triplesByHash(bytes32 tripleHash) external view returns (uint256)',
    ],
    args: [hash],
    txParams: {},
  }
  return ((await evmRead(call)) as bigint).toString()
}

export async function getAtomCost(): Promise<string> {
  const call: EVMCallRequest = {
    RPC: rpc as string,
    address: multivaultAddress as `0x${string}`,
    fnName: 'getAtomCost',
    fnDeclaration: ['function getAtomCost() external view returns (uint256)'],
    args: [],
    txParams: {},
  }
  return ((await evmRead(call)) as bigint).toString()
}

export async function getTripleCost(): Promise<string> {
  const call: EVMCallRequest = {
    RPC: rpc as string,
    address: multivaultAddress as `0x${string}`,
    fnName: 'getTripleCost',
    fnDeclaration: ['function getTripleCost() external view returns (uint256)'],
    args: [],
    txParams: {},
  }
  return ((await evmRead(call)) as bigint).toString()
}

export async function createAtom(cid: string): Promise<string> {
  const request = createAtomRequest(cid)
  const receipt = await callAndConfirm(request)
  return receipt
}

export async function batchCreateAtoms(cids: string[]): Promise<string> {
  if (cids.length === 0) {
    console.log('No new atoms to create')
    return '0x0000000000000000000000000000000000000000'
  }
  const request = batchCreateAtomRequest(cids)
  const receipt = await callAndConfirm(request)
  return receipt
}

export async function batchCreateTriples(
  subjectIds: string[],
  predicateIds: string[],
  objectIds: string[],
): Promise<string> {
  if (subjectIds.length === 0) {
    console.log('No new triples to create')
    return '0x0000000000000000000000000000000000000000'
  }
  console.log('Formulating request for batch create triples')
  const request = batchCreateTripleRequest(subjectIds, predicateIds, objectIds)
  console.log('Calling and confirming request for batch create triples')
  const receipt = await callAndConfirm(request)
  return receipt
}

export async function createTriple(
  subjectId: string,
  predicateId: string,
  objectId: string,
): Promise<string> {
  const request = createTripleRequest(subjectId, predicateId, objectId)
  const receipt = await callAndConfirm(request)
  return receipt
}

export async function getOrCreateAtom(uri: string) {
  let atomId = await getAtomID(uri)
  console.log('Atom ID for URI ', uri, ' is ', atomId)
  if (atomId !== '0') {
    console.log('Atom found, ID: ', atomId)
    return [atomId]
  }
  console.log(`Creating atom: ${uri}`)
  const txId = await createAtom(uri)
  console.log('Transaction ID: ', txId)
  atomId = await getAtomID(uri)
  console.log('New Atom ID for URI ', uri, ' is ', atomId)
  return [atomId, txId]
}

// Should the logic calling this be refactored to take the ID? Or would it be thrown away in scope?
export async function checkAtomExists(uri: string) {
  const atomId = await getAtomID(uri)
  return atomId !== '0'
}

export async function getOrCreateTriple(
  subjectId: string,
  predicateId: string,
  objectId: string,
) {
  const tripleHash = hashTriple(subjectId, predicateId, objectId)
  let tripleId = (await getTripleByHash(tripleHash)) as string
  console.log('TRIPLE ID IN GET OR CREATE TRIPLE: ', tripleId)
  if (tripleId !== '0') {
    return [tripleId]
  }
  console.log(`Creating triple: ${subjectId}, ${predicateId}, ${objectId}`)
  const txId = await createTriple(subjectId, predicateId, objectId)
  console.log('Transaction ID: ', txId)
  tripleId = await getTripleByHash(tripleHash)
  return [tripleId, txId]
}

// Don't call this, use the wrapper from atom-uri.ts
export async function getTripleId(
  subjectId: string,
  predicateId: string,
  objectId: string,
) {
  const tripleHash = hashTriple(subjectId, predicateId, objectId)
  const tripleId = await getTripleByHash(tripleHash)
  return tripleId
}

// To call this:
// const atomIds = await bulkEVMRead(getAtomIdFromURI, cids, {chunkSize: 3, delayBetweenReads: 100, delayBetweenChunks: 1000})
export async function bulkEVMRead<T, P>(
  evmReadFn: (param: P) => Promise<T>, // EVM read method
  params: P[], // Array of parameters, each representing one read
  options: {
    chunkSize?: number // Maximum number of parallel reads per chunk
    delayBetweenReads?: number // Delay (ms) between individual reads within a chunk
    delayBetweenChunks?: number // Delay (ms) between chunks
  } = {},
): Promise<T[]> {
  const {
    chunkSize = 100,
    delayBetweenReads = 0,
    delayBetweenChunks = 0,
  } = options

  const results: T[] = []

  // Helper to process a single chunk in parallel
  const processChunk = async (chunkParams: P[]): Promise<T[]> => {
    const chunkResults = await Promise.all(
      chunkParams.map(async (param, index) => {
        // Delay between individual reads within the chunk
        if (delayBetweenReads > 0 && index > 0) {
          await new Promise((resolve) => setTimeout(resolve, delayBetweenReads))
        }
        const result = await evmReadFn(param)
        // console.log('Bulk EVM Read Result: ', result)
        return result
      }),
    )
    return chunkResults
  }

  // Divide params into chunks
  for (let i = 0; i < params.length; i += chunkSize) {
    const chunk = params.slice(i, i + chunkSize)

    // Process the chunk in parallel
    const chunkResults = await processChunk(chunk)
    results.push(...chunkResults)

    // Delay between chunks
    if (delayBetweenChunks > 0 && i + chunkSize < params.length) {
      await new Promise((resolve) => setTimeout(resolve, delayBetweenChunks))
    }
  }

  return results
}
