import { useEffect, useMemo, useRef, useState } from 'react'

import {
  Claim,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Identity,
  IdentityCard,
  Text,
  TextVariant,
  ValueDisplay,
} from '@0xintuition/1ui'

import cytoscape from 'cytoscape'
// Import but don't register yet
import CytoscapeComponent from 'react-cytoscapejs'
import { createPortal } from 'react-dom'
import { ClientOnly } from 'remix-utils/client-only'

import { KnowledgeGraphData } from '../../types/knowledge-graph'

interface KnowledgeGraphProps {
  data: KnowledgeGraphData
  className?: string
}

interface HoverPosition {
  x: number
  y: number
}

interface NodeHoverState {
  position: HoverPosition
  type: 'node'
  data: KnowledgeGraphData['atoms'][0]
}

interface EdgeHoverState {
  position: HoverPosition
  type: 'edge'
  data: KnowledgeGraphData['triples'][0]
}

type HoverState = NodeHoverState | EdgeHoverState

interface CytoscapeEvent {
  target: cytoscape.NodeSingular | cytoscape.EdgeSingular
  type: string
  renderedPosition: { x: number; y: number }
}

const graphStyles: cytoscape.Stylesheet[] = [
  {
    selector: 'core',
    style: {
      'selection-box-color': '#334155',
      'selection-box-opacity': 0.5,
      'selection-box-border-color': '#475569',
      'active-bg-color': '#1e293b',
      'active-bg-opacity': 0.8,
      'active-bg-size': 20,
      'outside-texture-bg-color': '#020617',
      'outside-texture-bg-opacity': 0.9,
    },
  },
  {
    selector: 'node',
    style: {
      'background-color': (node: cytoscape.NodeSingular) => {
        const stake = node.data('atom')?.stake || 0
        const baseColor =
          node.data('atom')?.type === 'Person' ? '#2563eb' : '#0ea5e9'
        // Adjust opacity based on stake
        return `${baseColor}${Math.max(60, Math.min(95, 60 + (stake / 1000) * 35)).toString(16)}`
      },
      'border-color': '#1e293b',
      'border-width': 1,
      width: (node: cytoscape.NodeSingular) => {
        const stake = node.data('atom')?.stake || 0
        return Math.max(4, Math.min(16, 4 + (stake / 100) * 2))
      },
      height: (node: cytoscape.NodeSingular) => {
        const stake = node.data('atom')?.stake || 0
        return Math.max(4, Math.min(16, 4 + (stake / 100) * 2))
      },
      'background-opacity': 0.9,
      'text-opacity': (node: cytoscape.NodeSingular) => {
        // Show labels only when zoomed in enough
        const zoom = node.cy().zoom()
        return zoom > 0.4 ? 1 : 0
      },
      'font-size': (node: cytoscape.NodeSingular) => {
        const stake = node.data('atom')?.stake || 0
        return Math.max(8, Math.min(14, 8 + stake / 100))
      },
      color: '#94a3b8',
      'text-outline-color': '#020617',
      'text-outline-width': 2,
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-margin-y': 4,
      label: 'data(label)',
      'z-index': (node: cytoscape.NodeSingular) => {
        const stake = node.data('atom')?.stake || 0
        return stake > 100 ? 2 : 1
      },
      'overlay-opacity': 0,
    },
  },
  {
    selector: 'edge',
    style: {
      width: (edge: cytoscape.EdgeSingular) => {
        const stake = edge.data('triple')?.stake || 0
        return Math.max(0.25, Math.min(2, 0.25 + stake / 200))
      },
      'line-color': '#334155',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#334155',
      'arrow-scale': 0.5,
      'curve-style': 'bezier',
      'line-opacity': (edge: cytoscape.EdgeSingular) => {
        const stake = edge.data('triple')?.stake || 0
        return Math.max(0.2, Math.min(0.6, 0.2 + stake / 400))
      },
      'text-opacity': (edge: cytoscape.EdgeSingular) => {
        // Show labels only when zoomed in enough
        const zoom = edge.cy().zoom()
        return zoom > 0.6
          ? Math.max(
              0.4,
              Math.min(0.8, 0.4 + (edge.data('triple')?.stake || 0) / 200),
            )
          : 0
      },
      'font-size': (edge: cytoscape.EdgeSingular) => {
        const stake = edge.data('triple')?.stake || 0
        return Math.max(6, Math.min(12, 6 + stake / 100))
      },
      color: '#64748b',
      'text-outline-color': '#020617',
      'text-outline-width': 2,
      'text-rotation': 'autorotate',
      'text-margin-y': -4,
      label: 'data(label)',
      'control-point-step-size': 40,
      'edge-distances': 'intersection',
      'overlay-opacity': 0,
    },
  },
  {
    selector: 'node.hover',
    style: {
      'background-color': '#60a5fa',
      'border-color': '#93c5fd',
      width: (node: cytoscape.NodeSingular) => {
        const stake = node.data('atom')?.stake || 0
        return Math.max(6, Math.min(20, 6 + (stake / 100) * 2))
      },
      height: (node: cytoscape.NodeSingular) => {
        const stake = node.data('atom')?.stake || 0
        return Math.max(6, Math.min(20, 6 + (stake / 100) * 2))
      },
      'background-opacity': 1,
      'text-opacity': 1,
      'font-size': (node: cytoscape.NodeSingular) => {
        const stake = node.data('atom')?.stake || 0
        return Math.max(10, Math.min(16, 10 + stake / 100))
      },
      color: '#e2e8f0',
      'text-outline-width': 3,
      'z-index': 999,
      'overlay-opacity': 0,
    },
  },
  {
    selector: 'edge.hover',
    style: {
      'line-color': '#60a5fa',
      'target-arrow-color': '#60a5fa',
      'line-opacity': 0.8,
      'text-opacity': 1,
      width: (edge: cytoscape.EdgeSingular) => {
        const stake = edge.data('triple')?.stake || 0
        return Math.max(1, Math.min(3, 1 + stake / 100))
      },
      'font-size': (edge: cytoscape.EdgeSingular) => {
        const stake = edge.data('triple')?.stake || 0
        return Math.max(8, Math.min(14, 8 + stake / 100))
      },
      color: '#e2e8f0',
      'text-outline-width': 3,
      'z-index': 998,
      'overlay-opacity': 0,
    },
  },
]

const layout: cytoscape.LayoutOptions = {
  name: 'fcose',
  // Basic options
  animate: false,
  fit: false,
  padding: 200,
  // Component handling
  randomize: true,
  nodeDimensionsIncludeLabels: true,
  uniformNodeDimensions: false,
  packComponents: true,
  // Core layout options
  quality: 'proof',
  nodeRepulsion: (node: cytoscape.NodeSingular) => {
    const stake = node.data('atom')?.stake || 0
    return 8000 + (stake / 100) * 2000 // Reduced base repulsion and stake multiplier
  },
  idealEdgeLength: (edge: cytoscape.EdgeSingular) => {
    const stake = edge.data('triple')?.stake || 0
    return 200 + (stake / 100) * 50 // Reduced base length and stake multiplier
  },
  // Force parameters
  edgeElasticity: 0.45,
  nestingFactor: 0.1,
  gravity: 0.25, // Increased gravity to pull nodes closer
  gravityRange: 3.8, // Reduced range
  gravityCompound: 1.0,
  gravityRangeCompound: 1.5,
  // Performance
  numIter: 7500,
  initialEnergyOnIncremental: 0.5,
  // Prevent overlapping
  avoidOverlap: true,
  avoidOverlapPadding: 10,
  nodeSeparation: 150, // Reduced separation
}

const getIdentityVariant = (type: string) => {
  switch (type.toLowerCase()) {
    case 'person':
    case 'organization':
      return Identity.user
    default:
      return Identity.nonUser
  }
}

interface CytoscapeGraphProps {
  elements: cytoscape.ElementDefinition[]
  stylesheet: cytoscape.Stylesheet[]
  layout: cytoscape.LayoutOptions
  onMount: (cy: cytoscape.Core) => void
}

function CytoscapeGraph({
  elements,
  stylesheet,
  layout,
  onMount,
}: CytoscapeGraphProps) {
  const cyRef = useRef<cytoscape.Core | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Load extensions first
  useEffect(() => {
    loadExtensions()
      .then(() => {
        setIsReady(true)
      })
      .catch(console.error)
  }, [])

  // Handle layout and data initialization
  useEffect(() => {
    if (isReady && cyRef.current && elements.length > 0) {
      const cy = cyRef.current

      // Reset the layout when elements change
      cy.elements().remove()
      cy.add(elements)

      // Run layout
      const layoutInstance = cy.layout(layout)
      layoutInstance.run()

      // Set up layout completion handler
      cy.one('layoutstop', () => {
        cy.zoom(0.8)
        cy.center()
      })

      return () => {
        layoutInstance.stop()
      }
    }
  }, [isReady, elements, layout])

  if (!isReady) {
    return null
  }

  return (
    <CytoscapeComponent
      elements={[]} // Start empty, we'll add elements after mount
      stylesheet={stylesheet}
      layout={layout}
      cy={(cy) => {
        cyRef.current = cy
        onMount(cy)
      }}
      wheelSensitivity={0.2}
      className="w-full h-full"
    />
  )
}

// Lazy load extensions
const loadExtensions = async () => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    // Load fcose first since we're using it for layout
    const fcoseModule = await import('cytoscape-fcose')
    cytoscape.use(fcoseModule.default)

    // Load other extensions after
    const [popperModule] = await Promise.all([import('cytoscape-popper')])
    cytoscape.use(popperModule.default)

    return Promise.resolve()
  } catch (error) {
    console.error('Failed to load Cytoscape extensions:', error)
    throw error
  }
}

export default function KnowledgeGraph({
  data,
  className,
}: KnowledgeGraphProps) {
  const cyRef = useRef<cytoscape.Core | null>(null)
  const [hoverState, setHoverState] = useState<HoverState | null>(null)
  const [error, setError] = useState<Error | null>(null)

  // Add error boundary
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error)
      setError(event.error)
    }
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  useEffect(() => {
    try {
      console.log('KnowledgeGraph mounted with data:', {
        atomsCount: data.atoms.length,
        triplesCount: data.triples.length,
        atoms: data.atoms,
        triples: data.triples,
      })
    } catch (err) {
      console.error('Error logging data:', err)
      setError(err as Error)
    }
  }, [data])

  // Transform data into Cytoscape format with error handling
  const elements = useMemo(() => {
    if (!data?.atoms || !data?.triples) {
      console.error('Invalid data structure:', data)
      return []
    }

    try {
      const nodes = data.atoms
        .filter(
          (atom) =>
            // Include only if it's used as a subject or object in any triple
            data.triples.some(
              (triple) =>
                triple.subject_id === atom.id || triple.object_id === atom.id,
            ) &&
            // AND make sure it's not used as a predicate in any triple
            !data.triples.some((triple) => triple.predicate_id === atom.id),
        )
        .map((atom) => ({
          group: 'nodes' as const,
          data: {
            id: atom.id,
            label: atom.label,
            type: atom.type,
            size: Math.max(40, Math.min(100, 40 + atom.stake / 20)),
            image: atom.image,
            atom,
            zIndex: atom.type === 'Person' ? 3 : atom.type === 'Thing' ? 2 : 1,
          },
        }))

      // Only include the core triple relationships, excluding participation edges
      const edges = data.triples.map((triple) => ({
        group: 'edges' as const,
        data: {
          id: triple.id,
          source: triple.subject_id,
          target: triple.object_id,
          label: triple.predicate.label,
          width: Math.max(2, Math.min(8, 2 + triple.stake / 100)),
          triple,
        },
      }))

      console.log('Generated elements:', { nodes, edges })
      return [...nodes, ...edges]
    } catch (err) {
      console.error('Error transforming data:', err)
      setError(err as Error)
      return []
    }
  }, [data])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const handleMount = (cy: cytoscape.Core) => {
    try {
      console.log('Setting up Cytoscape instance')
      cyRef.current = cy

      // Set initial zoom and center immediately
      cy.zoom(1.5)

      // Calculate weighted center based on node stakes and positions
      const calculateWeightedCenter = () => {
        const nodes = cy.nodes()
        let totalWeight = 0
        let weightedX = 0
        let weightedY = 0

        nodes.forEach((node: cytoscape.NodeSingular) => {
          const position = node.position()
          const weight = node.data('atom')?.stake || 1
          totalWeight += weight
          weightedX += position.x * weight
          weightedY += position.y * weight
        })

        return {
          x: weightedX / totalWeight,
          y: weightedY / totalWeight,
        }
      }

      // Center on weighted position after layout
      cy.on('layoutstop', () => {
        const weightedCenter = calculateWeightedCenter()
        cy.center({
          x: weightedCenter.x,
          y: weightedCenter.y,
        })
        console.log('Layout complete, centered on weighted position')
      })

      // Remove layout event handlers since we don't want animation
      cy.on('layoutstop', () => {
        console.log('Layout complete')
      })

      // Set up event handlers after component is mounted
      const handleMouseOver = (evt: CytoscapeEvent) => {
        const target = evt.target
        if (target.isNode()) {
          target.addClass('hover')
          target.connectedEdges().addClass('hover')
        } else if (target.isEdge()) {
          target.addClass('hover')
          target.connectedNodes().addClass('hover')
        }
      }

      const handleMouseOut = (evt: CytoscapeEvent) => {
        const target = evt.target
        if (target.isNode()) {
          target.removeClass('hover')
          target.connectedEdges().removeClass('hover')
        } else if (target.isEdge()) {
          target.removeClass('hover')
          target.connectedNodes().removeClass('hover')
        }
      }

      const handleClick = (evt: CytoscapeEvent, type: 'node' | 'edge') => {
        const target = evt.target
        // Get the rendered position in the viewport
        const renderedPosition = target.renderedPosition()
        const position = {
          x: renderedPosition.x,
          y: renderedPosition.y + (type === 'node' ? 20 : 10), // Offset to prevent overlap
        }

        console.log('Click event:', {
          type,
          position,
          data: type === 'node' ? target.data('atom') : target.data('triple'),
        })

        if (type === 'node') {
          setHoverState({
            position,
            type,
            data: target.data('atom'),
          })
        } else {
          setHoverState({
            position,
            type,
            data: target.data('triple'),
          })
        }
      }

      // Enable dragging
      cy.nodes().ungrabify(false)
      cy.nodes().grabify()

      cy.on('mouseover', 'node, edge', handleMouseOver)
      cy.on('mouseout', 'node, edge', handleMouseOut)
      cy.on('click', 'node', (evt: CytoscapeEvent) => handleClick(evt, 'node'))
      cy.on('click', 'edge', (evt: CytoscapeEvent) => handleClick(evt, 'edge'))
      cy.on('click', 'core', () => setHoverState(null))

      // Return cleanup function
      return () => {
        cy.removeListener('mouseover')
        cy.removeListener('mouseout')
        cy.removeListener('click')
        cy.removeListener('layoutstop')
      }
    } catch (error) {
      console.error('Error in handleMount:', error)
      setError(error as Error)
    }
  }

  const renderHoverContent = () => {
    if (!hoverState) {
      return null
    }

    if (hoverState.type === 'node') {
      const atom = hoverState.data
      return (
        <div className="flex flex-col gap-4">
          <IdentityCard
            variant={getIdentityVariant(atom.type)}
            avatarSrc={atom.image}
            name={atom.label}
            value={atom.stake}
            walletAddress={atom.wallet_id || atom.vault_id}
          />
          {atom.value?.thing?.description && (
            <Text
              variant={TextVariant.body}
              className="text-secondary-foreground"
            >
              {atom.value.thing.description}
            </Text>
          )}
          <div className="flex flex-col gap-2">
            <Text
              variant={TextVariant.caption}
              className="text-muted-foreground"
            >
              Vault Details
            </Text>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm">
                <div className="text-muted-foreground">Total Shares</div>
                <ValueDisplay className="mt-1">
                  {atom.vault?.total_shares || '0'}
                </ValueDisplay>
              </div>
              <div className="text-sm">
                <div className="text-muted-foreground">Share Price</div>
                <ValueDisplay className="mt-1">
                  {atom.vault?.current_share_price || '0'}
                </ValueDisplay>
              </div>
              <div className="text-sm">
                <div className="text-muted-foreground">Positions</div>
                <ValueDisplay className="mt-1">
                  {atom.vault?.position_count.toString() || '0'}
                </ValueDisplay>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const triple = hoverState.data
    return (
      <div className="flex flex-col gap-4">
        <Claim
          subject={{
            variant: getIdentityVariant(triple.subject?.type || 'Thing'),
            label: triple.subject?.label || 'Unknown',
            imgSrc: triple.subject?.image,
            id: triple.subject?.id || '',
            description: triple.subject?.value?.thing?.description,
          }}
          predicate={{
            variant: getIdentityVariant(triple.predicate?.type || 'Thing'),
            label: triple.predicate?.label || 'Unknown',
            imgSrc: triple.predicate?.image,
            id: triple.predicate?.id || '',
          }}
          object={{
            variant: getIdentityVariant(triple.object?.type || 'Thing'),
            label: triple.object?.label || 'Unknown',
            imgSrc: triple.object?.image,
            id: triple.object?.id || '',
            description: triple.object?.value?.thing?.description,
          }}
        />
        <div className="flex flex-col gap-2">
          <Text variant={TextVariant.caption} className="text-muted-foreground">
            Vault Details
          </Text>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm">
              <div className="text-muted-foreground">For Shares</div>
              <ValueDisplay className="mt-1">
                {triple.vault?.total_shares?.toString() || '0'}
              </ValueDisplay>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Against Shares</div>
              <ValueDisplay className="mt-1">
                {triple.counter_vault?.total_shares?.toString() || '0'}
              </ValueDisplay>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">For Positions</div>
              <ValueDisplay className="mt-1">
                {triple.vault?.position_count?.toString() || '0'}
              </ValueDisplay>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Against Positions</div>
              <ValueDisplay className="mt-1">
                {triple.counter_vault?.position_count?.toString() || '0'}
              </ValueDisplay>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={className}>
        <ClientOnly>
          {() => (
            <CytoscapeGraph
              elements={elements}
              stylesheet={graphStyles}
              layout={layout}
              onMount={handleMount}
            />
          )}
        </ClientOnly>
      </div>
      {hoverState &&
        createPortal(
          <div
            className="fixed z-50 pointer-events-auto"
            style={{
              left: `${hoverState.position.x}px`,
              top: `${hoverState.position.y}px`,
              transform: 'translate(-50%, 0)',
            }}
          >
            <HoverCard defaultOpen open>
              <HoverCardTrigger asChild>
                <div />
              </HoverCardTrigger>
              <HoverCardContent
                className={hoverState.type === 'node' ? 'w-80' : 'w-96'}
                side="bottom"
                align="center"
              >
                {renderHoverContent()}
              </HoverCardContent>
            </HoverCard>
          </div>,
          document.body,
        )}
    </>
  )
}
