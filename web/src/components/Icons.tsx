// SVG Icons for agents
export const AgentIcon = ({ agent, className = "w-3.5 h-3.5" }: { agent: string; className?: string }) => {
  switch (agent) {
    case 'claude-code':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.7"/>
          <path d="M12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4c.55 0 1-.45 1-1s-.45-1-1-1c-1.1 0-2-.9-2-2s.9-2 2-2c.55 0 1-.45 1-1s-.45-1-1-1z" fill="currentColor"/>
          <path d="M12 15c-1.66 0-3-1.34-3-3 0-.55.45-1 1-1s1 .45 1 1c0 .55.45 1 1 1s1-.45 1-1c0-.55.45-1 1-1s1 .45 1 1c0 1.66-1.34 3-3 3z" fill="currentColor" opacity="0.7"/>
        </svg>
      )
    case 'cursor':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M5 3l10 9h-5l1 7-6-16z" fill="currentColor"/>
          <path d="M8 15l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'codex':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M9 8.5l-3 3.5 3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 8.5l3 3.5-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      )
    case 'gemini-cli':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
          <path d="M12 4.5v4M12 15.5v4M4.5 12h4M15.5 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'github-copilot':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2z" fill="currentColor" opacity="0.7"/>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87c0-.98-.36-1.91-1-2.61 3.2-.4 6.6-1.5 6.6-7 0-1.53-.55-2.85-1.47-3.88.15-.37.63-1.86-.14-3.88 0 0-1.2-.39-3.94 1.47-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27C9.19 3.09 8 3.48 8 3.48c-.77 2.02-.29 3.51-.14 3.88-.92 1.03-1.47 2.35-1.47 3.88 0 5.5 3.4 6.6 6.6 7-.64.7-1 1.63-1 2.61V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'windsurf':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M3 18l8-14v14l8-14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="18" r="3" fill="currentColor"/>
        </svg>
      )
    case 'continue':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <polygon points="8,5 18,12 8,19" fill="currentColor"/>
          <rect x="19" y="8" width="2" height="8" rx="0.5" fill="currentColor" opacity="0.7"/>
        </svg>
      )
    case 'antigravity':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.7"/>
          <path d="M3 12c1.5-2.5 4.5-4 8-4 3.5 0 6.5 1.5 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 12c1.5 2.5 4.5 4 8 4 3.5 0 6.5-1.5 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      )
    case 'augment':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
        </svg>
      )
    case 'bob':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="15" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 21c3-6 15-6 18 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'codebuddy':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="9" cy="10" r="3" fill="currentColor" opacity="0.7"/>
          <circle cx="15" cy="10" r="3" fill="currentColor"/>
          <path d="M6 17c2 2 10 2 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'openclaw':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <ellipse cx="12" cy="14" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 10c0-2 4-6 4-6s4 4 4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
        </svg>
      )
    case 'universal':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      )
    case 'adal':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2l10 6v8l-10 6L2 16V8l10-6z" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.7"/>
        </svg>
      )
    case 'amp':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M18 9l-6-6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 15l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        </svg>
      )
    case 'cline':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 8l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'commandcode':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    case 'cortex':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 4c2 2.5 3 5 3 8s-1 5.5-3 8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 4c-2 2.5-3 5-3 8s1 5.5 3 8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    case 'crush':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 9s0-2 2-2 2 2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 9s0-2 2-2 2 2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 15c1.33 1.33 2.67 2 4 2s2.67-.67 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'deepagents':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        </svg>
      )
    case 'droid':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="6" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="9" cy="13" r="1" fill="currentColor"/>
          <circle cx="15" cy="13" r="1" fill="currentColor"/>
          <path d="M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'firebender':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2c0 4-4 6-4 10a4 4 0 108 0c0-4-4-6-4-10z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 18c0-2 2-3 2-5a2 2 0 10-4 0c0 2 2 3 2 5z" fill="currentColor" opacity="0.7"/>
        </svg>
      )
    case 'goose':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M18 8c2 0 4 2 4 4s-2 4-4 4h-2l-3 4H9l-3-4H4c-2 0-4-2-4-4s2-4 4-4h14z" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8" cy="10" r="1" fill="currentColor"/>
          <circle cx="14" cy="10" r="1" fill="currentColor"/>
        </svg>
      )
    case 'iflow-cli':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'junie':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 14c0 0 1.5 2 4 2s4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="9" cy="10" r="1" fill="currentColor"/>
          <circle cx="15" cy="10" r="1" fill="currentColor"/>
        </svg>
      )
    case 'kilo':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 8l4 8 4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'kimi-cli':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
      )
    case 'kiro-cli':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'kode':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M4 4l8 8 8-8M4 20l8-8 8 8" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    case 'mcpjam':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    case 'mistral-vibe':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M9.5 2C5.36 2 2 5.36 2 9.5c0 2.37 1.1 4.48 2.82 5.82L12 22l7.18-6.68A9.46 9.46 0 0022 9.5C22 5.36 18.64 2 14.5 2c-1.56 0-3.02.48-4.23 1.3A9.42 9.42 0 009.5 2z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'mux':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 3v3M16 3v3M8 21v-3M16 21v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'neovate':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'opencode':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M2 3h20v18H2V3z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 8h20" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="5" cy="5.5" r="1" fill="currentColor"/>
          <circle cx="8" cy="5.5" r="1" fill="currentColor"/>
          <circle cx="11" cy="5.5" r="1" fill="currentColor"/>
          <path d="M7 13l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 19h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'openhands':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M18 8V6a2 2 0 00-2-2h-1a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 8V5a2 2 0 00-2-2h-1a2 2 0 00-2 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M10 8V6a2 2 0 00-2-2H7a2 2 0 00-2 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M18 12V9a2 2 0 00-2-2h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 12c0 5 3 8 6 8s6-3 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'pi':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M6 6h12M10 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 10c0-2.21-2.69-4-6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'pochi':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <ellipse cx="12" cy="14" rx="8" ry="6" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8" cy="11" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="11" r="1.5" fill="currentColor"/>
          <path d="M10 15c0 1.1.9 2 2 2s2-.9 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 8c0 0 2-4 4-4M20 8c0 0-2-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'qoder':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 9c0-1.66 1.34-3 3-3s3 1.34 3 3c0 2-3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="16" r="1" fill="currentColor"/>
        </svg>
      )
    case 'qwen-code':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 8l4 4 4-4M8 16l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'replit':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 8v8l4-3 4 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    case 'roo':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 10l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'trae':
    case 'trae-cn':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <polygon points="12,2 22,20 2,20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'warp':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    case 'zencoder':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 8h8l-8 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'unknown':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 17v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 13c0-2.76 2.24-5 5-5a5 5 0 00-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
  }
}

// SVG Icons for categories
export const CategoryIcon = ({ category, className = "w-3 h-3" }: { category: string; className?: string }) => {
  switch (category) {
    case 'code-dev':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M8 8l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 4l-4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      )
    case 'content':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 20h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    case 'image-gen':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'video-audio':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <polygon points="10,8 16,12 10,16" fill="currentColor"/>
        </svg>
      )
    case 'data':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="14" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="10" y="10" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="16" y="4" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    case 'web-search':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'social':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="18" r="1" fill="currentColor"/>
          <path d="M9 7h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'doc':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 13h3M8 17h3M8 9h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'comms':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 9h2M14 9h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'design':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="7" cy="7" r="1" fill="currentColor"/>
        </svg>
      )
    case 'translate':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M5 8l6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15 5l-3 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M2 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'sysadmin':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="10" r="2" fill="currentColor"/>
        </svg>
      )
    case 'persona':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6 20c0-3 2.7-6 6-6s6 3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="9" cy="7" r="0.5" fill="currentColor"/>
          <circle cx="15" cy="7" r="0.5" fill="currentColor"/>
          <path d="M10 10c0 1.1.9 2 2 2s2-.9 2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      )
    case 'finance':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6 12h1M17 12h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'other':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M20 7l-8-4-8 4v10l8 4 8-4V7z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 12l8-4M12 12v9M12 12L4 8" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
  }
}

// SVG Icons for scope/source groups in SkillGrid
export const ScopeIcon = ({ scope, className = "w-3.5 h-3.5" }: { scope: string; className?: string }) => {
  switch (scope) {
    case 'global':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    case 'project':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4H9l2 2h8.5A2.5 2.5 0 0 1 22 8.5v7A2.5 2.5 0 0 1 19.5 18h-15A2.5 2.5 0 0 1 2 15.5v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    case 'plugin':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8V4M8 8V6M16 8V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="14" r="2" fill="currentColor"/>
        </svg>
      )
    default:
      return null
  }
}

export const SourceIcon = ({ source, className = "w-3.5 h-3.5" }: { source: string; className?: string }) => {
  switch (source) {
    case 'newmax':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.7"/>
        </svg>
      )
    case 'agents':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="15" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
          <path d="M3 18c0-3 3-5 6-5h6c3 0 6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'local':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
        </svg>
      )
    case 'symlink':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
        </svg>
      )
  }
}

// Misc icons
export const LinkIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export const SearchIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export const TrashIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

export const PackageIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 7l-8-4-8 4v10l8 4 8-4V7z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 12l8-4M12 12v9M12 12L4 8" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)
