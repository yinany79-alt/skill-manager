import type { Stats, Project } from '../hooks/useSkills'
import { AGENT_ORDER, getAgentMeta } from '../agents'
import { getCategoryMeta } from './CategoryBadge'
import { AgentIcon } from './Icons'

interface SidebarProps {
  stats: Stats
  projects: Project[]
  scopeFilter: string
  sourceFilter: string
  agentFilter: string
  categoryFilter: string
  projectFilter: string
  onScopeChange: (v: string) => void
  onSourceChange: (v: string) => void
  onAgentChange: (v: string) => void
  onCategoryChange: (v: string) => void
  onProjectChange: (v: string) => void
}

export function Sidebar({
  stats,
  projects,
  scopeFilter,
  sourceFilter,
  agentFilter,
  categoryFilter,
  projectFilter,
  onScopeChange,
  onSourceChange,
  onAgentChange,
  onCategoryChange,
  onProjectChange,
}: SidebarProps) {
  const scopeItems = [
    { value: 'all', label: '全部', count: stats.total },
    { value: 'global', label: '全局 Skills', count: stats.global },
    { value: 'project', label: '项目级 Skills', count: stats.project },
  ]

  const sourceItems = [
    { value: 'all', label: '全部来源' },
    ...Object.entries(stats.bySource)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => ({
        value: k,
        label: sourceLabel(k),
        count: v,
      })),
  ]

  // Agent items: show every agent that has skills, in registry order
  const agentEntries = AGENT_ORDER
    .map((id) => ({ id, count: stats.byAgent?.[id] || 0 }))
    .filter((e) => e.count > 0)
  const agentItems = [
    { value: 'all', label: '全部 Agent', icon: 'all' as const, count: stats.total },
    ...agentEntries.map((e) => {
      const meta = getAgentMeta(e.id)
      return { value: meta.id, label: meta.name, icon: meta.id, count: e.count }
    }),
  ]

  return (
    <aside className="lg:w-60 shrink-0 space-y-5">
      {/* Scope */}
      <FilterSection title="层级">
        {scopeItems.map((item) => (
          <FilterButton
            key={item.value}
            active={scopeFilter === item.value}
            onClick={() => onScopeChange(item.value)}
            label={item.label}
            count={item.count}
            icon={scopeIcon(item.value)}
          />
        ))}
      </FilterSection>

      {/* Agent type */}
      <FilterSection title="Agent 类型">
        {agentItems.map((item) => (
          <FilterButton
            key={item.value}
            active={agentFilter === item.value}
            onClick={() => onAgentChange(item.value)}
            label={item.label}
            count={item.count}
            agentIcon={item.icon}
          />
        ))}
      </FilterSection>

      {/* Category */}
      {Object.keys(stats.byCategory || {}).length > 0 && (
        <FilterSection title="分类">
          <FilterButton
            active={categoryFilter === 'all'}
            onClick={() => onCategoryChange('all')}
            label="全部分类"
            icon="all"
            count={stats.total}
          />
          {Object.entries(stats.byCategory || {})
            .sort((a, b) => b[1] - a[1])
            .map(([catId, count]) => {
              const meta = getCategoryMeta(catId)
              return (
                <FilterButton
                  key={catId}
                  active={categoryFilter === catId}
                  onClick={() => onCategoryChange(catId)}
                  label={meta.name}
                  icon={catId}
                  count={count}
                />
              )
            })}
        </FilterSection>
      )}

      {/* Source */}
      <FilterSection title="来源">
        {sourceItems.map((item) => (
          <FilterButton
            key={item.value}
            active={sourceFilter === item.value}
            onClick={() => onSourceChange(item.value)}
            label={item.label}
            count={'count' in item ? (item as any).count : undefined}
            icon={sourceIcon(item.value)}
          />
        ))}
      </FilterSection>

      {/* Projects */}
      {projects.length > 0 && (
        <FilterSection title="项目">
          <FilterButton
            active={projectFilter === 'all'}
            onClick={() => onProjectChange('all')}
            label="全部项目"
          />
          {projects.map((p) => (
            <FilterButton
              key={p.path}
              active={projectFilter === p.path}
              onClick={() => onProjectChange(p.path)}
              label={p.name}
              count={p.skillCount}
              icon="project"
            />
          ))}
        </FilterSection>
      )}
    </aside>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold text-[#6c6a64] uppercase tracking-widest mb-2 px-1">
        {title}
      </h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  label,
  count,
  icon,
  agentIcon,
}: {
  active: boolean
  onClick: () => void
  label: string
  count?: number
  icon?: string
  agentIcon?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] transition-all flex justify-between items-center
        ${active
          ? 'bg-[#efe9de] text-[#cc785c] font-medium'
          : 'text-[#6c6a64] hover:bg-[#efe9de] hover:text-[#3d3d3a]'
        }`}
    >
      <span className="flex items-center gap-2 truncate">
        {agentIcon && <AgentIcon agent={agentIcon} className="w-3.5 h-3.5" />}
        {icon && !agentIcon && <SidebarIcon name={icon} />}
        <span className="truncate">{label}</span>
      </span>
      {count !== undefined && (
        <span className={`text-[11px] tabular-nums ${active ? 'text-[#cc785c]/70' : 'text-[#8e8b82]'}`}>
          {count}
        </span>
      )}
    </button>
  )
}

function SidebarIcon({ name }: { name: string }) {
  switch (name) {
    case 'all':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    case 'global':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    case 'project':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4H9l2 2h8.5A2.5 2.5 0 0 1 22 8.5v7A2.5 2.5 0 0 1 19.5 18h-15A2.5 2.5 0 0 1 2 15.5v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    case 'newmax':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.7"/>
        </svg>
      )
    case 'agents':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="15" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
          <path d="M3 18c0-3 3-5 6-5h6c3 0 6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'local':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
        </svg>
      )
    case 'other':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="8" cy="12" r="1" fill="currentColor" opacity="0.5"/>
          <circle cx="16" cy="12" r="1" fill="currentColor" opacity="0.5"/>
        </svg>
      )
    case 'dev':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <path d="M8 8l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'social':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="16" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 17c0-3 2-5 5-5h8c3 0 5 2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'docs':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <path d="M4 4h12l4 4v12H4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M16 4v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 9h5M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'data':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <rect x="4" y="12" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="10" y="8" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="16" y="4" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    case 'agent':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6 18c0-3 2.7-6 6-6s6 3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'search':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'translate':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <path d="M4 5h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 5v6c0 2.5 2 4.5 4 4.5s4-2 4-4.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 11v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'sysadmin':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.5-.8L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    case 'code':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <path d="M8 8l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      )
    default:
      return null
  }
}

function scopeIcon(scope: string) {
  const icons: Record<string, string> = { all: 'all', global: 'global', project: 'project' }
  return icons[scope] || ''
}

function sourceIcon(source: string) {
  const icons: Record<string, string> = { all: '', newmax: 'newmax', agents: 'agents', local: 'local' }
  return icons[source] || ''
}

function sourceLabel(source: string): string {
  const labels: Record<string, string> = {
    newmax: 'Newmax 框架',
    agents: 'Agents 平台',
    local: '本地',
    symlink: '符号链接',
    unknown: '未知',
  }
  return labels[source] || source
}
