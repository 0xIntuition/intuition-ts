'use client'

import React from 'react'

import {
  CartesianGrid,
  Line,
  LineChart as LineChartComponent,
  ReferenceArea,
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

        {data.map((curve) => (
          <React.Fragment key={curve.id}>
            {/* Base curve line */}
            <Line
              type="monotone"
              data={curve.points}
              dataKey="y"
              stroke={curve.color}
              dot={false}
              name={curve.name}
            />

            {/* Total Assets area fill */}
            {totalAssets !== undefined && (
              <ReferenceArea
                x1={0}
                x2={totalAssets}
                fill={curve.color}
                fillOpacity={0.3}
              />
            )}

            {/* Preview area fill */}
            {previewAmount !== undefined && totalAssets !== undefined && (
              <ReferenceArea
                x1={totalAssets}
                x2={totalAssets + previewAmount}
                fill={curve.color}
                fillOpacity={0.15}
              />
            )}
          </React.Fragment>
        ))}
      </LineChartComponent>
    </ResponsiveContainer>
  )
}
