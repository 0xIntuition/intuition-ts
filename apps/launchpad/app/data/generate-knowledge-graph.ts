import { Atom, AtomType, KnowledgeGraphData } from '../types/knowledge-graph'

// Categories for generating realistic data
const categories = {
  people: [
    'Vitalik Buterin',
    'Gavin Wood',
    'Charles Hoskinson',
    'Joseph Lubin',
    'Balaji Srinivasan',
    'Andreas Antonopoulos',
    'Laura Shin',
    'Camila Russo',
    'Hayden Adams',
    'Andre Cronje',
  ],
  organizations: [
    'Ethereum Foundation',
    'ConsenSys',
    'OpenZeppelin',
    'Chainlink Labs',
    'Uniswap Labs',
    'Aave',
    'Compound',
    'MakerDAO',
    'Optimism',
    'Arbitrum',
  ],
  concepts: [
    'Ethereum',
    'Smart Contracts',
    'DeFi',
    'NFTs',
    'DAOs',
    'Layer 2',
    'Zero Knowledge',
    'Web3',
    'Tokenomics',
    'Governance',
  ],
  predicates: [
    { id: 'created', label: 'Created', emoji: '🛠️' },
    { id: 'supports', label: 'Supports', emoji: '🤝' },
    { id: 'contributes_to', label: 'Contributes to', emoji: '🔨' },
    { id: 'researches', label: 'Researches', emoji: '🔬' },
    { id: 'invests_in', label: 'Invests in', emoji: '💰' },
    { id: 'builds_on', label: 'Builds on', emoji: '🏗️' },
    { id: 'partners_with', label: 'Partners with', emoji: '🤝' },
    { id: 'advises', label: 'Advises', emoji: '💡' },
    { id: 'develops', label: 'Develops', emoji: '💻' },
    { id: 'promotes', label: 'Promotes', emoji: '📢' },
  ],
}

// Helper function to generate mock vault data
export const mockVaultData = (
  shares: string,
  price: string = '1000000000000000000',
  positionCount: number = 0,
) => ({
  total_shares: shares,
  current_share_price: price,
  position_count: positionCount,
  positions: [],
  positions_aggregate: {
    aggregate: {
      count: positionCount,
      sum: {
        shares,
      },
    },
  },
})

// Helper function to generate a random number between min and max
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// Helper function to generate a random hex string
const randomHex = (length: number) =>
  Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join('')

// Helper function to find atom by label
const findAtomByLabel = (atoms: Atom[], label: string) =>
  atoms.find((atom) => atom.label === label)

// Helper function to find predicate by id
const findPredicateById = (predicates: Atom[], id: string) =>
  predicates.find((pred) => pred.id === id)

// Generate atoms for each category
export const generateAtoms = () => {
  const atoms: Atom[] = []
  let id = 1

  // Generate people
  categories.people.forEach((name) => {
    atoms.push({
      id: `person_${id}`,
      vault_id: `v_${id}`,
      label: name,
      type: 'Person' as AtomType,
      emoji: '👤',
      value: {
        person: {
          name,
          description: `A prominent figure in the blockchain space`,
        },
      },
      vault: mockVaultData(
        (random(100, 1000) * 1e18).toString(),
        '1000000000000000000',
        random(10, 200),
      ),
      creator: { id: 'system', label: 'System' },
      block_timestamp: new Date(
        Date.now() - random(0, 365 * 24 * 60 * 60 * 1000),
      ).toISOString(),
      transaction_hash: `0x${randomHex(64)}`,
      stake: random(100, 1000),
    })
    id++
  })

  // Generate organizations
  categories.organizations.forEach((name) => {
    atoms.push({
      id: `org_${id}`,
      vault_id: `v_${id}`,
      label: name,
      type: 'Organization' as AtomType,
      emoji: '🏢',
      value: {
        organization: {
          name,
          description: `A blockchain organization`,
        },
      },
      vault: mockVaultData(
        (random(500, 2000) * 1e18).toString(),
        '1000000000000000000',
        random(50, 500),
      ),
      creator: { id: 'system', label: 'System' },
      block_timestamp: new Date(
        Date.now() - random(0, 365 * 24 * 60 * 60 * 1000),
      ).toISOString(),
      transaction_hash: `0x${randomHex(64)}`,
      stake: random(500, 2000),
    })
    id++
  })

  // Generate concepts
  categories.concepts.forEach((name) => {
    atoms.push({
      id: `concept_${id}`,
      vault_id: `v_${id}`,
      label: name,
      type: 'Thing' as AtomType,
      emoji: '💡',
      value: {
        thing: {
          name,
          description: `A blockchain concept or technology`,
        },
      },
      vault: mockVaultData(
        (random(200, 1500) * 1e18).toString(),
        '1000000000000000000',
        random(20, 300),
      ),
      creator: { id: 'system', label: 'System' },
      block_timestamp: new Date(
        Date.now() - random(0, 365 * 24 * 60 * 60 * 1000),
      ).toISOString(),
      transaction_hash: `0x${randomHex(64)}`,
      stake: random(200, 1500),
    })
    id++
  })

  return atoms
}

// Generate predicates
export const generatePredicates = () => {
  return categories.predicates.map((pred, index) => ({
    id: pred.id,
    vault_id: `p_${index + 1}`,
    label: pred.label,
    type: 'Thing' as AtomType,
    emoji: pred.emoji,
    vault: mockVaultData('100000000000000000000'),
    creator: { id: 'system', label: 'System' },
    stake: 100,
  }))
}

// Generate triples (relationships)
export const generateTriples = (atoms: Atom[], predicates: Atom[]) => {
  const triples: Array<{
    id: string
    subject_id: string
    predicate_id: string
    object_id: string
    vault_id: string
    counter_vault_id: string
    subject: Atom
    predicate: Atom
    object: Atom
    vault: ReturnType<typeof mockVaultData>
    counter_vault: ReturnType<typeof mockVaultData>
    creator: { id: string; label: string }
    block_timestamp: string
    transaction_hash: string
    stake: number
  }> = []
  let id = 1

  // First, create meaningful core relationships
  const coreRelationships = [
    // Ethereum core relationships
    { subject: 'Vitalik Buterin', predicate: 'created', object: 'Ethereum' },
    { subject: 'Gavin Wood', predicate: 'created', object: 'Ethereum' },
    { subject: 'Joseph Lubin', predicate: 'created', object: 'Ethereum' },
    {
      subject: 'Ethereum Foundation',
      predicate: 'supports',
      object: 'Ethereum',
    },
    { subject: 'ConsenSys', predicate: 'builds_on', object: 'Ethereum' },

    // DeFi ecosystem
    { subject: 'Hayden Adams', predicate: 'created', object: 'DeFi' },
    { subject: 'Andre Cronje', predicate: 'contributes_to', object: 'DeFi' },
    { subject: 'Uniswap Labs', predicate: 'develops', object: 'DeFi' },
    { subject: 'Aave', predicate: 'develops', object: 'DeFi' },
    { subject: 'Compound', predicate: 'develops', object: 'DeFi' },
    { subject: 'MakerDAO', predicate: 'develops', object: 'DeFi' },

    // Web3 connections
    { subject: 'Balaji Srinivasan', predicate: 'promotes', object: 'Web3' },
    { subject: 'Andreas Antonopoulos', predicate: 'promotes', object: 'Web3' },
    { subject: 'ConsenSys', predicate: 'develops', object: 'Web3' },

    // L2 and scaling
    { subject: 'Optimism', predicate: 'builds_on', object: 'Ethereum' },
    { subject: 'Arbitrum', predicate: 'builds_on', object: 'Ethereum' },

    // Smart Contracts ecosystem
    {
      subject: 'OpenZeppelin',
      predicate: 'develops',
      object: 'Smart Contracts',
    },
    {
      subject: 'Chainlink Labs',
      predicate: 'develops',
      object: 'Smart Contracts',
    },

    // Concept relationships
    { subject: 'Smart Contracts', predicate: 'builds_on', object: 'Ethereum' },
    { subject: 'DeFi', predicate: 'builds_on', object: 'Smart Contracts' },
    { subject: 'DAOs', predicate: 'builds_on', object: 'Smart Contracts' },
    { subject: 'NFTs', predicate: 'builds_on', object: 'Smart Contracts' },
    { subject: 'Layer 2', predicate: 'builds_on', object: 'Ethereum' },

    // Documentation and research
    { subject: 'Laura Shin', predicate: 'researches', object: 'Ethereum' },
    { subject: 'Camila Russo', predicate: 'researches', object: 'Ethereum' },

    // Governance
    {
      subject: 'Ethereum Foundation',
      predicate: 'develops',
      object: 'Governance',
    },
    { subject: 'MakerDAO', predicate: 'develops', object: 'Governance' },
  ]

  // Create core relationships
  coreRelationships.forEach((rel) => {
    const subject = findAtomByLabel(atoms, rel.subject)
    const object = findAtomByLabel(atoms, rel.object)
    const predicate = findPredicateById(predicates, rel.predicate)

    if (subject && object && predicate) {
      triples.push({
        id: `t_${id}`,
        subject_id: subject.id,
        predicate_id: predicate.id,
        object_id: object.id,
        vault_id: `v_t_${id}`,
        counter_vault_id: `cv_t_${id}`,
        subject,
        predicate,
        object,
        vault: mockVaultData(
          (random(500, 2000) * 1e18).toString(),
          '1000000000000000000',
          random(50, 200),
        ),
        counter_vault: mockVaultData(
          (random(50, 500) * 1e18).toString(),
          '1000000000000000000',
          random(5, 50),
        ),
        creator: { id: 'system', label: 'System' },
        block_timestamp: new Date(
          Date.now() - random(0, 365 * 24 * 60 * 60 * 1000),
        ).toISOString(),
        transaction_hash: `0x${randomHex(64)}`,
        stake: random(500, 2000),
      })
      id++
    }
  })

  // Then add additional random relationships to create more density
  const additionalRelationships = 200
  for (let i = 0; i < additionalRelationships; i++) {
    const subject = atoms[random(0, atoms.length - 1)]
    const object = atoms[random(0, atoms.length - 1)]
    const predicate = predicates[random(0, predicates.length - 1)]

    // Skip self-relationships and duplicates
    if (
      subject.id === object.id ||
      triples.some(
        (t) =>
          t.subject_id === subject.id &&
          t.object_id === object.id &&
          t.predicate_id === predicate.id,
      )
    ) {
      continue
    }

    triples.push({
      id: `t_${id}`,
      subject_id: subject.id,
      predicate_id: predicate.id,
      object_id: object.id,
      vault_id: `v_t_${id}`,
      counter_vault_id: `cv_t_${id}`,
      subject,
      predicate,
      object,
      vault: mockVaultData(
        (random(100, 1000) * 1e18).toString(),
        '1000000000000000000',
        random(10, 100),
      ),
      counter_vault: mockVaultData(
        (random(10, 200) * 1e18).toString(),
        '1000000000000000000',
        random(1, 20),
      ),
      creator: { id: 'system', label: 'System' },
      block_timestamp: new Date(
        Date.now() - random(0, 365 * 24 * 60 * 60 * 1000),
      ).toISOString(),
      transaction_hash: `0x${randomHex(64)}`,
      stake: random(100, 1000),
    })
    id++
  }

  return triples
}

// Generate stakers
export const generateStakers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `s_${i + 1}`,
    address: `0x${randomHex(40)}`,
    stake: random(100, 5000),
  }))
}

// Generate the complete knowledge graph
export const generateKnowledgeGraph = (): KnowledgeGraphData => {
  const atoms = generateAtoms()
  const predicates = generatePredicates()
  const triples = generateTriples(atoms, predicates)
  const stakers = generateStakers(100)

  return {
    atoms: [...atoms, ...predicates],
    predicates,
    triples,
    stakers,
  }
}

// Export the generated data
export const mockKnowledgeGraphData = generateKnowledgeGraph()
