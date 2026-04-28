interface DiffLine {
  type: 'add' | 'remove' | 'same'
  lineNumber: { old?: number; new?: number }
  content: string
}

interface DiffStats {
  additions: number
  deletions: number
  unchanged: number
}

interface DiffViewerProps {
  lines: DiffLine[]
  stats: DiffStats
  oldLabel: string
  newLabel: string
}

export function DiffViewer({ lines, stats, oldLabel, newLabel }: DiffViewerProps) {
  return (
    <div className="rounded-lg border border-[#e6dfd8] overflow-hidden">
      {/* Header */}
      <div className="bg-[#efe9de] px-4 py-2.5 border-b border-[#e6dfd8] flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          <span className="text-[#8e8b82]">{oldLabel}</span>
          <span className="text-[#8e8b82]">→</span>
          <span className="text-[#3d3d3a]">{newLabel}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#5db872]">+{stats.additions}</span>
          <span className="text-[#c64545]">-{stats.deletions}</span>
          <span className="text-[#8e8b82]">{stats.unchanged} 行未变</span>
        </div>
      </div>

      {/* Diff lines */}
      <div className="overflow-x-auto max-h-[50vh] overflow-y-auto">
        <table className="w-full text-xs font-mono">
          <tbody>
            {lines.map((line, i) => (
              <tr
                key={i}
                className={`${
                  line.type === 'add'
                    ? 'bg-[#5db872]/8'
                    : line.type === 'remove'
                    ? 'bg-[#c64545]/8'
                    : ''
                } hover:bg-[#efe9de]/50`}
              >
                {/* Old line number */}
                <td className="w-12 text-right pr-2 py-0 text-[#8e8b82] select-none border-r border-[#e6dfd8] align-top">
                  <span className="px-1">{line.lineNumber.old ?? ''}</span>
                </td>
                {/* New line number */}
                <td className="w-12 text-right pr-2 py-0 text-[#8e8b82] select-none border-r border-[#e6dfd8] align-top">
                  <span className="px-1">{line.lineNumber.new ?? ''}</span>
                </td>
                {/* Indicator */}
                <td className={`w-6 text-center py-0 select-none ${
                  line.type === 'add'
                    ? 'text-[#5db872]'
                    : line.type === 'remove'
                    ? 'text-[#c64545]'
                    : 'text-[#8e8b82]'
                }`}>
                  {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}
                </td>
                {/* Content */}
                <td className={`py-0 pl-2 pr-4 whitespace-pre-wrap break-all ${
                  line.type === 'add'
                    ? 'text-[#5db872]'
                    : line.type === 'remove'
                    ? 'text-[#c64545]'
                    : 'text-[#6c6a64]'
                }`}>
                  {line.content || '\u00A0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
