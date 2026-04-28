import { useState } from 'react'
import type { Skill } from '../hooks/useSkills'
import { getCategoryMeta } from './CategoryBadge'
import { CategoryIcon } from './Icons'

export interface Diagnostic {
  type: string
  severity: 'info' | 'warn' | 'danger'
  title: string
  detail: string
  affectedSkillIds: string[]
}

export interface HealthReport {
  level: 'green' | 'yellow' | 'red'
  score: number
  summary: string
  diagnostics: Diagnostic[]
}

export interface MergeSuggestion {
  category: string
  categoryName: string
  reason: string
  skills: { id: string; name: string }[]
  similarity: number
}

export interface CategorySummary {
  id: string
  name: string
  icon: string
  count: number
  skillIds: string[]
}

interface Props {
  health: HealthReport | null
  mergeSuggestions: MergeSuggestion[]
  categories: CategorySummary[]
  skills: Skill[]
  onSkillClick?: (skill: Skill) => void
}

const levelConfig = {
  green:  { color: 'text-[#5db872]',  ring: 'stroke-[#5db872]',  bg: 'bg-[#5db872]/10',  border: 'border-[#5db872]/20',  label: '健康' },
  yellow: { color: 'text-[#e8a55a]', ring: 'stroke-[#e8a55a]', bg: 'bg-[#e8a55a]/10', border: 'border-[#e8a55a]/20', label: '需关注' },
  red:    { color: 'text-[#c64545]',    ring: 'stroke-[#c64545]',    bg: 'bg-[#c64545]/10',    border: 'border-[#c64545]/20',    label: '需优化' },
}

const severityConfig = {
  danger: { bg: 'bg-[#c64545]/10',    border: 'border-[#c64545]/20',    dot: 'bg-[#c64545]',    text: 'text-[#c64545]' },
  warn:   { bg: 'bg-[#e8a55a]/10', border: 'border-[#e8a55a]/20', dot: 'bg-[#e8a55a]', text: 'text-[#e8a55a]' },
  info:   { bg: 'bg-[#5db8a6]/10',   border: 'border-[#5db8a6]/20',   dot: 'bg-[#5db8a6]',   text: 'text-[#5db8a6]' },
}

export function HealthPanel({ health, mergeSuggestions, categories, skills, onSkillClick }: Props) {
  const [expandedDiag, setExpandedDiag] = useState<Set<number>>(new Set())

  if (!health) return null

  const cfg = levelConfig[health.level]
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (health.score / 100) * circumference

  const toggleDiag = (i: number) => {
    setExpandedDiag((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const skillById = new Map(skills.map((s) => [s.id, s]))

  return (
    <div className="space-y-5">
      {/* Score + Summary */}
      <div className={`rounded-xl border ${cfg.border} ${cfg.bg} p-5`}>
        <div className="flex items-center gap-6">
          {/* Score ring */}
          <div className="relative shrink-0">
            <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
              <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-[#e6dfd8]" />
              <circle
                cx="48" cy="48" r="40" fill="none" strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className={cfg.ring}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${cfg.color}`}>{health.score}</span>
              <span className="text-[10px] text-[#8e8b82]">/ 100</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-sm font-semibold ${cfg.color}`}>{cfg.label}</span>
              <span className={`w-2 h-2 rounded-full ${cfg.color === 'text-[#5db872]' ? 'bg-[#5db872]' : cfg.color === 'text-[#e8a55a]' ? 'bg-[#e8a55a]' : 'bg-[#c64545]'}`} />
            </div>
            <p className="text-sm text-[#3d3d3a] mb-2">{health.summary}</p>
            <div className="flex items-center gap-4 text-xs text-[#8e8b82]">
              <span>
                <span className="text-[#c64545] font-medium">{health.diagnostics.filter((d) => d.severity === 'danger').length}</span> 严重
              </span>
              <span>
                <span className="text-[#e8a55a] font-medium">{health.diagnostics.filter((d) => d.severity === 'warn').length}</span> 警告
              </span>
              <span>
                <span className="text-[#5db8a6] font-medium">{health.diagnostics.filter((d) => d.severity === 'info').length}</span> 建议
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics */}
      {health.diagnostics.length > 0 && (
        <div className="rounded-xl border border-[#e6dfd8] bg-[#efe9de] p-5">
          <h3 className="text-sm font-semibold text-[#3d3d3a] mb-3">诊断详情</h3>
          <div className="space-y-2">
            {health.diagnostics.map((d, i) => {
              const sc = severityConfig[d.severity]
              const expanded = expandedDiag.has(i)
              const affected = d.affectedSkillIds
                .map((id) => skillById.get(id))
                .filter((s): s is Skill => !!s)

              return (
                <div key={i} className={`rounded-lg border ${sc.border} ${sc.bg}`}>
                  <button
                    onClick={() => toggleDiag(i)}
                    className="w-full text-left px-4 py-3 flex items-start gap-3"
                  >
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${sc.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${sc.text}`}>{d.title}</div>
                      <div className="text-xs text-[#6c6a64] mt-0.5">{d.detail}</div>
                    </div>
                    {affected.length > 0 && (
                      <span className="text-[10px] text-[#8e8b82] shrink-0 mt-1">
                        {affected.length} 个 Skill {expanded ? '▲' : '▼'}
                      </span>
                    )}
                  </button>
                  {expanded && affected.length > 0 && (
                    <div className="px-4 pb-3 border-t border-[#e6dfd8]">
                      <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                        {affected.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => onSkillClick?.(s)}
                            className="w-full text-left flex items-center gap-2 px-2 py-1 rounded hover:bg-[#f5f0e8] transition-colors text-xs"
                          >
                            <span className="text-[#3d3d3a] font-medium truncate">/{s.name}</span>
                            <span className="text-[10px] text-[#8e8b82]">{s.scope}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Merge Suggestions */}
      {mergeSuggestions.length > 0 && (
        <div className="rounded-xl border border-[#e6dfd8] bg-[#efe9de] p-5">
          <h3 className="text-sm font-semibold text-[#3d3d3a] mb-1">合并建议</h3>
          <p className="text-xs text-[#8e8b82] mb-3">
            同分类下语义高度相似的 Skill，建议合并为一个包含子场景的 Skill
          </p>
          <div className="space-y-2">
            {mergeSuggestions.map((ms, i) => {
              const catMeta = getCategoryMeta(ms.category)
              return (
                <div
                  key={i}
                  className="rounded-lg border border-[#cc785c]/20 bg-[#cc785c]/5 px-4 py-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CategoryIcon category={catMeta.category} className="w-3 h-3" />
                    <span className="text-xs text-[#cc785c] font-medium">{catMeta.name}</span>
                    <span className="text-[10px] text-[#cc785c]/60">
                      相似度 {Math.round(ms.similarity * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {ms.skills.map((s, j) => (
                      <span key={j}>
                        <button
                          onClick={() => {
                            const full = skillById.get(s.id)
                            if (full) onSkillClick?.(full)
                          }}
                          className="text-xs text-[#3d3d3a] hover:text-[#cc785c] transition-colors"
                        >
                          /{s.name}
                        </button>
                        {j < ms.skills.length - 1 && (
                          <span className="text-[#8e8b82] text-xs mx-1">+</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#8e8b82] mt-1.5">{ms.reason}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Category Distribution */}
      {categories.length > 0 && (
        <div className="rounded-xl border border-[#e6dfd8] bg-[#efe9de] p-5">
          <h3 className="text-sm font-semibold text-[#3d3d3a] mb-3">分类分布</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const meta = getCategoryMeta(cat.id)
              return (
                <div
                  key={cat.id}
                  className="bg-[#f5f0e8] rounded-lg border border-[#e6dfd8] p-3"
                >
                  <div className="mb-1">
                    <CategoryIcon category={meta.category} className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-bold text-[#3d3d3a]">{cat.count}</div>
                  <div className="text-[11px] text-[#8e8b82]">{meta.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
