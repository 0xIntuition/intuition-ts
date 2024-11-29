'use client'

import React from 'react'

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface Point {
  x: number
  y: number
  totalValue?: number
  userValue?: number
}

interface CurveData {
  id: string
  name: string
  color: string
  points: Point[]
  totalAssets: number
  totalShares: number
  userAssets: number
  userShares: number
  previewDeposit?: Point
  previewRedeem?: Point
}

interface LineChartProps {
  data: CurveData[]
  xLabel?: string
  yLabel?: string
  minValue?: number
  maxValue?: number
}

export function LineChart({
  data,
  xLabel,
  yLabel,
  minValue,
  maxValue,
}: LineChartProps) {
  const curve = data[0]
  if (!curve) return null

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={curve.points}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            domain={[minValue || 'auto', maxValue || 'auto']}
            label={{
              value: xLabel,
              position: 'insideBottom',
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'y') return null // Don't show the curve line in tooltip
              return value.toFixed(4)
            }}
            labelFormatter={(label: number) => `${xLabel}: ${label.toFixed(4)}`}
          />

          {/* Base curve */}
          <Line
            type="monotone"
            dataKey="y"
            name="y" // Changed from "Price" to "y" to hide in tooltip
            stroke={curve.color}
            dot={false}
          />

          {/* Total shares area */}
          {curve.totalShares > 0 && (
            <Area
              type="monotone"
              dataKey="totalValue"
              name="Total Shares"
              fill={curve.color}
              fillOpacity={0.1}
              stroke="none"
            />
          )}

          {/* User shares area */}
          {curve.userShares > 0 && (
            <Area
              type="monotone"
              dataKey="userValue"
              name="Your Shares"
              fill={curve.color}
              fillOpacity={0.3}
              stroke="none"
            />
          )}

          {/* Preview deposit */}
          {curve.previewDeposit && (
            <Line
              type="monotone"
              data={[
                {
                  x: curve.totalAssets,
                  y: curve.totalShares,
                },
                {
                  x: curve.previewDeposit.x,
                  y: curve.previewDeposit.y,
                },
              ]}
              dataKey="y"
              name="Preview Deposit"
              stroke={curve.color}
              strokeDasharray="5 5"
              dot={{ fill: curve.color }}
            />
          )}

          {/* Preview redeem */}
          {curve.previewRedeem && (
            <Line
              type="monotone"
              data={[
                {
                  x: curve.totalAssets,
                  y: curve.totalShares,
                },
                {
                  x: curve.previewRedeem.x,
                  y: curve.previewRedeem.y,
                },
              ]}
              dataKey="y"
              name="Preview Redeem"
              stroke={curve.color}
              strokeDasharray="5 5"
              dot={{ fill: curve.color }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
