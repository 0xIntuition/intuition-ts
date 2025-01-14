import * as React from 'react'

import { Button, Icon, Text } from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

interface StatsBarProps {
  chapter: string
  remainingTime: string
}

export function StatsBar({ chapter, remainingTime }: StatsBarProps) {
  return (
    <div className="fixed top-0 left-[16rem] right-0 flex items-center justify-between w-[calc(100%-16rem)] bg-black/40 px-6 py-3 z-50">
      <div className="flex items-center gap-2">
        <Link to="/chapter-1">
          <Button
            variant="ghost"
            className="text-[#BA8461] hover:text-[#BA8461] hover:bg-[#BA8461]/10 border border-border/10"
          >
            {chapter}
            <Icon name="arrow-up-right" className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Text variant="body" weight="medium" className="text-[#BA8461]">
          {remainingTime}
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
