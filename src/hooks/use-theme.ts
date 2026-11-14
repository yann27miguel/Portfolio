import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

function read(): Theme {
  try {
    const t = localStorage.getItem('theme')
    return t === 'light' || t === 'dark' ? t : 'system'
  } catch {
    return 'system'
  }
}

/** Light / dark / system theme. Follows the OS by default and remembers a manual choice. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(read)
  const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const on = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [resolved])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    try {
      localStorage.setItem('theme', t)
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, [])

  return { theme, resolved, setTheme }
}
