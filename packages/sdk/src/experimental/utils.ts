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
  depositBatch,
  multiCallIntuitionConfigs,
} from '@0xintuition/protocol'

import {
  Address,
  formatEther,
  Hex,
  keccak256,
  PublicClient,
  toHex,
  WalletClient,
} from 'viem'

// Constants
const DEFAULT_POLLING_INTERVAL = 1000
const DEFAULT_POST_TRANSACTION_DELAY = 2000
const DEFAULT_TIMEOUT_COUNT = 3600

type SearchResult = Record<string, Record<string, string | string[]>>
type AtomWithId = { data: string; term_id: string }
type TripleWithIds = {
  term_id: string
  subject_id: string
  predicate_id: string
  object_id: string
  positions: Array<{ shares: string }>
}

export async function search(
  searchFields: Array<Record<string, string>>,
  addresses: Address[],
): Promise<SearchResult> {
  try {
    const response = await fetcher<
      SearchPositionsQuery,
      SearchPositionsQueryVariables
    >(SearchPositionsDocument, {
      addresses: `{${addresses.map((a) => `"${a}"`).join(',')}}`,
      search_fields: searchFields,
    })()

    const result: SearchResult = {}

    for (const position of response.positions) {
      const triple = position?.term?.triple
      if (
        triple?.subject?.data &&
        triple?.predicate?.data &&
        triple?.object?.data
      ) {
        const id = triple.subject.data
        const predicate = triple.predicate.data
        const object = triple.object.data

        if (!result[id]) {
          result[id] = {}
        }

        const currentValue = result[id][predicate]
        if (typeof currentValue === 'string') {
          result[id][predicate] = [currentValue, object]
        } else if (Array.isArray(currentValue)) {
          currentValue.push(object)
        } else {
          result[id][predicate] = object
        }
      }
    }

    return result
  } catch (error) {
    throw new Error(
      `Failed to search positions: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

export async function findAtomIds(atoms: string[]): Promise<AtomWithId[]> {
  try {
    const batchSize = 100
    const allAtoms: AtomWithId[] = []

    // If we have 100 or fewer atoms, use the original approach
    if (atoms.length <= batchSize) {
      const response = await fetcher<
        FindAtomIdsQuery,
        FindAtomIdsQueryVariables
      >(FindAtomIdsDocument, {
        where: { data: { _in: atoms } },
        limit: batchSize,
      })()
      return response.atoms as AtomWithId[]
    }

    // For more than 100 atoms, process in batches
    const atomChunks = chunkArray(atoms, batchSize)

    for (const chunk of atomChunks) {
      const response = await fetcher<
        FindAtomIdsQuery,
        FindAtomIdsQueryVariables
      >(FindAtomIdsDocument, {
        where: { data: { _in: chunk } },
        limit: batchSize,
      })()
      allAtoms.push(...(response.atoms as AtomWithId[]))
    }

    return allAtoms
  } catch (error) {
    throw new Error(
      `Failed to find atom IDs: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

interface WaitOptions {
  pollingInterval?: number
  timeout?: number
  postTransactionDelay?: number
  onProgress?: (attempt: number) => void
}

export async function wait(
  hash: string | null,
  options: WaitOptions = {},
): Promise<void> {
  if (hash === null) {
    return
  }

  const {
    pollingInterval = DEFAULT_POLLING_INTERVAL,
    timeout = DEFAULT_TIMEOUT_COUNT * DEFAULT_POLLING_INTERVAL,
    postTransactionDelay = DEFAULT_POST_TRANSACTION_DELAY,
    onProgress,
  } = options

  const startTime = Date.now()

  return new Promise((resolve, reject) => {
    let attempt = 0

    const poll = async () => {
      try {
        if (onProgress) {
          onProgress(attempt)
        }

        const data = await fetcher<
          GetTransactionEventsQuery,
          GetTransactionEventsQueryVariables
        >(GetTransactionEventsDocument, { hash })()

        if (data?.events.length > 0) {
          setTimeout(() => resolve(), postTransactionDelay)
          return
        }

        if (Date.now() - startTime > timeout) {
          reject(
            new Error(
              `Transaction timeout: ${hash} not found after ${timeout}ms`,
            ),
          )
          return
        }

        attempt++
        setTimeout(poll, pollingInterval)
      } catch (error) {
        reject(
          new Error(
            `Failed to check transaction status: ${error instanceof Error ? error.message : 'Unknown error'}`,
          ),
        )
      }
    }

    poll()
  })
}

export async function findTripleIds(
  address: Address,
  triplesWithAtomIds: Array<Array<string>>,
): Promise<TripleWithIds[]> {
  try {
    const batchSize = 100
    const allTriples: TripleWithIds[] = []

    // If we have 100 or fewer triples, use the original approach
    if (triplesWithAtomIds.length <= batchSize) {
      const response = await fetcher<
        FindTriplesQuery,
        FindTriplesQueryVariables
      >(FindTriplesDocument, {
        limit: batchSize,
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
      })()
      return response.triples as TripleWithIds[]
    }

    // For more than 100 triples, process in batches
    const tripleChunks = chunkArray(triplesWithAtomIds, batchSize)

    for (const chunk of tripleChunks) {
      const response = await fetcher<
        FindTriplesQuery,
        FindTriplesQueryVariables
      >(FindTriplesDocument, {
        limit: batchSize,
        address: address,
        where: {
          _or: chunk.map((t) => ({
            _and: [
              { subject_id: { _eq: t[0] } },
              { predicate_id: { _eq: t[1] } },
              { object_id: { _eq: t[2] } },
            ],
          })),
        },
      })()
      allTriples.push(...(response.triples as TripleWithIds[]))
    }

    return allTriples
  } catch (error) {
    throw new Error(
      `Failed to find triple IDs: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

interface SyncConfig {
  address: Address
  publicClient: PublicClient
  walletClient: WalletClient
  logger?: (message: string) => void
  batchSize?: number
  dryRun?: boolean
}

interface CostEstimation {
  totalCost: bigint
  atomCost: bigint
  tripleCost: bigint
  depositCost: bigint
  atomCount: number
  tripleCount: number
  depositCount: number
  userBalance: bigint
  hasSufficientBalance: boolean
}

function findAtomByData(
  atoms: AtomWithId[],
  data: string,
): AtomWithId | undefined {
  return atoms.find((atom) => atom.data === data)
}

function findTripleByIds(
  triples: TripleWithIds[],
  subjectId: string,
  predicateId: string,
  objectId: string,
): TripleWithIds | undefined {
  return triples.find(
    (triple) =>
      triple.subject_id === subjectId &&
      triple.predicate_id === predicateId &&
      triple.object_id === objectId,
  )
}

function validateHex(value: string): value is Hex {
  return /^0x[0-9a-fA-F]+$/.test(value)
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

async function getUserBalance(
  publicClient: PublicClient,
  address: Address,
): Promise<bigint> {
  return await publicClient.getBalance({ address })
}

export async function sync(
  config: SyncConfig,
  data: Record<string, Record<string, string | string[]>>,
): Promise<boolean | CostEstimation> {
  if (!config.walletClient.account) {
    throw Error('Wallet client account is required')
  }

  const log = config.logger || (() => {})
  const batchSize = config.batchSize || 50

  const atoms = new Set<string>()
  const triples = new Map<string, Array<string>>()

  log('🔍 Analyzing data structure...')
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

  log(
    `📊 Found ${atoms.size} unique atoms and ${triples.size} triples to process`,
  )

  log('🔎 Checking which atoms already exist...')
  const searchResult = await findAtomIds(Array.from(atoms))
  const nonExistingAtoms: string[] = []
  for (let atom of atoms) {
    if (!findAtomByData(searchResult, atom)) {
      nonExistingAtoms.push(atom)
    }
  }

  log(
    `✅ Found ${searchResult.length} existing atoms, ${nonExistingAtoms.length} need to be created`,
  )

  const multivaultConfig = await multiCallIntuitionConfigs(config)

  // Calculate costs for atoms
  const assetsPerAtom =
    BigInt(multivaultConfig.atom_cost) + BigInt(multivaultConfig.min_deposit)
  const atomCost = assetsPerAtom * BigInt(nonExistingAtoms.length)

  // Create missing atoms
  if (nonExistingAtoms.length > 0) {
    const atomChunks = chunkArray(nonExistingAtoms, batchSize)

    if (config.dryRun) {
      log(
        `🔍 [DRY RUN] Would create ${nonExistingAtoms.length} missing atoms in ${atomChunks.length} batches...`,
      )
    } else {
      log(
        `⚛️  Creating ${nonExistingAtoms.length} missing atoms in ${atomChunks.length} batches...`,
      )
    }

    if (!config.dryRun) {
      for (let i = 0; i < atomChunks.length; i++) {
        const chunk = atomChunks[i]
        log(
          `⚛️  Creating atoms batch ${i + 1}/${atomChunks.length} (${chunk.length} atoms)...`,
        )

        const txHash = await createAtoms(config, {
          args: [
            chunk.map((data) => toHex(data)),
            chunk.map(() => assetsPerAtom),
          ],
          value: assetsPerAtom * BigInt(chunk.length),
        })

        log(`⏳ Waiting for atom creation transaction: ${txHash}`)
        await wait(txHash)
        await new Promise((resolve) =>
          setTimeout(resolve, DEFAULT_POST_TRANSACTION_DELAY),
        )
      }
    }

    if (config.dryRun) {
      log('🔍 [DRY RUN] Atoms would be created successfully')
    } else {
      log('✅ Atoms created successfully')
    }
  } else {
    log('✅ All atoms already exist')
  }

  log('🔄 Fetching updated atom IDs...')
  const atomsWithIds = config.dryRun
    ? [
        ...searchResult,
        ...nonExistingAtoms.map((data) => ({
          data,
          term_id: keccak256(toHex(data)),
        })),
      ]
    : await findAtomIds(Array.from(atoms))

  const triplesWithAtomIds: Array<Array<Hex>> = []

  for (let triple of triples.values()) {
    const subjectAtom = findAtomByData(atomsWithIds, triple[0])
    const predicateAtom = findAtomByData(atomsWithIds, triple[1])
    const objectAtom = findAtomByData(atomsWithIds, triple[2])

    if (!subjectAtom || !predicateAtom || !objectAtom) {
      throw new Error(`Missing atom for triple: ${triple.join(' -> ')}`)
    }

    if (
      !validateHex(subjectAtom.term_id) ||
      !validateHex(predicateAtom.term_id) ||
      !validateHex(objectAtom.term_id)
    ) {
      throw new Error(
        `Invalid hex format in term IDs for triple: ${triple.join(' -> ')}`,
      )
    }

    triplesWithAtomIds.push([
      subjectAtom.term_id as Hex,
      predicateAtom.term_id as Hex,
      objectAtom.term_id as Hex,
    ])
  }

  log('🔍 Checking which triples already exist...')
  const tripleIds = await findTripleIds(
    config.walletClient.account.address,
    triplesWithAtomIds,
  )

  const missingTriples: Array<Array<Hex>> = []

  for (let triple of triplesWithAtomIds) {
    if (!findTripleByIds(tripleIds, triple[0], triple[1], triple[2])) {
      missingTriples.push(triple)
    }
  }

  log(
    `✅ Found ${tripleIds.length} existing triples, ${missingTriples.length} need to be created`,
  )

  // Calculate costs for triples
  const assetsPerTriple =
    BigInt(multivaultConfig.triple_cost) + BigInt(multivaultConfig.min_deposit)
  const tripleCost = assetsPerTriple * BigInt(missingTriples.length)

  if (missingTriples.length > 0) {
    const tripleChunks = chunkArray(missingTriples, batchSize)

    if (config.dryRun) {
      log(
        `🔍 [DRY RUN] Would create ${missingTriples.length} missing triples in ${tripleChunks.length} batches...`,
      )
    } else {
      log(
        `🔗 Creating ${missingTriples.length} missing triples in ${tripleChunks.length} batches...`,
      )
    }

    if (!config.dryRun) {
      for (let i = 0; i < tripleChunks.length; i++) {
        const chunk = tripleChunks[i]
        log(
          `🔗 Creating triples batch ${i + 1}/${tripleChunks.length} (${chunk.length} triples)...`,
        )

        const triple_tx_hash = await createTriples(config, {
          args: [
            chunk.map((t) => t[0]),
            chunk.map((t) => t[1]),
            chunk.map((t) => t[2]),
            chunk.map((t) => assetsPerTriple),
          ],
          value: assetsPerTriple * BigInt(chunk.length),
        })

        log(`⏳ Waiting for triple creation transaction: ${triple_tx_hash}`)
        await wait(triple_tx_hash)
      }
    }

    if (config.dryRun) {
      log('🔍 [DRY RUN] Triples would be created successfully')
    } else {
      log('✅ Triples created successfully')
    }
  } else {
    log('✅ All triples already exist')
  }

  // Get all existing triple IDs after creation
  log('🔄 Fetching updated triple IDs...')
  const allTripleIds = config.dryRun
    ? [
        ...tripleIds,
        ...missingTriples.map((triple, i) => ({
          term_id: `${i}`,
          subject_id: triple[0],
          predicate_id: triple[1],
          object_id: triple[2],
          positions: [],
        })),
      ]
    : await findTripleIds(
        config.walletClient.account.address,
        triplesWithAtomIds,
      )

  // Find triples where user has no position or zero shares
  log('💰 Checking positions and deposits...')
  const triplesNeedingDeposit = allTripleIds.filter((triple) => {
    return (
      triple.positions.length === 0 ||
      triple.positions.every((pos) => BigInt(pos.shares) === 0n)
    )
  })

  log(`💼 Found ${triplesNeedingDeposit.length} triples needing deposits`)

  // Calculate deposit costs
  const minDeposit = BigInt(multivaultConfig.min_deposit)
  const depositCost = minDeposit * BigInt(triplesNeedingDeposit.length)

  // Perform batch deposit for triples without positions
  if (triplesNeedingDeposit.length > 0) {
    const depositChunks = chunkArray(triplesNeedingDeposit, batchSize)

    if (config.dryRun) {
      log(
        `🔍 [DRY RUN] Would make batch deposit for ${triplesNeedingDeposit.length} triples in ${depositChunks.length} batches...`,
      )
    } else {
      log(
        `💰 Making batch deposit for ${triplesNeedingDeposit.length} triples in ${depositChunks.length} batches...`,
      )
    }

    if (!config.dryRun) {
      for (let i = 0; i < depositChunks.length; i++) {
        const chunk = depositChunks[i]
        log(
          `💰 Processing deposit batch ${i + 1}/${depositChunks.length} (${chunk.length} triples)...`,
        )

        const termIds = chunk.map((triple) => triple.term_id as Hex)

        const depositTxHash = await depositBatch(config, {
          args: [
            config.walletClient.account.address, // receiver
            termIds, // termIds
            termIds.map(() => 1n), // curveIds (all 1 for default curve)
            termIds.map(() => minDeposit), // assets
            termIds.map(() => 0n), // minShares (0 to accept any amount of shares)
          ],
          value: minDeposit * BigInt(chunk.length),
        })

        log(`⏳ Waiting for deposit transaction: ${depositTxHash}`)
        await wait(depositTxHash)
      }
    }

    if (config.dryRun) {
      log('🔍 [DRY RUN] Deposits would be completed successfully')
    } else {
      log('✅ Deposits completed successfully')
    }
  } else {
    log('✅ All triples already have positions')
  }

  // Calculate final costs and user balance
  const userBalance = await getUserBalance(
    config.publicClient,
    config.walletClient.account.address,
  )
  const totalCost = atomCost + tripleCost + depositCost
  const hasSufficientBalance = userBalance >= totalCost

  const costEstimation: CostEstimation = {
    totalCost,
    atomCost,
    tripleCost,
    depositCost,
    atomCount: nonExistingAtoms.length,
    tripleCount: missingTriples.length,
    depositCount: triplesNeedingDeposit.length,
    userBalance,
    hasSufficientBalance,
  }

  const currencySymbol =
    config.publicClient.chain?.nativeCurrency.symbol || 'ETH'

  log('💰 Cost estimation:')
  log(`  User balance: ${formatEther(userBalance)} ${currencySymbol}`)
  log(
    `  Atoms: ${nonExistingAtoms.length} (cost: ${formatEther(atomCost)} ${currencySymbol})`,
  )
  log(
    `  Triples: ${missingTriples.length} (cost: ${formatEther(tripleCost)} ${currencySymbol})`,
  )
  log(
    `  Deposits: ${triplesNeedingDeposit.length} (cost: ${formatEther(depositCost)} ${currencySymbol})`,
  )
  log(`  Total cost: ${formatEther(totalCost)} ${currencySymbol}`)
  log(`  Sufficient balance: ${hasSufficientBalance ? '✅ Yes' : '❌ No'}`)

  if (config.dryRun) {
    log('🔍 [DRY RUN] Sync would complete successfully!')
    return costEstimation
  }

  log('🎉 Sync completed successfully!')
  return costEstimation
}
