import React from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import { ChartContainer } from "./ui/chart"


const SkillsRadarChart = ({ data }) => {
  const chartData = data
    ? Object.entries(data).map(([subject, value]) => ({ subject, value }))
    : [
        { subject: 'RAG Understanding', value: 85 },
        { subject: 'Application of RAG', value: 80 },
        { subject: 'Technical Implementation', value: 70 },
      ]

  return (
    <ChartContainer
      config={{
        skills: {
          label: "Skills",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="var(--color-skills)"
            fill="var(--color-skills)"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default SkillsRadarChart

