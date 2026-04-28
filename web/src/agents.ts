export type AgentId =
  | 'claude-code'
  | 'adal'
  | 'amp'
  | 'antigravity'
  | 'augment'
  | 'bob'
  | 'cline'
  | 'codebuddy'
  | 'codex'
  | 'commandcode'
  | 'continue'
  | 'cortex'
  | 'crush'
  | 'cursor'
  | 'deepagents'
  | 'droid'
  | 'firebender'
  | 'gemini-cli'
  | 'github-copilot'
  | 'goose'
  | 'iflow-cli'
  | 'junie'
  | 'kilo'
  | 'kimi-cli'
  | 'kiro-cli'
  | 'kode'
  | 'mcpjam'
  | 'mistral-vibe'
  | 'mux'
  | 'neovate'
  | 'opencode'
  | 'openclaw'
  | 'openhands'
  | 'pi'
  | 'pochi'
  | 'qoder'
  | 'qwen-code'
  | 'replit'
  | 'roo'
  | 'trae'
  | 'trae-cn'
  | 'universal'
  | 'warp'
  | 'windsurf'
  | 'zencoder'
  | 'unknown'

export interface AgentMeta {
  id: AgentId
  name: string
  color: { bg: string; text: string; ring: string }
}

// Mirrors server/scanner/agents.ts. Kept in sync by hand.
// Popular agents get distinctive colors; long tail uses a rotating palette.
const c = {
  coral:  { bg: 'bg-[#cc785c]/15', text: 'text-[#cc785c]', ring: 'ring-[#cc785c]/30' },
  slate:  { bg: 'bg-[#e8e0d2]/30', text: 'text-[#6c6a64]', ring: 'ring-[#e6dfd8]/50' },
  blue:   { bg: 'bg-[#5db8a6]/15', text: 'text-[#5db8a6]', ring: 'ring-[#5db8a6]/30' },
  purple: { bg: 'bg-[#7c5d8a]/15', text: 'text-[#7c5d8a]', ring: 'ring-[#7c5d8a]/30' },
  green:  { bg: 'bg-[#5db872]/15', text: 'text-[#5db872]', ring: 'ring-[#5db872]/30' },
  amber:  { bg: 'bg-[#e8a55a]/15', text: 'text-[#e8a55a]', ring: 'ring-[#e8a55a]/30' },
  red:    { bg: 'bg-[#c64545]/15', text: 'text-[#c64545]', ring: 'ring-[#c64545]/30' },
  teal:   { bg: 'bg-[#5db8b8]/15', text: 'text-[#5db8b8]', ring: 'ring-[#5db8b8]/30' },
  gray:   { bg: 'bg-[#e8e0d2]/30', text: 'text-[#8e8b82]', ring: 'ring-[#e6dfd8]/50' },
}

export const AGENT_META: Record<AgentId, AgentMeta> = {
  // Popular agents with distinctive colors
  'claude-code':    { id: 'claude-code',    name: 'Claude Code',     color: c.coral },
  cursor:           { id: 'cursor',         name: 'Cursor',          color: c.blue },
  codex:            { id: 'codex',          name: 'Codex',           color: c.slate },
  'gemini-cli':     { id: 'gemini-cli',     name: 'Gemini CLI',      color: c.blue },
  'github-copilot': { id: 'github-copilot', name: 'GitHub Copilot',  color: c.purple },
  windsurf:         { id: 'windsurf',       name: 'Windsurf',        color: c.teal },
  continue:         { id: 'continue',       name: 'Continue',        color: c.green },
  antigravity:      { id: 'antigravity',    name: 'Antigravity',     color: c.purple },
  augment:          { id: 'augment',        name: 'Augment',         color: c.amber },
  bob:              { id: 'bob',            name: 'IBM Bob',         color: c.blue },
  codebuddy:        { id: 'codebuddy',      name: 'CodeBuddy',       color: c.green },
  openclaw:         { id: 'openclaw',       name: 'OpenClaw',        color: c.red },
  universal:        { id: 'universal',      name: 'Universal',       color: c.blue },

  // Long tail — cycle through remaining colors so each has a recognizable hue
  adal:           { id: 'adal',           name: 'AdaL',           color: c.blue },
  amp:            { id: 'amp',            name: 'Amp',            color: c.purple },
  cline:          { id: 'cline',          name: 'Cline',          color: c.red },
  commandcode:    { id: 'commandcode',    name: 'Command Code',   color: c.slate },
  cortex:         { id: 'cortex',         name: 'Cortex Code',    color: c.purple },
  crush:          { id: 'crush',          name: 'Crush',          color: c.red },
  deepagents:     { id: 'deepagents',     name: 'Deep Agents',    color: c.teal },
  droid:          { id: 'droid',          name: 'Droid',          color: c.slate },
  firebender:     { id: 'firebender',     name: 'Firebender',     color: c.coral },
  goose:          { id: 'goose',          name: 'Goose',          color: c.amber },
  'iflow-cli':    { id: 'iflow-cli',      name: 'iFlow CLI',      color: c.blue },
  junie:          { id: 'junie',          name: 'Junie',          color: c.amber },
  kilo:           { id: 'kilo',           name: 'Kilo Code',      color: c.green },
  'kimi-cli':     { id: 'kimi-cli',       name: 'Kimi Code CLI',  color: c.purple },
  'kiro-cli':     { id: 'kiro-cli',       name: 'Kiro CLI',       color: c.green },
  kode:           { id: 'kode',           name: 'Kode',           color: c.blue },
  mcpjam:         { id: 'mcpjam',         name: 'MCPJam',         color: c.purple },
  'mistral-vibe': { id: 'mistral-vibe',   name: 'Mistral Vibe',   color: c.blue },
  mux:            { id: 'mux',            name: 'Mux',            color: c.purple },
  neovate:        { id: 'neovate',        name: 'Neovate',        color: c.green },
  opencode:       { id: 'opencode',       name: 'OpenCode',       color: c.blue },
  openhands:      { id: 'openhands',      name: 'OpenHands',      color: c.purple },
  pi:             { id: 'pi',             name: 'Pi',             color: c.red },
  pochi:          { id: 'pochi',          name: 'Pochi',          color: c.slate },
  qoder:          { id: 'qoder',          name: 'Qoder',          color: c.purple },
  'qwen-code':    { id: 'qwen-code',      name: 'Qwen Code',      color: c.amber },
  replit:         { id: 'replit',         name: 'Replit',         color: c.coral },
  roo:            { id: 'roo',            name: 'Roo Code',       color: c.amber },
  trae:           { id: 'trae',           name: 'Trae',           color: c.red },
  'trae-cn':      { id: 'trae-cn',        name: 'Trae CN',        color: c.red },
  warp:           { id: 'warp',           name: 'Warp',           color: c.purple },
  zencoder:       { id: 'zencoder',       name: 'Zencoder',       color: c.teal },

  unknown: { id: 'unknown', name: '未知', color: c.gray },
}

// Sidebar filter order — popular first, then alphabetical, universal last.
export const AGENT_ORDER: AgentId[] = [
  'claude-code',
  'cursor',
  'codex',
  'gemini-cli',
  'github-copilot',
  'windsurf',
  'continue',
  'adal',
  'amp',
  'antigravity',
  'augment',
  'bob',
  'cline',
  'codebuddy',
  'commandcode',
  'cortex',
  'crush',
  'deepagents',
  'droid',
  'firebender',
  'goose',
  'iflow-cli',
  'junie',
  'kilo',
  'kimi-cli',
  'kiro-cli',
  'kode',
  'mcpjam',
  'mistral-vibe',
  'mux',
  'neovate',
  'opencode',
  'openclaw',
  'openhands',
  'pi',
  'pochi',
  'qoder',
  'qwen-code',
  'replit',
  'roo',
  'trae',
  'trae-cn',
  'warp',
  'zencoder',
  'universal',
  'unknown',
]

export function getAgentMeta(id: string): AgentMeta {
  return AGENT_META[id as AgentId] || AGENT_META.unknown
}
