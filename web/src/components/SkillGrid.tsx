import { SkillCard } from './SkillCard'
import { getCategoryMeta } from './CategoryBadge'
import { ScopeIcon, SourceIcon, CategoryIcon } from './Icons'
import type { Skill } from '../hooks/useSkills'

interface SkillGridProps {
  skills: Skill[]
  groupBy: 'none' | 'scope' | 'source' | 'project' | 'category'
  onSkillClick: (skill: Skill) => void
  selectMode?: boolean
  selectedIds?: Set<string>
  onSelectToggle?: (skill: Skill) => void
}

const scopeLabels: Record<string, string> = {
  global: '全局 Skills',
  project: '项目级 Skills',
  plugin: '插件 Skills',
}

const sourceLabels: Record<string, string> = {
  newmax: 'Newmax 框架',
  agents: 'Agents 平台',
  local: '本地',
  symlink: '符号链接',
  unknown: '未知',
}

export function SkillGrid({ skills, groupBy, onSkillClick, selectMode, selectedIds, onSelectToggle }: SkillGridProps) {
  const renderCard = (s: Skill) => (
    <SkillCard
      key={s.id}
      skill={s}
      onClick={onSkillClick}
      selectMode={selectMode}
      selected={selectedIds?.has(s.id) ?? false}
      onSelectToggle={onSelectToggle}
    />
  )

  if (skills.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-[#8e8b82] text-sm">没有匹配的 Skills</p>
      </div>
    )
  }

  if (groupBy === 'none') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {skills.map(renderCard)}
      </div>
    )
  }

  // Group skills
  const groups = new Map<string, Skill[]>()

  for (const skill of skills) {
    let key: string
    if (groupBy === 'project') {
      key = skill.scope === 'project' ? (skill.projectName || '未知项目') : '全局'
    } else if (groupBy === 'category') {
      key = skill.category || 'other'
    } else {
      key = skill[groupBy]
    }
    const arr = groups.get(key) || []
    arr.push(skill)
    groups.set(key, arr)
  }

  // Sort groups: global first, then by size
  const sortedGroups = [...groups.entries()].sort((a, b) => {
    if (groupBy === 'scope') {
      const order = ['global', 'project', 'plugin']
      return order.indexOf(a[0]) - order.indexOf(b[0])
    }
    return b[1].length - a[1].length
  })

  // Get icon and label for each group
  const getGroupIcon = (key: string) => {
    if (groupBy === 'scope') return <ScopeIcon scope={key} className="w-3.5 h-3.5" />
    if (groupBy === 'source') return <SourceIcon source={key} className="w-3.5 h-3.5" />
    if (groupBy === 'category') return <CategoryIcon category={key} className="w-3.5 h-3.5" />
    return null
  }

  const getGroupLabel = (key: string): string => {
    if (groupBy === 'scope') return scopeLabels[key] || key
    if (groupBy === 'source') return sourceLabels[key] || key
    if (groupBy === 'category') {
      const meta = getCategoryMeta(key)
      return meta.name
    }
    return key
  }

  return (
    <div className="space-y-6">
      {sortedGroups.map(([key, groupSkills]) => (
        <div key={key}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#6c6a64]">{getGroupIcon(key)}</span>
            <h2 className="text-sm font-semibold text-[#3d3d3a]">
              {getGroupLabel(key)}
            </h2>
            <span className="text-xs text-[#8e8b82] bg-[#efe9de] px-2 py-0.5 rounded-full">
              {groupSkills.length}
            </span>
            <div className="flex-1 h-px bg-[#e6dfd8]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {groupSkills.map(renderCard)}
          </div>
        </div>
      ))}
    </div>
  )
}
