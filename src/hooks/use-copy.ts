import { useCallback, useState } from 'react'

/** Copy text to the clipboard; `copied` is true for 2 seconds afterwards, `failed` if the browser refused. */
export function useCopy() {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setFailed(false)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setFailed(true)
    }
  }, [])
  return { copy, copied, failed }
}
