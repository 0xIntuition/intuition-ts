import { useState } from 'react'

import { Button } from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

import { Banner } from './ui/banner'

export function DashboardBanner() {
  const [isVisible] = useState(true)
  const navigate = useNavigate()

  if (!isVisible) return null

  return (
    <Banner variant="base" className="dark text-foreground" rounded="default">
      <div className="flex w-full gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 max-md:mt-0.5"
            aria-hidden="true"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 111 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H3.9565e-07C2.35281 87.8625 26.0432 110.034 54.921 110.034Z"
                fill="#FFF"
              />
            </svg>
          </div>
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-lg font-medium">Announcing the Base Epoch!</p>
              <p className="text-base text-primary/80">
                Join us in mapping out the Base ecosystem and earn IQ Points for
                your insights
              </p>
            </div>
            <div className="flex gap-2 max-md:flex-wrap">
              <Button
                size="sm"
                className="text-sm px-2.5 py-1.5 rounded-md"
                onClick={() => navigate('/quests/ecosystems')}
              >
                Start Mapping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Banner>
  )
}
