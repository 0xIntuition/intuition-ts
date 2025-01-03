import { KnowledgeGraphData } from '../types/knowledge-graph'
import {
  generateAtoms,
  generatePredicates,
  generateStakers,
  generateTriples,
} from './generate-knowledge-graph'

// Generate mock data using our generator functions
const atoms = generateAtoms()
const predicates = generatePredicates()
const triples = generateTriples(atoms, predicates)
const stakers = generateStakers(100)

export const mockKnowledgeGraphData: KnowledgeGraphData = {
  atoms,
  predicates,
  triples,
  stakers,
}
