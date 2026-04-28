import { SourceBadge, ScopeBadge, AgentBadge } from './SourceBadge'
import { CategoryBadge } from './CategoryBadge'
import { LinkIcon } from './Icons'
import type { Skill } from '../hooks/useSkills'

interface SkillCardProps {
  skill: Skill
  onClick?: (skill: Skill) => void
  selectMode?: boolean
  selected?: boolean
  onSelectToggle?: (skill: Skill) => void
}

function asText(v: unknown): string {
  if (v == null) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'number' || typeof v === 'boolean') return String(v)
  try {
    return JSON.stringify(v)
  } catch {
    return '[object]'
  }
}

export function SkillCard({ skill, onClick, selectMode, selected, onSelectToggle }: SkillCardProps) {
  const name = asText(skill.name)
  const description = asText(skill.description)
  const model = asText(skill.frontmatter?.model)

  const handleClick = () => {
    if (selectMode) {
      onSelectToggle?.(skill)
    } else {
      onClick?.(skill)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative rounded-xl border p-4 cursor-pointer transition-all duration-200
        ${selected
          ? 'border-[#cc785c] bg-[#cc785c]/10 ring-2 ring-[#cc785c]/40'
          : skill.enabled
            ? 'border-[#e6dfd8] bg-[#efe9de] hover:border-[#cc785c]/50 hover:bg-[#e8e0d2]'
            : 'border-[#e6dfd8] bg-[#f5f0e8] opacity-60 hover:opacity-80'
        }`}
    >
      {/* Conflict indicator */}
      {skill.hasConflict && (
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#e8a55a] ring-2 ring-[#faf9f5]" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-2 gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {selectMode && (
            <div
              className={`w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                selected
                  ? 'bg-[#cc785c] border-[#cc785c]'
                  : 'bg-[#faf9f5] border-[#8e8b82] group-hover:border-[#6c6a64]'
              }`}
            >
              {selected && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-white">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          )}
          <h3 className="text-sm font-semibold text-[#141413] group-hover:text-[#cc785c] transition-colors truncate">
            /{name}
          </h3>
        </div>
        <div className="flex gap-1 shrink-0 items-center">
          <AgentBadge agent={skill.agent} />
          <ScopeBadge scope={skill.scope} />
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-[#6c6a64] line-clamp-2 mb-3 leading-relaxed min-h-[2.5rem]">
        {description || '无描述'}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <SourceBadge source={skill.source} />
          {skill.category && skill.category !== 'other' && (
            <CategoryBadge category={skill.category} />
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-[#8e8b82]">
          {skill.symlinkTarget && (
            <span title={`→ ${skill.symlinkTarget}`} className="text-[#8e8b82]">
              <LinkIcon className="w-3 h-3" />
            </span>
          )}
          {!skill.enabled && (
            <span className="text-[#c64545]/80 text-[11px]">禁用</span>
          )}
          {model && (
            <span className="text-[#8e8b82]">{model}</span>
          )}
        </div>
      </div>
    </div>
  )
}
