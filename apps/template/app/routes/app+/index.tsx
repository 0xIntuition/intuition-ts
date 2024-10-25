import { useCallback, useEffect } from 'react'

import { useGetTripleQuery } from '@0xintuition/graphql'

import AtomEdge from '@components/nodes/AtomEdge'
import { initalEdges, initialNodes } from '@consts/nodes'
import {
  addEdge,
  Background,
  Controls,
  Edge,
  MiniMap,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'

const edgeTypes = {
  atom: AtomEdge,
}

export default function App() {
  const { data, isLoading } = useGetTripleQuery({
    tripleId: 12,
  })
  const triple = data?.triple
  console.log(triple, isLoading)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initalEdges)
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  )
  useEffect(() => {
    console.log(triple)
    if (triple) {
      const subject = triple.subject
      const predicate = triple.predicate
      const object = triple.object

      setNodes([
        {
          id: subject?.id.toString(),
          data: {
            label: subject?.label,
          },
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
          position: { x: 0, y: 0 },
        },
        {
          id: object?.id.toString(),
          data: {
            label: object?.label,
          },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          position: { x: 300, y: 0 },
        },
      ])
      setEdges([
        {
          id: `e${subject?.id}-${object?.id}`,
          source: subject?.id.toString(),
          target: object?.id.toString(),
          type: 'atom',
          data: {
            label: predicate?.label,
          },
        },
      ])
    }
  }, [triple, setNodes, setEdges])

  return (
    <div className="w-full flex flex-col gap-12">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        edgeTypes={{
          atom: AtomEdge,
        }}
        colorMode="dark"
      >
        <MiniMap zoomable pannable />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
