import { useCallback, useState } from 'react'
import { cvFiles } from '@/data/profile'
import type { Lang } from '@/i18n'

type ClaudeRuntime = { use: (name: string) => Promise<unknown> }
type Downloads = { save: (r: { filename: string; data: Blob }) => Promise<unknown> }

/**
 * Downloads the CV PDF for a language.
 * On a normal website this is a plain file download. Inside a claude.ai artifact preview
 * (which blocks normal downloads) it goes through the artifact's downloads capability.
 */
export function useCvDownload() {
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saved' | 'failed'>('idle')

  const download = useCallback(async (lang: Lang) => {
    const { href, filename } = cvFiles[lang]
    const runtime = (window as unknown as { claude?: ClaudeRuntime }).claude
    if (!runtime?.use) {
      const a = Object.assign(document.createElement('a'), { href, download: filename })
      document.body.appendChild(a)
      a.click()
      a.remove()
      return
    }
    setBusy(true)
    setStatus('idle')
    try {
      const downloads = (await runtime.use('downloads')) as Downloads | null
      if (!downloads) throw new Error('unavailable')
      const blob = await fetch(href).then((r) => {
        if (!r.ok) throw new Error('missing file')
        return r.blob()
      })
      await downloads.save({ filename, data: blob })
      setStatus('saved')
    } catch (e) {
      const code = (e as { code?: string })?.code
      setStatus(code === 'declined' ? 'idle' : 'failed')
    } finally {
      setBusy(false)
    }
  }, [])

  return { download, busy, status }
}
