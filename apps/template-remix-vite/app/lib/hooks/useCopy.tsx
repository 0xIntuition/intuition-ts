import { useCallback, useState } from 'react'

export const useCopy = (duration = 2000) => {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), duration)
    },
    [duration],
  )

  return { copied, copy }
}
