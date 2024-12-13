'use client'

import React, { useEffect, useRef } from 'react'

import * as d3 from 'd3'

interface Point {
  x: number
  y: number
  totalValue?: number
  userValue?: number
  previewPoint?: boolean
}

interface CurveData {
  id: string
  color: string
  points: Point[]
  name: string
  totalAssets: number
  totalShares: number
}

interface LineChartProps {
  data: CurveData[]
  xLabel: string
  yLabel: string
}

export function LineChart({ data, xLabel, yLabel }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 20, right: 20, bottom: 40, left: 60 }
    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = svgRef.current.clientHeight - margin.top - margin.bottom

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Find data ranges
    const xExtent = d3.extent(
      data.flatMap((d) => d.points.map((p) => p.x)),
    ) as [number, number]
    const yExtent = d3.extent(
      data.flatMap((d) => d.points.map((p) => p.y)),
    ) as [number, number]

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, xExtent[1] * 1.1])
      .range([0, width])

    const yScale = d3
      .scaleLinear()
      .domain([0, yExtent[1] * 1.1])
      .range([height, 0])

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', width / 2)
      .attr('y', 35)
      .attr('fill', 'currentColor')
      .text(xLabel)

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -45)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text(yLabel)

    // Create line generator
    const line = d3
      .line<Point>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))

    // Draw curves
    data.forEach((curve) => {
      // Draw the main curve
      g.append('path')
        .datum(curve.points.filter((p) => !p.previewPoint))
        .attr('fill', 'none')
        .attr('stroke', curve.color)
        .attr('stroke-width', 2)
        .attr('d', line)

      // Draw preview points
      const previewPoints = curve.points.filter((p) => p.previewPoint)
      g.selectAll('.preview-point')
        .data(previewPoints)
        .enter()
        .append('circle')
        .attr('cx', (d) => xScale(d.x))
        .attr('cy', (d) => yScale(d.y))
        .attr('r', 5)
        .attr('fill', curve.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)

      // Draw current pool state
      if (curve.totalAssets > 0 || curve.totalShares > 0) {
        g.append('circle')
          .attr('cx', xScale(curve.totalAssets))
          .attr('cy', yScale(curve.totalShares))
          .attr('r', 6)
          .attr('fill', 'none')
          .attr('stroke', curve.color)
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '4,4')

        // Add label for pool state
        g.append('text')
          .attr('x', xScale(curve.totalAssets) + 10)
          .attr('y', yScale(curve.totalShares) - 10)
          .attr('fill', curve.color)
          .text(
            `Pool State (${curve.totalAssets.toFixed(2)}, ${curve.totalShares.toFixed(2)})`,
          )
      }
    })
  }, [data, xLabel, yLabel])

  return <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
}
