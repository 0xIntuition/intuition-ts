'use client'

import React, { useEffect, useRef } from 'react'

import * as d3 from 'd3'

interface Point {
  x: number
  y: number
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
  totalAssets?: number
  previewAmount?: number
}

const formatScientific = (n: number): string => {
  if (n === 0) return '0'
  const exp = Math.floor(Math.log10(Math.abs(n)))
  const mantissa = n / Math.pow(10, exp)
  return `${mantissa.toFixed(2)}e${exp}`
}

export function LineChart({
  data,
  xLabel,
  yLabel,
  totalAssets,
  previewAmount,
}: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove()

    const margin = { top: 20, right: 30, bottom: 50, left: 80 }
    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = svgRef.current.clientHeight - margin.top - margin.bottom

    const svg = d3
      .select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          data.flatMap((curve) => curve.points),
          (d) => d.x,
        ) || 0,
      ])
      .range([0, width])

    // Get min and max y values
    const yMin = 0
    const yMax =
      d3.max(
        data.flatMap((curve) => curve.points),
        (d) => d.y,
      ) || 0

    // Create y scale with proper domain
    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0])
      .nice()

    // Add axes with scientific notation for both axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat((d) => formatScientific(+d))
          .ticks(5),
      )
      .selectAll('text')
      .style('fill', 'white')
      .style('font-size', '12px')

    // Add y-axis with scientific notation
    svg
      .append('g')
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => formatScientific(+d))
          .ticks(5),
      )
      .selectAll('text')
      .style('fill', 'white')
      .style('font-size', '12px')

    // Add axis labels with proper positioning
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .text(xLabel)
      .style('fill', 'white')
      .style('font-size', '14px')

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 30)
      .attr('x', -height / 2)
      .text(yLabel)
      .style('fill', 'white')
      .style('font-size', '14px')

    // Create line generator
    const line = d3
      .line<Point>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveMonotoneX)

    // Create area generator
    const area = d3
      .area<Point>()
      .x((d) => xScale(d.x))
      .y0(height)
      .y1((d) => yScale(d.y))
      .curve(d3.curveMonotoneX)

    data.forEach((curve) => {
      if (totalAssets !== undefined) {
        // Split data at totalAssets point
        const basePoints = curve.points.filter((p) => p.x <= totalAssets)
        const previewPoints = previewAmount
          ? curve.points.filter(
              (p) => p.x >= totalAssets && p.x <= totalAssets + previewAmount,
            )
          : []

        // Add base area
        svg
          .append('path')
          .datum(basePoints)
          .attr('fill', curve.color)
          .attr('fill-opacity', 0.3)
          .attr('d', area)

        // Add preview area if applicable
        if (previewPoints.length > 0) {
          svg
            .append('path')
            .datum(previewPoints)
            .attr('fill', curve.color)
            .attr('fill-opacity', 0.15)
            .attr('d', area)
        }
      }

      // Add the line
      svg
        .append('path')
        .datum(curve.points)
        .attr('fill', 'none')
        .attr('stroke', curve.color)
        .attr('stroke-width', 2)
        .attr('d', line)
    })

    // Add tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', '#333')
      .style('color', '#fff')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('box-shadow', '0 2px 4px rgba(0, 0, 0, 0.3)')

    const bisect = d3.bisector<Point, number>((d) => d.x).left

    // Add invisible overlay for mouse tracking
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mousemove', (event) => {
        const mouseX = xScale.invert(d3.pointer(event)[0])

        data.forEach((curve) => {
          const index = bisect(curve.points, mouseX, 1)
          const point = curve.points[index - 1]

          if (point) {
            tooltip
              .style('visibility', 'visible')
              .style('left', event.pageX + 10 + 'px')
              .style('top', event.pageY - 10 + 'px')
              .html(
                `<strong>${curve.name}</strong><br/>Assets: ${formatScientific(point.x)}<br/>Shares: ${formatScientific(point.y)}`,
              )
          }
        })
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden')
      })

    // Cleanup function
    return () => {
      tooltip.remove()
    }
  }, [data, xLabel, yLabel, totalAssets, previewAmount])

  return (
    <svg
      ref={svgRef}
      style={{ width: '100%', height: '100%' }}
      className="dark:text-white"
    />
  )
}
