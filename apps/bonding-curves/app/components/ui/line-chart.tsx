'use client'

import React, { useEffect, useRef } from 'react'

import * as d3 from 'd3'

interface Point {
  x: number
  y: number
  previewPoint?: boolean
  isRedeem?: boolean
}

interface CurveData {
  id: string
  color: string
  points: Point[]
  name: string
  totalAssets: number
  totalShares: number
  previewPoints?: Point[]
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

    // Add SVG definitions for visual effects
    const defs = svg.append('defs')

    // Create base gradient template
    const createGradient = (
      id: string,
      color: string,
      secondaryColor: string,
      isPreview = false,
      isRedeem = false,
    ) => {
      const gradient = defs
        .append('linearGradient')
        .attr('id', id)
        .attr('x1', '0%')
        .attr('x2', isRedeem ? '100%' : '0%')
        .attr('y1', '0%')
        .attr('y2', '100%')

      if (isRedeem) {
        // Edge-focused gradient for redeem
        gradient
          .append('stop')
          .attr('offset', '0%')
          .attr('stop-color', secondaryColor)
          .attr('stop-opacity', 0.7)

        gradient
          .append('stop')
          .attr('offset', '15%')
          .attr('stop-color', color)
          .attr('stop-opacity', 0.5)

        gradient
          .append('stop')
          .attr('offset', '85%')
          .attr('stop-color', color)
          .attr('stop-opacity', 0.5)

        gradient
          .append('stop')
          .attr('offset', '100%')
          .attr('stop-color', secondaryColor)
          .attr('stop-opacity', 0.7)
      } else {
        // Original vertical gradient for non-redeem
        gradient
          .append('stop')
          .attr('offset', '0%')
          .attr('stop-color', color)
          .attr('stop-opacity', isPreview ? 0.5 : 0.4)

        gradient
          .append('stop')
          .attr('offset', '50%')
          .attr('stop-color', secondaryColor)
          .attr('stop-opacity', isPreview ? 0.35 : 0.25)

        gradient
          .append('stop')
          .attr('offset', '100%')
          .attr('stop-color', color)
          .attr('stop-opacity', isPreview ? 0.2 : 0.1)
      }
    }

    // Create pattern for texture overlay with dynamic color
    const createPattern = (id: string, color: string, isRedeem = false) => {
      const pattern = defs
        .append('pattern')
        .attr('id', id)
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', isRedeem ? 10 : 8)
        .attr('height', isRedeem ? 10 : 8)
        .attr('patternTransform', `rotate(45) ${isRedeem ? 'scale(1.2)' : ''}`)

      if (isRedeem) {
        // Enhanced edge pattern for redeem
        pattern
          .append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', 0)
          .attr('y2', 10)
          .attr('stroke', color)
          .attr('stroke-width', 1.5)
          .attr('stroke-opacity', 0.4)
      } else {
        pattern
          .append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', 0)
          .attr('y2', 8)
          .attr('stroke', color)
          .attr('stroke-width', 0.5)
          .attr('stroke-opacity', 0.3)
      }
    }

    // Create patterns for different states
    createPattern('basePattern', '#ffffff')
    createPattern('depositPattern', '#00ff00')
    createPattern('redeemPattern', '#ffff00')

    // Create glow filter with dynamic colors
    const createGlowFilter = (id: string, color: string) => {
      const filter = defs
        .append('filter')
        .attr('id', id)
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%')

      filter
        .append('feGaussianBlur')
        .attr('stdDeviation', 2.5)
        .attr('result', 'coloredBlur')

      const feMerge = filter.append('feMerge')
      feMerge.append('feMergeNode').attr('in', 'coloredBlur')
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic')
    }

    // Create glow filters for different states
    createGlowFilter('baseGlow', '#ffffff')
    createGlowFilter('depositGlow', '#00ff00')
    createGlowFilter('redeemGlow', '#ffff00')

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

    // Create redeem area generator
    const redeemArea = d3
      .area<Point>()
      .x((d) => xScale(d.x))
      .y0((d) => yScale(d.y)) // Start from the curve
      .y1(height) // Fill down to the bottom
      .curve(d3.curveMonotoneX)

    data.forEach((curve) => {
      // Create gradients with secondary colors
      createGradient(`gradient-${curve.id}`, curve.color, '#ffffff') // Base: blue + white
      createGradient(
        `gradient-preview-${curve.id}`,
        curve.color,
        '#00ff00',
        true,
      ) // Deposit: blue + green
      createGradient(
        'gradient-preview-redeem',
        'hsl(var(--destructive))',
        '#ffff00',
        true,
      ) // Redeem: red + yellow

      // Add the glow effect with appropriate color
      svg
        .append('path')
        .datum(curve.points)
        .attr('fill', 'none')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 4)
        .attr('stroke-opacity', 0.3)
        .attr('filter', 'url(#baseGlow)')
        .attr('d', line)

      // Add the main line with enhanced stroke
      const path = svg
        .append('path')
        .datum(curve.points)
        .attr('fill', 'none')
        .attr('stroke', curve.color)
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', 0.8)

      // Only animate on initial render, not during preview updates
      if (!previewAmount) {
        // Create interpolator with traveling wave effect
        const interpolateY = (t: number) => {
          return curve.points.map((point, i) => {
            const normalizedX = point.x / (xScale.domain()[1] || 1)
            // Wave that travels from left to right, with complete decay by t=1
            const wave =
              Math.sin(normalizedX * 20 - t * 12) * Math.exp(-t * 4) * 0.3
            // Blend between wave effect and final position
            const blend = Math.min(1, t * 1.2) // Ensures we reach exact position
            return {
              x: point.x,
              y:
                point.y * (blend + (1 - blend) * (1 + wave * (point.y / yMax))),
            }
          })
        }

        // Animate!
        path
          .transition()
          .duration(2000)
          .ease(d3.easeQuadOut)
          .tween('pathTween', () => {
            return (t: number) => {
              path.attr('d', line(interpolateY(t)))
            }
          })
      } else {
        path.attr('d', line)
      }

      // Add filled areas
      if (totalAssets !== undefined) {
        // Convert totalAssets to the same scale as the points
        const scaledTotalAssets = totalAssets * 1e18
        const scaledPreviewAmount = previewAmount
          ? previewAmount * 1e18
          : undefined

        // Find the points that bracket our totalAssets value
        const index = curve.points.findIndex((p) => p.x > scaledTotalAssets)
        const point1 = index > 0 ? curve.points[index - 1] : curve.points[0]
        const point2 =
          curve.points[index] || curve.points[curve.points.length - 1]

        // Interpolate the exact point at totalAssets
        const t = (scaledTotalAssets - point1.x) / (point2.x - point1.x)
        const interpolatedY = point1.y + t * (point2.y - point1.y)
        const boundaryPoint = { x: scaledTotalAssets, y: interpolatedY }

        // Create base points array with the interpolated boundary point
        const basePoints = [
          ...curve.points.filter((p) => p.x < scaledTotalAssets),
          boundaryPoint,
        ]

        // Create preview points array if we have a preview amount
        const previewPoints = scaledPreviewAmount
          ? [
              boundaryPoint,
              ...(curve.previewPoints?.[0]?.isRedeem
                ? curve.points
                    .filter(
                      (p) =>
                        p.x < scaledTotalAssets &&
                        p.x >=
                          scaledTotalAssets - Math.abs(scaledPreviewAmount),
                    )
                    .reverse()
                : curve.points.filter(
                    (p) =>
                      p.x > scaledTotalAssets &&
                      p.x <= scaledTotalAssets + scaledPreviewAmount,
                  )),
            ]
          : []

        // If we have preview points, add a boundary point at the end
        if (previewPoints.length > 0 && scaledPreviewAmount) {
          const isRedeem = curve.previewPoints?.[0]?.isRedeem
          const endX =
            scaledTotalAssets +
            (isRedeem ? -Math.abs(scaledPreviewAmount) : scaledPreviewAmount)
          const endIndex = curve.points.findIndex((p) => p.x > endX)
          if (endIndex > 0) {
            const endPoint1 = curve.points[endIndex - 1]
            const endPoint2 = curve.points[endIndex]
            const endT = (endX - endPoint1.x) / (endPoint2.x - endPoint1.x)
            const endY = endPoint1.y + endT * (endPoint2.y - endPoint1.y)
            previewPoints.push({ x: endX, y: endY })
          }
        }

        console.log('Area Debug:', {
          scaledTotalAssets,
          scaledPreviewAmount,
          basePointsCount: basePoints.length,
          previewPointsCount: previewPoints.length,
          boundaryPoint,
          firstBasePoint: basePoints[0],
          lastBasePoint: basePoints[basePoints.length - 1],
          firstPreviewPoint: previewPoints[0],
          lastPreviewPoint: previewPoints[previewPoints.length - 1],
        })

        // Add base area (total assets)
        if (basePoints.length >= 1) {
          // Add base fill with gradient
          svg
            .append('path')
            .datum(basePoints)
            .attr('class', 'area1')
            .attr('fill', `url(#gradient-${curve.id})`)
            .attr('d', area)

          // Add pattern overlay
          svg
            .append('path')
            .datum(basePoints)
            .attr('class', 'area1-pattern')
            .attr('fill', 'url(#basePattern)')
            .attr('d', area)
        }

        // Add preview area if applicable
        if (previewPoints.length >= 2) {
          const isRedeem = curve.previewPoints?.[0]?.isRedeem
          const edgePoints = Math.max(
            2,
            Math.floor(previewPoints.length * 0.05),
          )

          if (isRedeem) {
            // Add main preview area first (with normal gradient)
            svg
              .append('path')
              .datum(previewPoints)
              .attr('class', 'area2')
              .attr('fill', 'url(#gradient-preview-redeem)')
              .attr('d', redeemArea)

            // Create edge highlight gradients
            const createEdgeGradient = (id: string, isLeft: boolean) => {
              const gradient = defs
                .append('linearGradient')
                .attr('id', id)
                .attr('x1', isLeft ? '0%' : '100%')
                .attr('x2', isLeft ? '100%' : '0%')
                .attr('y1', '0%')
                .attr('y2', '0%')

              if (isLeft) {
                gradient
                  .append('stop')
                  .attr('offset', '0%')
                  .attr('stop-color', '#ffff00')
                  .attr('stop-opacity', 0.0)

                gradient
                  .append('stop')
                  .attr('offset', '100%')
                  .attr('stop-color', '#ffff00')
                  .attr('stop-opacity', 0.4)
              } else {
                gradient
                  .append('stop')
                  .attr('offset', '0%')
                  .attr('stop-color', '#ffff00')
                  .attr('stop-opacity', 0.0)

                gradient
                  .append('stop')
                  .attr('offset', '100%')
                  .attr('stop-color', '#ffff00')
                  .attr('stop-opacity', 0.4)
              }
            }

            // Create gradients for both edges
            createEdgeGradient('highlight-left', true)
            createEdgeGradient('highlight-right', false)

            // Add edge highlights that will overlay the main area
            // Left edge highlight
            svg
              .append('path')
              .datum(previewPoints.slice(0, edgePoints))
              .attr('fill', 'url(#highlight-left)')
              .attr('d', redeemArea)

            // Right edge highlight
            svg
              .append('path')
              .datum(previewPoints.slice(-edgePoints))
              .attr('fill', 'url(#highlight-right)')
              .attr('d', redeemArea)

            // Add pattern overlay
            svg
              .append('path')
              .datum(previewPoints)
              .attr('class', 'area2-pattern')
              .attr('fill', 'url(#redeemPattern)')
              .attr('d', redeemArea)
          } else {
            // Non-redeem preview area (unchanged)
            svg
              .append('path')
              .datum(previewPoints)
              .attr('class', 'area2')
              .attr('fill', `url(#gradient-preview-${curve.id})`)
              .attr('d', area)

            svg
              .append('path')
              .datum(previewPoints)
              .attr('class', 'area2-pattern')
              .attr('fill', 'url(#depositPattern)')
              .attr('d', area)
          }

          // Add subtle edge strokes for the curve
          svg
            .append('path')
            .datum(previewPoints)
            .attr('fill', 'none')
            .attr('stroke', isRedeem ? '#ffff00' : '#00ff00')
            .attr('stroke-width', isRedeem ? 2 : 1.5)
            .attr('stroke-opacity', isRedeem ? 0.5 : 0.4)
            .attr('d', line)
        }
      }
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
