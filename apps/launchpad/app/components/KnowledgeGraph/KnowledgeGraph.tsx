import { useCallback, useState } from 'react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@0xintuition/1ui'

import ForceGraph2D from 'react-force-graph-2d'

const KnowledgeGraph = ({ data }) => {
  const [hoveredNode, setHoveredNode] = useState(null)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })

  // Handle node hover
  const handleNodeHover = useCallback((node, event) => {
    if (node) {
      setHoveredNode(node)
      setHoverPosition({
        x: event.clientX,
        y: event.clientY,
      })
    } else {
      setHoveredNode(null)
    }
  }, [])

  return (
    <div className="relative w-full h-96 bg-black rounded-lg">
      <ForceGraph2D
        graphData={data}
        nodeRelSize={6}
        nodeColor="white"
        linkColor="rgba(255,255,255,0.2)"
        backgroundColor="black"
        onNodeHover={handleNodeHover}
        nodeCanvasObject={(node, ctx, globalScale) => {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI)
          ctx.fillStyle = 'white'
          ctx.fill()
        }}
      />

      {hoveredNode && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: hoverPosition.x,
            top: hoverPosition.y,
          }}
        >
          <HoverCard open>
            <HoverCardTrigger asChild>
              <div className="w-4 h-4" />
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">{hoveredNode.name}</h4>
                <p className="text-sm text-gray-600">
                  {hoveredNode.description}
                </p>
                {hoveredNode.metadata && (
                  <div className="text-xs text-gray-500">
                    Type: {hoveredNode.metadata.type}
                  </div>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )}
    </div>
  )
}

export default KnowledgeGraph
