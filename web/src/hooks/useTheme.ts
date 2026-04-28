
// Simplified - Claude design only, no more theme toggle
export function useTheme() {
  return { theme: 'claude' as const, toggle: () => {} }
}

