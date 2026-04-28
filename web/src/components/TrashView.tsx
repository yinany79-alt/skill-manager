import { useCallback, useEffect, useState } from 'react'

export interface TrashItem {
  id: string
  skillName: string
  originalPath: string
  scope: 'global' | 'project' | 'unknown'
  projectPath?: string
  isSymlink: boolean
  symlinkTarget?: string
  deletedAt: string
  expiresAt: string
  sizeBytes?: number
  daysRemaining: number
}

interface TrashViewProps {
  onCountChange?: (count: number) => void
  onRestored?: () => void
}

export function TrashView({ onCountChange, onRestored }: TrashViewProps) {
  const [items, setItems] = useState<TrashItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const showMsg = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/trash')
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || '加载失败')
      setItems(data.items || [])
      onCountChange?.(data.items?.length || 0)
    } catch (e: any) {
      setError(e?.message || '加载失败')
    } finally {
      setLoading(false)
    }
  }, [onCountChange])

  useEffect(() => {
    load()
  }, [load])

  const handleRestore = async (item: TrashItem) => {
    setBusy(item.id)
    try {
      let res = await fetch(`/api/trash/${item.id}/restore`, { method: 'POST' })
      let data = await res.json()

      if (res.status === 409 && data.code === 'CONFLICT') {
        const ok = window.confirm(
          `目标位置已存在同名 Skill：\n${data.targetPath}\n\n是否覆盖？\n（现有的会被先移入回收站作为保底）`,
        )
        if (!ok) {
          setBusy(null)
          return
        }
        res = await fetch(`/api/trash/${item.id}/restore?force=true`, { method: 'POST' })
        data = await res.json()
      }

      if (!data.ok) throw new Error(data.error || '还原失败')
      showMsg('success', `已还原 ${item.skillName}`)
      await load()
      onRestored?.()
    } catch (e: any) {
      showMsg('error', e?.message || '还原失败')
    } finally {
      setBusy(null)
    }
  }

  const handlePurge = async (item: TrashItem) => {
    const ok = window.confirm(
      `彻底删除「${item.skillName}」？\n此操作不可恢复。`,
    )
    if (!ok) return
    setBusy(item.id)
    try {
      const res = await fetch(`/api/trash/${item.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!data.ok) throw new Error('删除失败')
      showMsg('success', '已彻底删除')
      await load()
    } catch (e: any) {
      showMsg('error', e?.message || '删除失败')
    } finally {
      setBusy(null)
    }
  }

  const formatSize = (bytes?: number) => {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatDate = (iso: string) => new Date(iso).toLocaleString('zh-CN')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#3d3d3a]">回收站</h2>
          <p className="text-xs text-[#8e8b82] mt-0.5">
            删除的 Skill 会保留 7 天，过期自动清除。共 {items.length} 项
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="px-3 py-1.5 rounded-lg bg-[#efe9de] hover:bg-[#e8e0d2] border border-[#e6dfd8] text-xs text-[#6c6a64] disabled:opacity-50"
        >
          {loading ? '刷新中...' : '刷新'}
        </button>
      </div>

      {message && (
        <div
          className={`px-3 py-2 rounded-lg text-xs ${
            message.type === 'success' ? 'bg-[#5db872]/10 text-[#5db872]' : 'bg-[#c64545]/10 text-[#c64545]'
          }`}
        >
          {message.text}
        </div>
      )}

      {error && (
        <div className="px-3 py-2 rounded-lg text-xs bg-[#c64545]/10 text-[#c64545]">{error}</div>
      )}

      {!loading && items.length === 0 && !error && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="mb-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mx-auto text-[#8e8b82]">
                <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <p className="text-[#6c6a64] mb-1">回收站是空的</p>
            <p className="text-xs text-[#8e8b82]">被删除的 Skill 会出现在这里，7 天后自动清除</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => {
          const urgent = item.daysRemaining <= 1
          return (
            <div
              key={item.id}
              className="rounded-lg border border-[#e6dfd8] bg-[#efe9de] p-4 hover:border-[#e0d9ce] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-[#3d3d3a] truncate">
                      /{item.skillName}
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f5f0e8] text-[#6c6a64] uppercase tracking-wider">
                      {item.scope === 'global' ? '全局' : item.scope === 'project' ? '项目' : '未知'}
                    </span>
                    {item.isSymlink && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#5db8a6]/15 text-[#5db8a6]">
                        符号链接
                      </span>
                    )}
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        urgent ? 'bg-[#c64545]/15 text-[#c64545]' : 'bg-[#e8a55a]/10 text-[#e8a55a]'
                      }`}
                    >
                      剩余 {item.daysRemaining} 天
                    </span>
                  </div>

                  <div className="mt-2 space-y-1 text-xs text-[#8e8b82]">
                    <div className="font-mono break-all">
                      <span className="text-[#8e8b82]">原路径：</span>
                      <span className="text-[#6c6a64]">{item.originalPath}</span>
                    </div>
                    {item.isSymlink && item.symlinkTarget && (
                      <div className="font-mono break-all">
                        <span className="text-[#8e8b82]">指向：</span>
                        <span className="text-[#6c6a64]">{item.symlinkTarget}</span>
                      </div>
                    )}
                    <div className="flex gap-3 flex-wrap text-[#8e8b82]">
                      <span>删除于 {formatDate(item.deletedAt)}</span>
                      {item.sizeBytes ? <span>大小 {formatSize(item.sizeBytes)}</span> : null}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleRestore(item)}
                    disabled={busy === item.id}
                    className="px-3 py-1.5 rounded-lg bg-[#5db872]/20 hover:bg-[#5db872]/30 text-[#5db872] text-xs font-medium disabled:opacity-50 transition-colors"
                  >
                    {busy === item.id ? '...' : '还原'}
                  </button>
                  <button
                    onClick={() => handlePurge(item)}
                    disabled={busy === item.id}
                    className="px-3 py-1.5 rounded-lg bg-[#c64545]/20 hover:bg-[#c64545]/30 text-[#c64545] text-xs font-medium disabled:opacity-50 transition-colors"
                  >
                    彻底删除
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
