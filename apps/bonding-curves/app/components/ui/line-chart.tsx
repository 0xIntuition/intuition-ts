'use client'

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
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
  name: string
  points: Point[]
  color: string
}

interface LineChartProps {
  data: CurveData[]
  xLabel?: string
  yLabel?: string
  title?: string
}

export function LineChart({
  data,
  xLabel = 'X',
  yLabel = 'Y',
  title,
}: LineChartProps) {
  // Combine all points into a single dataset with multiple values
  const formattedData =
    data[0]?.points.map((_, index) => {
      const point: any = { x: data[0].points[index].x }
      data.forEach((curve) => {
        point[curve.id] = curve.points[index].y
      })
      return point
    }) || []

  return (
    <div className="w-full h-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="x"
            label={{ value: xLabel, position: 'insideBottom', offset: -5 }}
            className="text-sm fill-muted-foreground"
          />
          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: 'insideLeft',
              offset: 10,
            }}
            className="text-sm fill-muted-foreground"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
            isAnimationActive={false}
          />
          <Legend />
          {data.map((curve) => (
            <Line
              key={curve.id}
              type="monotone"
              dataKey={curve.id}
              name={curve.name}
              stroke={curve.color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={0}
              animationEasing="linear"
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
