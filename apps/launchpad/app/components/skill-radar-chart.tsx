import { useState } from 'react'

import { ChartContainer } from '@components/chart'
import { Skill } from 'app/types/rewards'
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts'

import { SkillModal } from './skill-modal'

interface SkillRadarChartProps {
  skills: Skill[]
}

interface ChartData {
  subject: string
  A: number
  fullMark: number
  originalSkill: Skill
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartData
    return (
      <div className="bg-background border rounded-lg p-2 shadow-lg">
        <p className="font-medium">{data.subject}</p>
        <p className="text-sm text-muted-foreground">Points: {data.A}</p>
      </div>
    )
  }
  return null
}

export function SkillRadarChart({ skills }: SkillRadarChartProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const chartData = skills.map((skill) => ({
    subject: skill.name,
    A: skill.points,
    fullMark: Math.max(...skills.map((s) => s.points)) * 1.2,
    originalSkill: skill,
  }))

  return (
    <>
      <ChartContainer
        config={{
          A: {
            label: 'Points',
            color: 'hsl(var(--chart-1))',
          },
        }}
        className="w-full h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="90%"
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={3}
                    textAnchor="middle"
                    fill="#BA8461"
                    className="cursor-pointer text-lg"
                    onClick={() => {
                      const skill = skills.find((s) => s.name === payload.value)
                      if (skill) {
                        setSelectedSkill(skill)
                        setIsModalOpen(true)
                      }
                    }}
                  >
                    {payload.value}
                  </text>
                </g>
              )}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Skills"
              dataKey="A"
              fill="#F59E11"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
                fill: '#F59E11',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          levels={[
            { name: 'Novice', asset: '1', pointsThreshold: 1000 },
            { name: 'Apprentice', asset: '2', pointsThreshold: 5000 },
            { name: 'Adept', asset: '3', pointsThreshold: 10000 },
            { name: 'Expert', asset: '4', pointsThreshold: 20000 },
            { name: 'Master', asset: '5', pointsThreshold: 35000 },
            { name: 'Grandmaster', asset: '6', pointsThreshold: 50000 },
          ]}
        />
      )}
    </>
  )
}
