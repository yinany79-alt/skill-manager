import type { Stats, Project } from '../hooks/useSkills'
import type { HealthReport } from './HealthPanel'

interface StatsBarProps {
  stats: Stats
  projects: Project[]
  conflicts: number
  health: HealthReport | null
}

const healthDot: Record<string, string> = {
  green: 'bg-[#5db872]',
  yellow: 'bg-[#e8a55a]',
  red: 'bg-[#c64545]',
}

export function StatsBar({ stats, projects, conflicts, health }: StatsBarProps) {
  const cards = [
    { label: '总计', value: stats.total, color: 'text-[#141413]', bg: 'bg-[#efe9de]' },
    { label: '全局', value: stats.global, color: 'text-[#cc785c]', bg: 'bg-[#efe9de]' },
    { label: '项目级', value: stats.project, color: 'text-[#e8a55a]', bg: 'bg-[#efe9de]' },
    { label: '来源', value: Object.keys(stats.bySource).length, color: 'text-[#5db8a6]', bg: 'bg-[#efe9de]' },
    { label: '项目', value: projects.length, color: 'text-[#5db872]', bg: 'bg-[#efe9de]' },
    { label: '冲突', value: conflicts, color: conflicts > 0 ? 'text-[#e8a55a]' : 'text-[#8e8b82]', bg: 'bg-[#efe9de]' },
  ]

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
      {cards.map((c, i) => (
        <div key={c.label} className={`relative rounded-xl ${c.bg} border border-[#e6dfd8] px-4 py-3`}>
          <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
          <div className="text-xs text-[#8e8b82] mt-0.5">{c.label}</div>
          {i === 0 && health && (
            <div
              className="absolute top-2.5 right-2.5 flex items-center gap-1.5"
              title={`健康评分 ${health.score}/100 — ${health.summary}`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${healthDot[health.level] || healthDot.red} animate-pulse`} />
              <span className="text-[10px] text-[#8e8b82] font-medium">{health.score}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
