import {
  fetcher,
  FindAtomIdsDocument,
  FindTriplesDocument,
  GetTransactionEventsDocument,
  SearchPositionsDocument,
  type FindAtomIdsQuery,
  type FindAtomIdsQueryVariables,
  type FindTriplesQuery,
  type FindTriplesQueryVariables,
  type GetTransactionEventsQuery,
  type GetTransactionEventsQueryVariables,
  type SearchPositionsQuery,
  type SearchPositionsQueryVariables,
} from '@0xintuition/graphql'
import {
  createAtoms,
  createTriples,
  multiCallIntuitionConfigs,
} from '@0xintuition/protocol'

import { Address, Hex, PublicClient, toHex, WalletClient } from 'viem'

export async function search(
  searchFields: Array<Record<string, string>>,
  addresses: Address[],
) {
  const response = await fetcher<
    SearchPositionsQuery,
    SearchPositionsQueryVariables
  >(SearchPositionsDocument, {
    addresses: `{${addresses.map((a) => `"${a}"`).join(',')}}`,
    search_fields: searchFields,
  })()

  const result: Record<string, Record<string, string | string[]>> = {}

  for (const position of response.positions) {
    const triple = position.term.triple
    if (triple !== null && triple !== undefined) {
      const id = triple.subject.data
      const predicate = triple.predicate.data
      const object = triple.object.data
      if (
        id !== undefined &&
        id !== null &&
        predicate !== undefined &&
        predicate !== null &&
        object !== undefined &&
        object !== null
      ) {
        if (!result[id]) {
          result[id] = {}
        }
        if (typeof result[id][predicate] === 'string') {
          //@ts-ignore
          result[id][predicate] = [result[id][predicate], object]
        } else if (Array.isArray(result[id][predicate])) {
          //@ts-ignore
          result[id][predicate].push(object)
        } else {
          result[id][predicate] = object
        }
      }
    }
  }

  return result
}

export async function findAtomIds(atoms: string[]) {
  const response = await fetcher<FindAtomIdsQuery, FindAtomIdsQueryVariables>(
    FindAtomIdsDocument,
    {
      where: { data: { _in: atoms } },
    },
  )()

  return response.atoms
}

export async function wait(hash: string | null) {
  if (hash === null) {
    return
  }
  const promise = new Promise(async (resolve, reject) => {
    let count = 0
    while (true) {
      console.log(`Waiting for transaction ${hash}`)
      console.log(`Count: ${count}`)

      const data = await fetcher<
        GetTransactionEventsQuery,
        GetTransactionEventsQueryVariables
      >(GetTransactionEventsDocument, { hash })()

      if (data?.events.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return resolve(true)
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      count++
      if (count > 3600) {
        return reject(new Error('Transaction not found'))
      }
    }
  })
  return promise
}

export async function findTripleIds(
  address: Address,
  triplesWithAtomIds: Array<Array<string>>,
) {
  const response = await fetcher<FindTriplesQuery, FindTriplesQueryVariables>(
    FindTriplesDocument,
    {
      address: address,
      where: {
        _or: triplesWithAtomIds.map((t) => ({
          _and: [
            { subject_id: { _eq: t[0] } },
            { predicate_id: { _eq: t[1] } },
            { object_id: { _eq: t[2] } },
          ],
        })),
      },
    },
  )()

  return response.triples
}

interface SyncConfig {
  address: Address
  publicClient: PublicClient
  walletClient: WalletClient
}

export async function sync(
  config: SyncConfig,
  data: Record<string, Record<string, string | string[]>>,
) {
  if (!config.walletClient.account) {
    throw Error('Wallet client account is required')
  }

  const atoms = new Set<string>()
  const triples = new Map<string, Array<string>>()

  // figure out which atoms don't exist
  for (let subject of Object.keys(data)) {
    atoms.add(subject)
    // iterate over key-values
    for (let predicate of Object.keys(data[subject])) {
      atoms.add(predicate)
      const object = data[subject][predicate]
      // check if object is string or Array<string>
      if (typeof object === 'string') {
        atoms.add(object)
        triples.set(`${subject}|${predicate}|${object}`, [
          subject,
          predicate,
          object,
        ])
      } else if (Array.isArray(object)) {
        for (let item of object) {
          if (typeof item === 'string') {
            atoms.add(item)
            triples.set(`${subject}|${predicate}|${item}`, [
              subject,
              predicate,
              item,
            ])
          }
        }
      }
    }
  }

  // console.log({ atoms })
  const searchResult = await findAtomIds(Array.from(atoms))
  // console.log(searchResult)
  const nonExistingAtoms: string[] = []
  for (let atom of atoms) {
    if (!searchResult.find((i) => i.data === atom)) {
      nonExistingAtoms.push(atom)
    }
  }

  // console.log({ nonExistingAtoms })

  const multivaultConfig = await multiCallIntuitionConfigs(config)

  // Create missing atoms
  if (nonExistingAtoms.length > 0) {
    const assetsPerAtom = BigInt(multivaultConfig.atom_cost) + BigInt(multivaultConfig.min_deposit)
    const txHash = await createAtoms(config, {
      args: [
        nonExistingAtoms.map((data) => toHex(data)),
        nonExistingAtoms.map(() => assetsPerAtom),
      ],
      value: assetsPerAtom * BigInt(nonExistingAtoms.length),
    })
    // console.log(txHash)
    await wait(txHash)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  const atomsWithIds = await findAtomIds(Array.from(atoms))
  // console.log({ atomsWithIds })

  // figure out which triples don't exist
  // console.log({ triples })

  // convert "text triples" into "atomId triples"

  const triplesWithAtomIds: Array<Array<Hex>> = []

  for (let triple of triples.values()) {
    const subjectAtom = atomsWithIds.find((a: any) => a.data === triple[0])
    const predicateAtom = atomsWithIds.find((a: any) => a.data === triple[1])
    const objectAtom = atomsWithIds.find((a: any) => a.data === triple[2])

    if (!subjectAtom || !predicateAtom || !objectAtom) {
      console.error('Missing atom for triple:', triple)
      continue
    }

    triplesWithAtomIds.push([
      subjectAtom.term_id,
      predicateAtom.term_id,
      objectAtom.term_id,
    ])
  }

  // console.log({ triplesWithAtomIds })

  const tripleIds = await findTripleIds(
    config.walletClient.account.address,
    triplesWithAtomIds,
  )
  // console.log({ tripleIds })

  // which triples are missing?
  const missingTriples: Array<Array<Hex>> = []

  for (let triple of triplesWithAtomIds) {
    if (
      !tripleIds.find(
        (t: any) =>
          t.subject_id === triple[0] &&
          t.predicate_id === triple[1] &&
          t.object_id === triple[2],
      )
    ) {
      missingTriples.push(triple)
    }
  }

  // console.log({ missingTriples })

  // create missing triples

  if (missingTriples.length > 0) {
    const assetsPerTriple = BigInt(multivaultConfig.triple_cost) + BigInt(multivaultConfig.min_deposit)

    const triple_tx_hash = await createTriples(config, {
      args: [
        missingTriples.map((t) => t[0]),
        missingTriples.map((t) => t[1]),
        missingTriples.map((t) => t[2]),
        missingTriples.map((t) => assetsPerTriple),
      ],
      value: assetsPerTriple * BigInt(missingTriples.length),
    })

    // console.log({ triple_tx_hash })
    await wait(triple_tx_hash)
  }

  // figure out which triples don't have user's position
  return true
}
