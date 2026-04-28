import { useEffect, useState, useCallback } from 'react'
import type { Skill } from '../hooks/useSkills'

export interface SimilarGroup {
  id: string
  skills: Skill[]
  sharedTokens: string[]
  averageSimilarity: number
}

interface Props {
  onSkillClick: (skill: Skill) => void
}

export function SimilarView({ onSkillClick }: Props) {
  const [groups, setGroups] = useState<SimilarGroup[]>([])
  const [threshold, setThreshold] = useState(0.25)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (t: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/similar?threshold=${t}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setGroups(data.groups || [])
    } catch (e: any) {
      setError(e.message || String(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(threshold)
  }, [threshold, load])

  const ignorePair = async (a: string, b: string) => {
    await fetch('/api/similar/ignore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a, b }),
    })
    load(threshold)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 p-4 rounded-xl border border-[#e6dfd8] bg-[#efe9de]">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h2 className="text-base font-semibold text-[#141413] flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#6c6a64]">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              相似 Skill 检测
            </h2>
            <p className="text-xs text-[#8e8b82] mt-1">
              通过关键词重叠度（Jaccard）识别可能在做同一件事的 Skill。阈值越高越严格。
              支持同义词归一（小红书 ↔ XHS ↔ RedNote 等）。
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-[#cc785c]">{groups.length}</div>
            <div className="text-[10px] uppercase tracking-wider text-[#8e8b82]">相似组</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#8e8b82] shrink-0">灵敏度</span>
          <input
            type="range"
            min={0.1}
            max={0.6}
            step={0.05}
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="flex-1 accent-[#cc785c]"
          />
          <span className="text-xs text-[#6c6a64] font-mono tabular-nums w-10 text-right">
            {threshold.toFixed(2)}
          </span>
          <span className="text-[10px] text-[#8e8b82] ml-2">
            {threshold <= 0.2 ? '宽松' : threshold >= 0.4 ? '严格' : '平衡'}
          </span>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-[#8e8b82] text-sm">
          <div className="w-4 h-4 border-2 border-[#cc785c] border-t-transparent rounded-full animate-spin mr-2" />
          正在计算相似度...
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-[#c64545]/10 border border-[#c64545]/20 text-[#c64545] text-sm">
          加载失败：{error}
        </div>
      )}

      {!loading && !error && groups.length === 0 && (
        <div className="text-center py-16 text-[#8e8b82]">
          <div className="text-4xl mb-3">✨</div>
          <p className="text-sm">没有发现相似的 Skill</p>
          <p className="text-xs text-[#8e8b82] mt-1">尝试拉低灵敏度阈值看看更多候选</p>
        </div>
      )}

      {!loading && !error && groups.length > 0 && (
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="rounded-xl border border-[#e6dfd8] bg-[#efe9de] overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-[#e6dfd8] flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-semibold text-[#cc785c]">
                    相似度 {(group.averageSimilarity * 100).toFixed(0)}%
                  </span>
                  <span className="text-[11px] text-[#8e8b82]">·</span>
                  <span className="text-xs text-[#6c6a64]">{group.skills.length} 个 Skill</span>
                  {group.sharedTokens.length > 0 && (
                    <>
                      <span className="text-[11px] text-[#8e8b82]">·</span>
                      <span className="text-[11px] text-[#8e8b82]">共享关键词:</span>
                      <div className="flex flex-wrap gap-1">
                        {group.sharedTokens.slice(0, 6).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-[#cc785c]/10 text-[#cc785c] text-[10px] font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="divide-y divide-[#e6dfd8]">
                {group.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="px-4 py-3 flex items-start justify-between gap-3 hover:bg-[#e8e0d2] transition-colors"
                  >
                    <button
                      onClick={() => onSkillClick(skill)}
                      className="flex-1 min-w-0 text-left"
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-[#3d3d3a] truncate">
                          /{skill.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#efe9de] text-[#8e8b82]">
                          {skill.scope}
                        </span>
                      </div>
                      <p className="text-xs text-[#8e8b82] line-clamp-1">
                        {skill.description || '无描述'}
                      </p>
                      <p className="text-[10px] text-[#8e8b82] truncate mt-0.5 font-mono">
                        {skill.path}
                      </p>
                    </button>
                  </div>
                ))}
              </div>

              {group.skills.length === 2 && (
                <div className="px-4 py-2 border-t border-[#e6dfd8] bg-[#f5f0e8] flex justify-end">
                  <button
                    onClick={() => ignorePair(group.skills[0].id, group.skills[1].id)}
                    className="text-[11px] text-[#8e8b82] hover:text-[#6c6a64] transition-colors"
                  >
                    标记为不相似
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
