import { useCallback, useEffect } from 'react'

import { client, GET_TRIPLE_QUERY, GetAtomsQuery } from '@0xintuition/graphql'

import AtomEdge from '@components/nodes/AtomEdge'
import { initalEdges, initialNodes } from '@consts/nodes'
import { useTriple } from '@lib/hooks/useTriple'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
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
  const triple = useTriple({
    token: 'test',
    tripleId: 12,
  })

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initalEdges)
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  )
  useEffect(() => {
    console.log(triple)
    if (triple?.data) {
      console.log(triple.data)
      const tripleData = triple.data?.triple as any
      const subject = tripleData?.subject
      const predicate = tripleData?.predicate
      const object = tripleData?.object

      setNodes([
        {
          id: subject.id.toString(),
          data: {
            label: subject.label,
          },
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
          position: { x: 0, y: 0 },
        },
        {
          id: object.id.toString(),
          data: {
            label: object.label,
          },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          position: { x: 300, y: 0 },
        },
      ])
      setEdges([
        {
          id: `e${subject.id}-${object.id}`,
          source: subject.id.toString(),
          target: object.id.toString(),
          type: 'atom',
          data: {
            label: predicate.label,
          },
        },
      ])
    }
  }, [triple?.data, setNodes, setEdges])

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
