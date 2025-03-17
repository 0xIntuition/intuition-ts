import { useCallback, useEffect, useRef, useState } from 'react'

import * as d3 from 'd3'
import debounce from 'lodash/debounce'

interface BondingCurvePoint {
  assets: number
  shares: number
}

interface BondingCurveChartProps {
  data: BondingCurvePoint[]
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

const SAMPLE_POINTS = 50 // Reduce number of points for better performance

export function BondingCurveChart({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
}: BondingCurveChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [sampledData, setSampledData] = useState<BondingCurvePoint[]>([])

  // Sample data points for smoother performance
  const sampleData = useCallback((fullData: BondingCurvePoint[]) => {
    if (fullData.length <= SAMPLE_POINTS) return fullData

    const step = Math.floor(fullData.length / SAMPLE_POINTS)
    return fullData.filter((_, i) => i % step === 0)
  }, [])

  // Debounced data sampling
  const debouncedSample = useCallback(
    debounce((newData: BondingCurvePoint[]) => {
      setSampledData(sampleData(newData))
    }, 100),
    [sampleData],
  )

  useEffect(() => {
    debouncedSample(data)
  }, [data, debouncedSample])

  useEffect(() => {
    if (!svgRef.current || !sampledData.length) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(sampledData, (d) => d.assets) || 0])
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sampledData, (d) => d.shares) || 0])
      .range([height - margin.bottom, margin.top])

    // Create line generator
    const line = d3
      .line<BondingCurvePoint>()
      .x((d) => xScale(d.assets))
      .y((d) => yScale(d.shares))
      .curve(d3.curveMonotoneX)

    // Add axes with theme colors
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .attr('class', 'text-foreground')
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', width - margin.right)
      .attr('y', -6)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'end')
      .text('Assets')

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .attr('class', 'text-foreground')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('x', 6)
      .attr('y', margin.top)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'start')
      .text('Shares')

    // Add curve with theme color
    svg
      .append('path')
      .datum(sampledData)
      .attr('fill', 'none')
      .attr('stroke', 'hsl(var(--primary))')
      .attr('stroke-width', 2)
      .attr('d', line)

    // Add grid lines with muted color
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .attr('stroke', 'hsl(var(--muted))')
      .attr('opacity', 0.2)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-(height - margin.top - margin.bottom))
          .tickFormat(() => ''),
      )

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .attr('stroke', 'hsl(var(--muted))')
      .attr('opacity', 0.2)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-(width - margin.left - margin.right))
          .tickFormat(() => ''),
      )
  }, [sampledData, width, height, margin])

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="w-full h-full"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  )
}
