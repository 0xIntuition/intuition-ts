'use client'

import React from 'react'

import {
  Area,
  CartesianGrid,
  Line,
  LineChart as LineChartComponent,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

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

export function LineChart({
  data,
  xLabel,
  yLabel,
  totalAssets,
  previewAmount,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChartComponent data={data.flatMap((curve) => curve.points)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          type="number"
          label={{ value: xLabel, position: 'insideBottom', offset: -5 }}
          domain={['dataMin', 'dataMax']}
        />
        <YAxis
          label={{ value: yLabel, angle: -90, position: 'insideLeft' }}
          domain={['dataMin', 'dataMax']}
        />
        <Tooltip formatter={(value: any) => value.toFixed(4)} />

        {data.map((curve) => {
          // Create arrays with boundary points included
          const totalAssetsPoints =
            totalAssets !== undefined
              ? [
                  { x: 0, y: 0 },
                  ...curve.points.filter((p) => p.x <= totalAssets),
                  {
                    x: totalAssets,
                    y: curve.points.find((p) => p.x >= totalAssets)?.y || 0,
                  },
                ]
              : []

          const previewPoints =
            previewAmount !== undefined && totalAssets !== undefined
              ? [
                  {
                    x: totalAssets,
                    y: curve.points.find((p) => p.x >= totalAssets)?.y || 0,
                  },
                  ...curve.points.filter(
                    (p) =>
                      p.x > totalAssets && p.x <= totalAssets + previewAmount,
                  ),
                  {
                    x: totalAssets + previewAmount,
                    y:
                      curve.points.find(
                        (p) => p.x >= totalAssets + previewAmount,
                      )?.y || 0,
                  },
                ]
              : []

          return (
            <React.Fragment key={curve.id}>
              {/* Total Assets area fill */}
              {totalAssets !== undefined && (
                <Area
                  type="monotone"
                  data={totalAssetsPoints}
                  dataKey="y"
                  x="x"
                  stroke="none"
                  fill={curve.color}
                  fillOpacity={0.2}
                  isAnimationActive={false}
                />
              )}

              {/* Preview area fill */}
              {previewAmount !== undefined && totalAssets !== undefined && (
                <Area
                  type="monotone"
                  data={previewPoints}
                  dataKey="y"
                  x="x"
                  stroke="none"
                  fill={curve.color}
                  fillOpacity={0.1}
                  isAnimationActive={false}
                />
              )}

              {/* Base curve line */}
              <Line
                type="monotone"
                data={curve.points}
                dataKey="y"
                stroke={curve.color}
                dot={false}
                name={curve.name}
              />
            </React.Fragment>
          )
        })}
      </LineChartComponent>
    </ResponsiveContainer>
  )
}
