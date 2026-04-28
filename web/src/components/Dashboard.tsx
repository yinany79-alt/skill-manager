import type { Stats, Project, ConflictGroup, Skill } from '../hooks/useSkills'
import { HealthPanel } from './HealthPanel'
import type { HealthReport, MergeSuggestion, CategorySummary } from './HealthPanel'

interface DashboardProps {
  stats: Stats
  projects: Project[]
  conflicts: ConflictGroup[]
  skills: Skill[]
  health: HealthReport | null
  categories: CategorySummary[]
  mergeSuggestions: MergeSuggestion[]
  onSkillClick?: (skill: Skill) => void
}

export function Dashboard({ stats, projects, conflicts, skills, health, categories, mergeSuggestions, onSkillClick }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Health Panel */}
      <HealthPanel
        health={health}
        mergeSuggestions={mergeSuggestions}
        categories={categories}
        skills={skills}
        onSkillClick={onSkillClick}
      />

      {/* Source + Scope Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="来源分布">
          <div className="space-y-2.5">
            {Object.entries(stats.bySource)
              .sort((a, b) => b[1] - a[1])
              .map(([source, count]) => (
                <BarItem
                  key={source}
                  label={sourceLabel(source)}
                  count={count}
                  total={stats.total}
                  color={sourceColor(source)}
                />
              ))}
          </div>
        </Card>

        <Card title="层级分布">
          <div className="space-y-2.5">
            <BarItem label="全局 Skills" count={stats.global} total={stats.total} color="bg-[#cc785c]" />
            <BarItem label="项目级 Skills" count={stats.project} total={stats.total} color="bg-[#e8a55a]" />
          </div>
          <div className="mt-4 pt-3 border-t border-[#e6dfd8]">
            <div className="flex items-center justify-between text-xs text-[#8e8b82] mb-2">
              <span>Symlink 数量</span>
              <span className="text-[#3d3d3a]">
                {skills.filter((s) => s.symlinkTarget).length}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#8e8b82]">
              <span>已禁用</span>
              <span className="text-[#3d3d3a]">
                {skills.filter((s) => !s.enabled).length}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <Card title="项目概览">
          <div className="space-y-2">
            {projects.map((p) => (
              <div
                key={p.path}
                className="flex items-center justify-between py-2 border-b border-[#e6dfd8] last:border-0"
              >
                <div>
                  <span className="text-sm text-[#3d3d3a]">{p.name}</span>
                  <span className="text-xs text-[#8e8b82] ml-2 font-mono">{p.path}</span>
                </div>
                <span className="text-sm text-[#6c6a64] font-medium">{p.skillCount} skills</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Conflicts */}
      {conflicts.length > 0 && (
        <Card title={`冲突检测 (${conflicts.length} 组)`} accent="amber">
          <div className="space-y-3">
            {conflicts.map((group) => (
              <div
                key={group.name}
                className="bg-[#e8a55a]/5 border border-[#e8a55a]/20 rounded-lg p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#e8a55a] text-sm font-semibold">/{group.name}</span>
                  <span className="text-[11px] text-[#e8a55a]/70 bg-[#e8a55a]/10 px-2 py-0.5 rounded-full">
                    {group.skills.length} 个冲突
                  </span>
                </div>
                <div className="space-y-1">
                  {group.skills.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className={`px-1.5 py-0.5 rounded ${
                        s.scope === 'global'
                          ? 'bg-[#cc785c]/20 text-[#cc785c]'
                          : 'bg-[#e8a55a]/20 text-[#e8a55a]'
                      }`}>
                        {s.scope === 'global' ? '全局' : '项目'}
                      </span>
                      <span className="text-[#6c6a64] font-mono truncate">{s.path}</span>
                      <span className="text-[#8e8b82]">({s.source})</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

function Card({
  title,
  children,
  accent = 'default',
}: {
  title: string
  children: React.ReactNode
  accent?: 'default' | 'amber'
}) {
  return (
    <div className={`rounded-xl border p-5 ${
      accent === 'amber'
        ? 'bg-[#efe9de] border-[#e8a55a]/20'
        : 'bg-[#efe9de] border-[#e6dfd8]'
    }`}>
      <h3 className="text-sm font-semibold text-[#3d3d3a] mb-4">{title}</h3>
      {children}
    </div>
  )
}

function BarItem({
  label,
  count,
  total,
  color,
}: {
  label: string
  count: number
  total: number
  color: string
}) {
  const pct = total > 0 ? (count / total) * 100 : 0
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-[#6c6a64]">{label}</span>
        <span className="text-[#3d3d3a] font-medium">{count} <span className="text-[#8e8b82]">({pct.toFixed(0)}%)</span></span>
      </div>
      <div className="h-2 bg-[#f5f0e8] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function sourceLabel(s: string): string {
  const m: Record<string, string> = { newmax: 'Newmax 框架', agents: 'Agents 平台', local: '本地', unknown: '未知' }
  return m[s] || s
}

function sourceColor(s: string): string {
  const m: Record<string, string> = { newmax: 'bg-[#cc785c]', agents: 'bg-[#5db8a6]', local: 'bg-[#5db872]', unknown: 'bg-[#8e8b82]' }
  return m[s] || 'bg-[#8e8b82]'
}
