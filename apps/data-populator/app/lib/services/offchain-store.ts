/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAtomIdFromURI as getAtomIDFromEVM,
  getAtomURIFromID as getAtomURIFromEVM,
  getTripleByHash as getTripleByHashFromEVM,
  hashTriple,
} from './attestor'
import { getDataFromCID } from './cid'
import {
  getAtomID as getAtomIDFromSupabase,
  getAtomURI as getAtomURIFromSupabase,
  getTripleID as getTripleIdFromSupabase,
  getURIData as getURIDataFromSupabase,
  storeAtomURI,
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
