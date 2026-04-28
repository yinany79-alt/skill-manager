import { getAgentMeta } from '../agents'
import { AgentIcon } from './Icons'

const sourceColors: Record<string, { bg: string; text: string }> = {
  newmax: { bg: 'bg-[#cc785c]/20', text: 'text-[#cc785c]' },
  agents: { bg: 'bg-[#5db8a6]/20', text: 'text-[#5db8a6]' },
  local: { bg: 'bg-[#5db872]/20', text: 'text-[#5db872]' },
  symlink: { bg: 'bg-[#e8a55a]/20', text: 'text-[#e8a55a]' },
  unknown: { bg: 'bg-[#8e8b82]/20', text: 'text-[#8e8b82]' },
}

const scopeColors: Record<string, { bg: string; text: string }> = {
  global: { bg: 'bg-[#cc785c]/20', text: 'text-[#cc785c]' },
  project: { bg: 'bg-[#e8a55a]/20', text: 'text-[#cc785c]' },
  plugin: { bg: 'bg-[#5db8a6]/20', text: 'text-[#5db8a6]' },
}

export function SourceBadge({ source }: { source: string }) {
  const colors = sourceColors[source] || sourceColors.unknown
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
      {source}
    </span>
  )
}

export function AgentBadge({ agent }: { agent: string }) {
  const meta = getAgentMeta(agent)
  return (
    <span
      title={meta.name}
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium ring-1 ${meta.color.bg} ${meta.color.text} ${meta.color.ring}`}
    >
      <AgentIcon agent={agent} />
      <span className="truncate max-w-[80px]">{meta.name}</span>
    </span>
  )
}

export function ScopeBadge({ scope }: { scope: string }) {
  const colors = scopeColors[scope] || scopeColors.global
  const labels: Record<string, string> = { global: '全局', project: '项目级', plugin: '插件' }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
      {labels[scope] || scope}
    </span>
  )
}
