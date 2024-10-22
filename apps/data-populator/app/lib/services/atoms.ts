import { encodeFunctionData, parseUnits, toHex } from "viem"
import { getSender } from "./evm"
import { buildAtomChunks, cullExistingAtoms, getAtomIdsFromURI, pinAllData, PinDataResult, PopulateAtomsResponse } from "./populate"
import { createRequest, pushUpdate, updateRequest } from "./request"
import { MIN_DEPOSIT, MULTIVAULT_CONTRACT_ADDRESS } from "@consts/general"
import { multivaultAbi } from "@lib/abis/multivault"
import { appendToAtomLog } from "./supabase"
import logger from "@lib/utils/logger"

export type BatchAtomsRequest = {
  to: `0x${string}`
  data: `0x${string}`
  value: string
}

export async function createPopulateAtomsRequest(atoms: any[]) {
  const msgSender = await getSender()
  const requestHash = await createRequest(atoms, msgSender, 'createAtoms')
  return requestHash
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

export async function generateBatchAtomsCalldata(
  cids: string[],
  requestHash?: string,
): Promise<{
  chunks: string[][]
  chunkSize: number
  calls: BatchAtomsRequest[]
}> {
  const { chunks, chunkSize } = await buildAtomChunks(cids, requestHash)
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

export function getBatchAtomsCall(
  cids: string[],
): BatchAtomsRequest | undefined {
  const minDeposit = parseUnits(MIN_DEPOSIT, 18).toString()
  if (cids.length !== 0) {
    return {
      to: MULTIVAULT_CONTRACT_ADDRESS as `0x${string}`,
      data: encodeFunctionData({
        abi: multivaultAbi,
        functionName: 'batchCreateAtom',
        args: [cids.map((cid) => toHex(cid))],
      }),
      value: (BigInt(minDeposit) * BigInt(cids.length)).toString(),
    }
  }
}

export async function logTransactionHashAndVerifyAtoms(
  txHash: string,
  filteredCIDs: string[],
  filteredData: PinDataResult[],
  msgSender: `0x${string}`,
  oldAtomCIDs: string[],
  requestHash?: string,
): Promise<PopulateAtomsResponse> {
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
  const newAtoms = await getAtomIdsFromURI(filteredCIDs, 100)

  // Append to atom log
  console.log('Logging new atoms to database...')
  if (requestHash) {
    await pushUpdate(requestHash, 'Logging new atoms to database...')
  }

  for (const atom of newAtoms) {
    const filteredObj = filteredData.find(
      (data) => data.cid === atom.uri,
    )?.filteredObj

    if (filteredObj) {
      await appendToAtomLog(
        atom.atomId,
        atom.uri,
        txHash,
        filteredObj,
        msgSender,
      )
    } else {
      console.warn(`No filtered object found for atom with URI: ${atom.uri}`)
    }
  }

  // Verify old atom IDs from URIs
  console.log('Verifying old atom IDs...')
  if (requestHash) {
    await pushUpdate(requestHash, 'Verifying old atom IDs...')
  }
  const oldAtoms = await getAtomIdsFromURI(oldAtomCIDs, 100)

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