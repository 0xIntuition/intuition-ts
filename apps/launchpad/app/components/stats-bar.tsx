import { useEffect, useState } from 'react'

import { Button, Icon, Text } from '@0xintuition/1ui'

export function StatsBar() {
  const currentChapter = 'CHAPTER I: GENESIS'
  const endTime = new Date(Date.now() + 172800000) // 2 days from now
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = endTime.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft('Completed')
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="fixed top-0 left-[16rem] right-0 flex items-center justify-between w-[calc(100%-16rem)] bg-black/40 px-6 py-3 z-50">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="text-[#BA8461] hover:text-[#BA8461] hover:bg-[#BA8461]/10 border border-border/10"
        >
          {currentChapter}
          <Icon name="arrow-up-right" className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Text variant="body" weight="medium" className="text-[#BA8461]">
          {timeLeft}
        </Text>
        <Button
          variant="ghost"
          className="text-[#BA8461] hover:text-[#BA8461] hover:bg-[#BA8461]/10 border border-border/10"
        >
          <Icon name="map" className="w-4 h-4" />
          Roadmap
        </Button>
      </div>
    </div>
  )
}
