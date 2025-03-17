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
  selectedCurveId?: string
}

interface SnapPoint {
  x: number
  y: number
  curve: CurveData
}

const formatScientific = (n: number): string => {
  if (n === 0) return '0'
  const exp = Math.floor(Math.log10(Math.abs(n)))
  const mantissa = n / Math.pow(10, exp)
  return `${mantissa.toFixed(2)}e${exp}`
}

// Create evenly spaced points for edge highlights
const createEdgePoints = (
  points: Point[],
  startX: number,
  endX: number,
  count = 10,
): Point[] => {
  const step = (endX - startX) / (count - 1)
  return Array.from({ length: count }, (_, i) => {
    const x = startX + step * i
    // Find the closest existing points to interpolate y value
    const idx = points.findIndex((p) => p.x > x)
    if (idx === 0) return { x, y: points[0].y }
    if (idx === -1) return { x, y: points[points.length - 1].y }
    const p1 = points[idx - 1]
    const p2 = points[idx]
    const t = (x - p1.x) / (p2.x - p1.x)
    return { x, y: p1.y + t * (p2.y - p1.y) }
  })
}

export function LineChart({
  data,
  xLabel,
  yLabel,
  totalAssets,
  previewAmount,
  selectedCurveId,
}: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [stickyPoint, setStickyPoint] = React.useState<SnapPoint | null>(null)

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

    // Create tooltip glow filter
    const tooltipFilter = defs
      .append('filter')
      .attr('id', 'tooltip-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%')

    tooltipFilter
      .append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur')

    tooltipFilter
      .append('feFlood')
      .attr('flood-color', '#fff')
      .attr('result', 'color')

    tooltipFilter
      .append('feComposite')
      .attr('in', 'color')
      .attr('in2', 'coloredBlur')
      .attr('operator', 'in')
      .attr('result', 'glowColor')

    const feMerge = tooltipFilter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'glowColor')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

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

    data.forEach((curve) => {
      // Create patterns for this curve
      createPattern(`basePattern-${curve.id}`, curve.color)
      createPattern(`depositPattern-${curve.id}`, '#00ff00')
      createPattern(`redeemPattern-${curve.id}`, '#ffff00', true)

      // Create gradients with secondary colors
      createGradient(`gradient-${curve.id}`, curve.color, '#ffffff') // Base: blue + white
      createGradient(
        `gradient-preview-${curve.id}`,
        curve.color,
        '#00ff00',
        true,
      ) // Deposit: blue + green
      createGradient(
        `gradient-preview-redeem-${curve.id}`,
        'hsl(var(--destructive))',
        '#ffff00',
        true,
      ) // Redeem: red + yellow

      // Add the glow effect with appropriate color
      svg
        .append('path')
        .datum(curve.points)
        .attr('fill', 'none')
        .attr('stroke', curve.color)
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
        .attr('d', line)

      // Add filled areas
      if (totalAssets !== undefined && curve.id === selectedCurveId) {
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
          // Create base edge gradients
          const createBaseEdgeGradient = (id: string, isLeft: boolean) => {
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
                .attr('stop-color', curve.color)
                .attr('stop-opacity', 0.5)

              gradient
                .append('stop')
                .attr('offset', '100%')
                .attr('stop-color', curve.color)
                .attr('stop-opacity', 0.0)
            } else {
              gradient
                .append('stop')
                .attr('offset', '0%')
                .attr('stop-color', curve.color)
                .attr('stop-opacity', 0.5)

              gradient
                .append('stop')
                .attr('offset', '100%')
                .attr('stop-color', curve.color)
                .attr('stop-opacity', 0.0)
            }
          }

          // Create gradients for both edges
          createBaseEdgeGradient('highlight-base-left', true)
          createBaseEdgeGradient('highlight-base-right', false)

          // Add base fill with gradient
          svg
            .append('path')
            .datum(basePoints)
            .attr('class', 'area1')
            .attr('fill', `url(#gradient-${curve.id})`)
            .attr('d', area)

          // Calculate fixed width for edge highlights (5% of total width)
          const edgeWidth = (xScale.domain()[1] - xScale.domain()[0]) * 0.05

          // Add edge highlights with evenly spaced points
          svg
            .append('path')
            .datum(
              createEdgePoints(
                basePoints,
                basePoints[0].x,
                basePoints[0].x + edgeWidth,
              ),
            )
            .attr('fill', 'url(#highlight-base-left)')
            .attr('d', area)

          svg
            .append('path')
            .datum(
              createEdgePoints(
                basePoints,
                boundaryPoint.x - edgeWidth,
                boundaryPoint.x,
              ),
            )
            .attr('fill', 'url(#highlight-base-right)')
            .attr('d', area)

          // Add pattern overlay
          svg
            .append('path')
            .datum(basePoints)
            .attr('class', 'area1-pattern')
            .attr('fill', `url(#basePattern-${curve.id})`)
            .attr('d', area)
        }

        // Add preview area if applicable
        if (previewPoints.length >= 2) {
          const isRedeem = curve.previewPoints?.[0]?.isRedeem
          const edgeWidth = (xScale.domain()[1] - xScale.domain()[0]) * 0.05

          if (isRedeem) {
            // Create redeem edge gradients
            const createRedeemEdgeGradient = (id: string, isLeft: boolean) => {
              const gradient = defs
                .append('linearGradient')
                .attr('id', id)
                .attr('x1', isLeft ? '100%' : '0%')
                .attr('x2', isLeft ? '0%' : '100%')
                .attr('y1', '0%')
                .attr('y2', '0%')

              if (isLeft) {
                gradient
                  .append('stop')
                  .attr('offset', '0%')
                  .attr('stop-color', '#ffff00')
                  .attr('stop-opacity', 0.5)

                gradient
                  .append('stop')
                  .attr('offset', '100%')
                  .attr('stop-color', '#ffff00')
                  .attr('stop-opacity', 0.0)
              } else {
                gradient
                  .append('stop')
                  .attr('offset', '0%')
                  .attr('stop-color', '#ffff00')
                  .attr('stop-opacity', 0.5)

                gradient
                  .append('stop')
                  .attr('offset', '100%')
                  .attr('stop-color', '#ffff00')
                  .attr('stop-opacity', 0.0)
              }
            }

            // Create gradients for both edges
            createRedeemEdgeGradient('highlight-redeem-left', true)
            createRedeemEdgeGradient('highlight-redeem-right', false)

            // Add main preview area first
            svg
              .append('path')
              .datum(previewPoints)
              .attr('class', 'area2')
              .attr('fill', 'url(#gradient-preview-redeem-${curve.id})')
              .attr('d', redeemArea)

            // Add edge highlights with evenly spaced points for redeem
            const endX = boundaryPoint.x - (scaledPreviewAmount ?? 0)

            // Right edge (at the boundary point)
            svg
              .append('path')
              .datum(
                createEdgePoints(
                  [...previewPoints].reverse(), // Reverse points for correct y-value interpolation
                  boundaryPoint.x - edgeWidth,
                  boundaryPoint.x,
                ),
              )
              .attr('fill', 'url(#highlight-redeem-left)')
              .attr('d', redeemArea)

            // Left edge (at the end point)
            svg
              .append('path')
              .datum(
                createEdgePoints(
                  [...previewPoints].reverse(), // Reverse points for correct y-value interpolation
                  endX,
                  endX + edgeWidth,
                ),
              )
              .attr('fill', 'url(#highlight-redeem-right)')
              .attr('d', redeemArea)

            // Add pattern overlay
            svg
              .append('path')
              .datum(previewPoints)
              .attr('class', 'area2-pattern')
              .attr('fill', `url(#redeemPattern-${curve.id})`)
              .attr('d', redeemArea)
          } else {
            // Create deposit edge gradients
            const createDepositEdgeGradient = (id: string, isLeft: boolean) => {
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
                  .attr('stop-color', '#00ff00')
                  .attr('stop-opacity', 0.5)

                gradient
                  .append('stop')
                  .attr('offset', '100%')
                  .attr('stop-color', '#00ff00')
                  .attr('stop-opacity', 0.0)
              } else {
                gradient
                  .append('stop')
                  .attr('offset', '0%')
                  .attr('stop-color', '#00ff00')
                  .attr('stop-opacity', 0.5)

                gradient
                  .append('stop')
                  .attr('offset', '100%')
                  .attr('stop-color', '#00ff00')
                  .attr('stop-opacity', 0.0)
              }
            }

            // Create gradients for both edges
            createDepositEdgeGradient('highlight-deposit-left', true)
            createDepositEdgeGradient('highlight-deposit-right', false)

            // Add main preview area
            svg
              .append('path')
              .datum(previewPoints)
              .attr('class', 'area2')
              .attr('fill', `url(#gradient-preview-${curve.id})`)
              .attr('d', area)

            // Add edge highlights with evenly spaced points
            svg
              .append('path')
              .datum(
                createEdgePoints(
                  previewPoints,
                  boundaryPoint.x,
                  boundaryPoint.x + edgeWidth,
                ),
              )
              .attr('fill', 'url(#highlight-deposit-left)')
              .attr('d', area)

            const endX = boundaryPoint.x + (scaledPreviewAmount ?? 0)
            svg
              .append('path')
              .datum(createEdgePoints(previewPoints, endX - edgeWidth, endX))
              .attr('fill', 'url(#highlight-deposit-right)')
              .attr('d', area)

            // Add pattern overlay
            svg
              .append('path')
              .datum(previewPoints)
              .attr('class', 'area2-pattern')
              .attr('fill', `url(#depositPattern-${curve.id})`)
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

    // Add crosshair group
    const crosshair = svg
      .append('g')
      .attr('class', 'crosshair')
      .style('display', 'none')

    // Add vertical line
    crosshair
      .append('line')
      .attr('class', 'crosshair-vertical')
      .attr('y1', 0)
      .attr('y2', height)
      .style('stroke', '#666')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '3,3')

    // Add horizontal line
    crosshair
      .append('line')
      .attr('class', 'crosshair-horizontal')
      .attr('x1', 0)
      .attr('x2', width)
      .style('stroke', '#666')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '3,3')

    // Function to find closest point on selected curve
    const findClosestPoint = (mouseX: number): SnapPoint | null => {
      if (!selectedCurveId) return null
      const selectedCurve = data.find((c) => c.id === selectedCurveId)
      if (!selectedCurve) return null

      const index = bisect(selectedCurve.points, mouseX, 1)
      if (index === 0) {
        // If before first point, return first point
        return {
          x: selectedCurve.points[0].x,
          y: selectedCurve.points[0].y,
          curve: selectedCurve,
        }
      }
      if (index >= selectedCurve.points.length) {
        // If after last point, return last point
        const lastPoint = selectedCurve.points[selectedCurve.points.length - 1]
        return {
          x: lastPoint.x,
          y: lastPoint.y,
          curve: selectedCurve,
        }
      }

      // Get the two points we're between
      const point1 = selectedCurve.points[index - 1]
      const point2 = selectedCurve.points[index]

      // Calculate the interpolation factor
      const t = (mouseX - point1.x) / (point2.x - point1.x)

      // Interpolate the y value
      const interpolatedY = point1.y + t * (point2.y - point1.y)

      return {
        x: mouseX,
        y: interpolatedY,
        curve: selectedCurve,
      }
    }

    // Function to update crosshair and tooltip position
    const updateCrosshairAndTooltip = (
      point: SnapPoint,
      isSticky: boolean = false,
    ) => {
      const xPos = xScale(point.x)
      const yPos = yScale(point.y)

      // Update crosshair position
      crosshair.style('display', 'block')
      crosshair.select('.crosshair-vertical').attr('x1', xPos).attr('x2', xPos)

      crosshair
        .select('.crosshair-horizontal')
        .attr('y1', yPos)
        .attr('y2', yPos)

      // Get SVG's position on the page
      const svgRect = svgRef.current?.getBoundingClientRect()
      if (!svgRect) return

      // Find values for all curves at this x position
      const tooltipContent = `
        <div style="margin-bottom: 8px;">
          <strong>Assets:</strong> ${formatScientific(point.x)}
        </div>
        ${data
          .map((curve) => {
            const index = bisect(curve.points, point.x, 1)
            if (index === 0) {
              // If before first point, use first point
              const firstPoint = curve.points[0]
              return `
                <div style="
                  ${curve.id === selectedCurveId ? 'font-weight: bold; color: ' + curve.color : ''}
                  margin-bottom: 4px;
                ">
                  <span style="color: ${curve.color}">●</span> ${curve.name}<br/>
                  Shares: ${formatScientific(firstPoint.y)}
                </div>
              `
            }
            if (index >= curve.points.length) {
              // If after last point, use last point
              const lastPoint = curve.points[curve.points.length - 1]
              return `
                <div style="
                  ${curve.id === selectedCurveId ? 'font-weight: bold; color: ' + curve.color : ''}
                  margin-bottom: 4px;
                ">
                  <span style="color: ${curve.color}">●</span> ${curve.name}<br/>
                  Shares: ${formatScientific(lastPoint.y)}
                </div>
              `
            }

            // Get the two points we're between
            const point1 = curve.points[index - 1]
            const point2 = curve.points[index]

            // Calculate the interpolation factor
            const t = (point.x - point1.x) / (point2.x - point1.x)

            // Interpolate the y value
            const interpolatedY = point1.y + t * (point2.y - point1.y)

            const isSelected = curve.id === selectedCurveId
            return `
              <div style="
                ${isSelected ? 'font-weight: bold; color: ' + curve.color : ''}
                margin-bottom: 4px;
              ">
                <span style="color: ${curve.color}">●</span> ${curve.name}<br/>
                Shares: ${formatScientific(interpolatedY)}
              </div>
            `
          })
          .filter(Boolean)
          .join('')}`

      // Update tooltip content and styles
      tooltip
        .style('visibility', 'visible')
        .html(tooltipContent)
        .style('cursor', isSticky ? 'pointer' : 'default')
        .style(
          'border',
          isSticky ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        )
        .style('filter', isSticky ? 'url(#tooltip-glow)' : 'none')

      // Get tooltip dimensions after content update
      const tooltipNode = tooltip.node() as HTMLElement
      const tooltipRect = tooltipNode.getBoundingClientRect()

      // Calculate tooltip position relative to SVG and crosshair intersection
      // Position tooltip in upper left quadrant, but ensure it stays within the SVG bounds
      const tooltipX = Math.max(
        svgRect.left + margin.left,
        Math.min(
          svgRect.left + margin.left + xPos - tooltipRect.width - 10,
          svgRect.right - tooltipRect.width - margin.right,
        ),
      )
      const tooltipY = Math.max(
        svgRect.top + margin.top,
        Math.min(
          svgRect.top + margin.top + yPos - tooltipRect.height - 10,
          svgRect.bottom - tooltipRect.height - margin.bottom,
        ),
      )

      // Update tooltip position
      tooltip.style('left', tooltipX + 'px').style('top', tooltipY + 'px')
    }

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
      .style('pointer-events', 'all')
      .on('click', () => {
        // Clear sticky point when clicking tooltip
        setStickyPoint(null)
        tooltip.style('visibility', 'hidden')
        crosshair.style('display', 'none')
      })

    const bisect = d3.bisector<Point, number>((d) => d.x).left

    // Add invisible overlay for mouse tracking
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mousemove', (event) => {
        if (stickyPoint) return // Don't update if we have a sticky point

        const mouseX = xScale.invert(d3.pointer(event)[0])
        const snapPoint = findClosestPoint(mouseX)

        if (snapPoint) {
          updateCrosshairAndTooltip(snapPoint)
        } else {
          crosshair.style('display', 'none')
          tooltip.style('visibility', 'hidden')
        }
      })
      .on('mouseout', () => {
        if (!stickyPoint) {
          crosshair.style('display', 'none')
          tooltip.style('visibility', 'hidden')
        }
      })
      .on('click', (event) => {
        const mouseX = xScale.invert(d3.pointer(event)[0])
        const snapPoint = findClosestPoint(mouseX)

        if (snapPoint) {
          setStickyPoint(snapPoint)
          updateCrosshairAndTooltip(snapPoint, true)
        }
      })

    // Update sticky point if it exists
    if (stickyPoint) {
      updateCrosshairAndTooltip(stickyPoint, true)
    }

    // Cleanup function
    return () => {
      tooltip.remove()
    }
  }, [
    data,
    xLabel,
    yLabel,
    totalAssets,
    previewAmount,
    selectedCurveId,
    stickyPoint,
  ])

  return (
    <svg
      ref={svgRef}
      style={{ width: '100%', height: '100%' }}
      className="dark:text-white"
    />
  )
}
