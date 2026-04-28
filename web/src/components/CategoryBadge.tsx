import { CategoryIcon } from './Icons'

const CATEGORY_META: Record<string, { name: string; category: string; bg: string; text: string }> = {
  'code-dev':    { name: '代码开发',   category: 'code-dev',    bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'content':     { name: '内容创作',   category: 'content',     bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'image-gen':   { name: '图片生成',   category: 'image-gen',   bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'video-audio': { name: '视频/音频',  category: 'video-audio', bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'data':        { name: '数据分析',   category: 'data',        bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'web-search':  { name: '网络搜索',   category: 'web-search',  bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'social':      { name: '社交媒体',   category: 'social',      bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'doc':         { name: '文档处理',   category: 'doc',         bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'comms':       { name: '通讯协作',   category: 'comms',       bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'design':      { name: '设计/UI',    category: 'design',      bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'translate':   { name: '翻译/i18n',  category: 'translate',   bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'sysadmin':    { name: '系统管理',   category: 'sysadmin',    bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'persona':     { name: '人格/角色',  category: 'persona',     bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'finance':     { name: '财务/金融',  category: 'finance',     bg: 'bg-[#efe9de]', text: 'text-[#3d3d3a]' },
  'other':       { name: '其他',       category: 'other',       bg: 'bg-[#efe9de]', text: 'text-[#6c6a64]' },
}

const FALLBACK = { name: '未知', category: 'other', bg: 'bg-[#efe9de]', text: 'text-[#6c6a64]' }

export function getCategoryMeta(id: string) {
  return CATEGORY_META[id] || FALLBACK
}

export function CategoryBadge({ category }: { category: string }) {
  const meta = getCategoryMeta(category)
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${meta.bg} ${meta.text}`}
      title={meta.name}
    >
      <CategoryIcon category={meta.category} className="w-3 h-3" />
      <span>{meta.name}</span>
    </span>
  )
}
