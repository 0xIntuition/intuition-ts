import * as React from 'react'

import { cn } from '@0xintuition/1ui'

import { useNavigation } from '@remix-run/react'

function GlobalLoading() {
  const navigation = useNavigation()
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (navigation.state !== 'idle') {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = Math.random() * 10
          return Math.min(prevProgress + increment, 90)
        })
      }, 200)
    } else {
      setProgress(100)
      timer = setTimeout(() => setProgress(0), 500)
    }
    return () => clearInterval(timer)
  }, [navigation.state])

  return (
    <div
      role="progressbar"
      aria-hidden={navigation.state === 'idle'}
      aria-valuetext={navigation.state !== 'idle' ? 'Loading' : undefined}
      className="fixed inset-x-0 left-0 top-0 z-50 h-[3px]"
    >
      <div
        className={cn(
          'h-full bg-gradient-to-r from-accent/40 to-accent/100 transition-all duration-300 ease-out',
          navigation.state === 'idle' && progress === 0 && 'opacity-0',
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export { GlobalLoading }
