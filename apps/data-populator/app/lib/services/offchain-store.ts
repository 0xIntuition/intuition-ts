/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  bulkEVMRead,
  getAtomIdFromURI as getAtomIDFromEVM,
  getAtomURIFromID as getAtomURIFromEVM,
  getTripleByHash as getTripleByHashFromEVM,
  hashTriple,
} from './attestor'
import { getDataFromCID } from './cid'
import {
  getAtomID as getAtomIDFromSupabase,
  getAtomIDs as getAtomIDsFromSupabase,
  getAtomURI as getAtomURIFromSupabase,
  getTripleID as getTripleIdFromSupabase,
  getURIData as getURIDataFromSupabase,
  storeAtomURI,
  storeAtomURIs,
  storeTriple,
  storeURIData,
} from './supabase'

export async function getAtomURI(id: string): Promise<string> {
  const storedURI = await getAtomURIFromSupabase(id)
  if (storedURI) {
    return storedURI
  }
  const evmURI = await getAtomURIFromEVM(id)
  if (evmURI !== '0') {
    await storeAtomURI(id, evmURI)
  }
  return evmURI
}

export async function getAtomID(uri: string): Promise<string> {
  const storedID = await getAtomIDFromSupabase(uri)
  if (storedID) {
    return storedID
  }
  const evmID = await getAtomIDFromEVM(uri)
  if (evmID !== '0') {
    await storeAtomURI(evmID, uri)
  }
  return evmID
}

export async function getAtomIDs(uris: string[]): Promise<string[]> {
  const storedIDs = await getAtomIDsFromSupabase(uris)
  console.log('Stored IDs:', storedIDs)

  // Identify URIs that need to be fetched from EVM
  const urisToFetchFromEVM: string[] = []
  const uriIndices: number[] = [] // Track indices of missing IDs

  for (let i = 0; i < storedIDs.length; i++) {
    if (storedIDs[i] === null) {
      urisToFetchFromEVM.push(uris[i])
      uriIndices.push(i)
    }
  }

  console.log('URIs to fetch from EVM:', urisToFetchFromEVM)

  // Fetch missing IDs in bulk from EVM
  const fetchedEVMIDs = await bulkEVMRead(
    getAtomIDFromEVM,
    urisToFetchFromEVM,
    {
      chunkSize: 1000,
      delayBetweenReads: 0,
      delayBetweenChunks: 0,
    },
  )

  console.log('Fetched EVM IDs:', fetchedEVMIDs)

  // Map fetched EVM IDs back to their indices in the original array
  const returnedIDs = [...storedIDs] // Start with stored IDs
  const atomIDsToStore: Map<string, string> = new Map()

  uriIndices.forEach((index, i) => {
    const evmID = fetchedEVMIDs[i]
    if (evmID !== '0') {
      atomIDsToStore.set(evmID, uris[index])
    }
    returnedIDs[index] = evmID
  })

  // Store fetched IDs in Supabase if needed
  if (atomIDsToStore.size > 0) {
    await storeAtomURIs(atomIDsToStore)
  }

  return returnedIDs as string[]
}

export async function getTripleID(
  subject: string,
  predicate: string,
  object: string,
): Promise<string> {
  const tripleHash = hashTriple(subject, predicate, object)
  const tripleID = await getTripleIdFromSupabase(tripleHash)
  if (tripleID) {
    return tripleID
  }
  const evmID = await getTripleByHashFromEVM(tripleHash)
  if (evmID !== '0') {
    await storeTriple({
      id: evmID,
      hash: tripleHash,
      subject,
      predicate,
      object,
    })
  }
  return evmID
}

// In lieu of URI resolver
export async function getURIData(uri: string): Promise<any> {
  const storedData = await getURIDataFromSupabase(uri)
  if (storedData) {
    return storedData.data
  }
  // cull out the ipfs://
  const cid = uri.split('ipfs://')[1]
  const data = await getDataFromCID(cid)
  if (data !== '') {
    // URI is not an IPFS CID
    if (typeof data === 'string' && data === 'Invalid URL - ERR_ID:00004') {
      return data // "Handler" will parse this
    }
    await storeURIData(uri, data)
  }
  return data
}
