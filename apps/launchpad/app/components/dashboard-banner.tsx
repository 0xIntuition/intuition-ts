import { useState } from 'react'

import { Button } from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'
import { BrainCircuit } from 'lucide-react'

import { Banner } from './ui/banner'

export function DashboardBanner() {
  const [isVisible] = useState(true)
  const navigate = useNavigate()

  if (!isVisible) {
    return null
  }

  return (
    <Banner variant="ai" className="dark text-foreground" rounded="default">
      <div className="flex w-full gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm max-md:mt-0.5"
            aria-hidden="true"
          >
            <BrainCircuit className="w-7 h-7 text-white" />
          </div>
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-lg font-medium">
                Start Your Personalization Journey!
              </p>
              <p className="text-base text-primary/80">
                Answer questions, build your preferences, earn IQ points; the
                ripple effects will appear in future apps, ai chats, and digital
                worlds.
              </p>
            </div>
            <div className="flex gap-2 max-md:flex-wrap">
              <Button
                size="sm"
                className="text-sm px-2.5 py-1.5 rounded-md"
                onClick={() => navigate('/quests/preferences')}
              >
                Start Training
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Banner>
  )
}
