/* eslint-disable @typescript-eslint/no-explicit-any */

import { MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { multivaultAbi } from '@lib/abis/multivault'
import logger from '@lib/utils/logger'
import { truncateString } from '@lib/utils/misc'
import { Thing, WithContext } from 'schema-dts'
import { encodeFunctionData, toHex } from 'viem'

import {
  atomValue,
  batchCreateAtomRequest,
  batchCreateAtoms,
  batchCreateTripleRequest,
  batchCreateTriples,
  checkAtomExists,
  getOrCreateAtom,
  tripleValue,
} from './attestor'
import { precomputeCIDs } from './cid'
import { estimateGas } from './evm'
import { checkImagesAlreadyUploaded, resolveAndFilterImage } from './image'
import {
  getAtomIDs,
  getAtomURI,
  getTripleID,
  getURIData,
} from './offchain-store'
import { pinataPinJSON } from './pinata'
import { createRequest, pushUpdate, updateRequest } from './request'
import { getSender } from './requestSender'
import {
  appendToTripleLog,
  AtomLogEntry,
  multiAppendToAtomLog,
} from './supabase'

export async function pinAtomData(obj: any, requestHash?: string) {
  try {
    // Avoid re-uploading images that have already been uploaded
    obj.image = await resolveAndFilterImage(obj.image, requestHash)
    return [obj, await pinataPinJSON(obj, requestHash)]
  } catch (error) {
    console.error('Error pinning atom data:', error)
    requestHash
      ? await pushUpdate(requestHash, `Error pinning atom data: ${error}`)
      : null
  }
  return [obj, '']
}

export interface TagAtomIDsResponse {
  newTripleIds: string[]
  existingTripleIds: string[]
}

export interface TagAtomsResponse {
  newTripleIds: string[]
  existingTripleIds: string[]
}

export async function generateTagAtomsCallData(
  atoms: any[],
  tag: WithContext<Thing>,
  rawURIs?: boolean,
  requestHash?: string,
): Promise<{
  chunks: Triple[][]
  chunkSize: number
  calls: BatchTriplesRequest[]
  filteredTriples: Triple[]
  existingTriples: Triple[]
}> {
  let subjectIds: string[] = []

  if (!rawURIs) {
    const atomExistsResults = await checkAtomsExist(atoms)
    subjectIds = atomExistsResults.map((result) => result.atomId) as string[]
  } else {
    console.log('Generating tag atoms call data with raw URIs...')
    console.log('URIs passed in: ', atoms)
    const rawURIAtomExistsResults = await checkAtomsExistWithRawURIs(atoms)
    subjectIds = rawURIAtomExistsResults.map(
      (result) => result.atomId,
    ) as string[]
  }

  // If keyword tag doesn't exist, we can create it with our own signer
  // It should always exist though
  const [predicateId] = await getOrCreateAtom('https://schema.org/keywords')

  const tagExistsResult = await checkAtomsExist([tag])
  const objectId = tagExistsResult[0].atomId

  const triplesToGenerateCallDataFor: Triple[] = subjectIds.map(
    (subjectId) => ({
      subjectId: subjectId as string,
      predicateId,
      objectId: objectId as string,
    }),
  )

  const [filteredTriples, existingTriples] = await cullExistingTriples(
    triplesToGenerateCallDataFor,
    100,
  )

  const callData = await generateBatchTriplesCalldata(
    filteredTriples,
    requestHash,
  )

  return {
    ...callData,
    filteredTriples,
    existingTriples,
  }
}

export interface PopulateAtomsResponse {
  newAtomIDs: string[]
  existingAtomIDs: string[]
}

export async function createPopulateAtomsRequest(
  atoms: any[],
  nodeRequest?: Request,
) {
  const msgSender = await getSender(nodeRequest)
  const requestHash = await createRequest(atoms, msgSender, 'createAtoms')
  return requestHash
}

export async function createTagAtomsRequest(
  atoms: any[],
  tag: WithContext<Thing>,
  nodeRequest?: Request,
) {
  const msgSender = await getSender(nodeRequest)
  const requestHash = await createRequest(
    [tag, ...atoms],
    msgSender,
    'createTriples',
  )
  return requestHash
}

// Pre-step for submitting raw URIs, also can be used to check if they exist yet
export async function checkAndFilterURIs(
  URIs: string[],
  requestHash?: string,
): Promise<{ existingURIs: string[]; newURIs: string[] }> {
  console.log('Updating requestHash for checkAndFilterURIs:', requestHash)
  console.log('URIs passed in: ', URIs)
  requestHash
    ? await pushUpdate(requestHash, `Checking ${URIs.length} URIs...`)
    : null
  console.log('Processing checkURIsExist...')
  const uriCheckResults = await processCheckURIsExist(URIs)
  console.log('uriCheckResults:', uriCheckResults)
  const existingURIs = uriCheckResults
    .filter((result) => result.alreadyExists)
    .map((result) => result.uri)
  const newURIs = uriCheckResults
    .filter((result) => !result.alreadyExists)
    .map((result) => result.uri)
  console.log('existingURIs:', existingURIs)
  console.log('newURIs:', newURIs)
  console.log('Updating requestHash again...')
  requestHash
    ? await pushUpdate(
      requestHash,
      `Checked ${URIs.length} URIs, found ${existingURIs.length} existing URIs and ${newURIs.length} new URIs`,
    )
    : null
  return { existingURIs, newURIs }
}

export async function pinAtoms(
  atoms: any[],
  requestHash?: string,
): Promise<{
  existingCIDs: string[]
  newCIDs: string[]
  filteredData: PinDataResult[]
  existingData: PinDataResult[]
}> {
  await pushUpdate(requestHash, 'Pinning new data to IPFS...')
  const pinnedData = requestHash
    ? await pinAllData(atoms, 100, 3, 1000, requestHash)
    : await pinAllData(atoms, 100)

  logger(`Checking for existing atoms...`)
  await pushUpdate(requestHash, 'Checking for existing atoms...')
  const [filteredData, existingData] = requestHash
    ? await cullExistingAtoms(pinnedData, 100, 3, requestHash)
    : await cullExistingAtoms(pinnedData, 100, 3)

  const newCIDs = filteredData.map((data) => data.cid)
  const existingCIDs = existingData.map((data) => data.cid)

  logger(`Done pinning atoms.`)
  await pushUpdate(requestHash, 'Done pinning atoms.')
  return { existingCIDs, newCIDs, filteredData, existingData }
}

export async function buildBatchCreateAtomChunks(
  cids: string[],
  requestHash?: string,
): Promise<{ chunks: string[][]; chunkSize: number }> {
  console.log('Processing batch atoms with CIDs: ', cids)
  await pushUpdate(requestHash, `Processing batch atoms with CIDs: ${cids}`)
  if (cids.length === 0) {
    await pushUpdate(requestHash, 'No new atoms to create')
    await updateRequest(requestHash, { status: 'fulfilled' })
    console.log('No new atoms to create')
    return { chunks: [], chunkSize: 0 }
  }

  // Attempt static execution in iteratively smaller chunks until it either succeeds or we have reason to believe the revert is not due to out of gas
  console.log('Predetermining number of chunks to process batch atoms...')
  await pushUpdate(
    requestHash,
    'Predetermining number of chunks to process batch atoms...',
  )

  let numChunks = 1

  if (cids.length > 1) {
    let staticExecutionReverted = true
    let latestBatch: string[] = [] // for debugging
    while (staticExecutionReverted && numChunks < cids.length) {
      try {
        const chunkSize = Math.ceil(cids.length / numChunks)
        const chunks = chunk(cids, chunkSize)
        for (const batch of chunks) {
          latestBatch = batch // for debugging
          const request = batchCreateAtomRequest(batch)
          const gasEstimate = await estimateGas(request)
          if (gasEstimate > 30000000) {
            throw new Error(
              'Gas estimate for batch atoms will likely exceed block gas limit',
            )
          }
        }
        staticExecutionReverted = false
      } catch (error) {
        console.log(
          'Batch failed gas estimation, chunking further: ',
          latestBatch,
        )
        await pushUpdate(requestHash, `Reducing chunks: ${latestBatch}`)
        numChunks++
      }
    }

    if (staticExecutionReverted) {
      await pushUpdate(
        requestHash,
        'static execution reverted with chunk size of 1',
      )
      throw new Error('static execution reverted with chunk size of 1')
    }
  }

  const chunkSize = Math.ceil(cids.length / numChunks)
  const chunks = chunk(cids, chunkSize)
  console.log('Number of batch atom chunks: ', numChunks)
  await pushUpdate(requestHash, `Number of batch atom chunks: ${numChunks}`)
  console.log(
    'Chunk lengths: ',
    chunks.map((chunk) => chunk.length),
  )
  await pushUpdate(
    requestHash,
    `Chunk lengths: ${chunks.map((chunk) => chunk.length)}`,
  )
  return { chunks, chunkSize }
}

export type BatchAtomsRequest = {
  to: `0x${string}`
  data: `0x${string}`
  value: string
}
export function getBatchAtomsCall(
  cids: string[],
): BatchAtomsRequest | undefined {
  if (cids.length !== 0) {
    return {
      to: MULTIVAULT_CONTRACT_ADDRESS as `0x${string}`,
      data: encodeFunctionData({
        abi: multivaultAbi,
        functionName: 'batchCreateAtom',
        args: [cids.map((cid) => toHex(cid))],
      }),
      value: (BigInt(atomValue) * BigInt(cids.length)).toString(),
    }
  }
}

export type BatchTriplesRequest = {
  to: `0x${string}`
  data: `0x${string}`
  value: string
}
export function getBatchTriplesCall(
  triples: Triple[],
): BatchTriplesRequest | undefined {
  if (triples.length !== 0) {
    return {
      to: MULTIVAULT_CONTRACT_ADDRESS as `0x${string}`,
      data: encodeFunctionData({
        abi: multivaultAbi,
        functionName: 'batchCreateTriple',
        args: [
          triples.map((triple) => BigInt(triple.subjectId)),
          triples.map((triple) => BigInt(triple.predicateId)),
          triples.map((triple) => BigInt(triple.objectId)),
        ],
      }),
      value: (BigInt(tripleValue) * BigInt(triples.length)).toString(),
    }
  }
}

export async function generateBatchAtomsCalldata(
  cids: string[],
  requestHash?: string,
): Promise<{
  chunks: string[][]
  chunkSize: number
  calls: BatchAtomsRequest[]
}> {
  const { chunks, chunkSize } = await buildBatchCreateAtomChunks(
    cids,
    requestHash,
  )
  const calls = chunks
    .map((batch) => getBatchAtomsCall(batch))
    .filter((call): call is BatchAtomsRequest => call !== undefined)

  if (calls.length > 0) {
    await pushUpdate(
      requestHash,
      `\nGenerated ${calls.length} batch atom calls:\n${calls.map((call) => call.data).join('\n')}`,
    )
  }
  return { chunks, chunkSize, calls }
}

async function generateBatchTriplesCalldata(
  triples: Triple[],
  requestHash?: string,
): Promise<{
  chunks: Triple[][]
  chunkSize: number
  calls: BatchTriplesRequest[]
}> {
  const { chunks, chunkSize } = await buildBatchCreateTripleChunks(
    triples,
    requestHash,
  )
  const calls = chunks
    .map((batch) => getBatchTriplesCall(batch))
    .filter((call): call is BatchTriplesRequest => call !== undefined)

  if (calls.length > 0) {
    await pushUpdate(
      requestHash,
      `\nGenerated ${calls.length} batch triple calls:\n${calls.map((call) => call.data).join('\n')}`,
    )
  }
  return { chunks, chunkSize, calls }
}

async function buildBatchCreateTripleChunks(
  triples: Triple[],
  requestHash?: string,
): Promise<{ chunks: Triple[][]; chunkSize: number }> {
  console.log('Processing batch triples:', triples)
  await pushUpdate(requestHash, `Processing batch triples: ${triples}`)
  if (triples.length === 0) {
    await pushUpdate(requestHash, 'No new triples to create')
    console.log('No new triples to create')
    return { chunks: [], chunkSize: 0 }
  }

  // Attempt static execution in iteratively smaller chunks until it either succeeds or we have reason to believe the revert is not due to out of gas
  console.log('Predetermining number of chunks to process batch triples...')
  await pushUpdate(
    requestHash,
    'Predetermining number of chunks to process batch triples...',
  )

  let numChunks = 1

  if (triples.length > 1) {
    let staticExecutionReverted = true
    let latestBatch: Triple[] = [] // for debugging
    while (staticExecutionReverted && numChunks < triples.length) {
      try {
        const chunkSize = Math.ceil(triples.length / numChunks)
        const chunks = chunk(triples, chunkSize)
        for (const batch of chunks) {
          latestBatch = batch // for debugging
          const request = batchCreateTripleRequest(
            batch.map((triple) => triple.subjectId),
            batch.map((triple) => triple.predicateId),
            batch.map((triple) => triple.objectId),
          )
          const gasEstimate = await estimateGas(request)
          if (gasEstimate > 30000000) {
            throw new Error(
              'Gas estimate for batch triples will likely exceed block gas limit',
            )
          }
        }
        staticExecutionReverted = false
      } catch (error) {
        console.log(
          'Batch failed gas estimation, chunking further: ',
          latestBatch,
        )
        await pushUpdate(requestHash, `Reducing chunks: ${latestBatch}`)
        numChunks++
      }
    }

    if (staticExecutionReverted) {
      await pushUpdate(
        requestHash,
        'static execution reverted with chunk size of 1',
      )
      throw new Error('static execution reverted with chunk size of 1')
    }
  }

  const chunkSize = Math.ceil(triples.length / numChunks)
  const chunks = chunk(triples, chunkSize)
  console.log('Number of batch triple chunks: ', numChunks)
  await pushUpdate(requestHash, `Number of batch triple chunks: ${numChunks}`)
  console.log(
    'Chunk lengths: ',
    chunks.map((chunk) => chunk.length),
  )
  await pushUpdate(
    requestHash,
    `Chunk lengths: ${chunks.map((chunk) => chunk.length)}`,
  )
  return { chunks, chunkSize }
}

export async function logTransactionHashAndVerifyAtoms(
  txHash: string,
  filteredCIDs: string[],
  filteredData: PinDataResult[],
  oldAtomCIDs: string[],
  requestHash?: string,
  nodeRequest?: Request,
): Promise<PopulateAtomsResponse> {
  const msgSender = await getSender(nodeRequest)
  console.log(`Logging transaction hash: ${txHash}`)

  await pushUpdate(requestHash, `Logging transaction hash: ${txHash}`)

  // TODO: Implement actual logging logic here
  // This could involve writing to a file, sending to an API, or updating a database
  // For now, we'll just log to the console
  console.log(`Transaction hash ${txHash} logged successfully`)

  // Verify atom IDs from URIs
  console.log('Verifying new atom IDs...')
  if (requestHash) {
    await pushUpdate(requestHash, 'Verifying new atom IDs...')
  }
  const newAtoms = await getAtomIdsFromURI(filteredCIDs)

  // Append to atom log
  console.log('Logging new atoms to database...')
  if (requestHash) {
    await pushUpdate(requestHash, 'Logging new atoms to database...')
  }

  const atomLogEntries: AtomLogEntry[] = []
  for (const atom of newAtoms) {
    const filteredObj = filteredData.find(
      (data) => data.cid === atom.uri,
    )?.filteredObj

    if (filteredObj) {
      atomLogEntries.push({
        id: atom.atomId,
        cid: atom.uri,
        txHash,
        data: filteredObj,
        sender: msgSender,
      })
    } else {
      console.warn(`No filtered object found for atom with URI: ${atom.uri}`)
    }
  }

  if (atomLogEntries.length > 0) {
    await multiAppendToAtomLog(atomLogEntries)
  }

  // Verify old atom IDs from URIs
  console.log('Verifying old atom IDs...')
  if (requestHash) {
    await pushUpdate(requestHash, 'Verifying old atom IDs...')
  }
  const oldAtoms = await getAtomIdsFromURI(oldAtomCIDs)

  console.log('Done verifying and logging new atoms.')
  if (requestHash) {
    await pushUpdate(requestHash, 'Done verifying and logging new atoms.')
  }

  const newAtomIDs = newAtoms.map((atom) => atom.atomId)
  const existingAtomIDs = oldAtoms.map((atom) => atom.atomId)

  if (requestHash) {
    await updateRequest(requestHash, { status: 'fulfilled' })
  }

  return { newAtomIDs, existingAtomIDs } as PopulateAtomsResponse
}

export interface LogAndVerifyTriplesResponse {
  newTripleIds: string[]
  existingTripleIds: string[]
}

export async function logTransactionHashAndVerifyTriples(
  txHash: string,
  newTriples: Triple[],
  existingTriples: Triple[],
  requestHash?: string,
  nodeRequest?: Request,
): Promise<LogAndVerifyTriplesResponse> {
  const msgSender = await getSender(nodeRequest)
  const response: LogAndVerifyTriplesResponse = {
    newTripleIds: [],
    existingTripleIds: [],
  }

  try {
    console.log(`Logging transaction hash: ${txHash}`)
    await pushUpdate(requestHash, `Logging transaction hash: ${txHash}`)

    // Verify new triple IDs
    console.log('Verifying new triple IDs...')
    await pushUpdate(requestHash, 'Verifying new triple IDs...')
    const verifiedTriples = await getTripleIdsFromTripleData(newTriples, 100)
    response.newTripleIds = verifiedTriples.map(
      (triple) => triple.tripleId,
    ) as string[]

    // Log new triples to database
    console.log('Logging new triples to database...')
    await pushUpdate(requestHash, 'Logging new triples to database...')
    for (const triple of verifiedTriples) {
      await appendToTripleLog(
        triple.tripleId as string,
        txHash,
        triple.subjectId,
        triple.predicateId,
        triple.objectId,
        msgSender,
      )
    }

    // Handle existing triples
    console.log('Processing existing triples...')
    await pushUpdate(requestHash, 'Processing existing triples...')
    response.existingTripleIds = existingTriples.map(
      (triple) => triple.tripleId,
    ) as string[]

    console.log('Done verifying and logging triples.')
    await pushUpdate(requestHash, 'Done verifying and logging triples.')
    await updateRequest(requestHash, { status: 'fulfilled' })

    return response
  } catch (error) {
    console.error('Error logging and verifying triples:', error)
    await pushUpdate(
      requestHash,
      `Error logging and verifying triples: ${error}`,
    )
    throw error
  }
}

export async function checkAtomsExist(
  atoms: any[],
): Promise<AtomExistsResult[]> {
  const atomExistsResults = await processCheckAtomsExist(atoms)
  return atomExistsResults
}

export async function checkAtomsExistWithRawURIs(
  URIs: string[],
): Promise<URIExistsResult[]> {
  const uriExistsResults = await processCheckURIsExist(URIs)
  return uriExistsResults
}

// This function takes an array and a size, and splits the array into chunks of the given size
export function chunk<T>(array: T[], size: number): T[][] {
  const chunked: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size))
  }
  return chunked
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface AtomExistsResult {
  filteredObj: any
  cid: string
  originalIndex: number // can deprecate this
  alreadyExists?: boolean
  atomId?: string
}

export interface PinDataResult {
  filteredObj: any
  cid: string
  originalIndex: number
  alreadyExists?: boolean
}

export interface Triple {
  subjectId: string
  predicateId: string
  objectId: string
  alreadyExists?: boolean
  tripleId?: string
}

export interface AtomURIResult {
  atomId: string
  uri: string
  originalIndex: number // this can be deprecated
}

export interface URIExistsResult {
  uri: string
  originalIndex: number
  alreadyExists: boolean
  atomId?: string
}

export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error)
      if (attempt === maxRetries) {
        throw error
      }
    }
  }
  throw new Error('This should never be reached')
}

export async function pinAllData(
  atoms: any[],
  concurrencyLimit: number,
  maxRetries: number = 3,
  delayBetweenBatches: number = 1000,
  requestHash?: string,
): Promise<PinDataResult[]> {
  requestHash
    ? await pushUpdate(requestHash, 'Splitting atoms by unique image...')
    : null
  const { uniqueAtoms, duplicateAtoms } = splitAtomsByUniqueImage(atoms)

  // Process unique atoms first
  requestHash
    ? await pushUpdate(requestHash, 'Pinning atom data with unique images...')
    : null
  const pinnedData: PinDataResult[] = await processAtomDataBatches(
    uniqueAtoms,
    concurrencyLimit,
    maxRetries,
    delayBetweenBatches,
    0,
    requestHash,
  )

  // Process duplicate atoms after unique atoms
  requestHash
    ? await pushUpdate(
      requestHash,
      'Pinning atom data with duplicate images...',
    )
    : null
  const duplicatePinnedData = await processAtomDataBatches(
    duplicateAtoms,
    concurrencyLimit,
    maxRetries,
    delayBetweenBatches,
    uniqueAtoms.length,
    requestHash,
  )

  // Combine results and return in original order
  requestHash
    ? await pushUpdate(requestHash, 'Combining and sorting pinned data...')
    : null
  pinnedData.push(...duplicatePinnedData)
  pinnedData.sort((a, b) => a.originalIndex - b.originalIndex)

  return pinnedData
}

async function processCheckURIsExist(
  URIs: string[],
): Promise<URIExistsResult[]> {
  const atomIds = await getAtomIDs(URIs)
  return atomIds.map((atomId, index) => ({
    uri: URIs[index],
    originalIndex: index,
    alreadyExists: atomId !== '0',
    atomId,
  }))
}

// Splits atoms into two arrays: unique and duplicate based on the 'image' field
export function splitAtomsByUniqueImage(atoms: any[]): {
  uniqueAtoms: any[]
  duplicateAtoms: any[]
} {
  const seenImages = new Set<string>()
  const uniqueAtoms: any[] = []
  const duplicateAtoms: any[] = []

  for (const atom of atoms) {
    const image = atom.image
    if (image && seenImages.has(image)) {
      duplicateAtoms.push(atom)
    } else {
      if (image) {
        seenImages.add(image)
      }
      uniqueAtoms.push(atom)
    }
  }

  return { uniqueAtoms, duplicateAtoms }
}

// Processes atoms in batches, returning resolved PinDataResult objects
export async function processAtomDataBatches(
  atoms: any[],
  concurrencyLimit: number,
  maxRetries: number,
  delayBetweenBatches: number,
  startIndex: number = 0,
  requestHash?: string,
): Promise<PinDataResult[]> {
  const pinDataBatches = chunk(
    atoms.map((atom, index) => ({ atom, index: index + startIndex })),
    concurrencyLimit,
  )
  const pinnedData: PinDataResult[] = []

  for (const batch of pinDataBatches) {
    const batchResults = await Promise.all(
      batch.map(async ({ atom, index }, i) => {
        await delay(i * 200) // Delay between individual calls within the batch
        const result = await retryOperation(async () => {
          const [filteredObj, cid] = await pinAtomData(atom, requestHash)
          return {
            filteredObj,
            cid: `ipfs://${cid}`,
            originalIndex: index,
          } as PinDataResult
        }, maxRetries)
        return result
      }),
    )
    pinnedData.push(...batchResults)
    await delay(delayBetweenBatches) // Delay between batches
  }

  return pinnedData
}

// Helper function for front end / interfaces
export async function processCheckAtomsExist(
  atoms: any[],
): Promise<AtomExistsResult[]> {
  const alreadyUploadedImages = await checkImagesAlreadyUploaded(
    atoms.map((atom) => atom.image),
  )

  atoms.map((atom, index) => {
    if (alreadyUploadedImages[index]) {
      atom.image = alreadyUploadedImages[index]
    }
  })

  const CIDs = await precomputeCIDs(atoms)
  const CIDsWithIPFS = CIDs.map((cid) => `ipfs://${cid}`)

  const atomIds = await getAtomIDs(CIDsWithIPFS)

  const result: AtomExistsResult[] = []
  for (let i = 0; i < atoms.length; i++) {
    result.push({
      filteredObj: atoms[i],
      cid: CIDsWithIPFS[i],
      originalIndex: i,
      atomId: atomIds[i],
      alreadyExists: atomIds[i] !== '0',
    })
  }

  return result
}

export async function cullExistingAtoms(
  pinnedData: PinDataResult[],
  concurrencyLimit: number,
  maxRetries: number = 3,
  requestHash?: string,
): Promise<[PinDataResult[], PinDataResult[]]> {
  const filteredData: PinDataResult[] = []
  const alreadyExistsData: PinDataResult[] = []
  const pinnedDataBatches = chunk(pinnedData, concurrencyLimit)

  for (const batch of pinnedDataBatches) {
    const batchResults = await Promise.all(
      batch.map(async ({ filteredObj, cid, originalIndex }) =>
        retryOperation(async () => {
          const alreadyExists = await checkAtomExists(cid)
          if (alreadyExists) {
            await pushUpdate(
              requestHash,
              `${truncateString(cid, 20)} already exists`,
            )
          }
          return { filteredObj, cid, originalIndex, alreadyExists }
        }, maxRetries),
      ),
    )
    filteredData.push(
      ...batchResults.filter((result) => result.alreadyExists === false),
    )
    alreadyExistsData.push(
      ...batchResults.filter((result) => result.alreadyExists === true),
    )
  }

  // Sort the results to maintain the original order
  filteredData.sort((a, b) => a.originalIndex - b.originalIndex)
  alreadyExistsData.sort((a, b) => a.originalIndex - b.originalIndex)

  return [filteredData, alreadyExistsData]
}

export async function cullExistingTriples(
  triples: Triple[],
  concurrencyLimit: number,
  maxRetries: number = 3,
  delayBetweenBatches: number = 1000,
): Promise<[Triple[], Triple[]]> {
  const filteredTriples: Triple[] = []
  const alreadyExistsTriples: Triple[] = []
  const tripleBatches = chunk(triples, concurrencyLimit)

  for (const batch of tripleBatches) {
    const batchResults = await Promise.all(
      batch.map(async ({ subjectId, predicateId, objectId }, i) => {
        await delay(i * 100) // Slight delay between concurrent requests
        return retryOperation(async () => {
          const tripleId = await getTripleID(subjectId, predicateId, objectId)
          return {
            subjectId,
            predicateId,
            objectId,
            tripleId,
            alreadyExists: tripleId !== '0',
          }
        }, maxRetries)
      }),
    )

    filteredTriples.push(
      ...batchResults.filter((result) => result.alreadyExists === false),
    )
    alreadyExistsTriples.push(
      ...batchResults.filter((result) => result.alreadyExists === true),
    )

    await delay(delayBetweenBatches) // Delay between batches to throttle requests
  }

  return [filteredTriples, alreadyExistsTriples]
}

// TODO: Refactor cullExistingTriples to just use this?
export async function getTripleIdsFromTripleData(
  triples: Triple[],
  concurrencyLimit: number,
  maxRetries: number = 3,
  delayBetweenBatches: number = 1000,
): Promise<Triple[]> {
  const tripleBatches = chunk(triples, concurrencyLimit)
  const triplesWithIds: Triple[] = []

  for (const batch of tripleBatches) {
    const batchResults = await Promise.all(
      batch.map(async ({ subjectId, predicateId, objectId }, i) => {
        await delay(i * 100) // Slight delay between concurrent requests
        return retryOperation(async () => {
          const tripleId = await getTripleID(subjectId, predicateId, objectId)
          const alreadyExists = tripleId !== '0'
          return {
            subjectId,
            predicateId,
            objectId,
            alreadyExists,
            tripleId,
          } as Triple
        }, maxRetries)
      }),
    )

    triplesWithIds.push(...batchResults)
    await delay(delayBetweenBatches) // Delay between batches to throttle requests
  }

  return triplesWithIds
}

// Reading from EVM concurrently needs a delay between requests
export async function getAtomIdsFromURI(
  URIs: string[],
): Promise<AtomURIResult[]> {
  const atomIds = await getAtomIDs(URIs)
  const result: AtomURIResult[] = []
  for (let i = 0; i < URIs.length; i++) {
    result.push({ atomId: atomIds[i], uri: URIs[i], originalIndex: i })
  }

  return result
}

// Always perform these chunks sequentially
export async function processBatchAtoms(
  cids: string[],
  requestHash?: string,
): Promise<string[]> {
  const result: string[] = []
  console.log('Processing batch atoms with CIDs: ', cids)
  requestHash
    ? await pushUpdate(requestHash, `Processing batch atoms with CIDs: ${cids}`)
    : null
  if (cids.length === 0) {
    requestHash ? await pushUpdate(requestHash, 'No new atoms to create') : null
    console.log('No new atoms to create')
    return result
  }

  // Attempt static execution in iteratively smaller chunks until it either succeeds or we have reason to believe the revert is not due to out of gas
  console.log('Predetermining number of chunks to process batch atoms...')
  requestHash
    ? await pushUpdate(
      requestHash,
      'Predetermining number of chunks to process batch atoms...',
    )
    : null
  let numChunks = 1

  if (cids.length > 1) {
    let staticExecutionReverted = true
    let latestBatch: string[] = [] // for debugging
    while (staticExecutionReverted && numChunks < cids.length) {
      try {
        const chunkSize = Math.ceil(cids.length / numChunks)
        const chunks = chunk(cids, chunkSize)
        for (const batch of chunks) {
          latestBatch = batch // for debugging
          const request = batchCreateAtomRequest(batch)
          const gasEstimate = await estimateGas(request)
          if (gasEstimate > 30000000) {
            throw new Error(
              'Gas estimate for batch atoms will likely exceed block gas limit',
            )
          }
        }
        staticExecutionReverted = false
      } catch (error) {
        console.log(
          'Batch failed gas estimation, chunking further: ',
          latestBatch,
        )
        requestHash
          ? await pushUpdate(requestHash, `Reducing chunks: ${latestBatch}`)
          : null
        numChunks++
      }
    }

    if (staticExecutionReverted) {
      requestHash
        ? await pushUpdate(
          requestHash,
          'static execution reverted with chunk size of 1',
        )
        : null
      throw new Error('static execution reverted with chunk size of 1')
    }
  }

  const chunkSize = Math.ceil(cids.length / numChunks)

  // Then do it
  let lastChunkForDebug: string[] = []
  try {
    const chunks = chunk(cids, chunkSize)
    console.log('Number of batch atom chunks: ', numChunks)
    requestHash
      ? await pushUpdate(
        requestHash,
        `Number of batch atom chunks: ${numChunks}`,
      )
      : null
    console.log(
      'Chunk lengths: ',
      chunks.map((chunk) => chunk.length),
    )
    requestHash
      ? await pushUpdate(
        requestHash,
        `Chunk lengths: ${chunks.map((chunk) => chunk.length)}`,
      )
      : null
    for (const batch of chunks) {
      lastChunkForDebug = batch
      const txID = await batchCreateAtoms(batch)
      result.push(txID)
      console.log('Batch transaction ID: ', txID)
      requestHash
        ? await pushUpdate(requestHash, `Batch transaction ID: ${txID}`)
        : null
    }
    return result
  } catch (error) {
    console.error('Error processing batch atoms:', lastChunkForDebug)
    requestHash
      ? await pushUpdate(requestHash, `Error processing batch atoms: ${error}`)
      : null
    return result
  }
}

// TODO: Refactor this to be abstract to avoid duplicating code in processBatchAtoms
export async function processBatchTriples(
  triples: Triple[],
  requestHash?: string,
): Promise<string[]> {
  const result: string[] = []
  if (triples.length === 0) {
    requestHash
      ? await pushUpdate(requestHash, 'No new triples to create')
      : null
    console.log('No new triples to create')
    return result
  }

  // Attempt static execution in iteratively smaller chunks until it either succeeds or we have reason to believe the revert is not due to out of gas
  let numChunks = 1

  if (triples.length > 1) {
    let staticExecutionReverted = true
    let latestBatch: Triple[] = [] // for debugging
    console.log('Predetermining number of chunks to process batch triples...')
    requestHash
      ? await pushUpdate(
        requestHash,
        'Predetermining number of chunks to process batch triples...',
      )
      : null
    while (staticExecutionReverted && numChunks < triples.length) {
      try {
        const chunkSize = Math.ceil(triples.length / numChunks)
        const chunks = chunk(triples, chunkSize)
        for (const batch of chunks) {
          latestBatch = batch // for debugging
          const request = batchCreateTripleRequest(
            batch.map((triple) => triple.subjectId),
            batch.map((triple) => triple.predicateId),
            batch.map((triple) => triple.objectId),
          )
          const gasEstimate = await estimateGas(request)
          if (gasEstimate > 30000000) {
            throw new Error(
              'Gas estimate for batch triples will likely exceed block gas limit',
            )
          }
        }
        staticExecutionReverted = false
      } catch (error) {
        console.log(
          'Batch failed gas estimation, chunking further: ',
          latestBatch,
        )
        requestHash
          ? await pushUpdate(requestHash, `Reducing chunks: ${latestBatch}`)
          : null
        numChunks++
      }
    }

    if (staticExecutionReverted) {
      requestHash
        ? await pushUpdate(
          requestHash,
          'static execution reverted with chunk size of 1',
        )
        : null
      throw new Error('static execution reverted with chunk size of 1')
    }
  }

  const chunkSize = Math.ceil(triples.length / numChunks)

  // Then do it
  let lastChunkForDebug: Triple[] = []
  try {
    const chunks = chunk(triples, chunkSize)
    console.log('Number of batch triple chunks: ', numChunks)
    requestHash
      ? await pushUpdate(
        requestHash,
        `Number of batch triple chunks: ${numChunks}`,
      )
      : null
    console.log(
      'Chunk lengths: ',
      chunks.map((chunk) => chunk.length),
    )
    requestHash
      ? await pushUpdate(
        requestHash,
        `Chunk lengths: ${chunks.map((chunk) => chunk.length)}`,
      )
      : null
    for (const batch of chunks) {
      lastChunkForDebug = batch
      const txID = await batchCreateTriples(
        batch.map((triple) => triple.subjectId),
        batch.map((triple) => triple.predicateId),
        batch.map((triple) => triple.objectId),
      )
      result.push(txID)
      console.log('Batch transaction ID: ', txID)
      requestHash
        ? await pushUpdate(requestHash, `Batch transaction ID: ${txID}`)
        : null
    }
    return result
  } catch (error) {
    console.error('Error processing batch triples...', lastChunkForDebug)
    requestHash
      ? await pushUpdate(
        requestHash,
        `Error processing batch triples: ${error}`,
      )
      : null
    return result
  }
}

// In lieu of URI resolver
export async function getAtomDataFromID(atomID: string): Promise<any> {
  try {
    const atomURI = await getAtomURI(atomID)
    const atomData = await getURIData(atomURI)
    // Kind of a hack, but if it's not an IPFS CID, just return the URI
    if (
      typeof atomData === 'string' &&
      atomData === 'Invalid URL - ERR_ID:00004'
    ) {
      return { name: atomURI }
    }
    return atomData
  } catch (error) {
    console.error('Error getting atom data from ID:', atomID)
  }
  return null
}
