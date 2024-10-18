import React, { useCallback, useEffect } from 'react'

import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'

interface Triple {
  subject: { id: string; label: string }
  predicate: { id: string; label: string }
  object: { id: string; label: string }
}

interface TripleGraphProps {
  triples: Triple[]
}

const TripleGraph: React.FC<TripleGraphProps> = ({ triples }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  const createNodesFromTriples = useCallback(() => {
    const newNodes = []
    const newEdges = []
    const centerX = 500
    const centerY = 300
    const radius = 500

    // Create subject node (center)
    const subjectNode = {
      id: `subject-${triples[0].subject.id}`,
      data: { label: triples[0].subject.label },
      position: { x: centerX, y: centerY },
      type: 'input', // Add this to ensure arrows point outward
    }
    newNodes.push(subjectNode)

    triples.forEach((triple, index) => {
      const angle = (index * 2 * Math.PI) / triples.length

      // Create object node
      const objectNode = {
        id: `object-${triple.object.id}`,
        data: { label: triple.object.label },
        position: {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
        },
        type: 'output', // Add this to ensure arrows point inward
      }
      newNodes.push(objectNode)

      // Create edge with predicate as label
      newEdges.push({
        id: `edge-${index}`,
        source: subjectNode.id,
        target: objectNode.id,
        label: triple.predicate.label,
        type: 'floating',
        markerEnd: { type: MarkerType.Arrow },
      })
    })

    setNodes(newNodes)
    setEdges(newEdges)
  }, [triples, setNodes, setEdges])

  useEffect(() => {
    createNodesFromTriples()
  }, [createNodesFromTriples])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      nodesDraggable={false}
      nodesConnectable={false}
      className="floatingedges"
      colorMode="dark"
    >
      <Background />
      <Controls />
    </ReactFlow>
  )
}

export default TripleGraph
