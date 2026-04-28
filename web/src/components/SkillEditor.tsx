import { useState } from 'react'
import type { Skill } from '../hooks/useSkills'

interface SkillEditorProps {
  skill: Skill
  onSave: (content: string) => Promise<void>
  onClose: () => void
}

export function SkillEditor({ skill, onSave, onClose }: SkillEditorProps) {
  const [content, setContent] = useState(skill.content)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(content)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  const hasChanges = content !== skill.content

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh] bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden m-4 shadow-2xl shadow-black/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e6dfd8] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#141413]">编辑 SKILL.md</h2>
            <p className="text-xs text-[#8e8b82] mt-0.5 font-mono">{skill.realPath}/SKILL.md</p>
          </div>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="text-xs text-[#5db872] animate-pulse">已保存</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="px-4 py-1.5 bg-[#cc785c] hover:bg-[#a9583e] disabled:opacity-40
                         rounded-lg text-sm font-medium text-white transition-all"
            >
              {saving ? '保存中...' : '保存'}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-[#efe9de] hover:bg-[#e8e0d2] rounded-lg text-sm text-[#3d3d3a] transition-colors"
            >
              关闭
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            className="w-full h-full min-h-[60vh] bg-[#181715] text-[#f5f0e8] font-mono text-sm p-6
                       resize-none focus:outline-none leading-relaxed"
            placeholder="---
name: my-skill
description: Skill description
---

Your skill instructions here..."
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-2 border-t border-[#e6dfd8] flex items-center justify-between text-xs text-[#8e8b82]">
          <span>{hasChanges ? '有未保存的修改' : '无修改'}</span>
          <span>Ctrl+S / Cmd+S 保存</span>
        </div>
      </div>
    </div>
  )
}
