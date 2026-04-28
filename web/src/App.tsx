import { useEffect, useState, useCallback } from 'react'
import { useSkills } from './hooks/useSkills'
import { useWebSocket } from './hooks/useWebSocket'
import { useTheme } from './hooks/useTheme'
import { StatsBar } from './components/StatsBar'
import { Sidebar } from './components/Sidebar'
import { SkillGrid } from './components/SkillGrid'
import { SkillDetail } from './components/SkillDetail'
import { Dashboard } from './components/Dashboard'
import { SimilarView } from './components/SimilarView'
import { TrashView } from './components/TrashView'
import { SyncView } from './components/SyncView'
import { ConflictsView } from './components/ConflictsView'
import { Footer } from './components/Footer'
import type { Skill } from './hooks/useSkills'

type GroupBy = 'none' | 'scope' | 'source' | 'project' | 'category'
type View = 'skills' | 'similar' | 'dashboard' | 'trash' | 'sync' | 'conflicts'

function App() {
  const { allSkills, skills, stats, projects, conflicts, categories, health, mergeSuggestions, loading, error, scan, filterSkills } = useSkills()
  const { theme } = useTheme()

  const [view, setView] = useState<View>('skills')
  const [scopeFilter, setScopeFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [agentFilter, setAgentFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')
  const [conflictOnly, setConflictOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [groupBy, setGroupBy] = useState<GroupBy>('scope')
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [trashCount, setTrashCount] = useState<number>(0)
  const [selectMode, setSelectMode] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState<boolean>(false)
  const [bulkDeleting, setBulkDeleting] = useState<boolean>(false)
  const [bulkDeleteResult, setBulkDeleteResult] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const [conflictRowBusy, setConflictRowBusy] = useState<Set<string>>(new Set())
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('skill-hub:sidebar') !== 'closed'
    } catch {
      return true
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('skill-hub:sidebar', sidebarOpen ? 'open' : 'closed')
    } catch {}
  }, [sidebarOpen])

  useEffect(() => {
    scan()
  }, [scan])

  // Fetch trash count for the badge
  const refreshTrashCount = useCallback(async () => {
    try {
      const res = await fetch('/api/trash')
      const data = await res.json()
      if (data.ok) setTrashCount((data.items || []).length)
    } catch {}
  }, [])

  useEffect(() => {
    refreshTrashCount()
  }, [refreshTrashCount])

  // WebSocket: auto-refresh on file changes
  useWebSocket(
    useCallback(
      (data: any) => {
        if (data.type === 'change') {
          setLastUpdate(new Date().toLocaleTimeString('zh-CN'))
          scan()
        }
      },
      [scan],
    ),
  )

  const applyFilters = useCallback(
    (overrides?: { scope?: string; source?: string; agent?: string; category?: string; project?: string; search?: string; conflictOnly?: boolean }) => {
      filterSkills({
        scope: overrides?.scope ?? scopeFilter,
        source: overrides?.source ?? sourceFilter,
        agent: overrides?.agent ?? agentFilter,
        category: overrides?.category ?? categoryFilter,
        project: overrides?.project ?? projectFilter,
        search: overrides?.search ?? search,
        conflictOnly: overrides?.conflictOnly ?? conflictOnly,
      })
    },
    [filterSkills, scopeFilter, sourceFilter, agentFilter, categoryFilter, projectFilter, search, conflictOnly],
  )

  const handleScopeChange = (v: string) => {
    setScopeFilter(v)
    setProjectFilter('all')
    applyFilters({ scope: v, project: 'all' })
  }

  const handleSourceChange = (v: string) => {
    setSourceFilter(v)
    applyFilters({ source: v })
  }

  const handleAgentChange = (v: string) => {
    setAgentFilter(v)
    applyFilters({ agent: v })
  }

  const handleCategoryChange = (v: string) => {
    setCategoryFilter(v)
    applyFilters({ category: v })
  }

  const handleProjectChange = (v: string) => {
    setProjectFilter(v)
    if (v !== 'all') {
      setScopeFilter('all')
      applyFilters({ project: v, scope: 'all' })
    } else {
      applyFilters({ project: v })
    }
  }

  const handleSearch = (q: string) => {
    setSearch(q)
    applyFilters({ search: q })
  }

  // Batch selection handlers
  const toggleSelectMode = () => {
    setSelectMode((prev) => {
      if (prev) setSelectedIds(new Set())
      return !prev
    })
    setBulkDeleteResult(null)
  }

  const handleSelectToggle = useCallback((skill: Skill) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(skill.id)) next.delete(skill.id)
      else next.add(skill.id)
      return next
    })
  }, [])

  const selectAllVisible = () => {
    setSelectedIds(new Set(skills.map((s) => s.id)))
  }

  const clearSelection = () => {
    setSelectedIds(new Set())
  }

  const performBulkDelete = async () => {
    setBulkDeleting(true)
    setBulkDeleteResult(null)
    try {
      const items = Array.from(selectedIds)
        .map((id) => allSkills.find((s) => s.id === id))
        .filter((s): s is Skill => !!s)
        .map((s) => ({ id: s.id, path: s.path, skillName: s.name }))

      const res = await fetch('/api/skills/batch/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (!data.ok && !data.results) {
        setBulkDeleteResult({ kind: 'err', text: data.error || '批量删除失败' })
        return
      }
      const okCount: number = data.okCount ?? 0
      const failCount: number = data.failCount ?? 0
      if (failCount === 0) {
        setBulkDeleteResult({ kind: 'ok', text: `已删除 ${okCount} 个 Skill,可在回收站恢复` })
      } else {
        setBulkDeleteResult({ kind: 'err', text: `成功 ${okCount},失败 ${failCount}` })
      }
      setBulkDeleteConfirm(false)
      setSelectedIds(new Set())
      setSelectMode(false)
      await scan()
      await refreshTrashCount()
    } catch (e: any) {
      setBulkDeleteResult({ kind: 'err', text: e?.message || '请求失败' })
    } finally {
      setBulkDeleting(false)
    }
  }

  // Conflict row actions — reuse existing endpoints, track per-row busy state
  const withConflictBusy = async (skill: Skill, fn: () => Promise<void>) => {
    setConflictRowBusy((prev) => new Set(prev).add(skill.id))
    try {
      await fn()
      await scan()
      await refreshTrashCount()
    } finally {
      setConflictRowBusy((prev) => {
        const next = new Set(prev)
        next.delete(skill.id)
        return next
      })
    }
  }

  const handleConflictDelete = (skill: Skill) =>
    withConflictBusy(skill, async () => {
      if (!confirm(`把 "${skill.name}" (${skill.scope}) 移到回收站?\n\n路径: ${skill.path}\n\n7 天内可在回收站恢复。`)) return
      const res = await fetch(`/api/skills/${skill.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: skill.path, skillName: skill.name }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error)
    })


  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSkill(null)
        if (bulkDeleteConfirm) setBulkDeleteConfirm(false)
        else if (selectMode) {
          setSelectMode(false)
          setSelectedIds(new Set())
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectMode, bulkDeleteConfirm])

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      {/* Header */}
      <header className="border-b border-[#e6dfd8]/80 bg-[#faf9f5]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-square.png"
                alt="Logo"
                className="w-9 h-9 object-contain rounded-lg"
                onError={(e) => {
                  console.error('Logo failed to load');
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzYzNjZmMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjQwIiBmaWxsPSIjZmZmIj7lsI/po448L3RleHQ+PC9zdmc+';
                }}
              />
              <div className="text-left">
                <h1 className="text-base font-bold text-[#141413] leading-tight">
                  Skill 管理器
                </h1>
                {lastUpdate && (
                  <p className="text-[11px] text-[#5db872]/80">最近更新 {lastUpdate}</p>
                )}
              </div>
            </div>

            {/* View switcher */}
            <div className="flex items-center gap-0.5 bg-[#efe9de] rounded-lg border border-[#e6dfd8] p-0.5 ml-4">
              <button
                onClick={() => setView('skills')}
                className={`px-3 py-1 rounded-md text-xs transition-all ${
                  view === 'skills' ? 'bg-[#cc785c] text-white shadow-sm' : 'text-[#6c6a64] hover:text-[#3d3d3a]'
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setView('similar')}
                className={`px-3 py-1 rounded-md text-xs transition-all ${
                  view === 'similar' ? 'bg-[#cc785c] text-white shadow-sm' : 'text-[#6c6a64] hover:text-[#3d3d3a]'
                }`}
              >
                相似检测
              </button>
              <button
                onClick={() => setView('dashboard')}
                className={`px-3 py-1 rounded-md text-xs transition-all ${
                  view === 'dashboard' ? 'bg-[#cc785c] text-white shadow-sm' : 'text-[#6c6a64] hover:text-[#3d3d3a]'
                }`}
              >
                仪表盘
              </button>
              <button
                onClick={() => setView('sync')}
                className={`px-3 py-1 rounded-md text-xs transition-all ${
                  view === 'sync' ? 'bg-[#cc785c] text-white shadow-sm' : 'text-[#6c6a64] hover:text-[#3d3d3a]'
                }`}
              >
                同步
              </button>
              <button
                onClick={() => setView('trash')}
                className={`px-3 py-1 rounded-md text-xs transition-all flex items-center gap-1.5 ${
                  view === 'trash' ? 'bg-[#cc785c] text-white shadow-sm' : 'text-[#6c6a64] hover:text-[#3d3d3a]'
                }`}
              >
                <span>回收站</span>
                {trashCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-[#e8a55a]/20 text-[#cc785c] text-[10px] font-semibold">
                    {trashCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {view === 'skills' && (
              <div className="relative hidden md:block">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c6a64]"
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="搜索 Skills... (名称/描述)"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-72 pl-9 pr-3 py-2 rounded-lg bg-[#f5f0e8] border border-[#e6dfd8] text-sm text-[#141413]
                             placeholder:text-[#8e8b82] focus:outline-none focus:border-[#e07a8c]/50 focus:ring-1 focus:ring-[#e07a8c]/20 transition-all"
                />
              </div>
            )}

            <button
              onClick={scan}
              disabled={loading}
              className="px-4 py-2 bg-[#cc785c] hover:bg-[#a9583e] active:bg-[#a84f60] disabled:opacity-50
                         rounded-lg text-sm font-medium text-white transition-all shadow-lg shadow-[#cc785c]/20
                         flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              <span>{loading ? '扫描中...' : '一键扫描'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Stats */}
        {stats.total > 0 && (
          <StatsBar stats={stats} projects={projects} conflicts={conflicts.length} health={health} />
        )}

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-[#c64545]/10 border border-[#c64545]/20 text-[#c64545] text-sm">
            <div className="font-semibold mb-2">扫描失败：{error}</div>
            <div className="text-xs text-[#c64545]/80">
              排查步骤：
              <ol className="list-decimal list-inside mt-1 space-y-0.5">
                <li>访问 <a href="/api/debug" target="_blank" rel="noreferrer" className="underline">/api/debug</a> 查看服务端状态</li>
                <li>打开浏览器 DevTools Console 看是否有网络错误</li>
                <li>检查终端日志是否有 Node 错误</li>
              </ol>
            </div>
            <button
              onClick={scan}
              className="mt-3 px-3 py-1.5 bg-[#c64545]/20 hover:bg-[#c64545]/30 rounded text-[#c64545] text-xs"
            >
              重试扫描
            </button>
          </div>
        )}

        {/* Dashboard view */}
        {view === 'sync' ? (
          <SyncView />
        ) : view === 'conflicts' ? (
          <ConflictsView
            conflicts={conflicts}
            onSkillClick={setSelectedSkill}
            onDelete={handleConflictDelete}
            busy={conflictRowBusy}
          />
        ) : view === 'dashboard' ? (
          <Dashboard stats={stats} projects={projects} conflicts={conflicts} skills={allSkills} health={health} categories={categories} mergeSuggestions={mergeSuggestions} onSkillClick={setSelectedSkill} />
        ) : view === 'similar' ? (
          <SimilarView onSkillClick={setSelectedSkill} />
        ) : view === 'trash' ? (
          <TrashView
            onCountChange={setTrashCount}
            onRestored={() => {
              scan()
            }}
          />
        ) : (
          <>
            {/* Mobile search */}
            <div className="md:hidden mb-4">
              <input
                type="text"
                placeholder="搜索 Skills..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#f5f0e8] border border-[#e6dfd8] text-sm text-[#141413]
                           placeholder:text-[#8e8b82] focus:outline-none focus:border-[#cc785c]/50 transition-colors"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              {sidebarOpen && (
                <Sidebar
                  stats={stats}
                  projects={projects}
                  scopeFilter={scopeFilter}
                  sourceFilter={sourceFilter}
                  agentFilter={agentFilter}
                  categoryFilter={categoryFilter}
                  projectFilter={projectFilter}
                  onScopeChange={handleScopeChange}
                  onSourceChange={handleSourceChange}
                  onAgentChange={handleAgentChange}
                  onCategoryChange={handleCategoryChange}
                  onProjectChange={handleProjectChange}
                />
              )}

              {/* Main */}
              <main className="flex-1 min-w-0">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSidebarOpen((v) => !v)}
                      title={sidebarOpen ? '收起侧边栏' : '展开侧边栏'}
                      aria-label={sidebarOpen ? '收起侧边栏' : '展开侧边栏'}
                      className="p-1.5 rounded-md border border-[#e6dfd8] bg-[#efe9de] text-[#6c6a64] hover:text-[#3d3d3a] hover:bg-[#e8e0d2] transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {sidebarOpen ? (
                          <>
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <line x1="9" y1="3" x2="9" y2="21" />
                          </>
                        ) : (
                          <>
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                          </>
                        )}
                      </svg>
                    </button>
                    <span className="text-sm text-[#6c6a64]">
                      共 <span className="text-[#3d3d3a] font-medium">{skills.length}</span> 个 Skill
                    </span>
                    {conflicts.length > 0 && (
                      <button
                        onClick={() => setView('conflicts')}
                        title="查看同名冲突详情与处理方式"
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all bg-[#e8a55a]/10 border-[#e8a55a]/30 text-[#cc785c] hover:bg-[#e8a55a]/20"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e8a55a]" />
                        <span>{conflicts.length} 组冲突 →</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleSelectMode}
                      title={selectMode ? '退出批量选择' : '进入批量选择'}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                        selectMode
                          ? 'bg-[#cc785c]/15 border-[#cc785c]/40 text-[#cc785c]'
                          : 'bg-[#efe9de] border-[#e6dfd8] text-[#6c6a64] hover:text-[#3d3d3a] hover:border-[#e8e0d2]'
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{selectMode ? '完成' : '批量选择'}</span>
                    </button>
                    <div className="flex items-center gap-1 bg-[#efe9de] rounded-lg border border-[#e6dfd8] p-0.5">
                      {([
                        { value: 'scope', label: '按层级' },
                        { value: 'category', label: '按分类' },
                        { value: 'source', label: '按来源' },
                        { value: 'none', label: '平铺' },
                      ] as { value: GroupBy; label: string }[]).map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setGroupBy(opt.value)}
                          className={`px-3 py-1 rounded-md text-xs transition-all
                            ${groupBy === opt.value
                              ? 'bg-[#cc785c] text-white shadow-sm'
                              : 'text-[#6c6a64] hover:text-[#3d3d3a]'
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Batch action bar (shown only in select mode) */}
                {selectMode && (
                  <div className="mb-4 p-3 rounded-lg bg-[#cc785c]/10 border border-[#cc785c]/30 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-[#cc785c] font-medium">
                        已选 {selectedIds.size} / {skills.length} 个
                      </span>
                      <button
                        onClick={selectAllVisible}
                        disabled={skills.length === 0}
                        className="text-xs text-[#6c6a64] hover:text-[#3d3d3a] disabled:opacity-40"
                      >
                        全选当前视图
                      </button>
                      {selectedIds.size > 0 && (
                        <button
                          onClick={clearSelection}
                          className="text-xs text-[#6c6a64] hover:text-[#3d3d3a]"
                        >
                          取消选择
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBulkDeleteConfirm(true)}
                        disabled={selectedIds.size === 0}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c64545]/15 hover:bg-[#c64545]/25 disabled:opacity-40 disabled:cursor-not-allowed border border-[#c64545]/30 rounded-md text-xs font-medium text-[#c64545] transition-all"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        <span>删除所选 ({selectedIds.size})</span>
                      </button>
                    </div>
                  </div>
                )}

                {bulkDeleteResult && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-sm border flex items-center justify-between ${
                      bulkDeleteResult.kind === 'ok'
                        ? 'bg-[#5db872]/10 border-[#5db872]/20 text-[#5db872]'
                        : 'bg-[#c64545]/10 border-[#c64545]/20 text-[#c64545]'
                    }`}
                  >
                    <span>{bulkDeleteResult.kind === 'ok' ? '✓ ' : '✗ '}{bulkDeleteResult.text}</span>
                    <button
                      onClick={() => setBulkDeleteResult(null)}
                      className="text-xs opacity-60 hover:opacity-100"
                    >
                      关闭
                    </button>
                  </div>
                )}

                {/* Content */}
                {loading && skills.length === 0 ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-[#6c6a64] flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-2 border-[#cc785c] border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">正在扫描 Skills...</span>
                      <span className="text-xs text-[#8e8b82]">扫描全局和项目目录中</span>
                    </div>
                  </div>
                ) : skills.length === 0 && stats.total === 0 ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="mb-3">
                        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mx-auto text-[#8e8b82]">
                          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="text-[#3d3d3a] mb-1">暂无 Skills</p>
                      <p className="text-sm text-[#6c6a64]">点击「一键扫描」发现你的 Claude Skills</p>
                    </div>
                  </div>
                ) : (
                  <SkillGrid
                    skills={skills}
                    groupBy={groupBy}
                    onSkillClick={setSelectedSkill}
                    selectMode={selectMode}
                    selectedIds={selectedIds}
                    onSelectToggle={handleSelectToggle}
                  />
                )}
              </main>
            </div>
          </>
        )}

        <Footer />
      </div>

      {/* Bulk delete confirm */}
      {bulkDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-semibold text-[#141413]">批量删除确认</h3>
            <p className="text-sm text-[#6c6a64]">
              即将把 <span className="text-[#3d3d3a] font-semibold">{selectedIds.size}</span> 个 Skill 移到回收站。
              回收站保留 7 天,期间可恢复。
            </p>
            <div className="max-h-48 overflow-y-auto rounded-lg border border-[#e6dfd8] divide-y divide-[#e6dfd8]/60">
              {Array.from(selectedIds)
                .map((id) => allSkills.find((s) => s.id === id))
                .filter((s): s is Skill => !!s)
                .slice(0, 50)
                .map((s) => (
                  <div key={s.id} className="px-3 py-1.5 text-xs flex items-center gap-2">
                    <span className="text-[#3d3d3a] truncate flex-1">/{s.name}</span>
                    <span className="text-[10px] text-[#8e8b82] shrink-0">{s.scope}</span>
                  </div>
                ))}
              {selectedIds.size > 50 && (
                <div className="px-3 py-1.5 text-[11px] text-[#8e8b82] text-center">
                  ...还有 {selectedIds.size - 50} 个
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={performBulkDelete}
                disabled={bulkDeleting}
                className="px-4 py-2 bg-[#c64545] hover:bg-[#a03838] disabled:opacity-40 rounded-lg text-sm font-medium text-white transition-all"
              >
                {bulkDeleting ? '删除中...' : `确认删除 ${selectedIds.size} 个`}
              </button>
              <button
                onClick={() => setBulkDeleteConfirm(false)}
                disabled={bulkDeleting}
                className="px-4 py-2 bg-[#efe9de] hover:bg-[#e8e0d2] rounded-lg text-sm text-[#3d3d3a]"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selectedSkill && (
        <SkillDetail
          skill={selectedSkill}
          projects={projects}
          onClose={() => setSelectedSkill(null)}
          onToggle={async (skill, enabled) => {
            await fetch(`/api/skills/${skill.id}/toggle`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ enabled, skillName: skill.name }),
            })
            await scan()
          }}
          onSaveContent={async (skill, content) => {
            await fetch(`/api/skills/${skill.id}/content`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ realPath: skill.realPath, content }),
            })
            await scan()
          }}
          onCopy={async (skill, targetScope, projectPath) => {
            const res = await fetch('/api/skills/copy', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sourcePath: skill.path, targetScope, projectPath, skillName: skill.name }),
            })
            const data = await res.json()
            if (!data.ok) throw new Error(data.error)
            await scan()
          }}
          onMove={async (skill, targetScope, projectPath) => {
            const res = await fetch('/api/skills/move', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sourcePath: skill.path, targetScope, projectPath, skillName: skill.name }),
            })
            const data = await res.json()
            if (!data.ok) throw new Error(data.error)
            setSelectedSkill(null)
            await scan()
          }}
          onDelete={async (skill) => {
            const res = await fetch(`/api/skills/${skill.id}`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ path: skill.path, skillName: skill.name }),
            })
            const data = await res.json()
            if (!data.ok) throw new Error(data.error)
            await scan()
            await refreshTrashCount()
          }}
        />
      )}
    </div>
  )
}

export default App
