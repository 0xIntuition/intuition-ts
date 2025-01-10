import { Button, Icon, Progress } from '@0xintuition/1ui'

import { Map } from 'lucide-react'

interface ChapterProgressBannerProps {
  chapter: string
  progress: number
}

export function ChapterProgressBanner({
  chapter,
  progress,
}: ChapterProgressBannerProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-background/5 border-b border-border/10 px-6 py-3">
        <Button variant="ghost" className="text-accent hover:text-primary">
          <div className="text-sm font-medium text-accent">{chapter}</div>
          <Icon name="arrow-up-right" className="h-3.5 w-3.5 text-accent" />
        </Button>
        <Button variant="ghost" className="text-accent hover:text-primary">
          <Map className="h-3.5 w-3.5 mr-2" />
          <span className="text-xs">Roadmap</span>
        </Button>
      </div>
      <Progress
        value={progress}
        className="absolute bottom-0 left-0 right-0 h-0.5"
      />
    </div>
  )
}
