/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js'

import { getSender } from './requestSender'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!
export const supabase = createClient(supabaseUrl, supabaseKey)
const environment = import.meta.env.VITE_DEPLOY_ENV!

const imageMappingTable =
  environment === 'development' ? 'image_mapping_dev' : 'image_mapping'
const atomLogTable = environment === 'development' ? 'atom_log_dev' : 'atom_log'
const tripleLogTable =
  environment === 'development' ? 'triple_log_dev' : 'triple_log'
const uriTable = environment === 'development' ? 'atom_uris_dev' : 'atom_uris'
const tripleTable = environment === 'development' ? 'triples_dev' : 'triples'
const dataTable = 'uri_data' // only one environment for URIs

// Function to insert or update a key-value pair in the mapping table
export async function insertIntoMapping(
  key: string,
  value: string,
): Promise<void> {
  const { error } = await supabase
    .from(imageMappingTable)
    .upsert({ key, value })

  if (error) {
    console.error(`Failed to insert or update mapping: ${error.message}`)
    throw error
  }
}

// Function to search for a value by key in the mapping table
export async function searchMapping(key: string): Promise<string | null> {
  const { data, error } = (await supabase
    .from(imageMappingTable)
    .select('value')
    .eq('key', key)
    .single()) as any // TODO: fix this

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error(`Failed to search mapping: ${error.message}`)
    return null
  }

  return data ? data.value : null
}

export async function multiSearchMapping(
  keys: string[],
): Promise<(string | null)[]> {
  const batchSize = 100 // Adjust batch size as needed
  const results: (string | null)[] = []

  for (let i = 0; i < keys.length; i += batchSize) {
    const batchKeys = keys.slice(i, i + batchSize)

    const { data, error } = await supabase
      .from(imageMappingTable)
      .select('key, value')
      .in('key', batchKeys)

    if (error) {
      console.error(
        `Failed to fetch batch starting at index ${i}: ${error.message}`,
      )
      // Fill the results with nulls for this batch
      results.push(...batchKeys.map(() => null))
    } else if (data) {
      // Create a map for quick lookup
      const keyValueMap = new Map(
        data.map((row: { key: string; value: string }) => [row.key, row.value]),
      )
      // Map the batch keys to their corresponding values or null
      results.push(...batchKeys.map((key) => keyValueMap.get(key) || null))
    } else {
      // If data is undefined, fill the results with nulls for this batch
      results.push(...batchKeys.map(() => null))
    }
  }

  return results
}

// Interfaces for log entries
export interface AtomLogEntry {
  id: string
  cid: string
  txHash: string
  data: any
  sender: string
}

export interface TripleLogEntry {
  id: string
  txHash: string
  subjectId: string
  predicateId: string
  objectId: string
  sender: string
}

// Function to append a new entry to the atom_log table
export async function appendToAtomLog(
  id: string,
  cid: string,
  txHash: string,
  data: any,
  sender: string,
): Promise<void> {
  const { error } = await supabase
    .from(atomLogTable)
    .insert({ id, cid, txHash, data, sender })

  if (error) {
    console.error('Error appending to atom_log:', error)
    throw error
  }
}

export async function multiAppendToAtomLog(
  entries: AtomLogEntry[],
): Promise<void> {
  const { error } = await supabase.from(atomLogTable).insert(entries)

  if (error) {
    console.error('Error appending to atom_log:', error)
    throw error
  }
}

// Function to append a new entry to the triple_log table
export async function appendToTripleLog(
  id: string,
  txHash: string,
  subjectId: string,
  predicateId: string,
  objectId: string,
  sender: string,
): Promise<void> {
  const { error } = await supabase
    .from(tripleLogTable)
    .insert({ id, txHash, subjectId, predicateId, objectId, sender })

  if (error) {
    console.error('Error appending to triple_log:', error)
    throw error
  }
}

// Function to search the atom_log table based on various criteria
export async function searchAtomLog(
  searchTerm: string,
  searchTxHash: boolean = true,
  searchID: boolean = true,
  searchCID: boolean = true,
  searchData: boolean = true,
  searchSender: boolean = true,
  limit: number = 100,
  offset: number = 0,
): Promise<AtomLogEntry[]> {
  const conditions: string[] = []

  if (searchID) {
    conditions.push(`id.ilike.%${searchTerm}%`)
  }
  if (searchCID) {
    conditions.push(`cid.ilike.%${searchTerm}%`)
  }
  if (searchTxHash) {
    conditions.push(`txHash.ilike.%${searchTerm}%`)
  }
  if (searchData) {
    // Note: Full-text search on JSON fields may require additional setup
    conditions.push(`data::text.ilike.%${searchTerm}%`)
  }
  if (searchSender) {
    conditions.push(`sender.ilike.%${searchTerm}%`)
  }

  if (conditions.length === 0) {
    return []
  }

  const { data, error } = await supabase
    .from(atomLogTable)
    .select('*')
    .or(conditions.join(','))
    .range(offset, offset + limit - 1)
  if (error) {
    console.error('Error searching atom_log:', error)
    return []
  }

  return data as unknown as AtomLogEntry[] // TODO: fix this
}

// Function to search the triple_log table based on various criteria
export async function searchTripleLog(
  searchTerm: string,
  searchId: boolean = true,
  searchTxHash: boolean = true,
  searchSubjectId: boolean = true,
  searchPredicateId: boolean = true,
  searchObjectId: boolean = true,
  searchSender: boolean = true,
  limit: number = 100,
  offset: number = 0,
): Promise<TripleLogEntry[]> {
  const conditions: string[] = []

  if (searchId) {
    conditions.push(`id.ilike.%${searchTerm}%`)
  }
  if (searchTxHash) {
    conditions.push(`txHash.ilike.%${searchTerm}%`)
  }
  if (searchSubjectId) {
    conditions.push(`subjectId.ilike.%${searchTerm}%`)
  }
  if (searchPredicateId) {
    conditions.push(`predicateId.ilike.%${searchTerm}%`)
  }
  if (searchObjectId) {
    conditions.push(`objectId.ilike.%${searchTerm}%`)
  }
  if (searchSender) {
    conditions.push(`sender.ilike.%${searchTerm}%`)
  }

  if (conditions.length === 0) {
    return []
  }

  const { data, error } = await supabase
    .from(tripleLogTable)
    .select('*')
    .or(conditions.join(','))
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error searching triple_log:', error)
    return []
  }

  return data as unknown as TripleLogEntry[] // TODO: fix this
}

export async function getAtomsBySender(
  sender: string,
  limit: number = 100,
  offset: number = 0,
): Promise<AtomLogEntry[]> {
  return await searchAtomLog(
    sender,
    false,
    false,
    false,
    false,
    true,
    limit,
    offset,
  )
}

export async function getTriplesBySender(
  sender: string,
  limit: number = 100,
  offset: number = 0,
): Promise<TripleLogEntry[]> {
  return await searchTripleLog(
    sender,
    false,
    false,
    false,
    false,
    false,
    true,
    limit,
    offset,
  )
}

// Temporary helpers before we have auth
export async function getMyAtoms(
  nodeRequest?: Request,
  limit: number = 100,
  offset: number = 0,
): Promise<AtomLogEntry[]> {
  const sender = await getSender(nodeRequest)
  return await searchAtomLog(
    sender,
    false,
    false,
    false,
    false,
    true,
    limit,
    offset,
  )
}

export async function getMyTriples(
  nodeRequest?: Request,
  limit: number = 100,
  offset: number = 0,
): Promise<TripleLogEntry[]> {
  const sender = await getSender(nodeRequest)
  return await searchTripleLog(
    sender,
    false,
    false,
    false,
    false,
    false,
    true,
    limit,
    offset,
  )
}

export async function getAtomURI(id: string): Promise<string | null> {
  const { data, error } = (await supabase
    .from(uriTable)
    .select('uri')
    .eq('id', id)
    .single()) as any // TODO: fix this

  if (error) {
    console.error('Error getting URI:', error)
    return null
  }

  return data ? data.uri : null
}

export async function getAtomID(uri: string): Promise<string | null> {
  const { data, error } = (await supabase
    .from(uriTable)
    .select('id')
    .eq('uri', uri)
    .single()) as any // TODO: fix this

  if (error) {
    console.error('Error getting ID:', error)
    console.log('URI:', uri)
    return null
  }

  return data ? data.id : null
}

export async function getAtomIDs(uris: string[]): Promise<(string | null)[]> {
  const batchSize = 100 // Adjust batch size as needed
  const results: (string | null)[] = []

  for (let i = 0; i < uris.length; i += batchSize) {
    const batchURIs = uris.slice(i, i + batchSize)

    const { data, error } = await supabase
      .from(uriTable)
      .select('uri, id')
      .in('uri', batchURIs)

    console.log('Batch URIs from supabase:', data)

    if (error) {
      console.error(
        `Failed to fetch batch starting at index ${i}: ${error.message}`,
      )
      // Fill the results with nulls for this batch
      results.push(...batchURIs.map(() => null))
    } else if (data) {
      // Create a map for quick lookup
      const uriIDMap = new Map(
        data.map((row: { uri: string; id: string }) => [row.uri, row.id]),
      )
      // Map the batch URIs to their corresponding IDs or null
      results.push(...batchURIs.map((uri) => uriIDMap.get(uri) || null))
    } else {
      // If data is undefined, fill the results with nulls for this batch
      results.push(...batchURIs.map(() => null))
    }
  }

  return results
}

export async function storeAtomURI(id: string, uri: string): Promise<void> {
  const { error } = await supabase.from(uriTable).insert({ id, uri })

  if (error) {
    console.error('Error storing URI:', error)
    console.log('ID:', id)
    console.log('URI:', uri)
  }
}

export async function storeAtomURIs(
  atomIDsToStore: Map<string, string>,
): Promise<void> {
  const { error } = await supabase
    .from(uriTable)
    .insert(
      Array.from(atomIDsToStore.entries()).map(([uri, id]) => ({ id, uri })),
    )

  if (error) {
    console.error('Error storing URIs:', error)
  }
}

export interface Triple {
  hash: string
  id: string
  subject: string
  predicate: string
  object: string
}

export async function getTripleID(hash: string): Promise<string | null> {
  const { data, error } = (await supabase
    .from(tripleTable)
    .select('id')
    .eq('hash', hash)
    .single()) as any // TODO: fix this

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error getting triple data:', error)
    }
    return null
  }

  return data ? data.id : null
}

export async function getTripleData(id: string): Promise<Triple | null> {
  const { data, error } = await supabase
    .from(tripleTable)
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error getting triple data:', error)
    }
    return null
  }

  return data as unknown as Triple | null // TODO: fix this
}

export async function storeTriple(triple: Triple): Promise<void> {
  const { error } = await supabase.from(tripleTable).insert(triple)

  if (error) {
    console.error('Error storing triple:', error)
  }
}

export async function getURIData(uri: string): Promise<any | null> {
  const { data, error } = (await supabase
    .from(dataTable)
    .select('*')
    .eq('uri', uri)
    .single()) as any // TODO: fix this

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error getting URI data:', error)
    }
    return null
  }

  return data
}

export async function storeURIData(uri: string, data: any): Promise<void> {
  const { error } = await supabase.from(dataTable).insert({ uri, data })

  if (error) {
    console.error('Error storing URI data:', error)
  }
}
