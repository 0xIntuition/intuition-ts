import { Thing, WithContext } from "schema-dts"
import { estimateGas, getSender } from "./evm"
import { createRequest, pushUpdate } from "./request"
import { chunk, cullExistingTriples, getTripleIdsFromTripleData, prepareTriplesFromTagAndAtomIDs, TagAtomIDsResponse, Triple } from "./populate"
import logger from "@lib/utils/logger"
import { batchCreateTripleRequest } from "./attestor"
import { encodeFunctionData, parseUnits } from "viem"
import { MIN_DEPOSIT, MULTIVAULT_CONTRACT_ADDRESS } from "@consts/general"
import { multivaultAbi } from "@lib/abis/multivault"
import { appendToTripleLog } from "./supabase"

export type BatchTriplesRequest = {
  to: `0x${string}`
  data: `0x${string}`
  value: string
}

export async function createPopulateTriplesRequest(
  atoms: any[],
  // tag: WithContext<Thing>,
) {
  try {
    const msgSender = await getSender() // TODO: Replace with user
    const requestHash = await createRequest(atoms, msgSender, 'createTriples')
    return requestHash
  } catch (error) {
    console.error('Error populating and tagging atoms:', error)
  }
}

export type PrepareTriplesResponse = {
  newTripleIds: string[]
  existingTripleIds: string[]
  newTriples: Triple[]
  existingTriples: Triple[]
}

export async function prepareTriples(
  tag: WithContext<Thing>,
  atomIDs: string[],
  requestHash?: string,
): Promise<PrepareTriplesResponse> {
  let response: PrepareTriplesResponse = {
    newTripleIds: [],
    existingTripleIds: [],
    newTriples: [],
    existingTriples: [],
  }
  try {
    logger('Preparing create triples request...')
    await pushUpdate(requestHash, 'Preparing create triples request...')

    const triples = await prepareTriplesFromTagAndAtomIDs(tag, atomIDs, requestHash)

    // Check if any triples already exist and remove them from the batch request
    logger('Checking for existing triples...')
    await pushUpdate(requestHash, 'Checking for existing triples...')
    // eslint-disable-next-line prefer-const
    let [newTriples, existingTriples] = await cullExistingTriples(triples, 100)
    logger(`Found ${newTriples.length} new triples. \nFound ${existingTriples.length} existing triples.`)
    await pushUpdate(requestHash, `Found ${newTriples.length} new triples. \nFound ${existingTriples.length} existing triples.`)

    response.newTriples = newTriples
    response.existingTriples = existingTriples
    response.newTripleIds = newTriples.map((triple) => triple.tripleId).filter((id): id is string => id !== undefined)
    response.existingTripleIds = existingTriples.map((triple) => triple.tripleId).filter((id): id is string => id !== undefined)
    return response
  } catch (error) {
    console.error('Error preparing triples:', error)
  }
  return response
}

export async function generateBatchTriplesCalldata(
  triples: Triple[],
  requestHash?: string,
): Promise<{
  chunks: Triple[][]
  chunkSize: number
  calls: BatchTriplesRequest[]
}> {
  const { chunks, chunkSize } = await buildTripleChunks(triples, requestHash)
  const calls = chunks.map(getBatchTriplesCall).filter((call): call is BatchTriplesRequest => call !== undefined)
  if (calls.length > 0) {
    await pushUpdate(requestHash, `Generated ${calls.length} batch triple calls:\n${calls.map((call) => call.data).join('\n')}`)
  }
  return { chunks, chunkSize, calls }
}


export function getBatchTriplesCall(
  triples: Triple[],
): BatchTriplesRequest | undefined {
  const minDeposit = parseUnits(MIN_DEPOSIT, 18).toString()
  const batchValue = BigInt(minDeposit) * BigInt(triples.length)
  if (triples.length !== 0) {
    return {
      to: MULTIVAULT_CONTRACT_ADDRESS as `0x${string}`,
      data: encodeFunctionData({
        abi: multivaultAbi,
        functionName: 'batchCreateTriple',
        args: [triples.map((triple) => triple.subjectId), triples.map((triple) => triple.predicateId), triples.map((triple) => triple.objectId)],
      }),
      value: batchValue.toString(),
    }
  }
}

export async function buildTripleChunks(triples: Triple[], requestHash?: string) {
  console.log('Processing batch triples')
  await pushUpdate(requestHash, 'Processing batch triples')
  if (triples.length === 0) {
    await pushUpdate(requestHash, 'No new triples to create')
    console.log('No new triples to create')
    return { chunks: [], chunkSize: 0, calls: [] }
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
  const chunks = chunk(triples, chunkSize)

  // Then do it
  console.log('Number of batch triple chunks: ', numChunks)
  console.log('Chunk lengths: ', chunks.map((chunk) => chunk.length))
  await pushUpdate(
    requestHash,
    `Number of batch triple chunks: ${numChunks}`,
  )
  await pushUpdate(requestHash, `Chunk lengths: ${chunks.map((chunk) => chunk.length)}`)
  return { chunks, chunkSize }
}

export async function logTransactionHashAndVerifyTriples(
  txHash: string,
  triples: Triple[],
  msgSender: `0x${string}`,
  requestHash?: string,
) {
  console.log(`Logging transaction hash: ${txHash}`)
  await pushUpdate(requestHash, `Logging transaction hash: ${txHash}`)

  // TODO: Implement actual logging logic here
  // This could involve writing to a file, sending to an API, or updating a database
  // For now, we'll just log to the console
  console.log(`Transaction hash ${txHash} logged successfully`)

  // Verify atom IDs from URIs
  console.log('Verifying new triples IDs...')
  await pushUpdate(requestHash, 'Verifying new triples IDs...')

  const newTriples = await getTripleIdsFromTripleData(triples, 100)
  newTriples.forEach(
    async (triple) =>
      await appendToTripleLog(
        triple.tripleId as string,
        txHash,
        triple.subjectId,
        triple.predicateId,
        triple.objectId,
        msgSender as `0x${string}`,
      ),
  )
  console.log('Done tagging atoms.')
  requestHash ? await pushUpdate(requestHash, 'Done tagging atoms.') : null
  // TODO: Conclude request
}